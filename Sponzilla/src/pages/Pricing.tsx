import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { useUser } from '../contexts/UserContext';
import { paymentAPI, type PlanName, type BillingCycle } from '../services/paymentAPI';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpayScript = (): Promise<boolean> => {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [userType, setUserType] = useState<'club' | 'brand'>('club');
  const [loading, setLoading] = useState<string | null>(null);
  const { isAuthenticated, user } = useUser();

  const handleUpgrade = async (planName: PlanName) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(planName);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load payment gateway. Please try again.');
        return;
      }

      const { order } = await paymentAPI.createOrder(planName, billingCycle);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'SponZilla',
        description: `${planName.replace('_', ' ')} — ${billingCycle}`,
        order_id: order.id,
        prefill: {
          email: user?.email || '',
        },
        theme: { color: '#118ee8' },
        handler: async (response: any) => {
          try {
            await paymentAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planName,
            });
            alert('Payment successful! Your plan has been upgraded.');
            navigate(user?.type === 'club' ? '/club-dashboard' : '/brand-dashboard');
          } catch {
            alert('Payment verification failed. Please contact support.');
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      alert('Could not initiate payment. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const clubPlans = [
    {
      name: 'Starter',
      planName: null as PlanName | null,
      price: 'Free',
      priceNote: 'Forever free',
      description: 'Perfect for new student clubs looking to find their first sponsor.',
      features: [
        '1 Active Event Listing',
        'Basic Club Profile',
        'Manual Brand Discovery',
        'Community Support'
      ],
      buttonText: 'Get Started for Free',
      highlighted: false,
    },
    {
      name: 'Club Pro',
      planName: 'club_pro' as PlanName,
      price: billingCycle === 'monthly' ? '₹199' : '₹1,990',
      priceNote: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'For active organizations that host multiple events throughout the year.',
      features: [
        'Unlimited Event Listings',
        'AI Predictive Matchmaking',
        'Automated Pitch Deck Generation',
        'Priority Support'
      ],
      buttonText: 'Upgrade to Pro',
      highlighted: true,
    }
  ];

  const brandPlans = [
    {
      name: 'Brand Starter',
      planName: 'brand_starter' as PlanName,
      price: billingCycle === 'monthly' ? '₹699' : '₹6,990',
      priceNote: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'For small businesses looking to connect with local university talent.',
      features: [
        'Access to Club Discovery Directory',
        'Up to 5 Sponsorship Bids per month',
        'Basic Analytics Dashboard',
        'Email Support'
      ],
      buttonText: 'Start Sponsoring',
      highlighted: false,
    },
    {
      name: 'Brand Pro',
      planName: 'brand_pro' as PlanName,
      price: billingCycle === 'monthly' ? '₹999' : '₹9,990',
      priceNote: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'For enterprises that want to scale their campus marketing campaigns.',
      features: [
        'Unlimited Sponsorship Bids',
        'AI Predictive Matchmaking',
        'Advanced ROI Analytics',
        'Priority Listing in Recommendations'
      ],
      buttonText: 'Scale with Pro',
      highlighted: true,
    }
  ];

  const currentPlans = userType === 'club' ? clubPlans : brandPlans;

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f8f9fa] overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />

        <div className="flex-1 flex justify-center py-10 px-4 md:px-8">
          <div className="w-full max-w-[960px] flex flex-col">

            {/* Page Header */}
            <div className="text-center py-6 max-w-2xl mx-auto flex flex-col gap-3">
              <h1 className="text-[#111518] text-4xl font-extrabold tracking-tight">
                Simple, Transparent Pricing
              </h1>
              <p className="text-[#617689] text-base font-normal leading-relaxed">
                Whether you're a student club looking for event funding or a brand seeking to reach the next generation, we have a plan tailored for you.
              </p>
            </div>

            {/* Toggle Switch Controls */}
            <div className="flex flex-col items-center gap-6 py-6">

              {/* User Type Toggle */}
              <div className="flex p-1.5 rounded-full bg-[#f0f3f4] border border-[#dbe1e6]">
                <button
                  onClick={() => setUserType('club')}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                    userType === 'club'
                      ? 'bg-white text-[#111518] shadow-sm'
                      : 'text-[#617689] hover:text-[#111518]'
                  }`}
                >
                  For Student Clubs
                </button>
                <button
                  onClick={() => setUserType('brand')}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                    userType === 'brand'
                      ? 'bg-white text-[#111518] shadow-sm'
                      : 'text-[#617689] hover:text-[#111518]'
                  }`}
                >
                  For Brands
                </button>
              </div>

              {/* Billing Cycle Toggle */}
              <div className="flex items-center gap-3">
                <span className={`text-sm font-semibold transition-colors duration-200 ${billingCycle === 'monthly' ? 'text-[#111518]' : 'text-[#617689]'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                  className="relative w-11 h-6 bg-[#111518] rounded-full transition-colors focus:outline-none"
                  aria-label="Toggle billing cycle"
                >
                  <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${billingCycle === 'yearly' ? 'translate-x-5' : ''}`}></div>
                </button>
                <span className={`text-sm font-semibold flex items-center gap-2 transition-colors duration-200 ${billingCycle === 'yearly' ? 'text-[#111518]' : 'text-[#617689]'}`}>
                  Yearly
                  <span className="text-[10px] font-bold uppercase bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full">
                    Save 16%
                  </span>
                </span>
              </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 px-4">
              {currentPlans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col gap-6 rounded-2xl p-8 bg-white border transition-all duration-300 ${
                    plan.highlighted
                      ? 'border-[#118ee8] shadow-md ring-1 ring-[#118ee8]'
                      : 'border-[#dde1e3] shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold leading-tight text-[#111518]">
                        {plan.name}
                      </h2>
                      {plan.highlighted && (
                        <span className="text-[10px] font-extrabold uppercase bg-[#e8f4f8] text-[#118ee8] px-2.5 py-1 rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-normal leading-relaxed text-[#617689] min-h-[40px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-1.5 py-2 border-b border-[#f0f2f5]">
                    <span className="text-4xl font-extrabold tracking-tight text-[#111518]">
                      {plan.price}
                    </span>
                    <span className="text-sm font-medium text-[#617689]">
                      {plan.priceNote}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="flex flex-col gap-4 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#617689]">
                      Includes:
                    </p>
                    <ul className="flex flex-col gap-3">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <span className={`flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-[#118ee8]' : 'text-gray-400'}`}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="text-sm font-medium leading-normal text-[#111518]">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button Action */}
                  <button
                    onClick={plan.planName ? () => handleUpgrade(plan.planName!) : () => navigate(isAuthenticated ? '/club-dashboard' : '/login')}
                    disabled={loading === plan.planName}
                    className={`flex items-center justify-center rounded-full h-12 px-6 text-sm font-bold tracking-wide w-full transition-all duration-200 disabled:opacity-60 ${
                      plan.highlighted
                        ? 'bg-[#118ee8] hover:bg-[#0f7fcb] text-white shadow-sm'
                        : 'bg-[#f0f3f4] hover:bg-[#e4e8eb] text-[#111518]'
                    }`}
                  >
                    {loading === plan.planName ? 'Processing...' : plan.buttonText}
                  </button>
                </div>
              ))}
            </div>

            {/* FAQs Accordion/Grid */}
            <div className="mt-12 px-4">
              <h2 className="text-[#111518] text-2xl font-bold tracking-tight text-center pb-8">
                Frequently Asked Questions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2 rounded-2xl border border-[#dde1e3] bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h3 className="text-[#111518] text-base font-bold">Can I switch plans later?</h3>
                  <p className="text-[#617689] text-sm font-normal leading-relaxed">
                    Absolutely. You can upgrade, downgrade, or cancel your subscription at any time directly from your dashboard settings.
                  </p>
                </div>
                <div className="flex flex-col gap-2 rounded-2xl border border-[#dde1e3] bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h3 className="text-[#111518] text-base font-bold">Is there a free trial for Pro?</h3>
                  <p className="text-[#617689] text-sm font-normal leading-relaxed">
                    Yes, we offer a 14-day free trial on our Club Pro and Brand Pro tiers so you can test all AI tools and matchmaking services.
                  </p>
                </div>
                <div className="flex flex-col gap-2 rounded-2xl border border-[#dde1e3] bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h3 className="text-[#111518] text-base font-bold">What payment models do you accept?</h3>
                  <p className="text-[#617689] text-sm font-normal leading-relaxed">
                    We accept all major credit cards, debit cards, Net Banking, and UPI payments through our secure Razorpay integration.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Footer Section */}
            <footer className="mt-20 border-t border-[#dde1e3]">
              <div className="flex flex-col gap-6 py-10 text-center">
                <div className="flex flex-wrap items-center justify-center gap-8 sm:flex-row">
                  <Link className="text-[#617689] hover:text-[#111518] text-sm font-medium transition-colors" to="/about">About</Link>
                  <Link className="text-[#617689] hover:text-[#111518] text-sm font-medium transition-colors" to="/contact">Contact Us</Link>
                  <Link className="text-[#617689] hover:text-[#111518] text-sm font-medium transition-colors" to="/privacy-policy">Privacy Policy</Link>
                  <Link className="text-[#617689] hover:text-[#111518] text-sm font-medium transition-colors" to="/terms-of-service">Terms of Service</Link>
                </div>
                <p className="text-[#617689] text-xs font-normal">
                  © 2025 SponZilla. All rights reserved.
                </p>
              </div>
            </footer>

          </div>
        </div>

      </div>
    </div>
  );
};

export default PricingPage;
