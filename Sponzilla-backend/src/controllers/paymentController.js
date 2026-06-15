const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('../models/user');

// Initialize Razorpay instance
const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

/**
 * @desc    Create a new Razorpay Order for a Pro subscription
 * @route   POST /api/payments/create-order
 * @access  Private
 */
exports.createOrder = async (req, res) => {
  try {
    const { planType } = req.body; // 'monthly' or 'yearly'
    const userId = req.user._id;

    // Define pricing in INR (Multiply by 100 to get Paisa as required by Razorpay)
    const amount = planType === 'yearly' ? 399 * 100 : 49 * 100;

    const razorpay = getRazorpayInstance();

    const options = {
      amount,
      currency: 'INR',
      receipt: `receipt_${userId}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ success: false, message: 'Failed to create Razorpay order' });
    }

    // Save order ID temporarily if needed, or just return to client
    await User.findByIdAndUpdate(userId, { razorpayOrderId: order.id });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

/**
 * @desc    Verify Razorpay payment and upgrade user
 * @route   POST /api/payments/verify
 * @access  Private
 */
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.user._id;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment verified successfully
      // Upgrade user to pro
      await User.findByIdAndUpdate(userId, {
        subscriptionPlan: 'pro'
      });

      res.status(200).json({
        success: true,
        message: 'Payment successful, upgraded to Pro!',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid signature, payment verification failed',
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
