const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('../models/user');

const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    const err = new Error('Razorpay keys are not configured on the server.');
    err.code = 'RAZORPAY_CONFIG_MISSING';
    throw err;
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

const PLAN_PRICING = {
  club_pro:      { monthly: 199, yearly: 1990 },
  brand_starter: { monthly: 699, yearly: 6990 },
  brand_pro:     { monthly: 999, yearly: 9990 },
};

// Razorpay caps `receipt` at 40 chars. ObjectId (24) + prefixes + a 13-digit
// Date.now() is 42, so we shorten the user id and use base36 for the timestamp
// to stay safely under the limit while keeping receipts unique and debuggable.
const buildReceipt = (userId) => {
  const shortUser = userId.toString().slice(-12);
  return `r_${shortUser}_${Date.now().toString(36)}`.slice(0, 40);
};

exports.createOrder = async (req, res) => {
  try {
    const { planName, billingCycle } = req.body;
    const userId = req.user._id;

    const plan = PLAN_PRICING[planName];
    if (!plan || !plan[billingCycle]) {
      return res.status(400).json({ success: false, message: 'Invalid plan or billing cycle' });
    }

    const amount = plan[billingCycle] * 100;
    if (amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount for plan' });
    }

    const receipt = buildReceipt(userId);

    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt,
      notes: { planName, billingCycle, userId: userId.toString() },
    });

    if (!order) {
      return res.status(500).json({ success: false, message: 'Failed to create Razorpay order' });
    }

    await User.findByIdAndUpdate(userId, { razorpayOrderId: order.id });

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    const description = error?.error?.description || error?.message || 'Internal Server Error';
    res.status(500).json({ success: false, message: description });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planName } = req.body;
    const userId = req.user._id;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    await User.findByIdAndUpdate(userId, { subscriptionPlan: planName });

    res.status(200).json({
      success: true,
      message: `Payment successful, upgraded to ${planName}!`,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
