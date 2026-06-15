import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { paymentAPI } from '../services/paymentAPI';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [userType, setUserType] = useState<'club' | 'brand'>('club');
  const { user, isAuthenticated, setUser } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // TEMPORARILY DISABLED: Razorpay integration is built but commented out for deployment
    // until the Razorpay account and keys are fully set up.
    alert("Pro subscriptions will be available soon! We are currently finalizing our payment gateway.");
    
    /*
    try {
      setIsProcessing(true);
      const orderData = await paymentAPI.createOrder(billingCycle);
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // Usually fetched from backend or env
        amount: orderData.order.amount,
        currency: 'INR',
        name: 'SponZilla',
        description: 'Pro Subscription',
        order_id: orderData.order.id,
        handler: async (response: any) => {
          try {
            const verifyRes = await paymentAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            if (verifyRes.success) {
              alert('Successfully upgraded to Pro!');
              setUser({ ...user, subscriptionPlan: 'pro' });
            }
          } catch (err) {
            console.error('Payment verification failed', err);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: '#111518'
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        console.error('Payment failed', response.error);
        alert('Payment failed. Please try again.');
      });
      rzp.open();
    } catch (err) {
      console.error('Failed to initiate payment', err);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
    */
  };

  const clubPlans = [
    {
      name: 'Starter',
      price: 'Free',
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
      price: billingCycle === 'monthly' ? '₹299/mo' : '₹2,990/yr',
      description: 'For active organizations that host multiple events throughout the year.',
      features: [
        'Unlimited Event Listings',
        '✨ AI Predictive Matchmaking',
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
      price: billingCycle === 'monthly' ? '₹999/mo' : '₹9,990/yr',
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
      price: billingCycle === 'monthly' ? '₹4,999/mo' : '₹49,990/yr',
      description: 'For enterprises that want to scale their campus marketing campaigns.',
      features: [
        'Unlimited Sponsorship Bids',
        '✨ AI Predictive Matchmaking',
        'Advanced ROI Analytics',
        'Priority Listing in Recommendations'
      ],
      buttonText: 'Scale with Pro',
      highlighted: true,
    }
  ];

  const currentPlans = userType === 'club' ? clubPlans : brandPlans;

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f8fafb] group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />

        {/* Header Section */}
        <div className="flex flex-col items-center justify-center pt-16 pb-10 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#111518] tracking-tight mb-4">
            Simple, affordable pricing
          </h1>
          <p className="text-lg text-[#617689] max-w-2xl mb-10">
            Whether you're a student club looking for funding, or a brand looking to reach the next generation, we have a plan for you.
          </p>

          {/* User Type Toggle */}
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-[#e4e9ec] mb-8">
            <button
              onClick={() => setUserType('club')}
              className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${userType === 'club' ? 'bg-[#111518] text-white shadow-md' : 'text-[#617689] hover:text-[#111518]'}`}
            >
              For Student Clubs
            </button>
            <button
              onClick={() => setUserType('brand')}
              className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${userType === 'brand' ? 'bg-[#111518] text-white shadow-md' : 'text-[#617689] hover:text-[#111518]'}`}
            >
              For Brands
            </button>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center gap-3 mb-12">
            <span className={`text-sm font-semibold ${billingCycle === 'monthly' ? 'text-[#111518]' : 'text-[#617689]'}`}>Monthly</span>
            <button 
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-12 h-6 bg-[#111518] rounded-full transition-colors focus:outline-none"
            >
              <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : ''}`}></div>
            </button>
            <span className={`text-sm font-semibold flex items-center gap-2 ${billingCycle === 'yearly' ? 'text-[#111518]' : 'text-[#617689]'}`}>
              Annually <span className="bg-green-100 text-green-700 text-[10px] uppercase px-2 py-0.5 rounded-full font-bold">Save 16%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Section */}
        <div className="px-4 pb-20 flex justify-center">
          <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full">
            {currentPlans.map((plan, idx) => (
              <div 
                key={idx} 
                className={`flex-1 rounded-3xl p-8 flex flex-col transition-all duration-300 ${plan.highlighted ? 'bg-[#111518] text-white shadow-2xl scale-105 border-none' : 'bg-white text-[#111518] shadow-lg border border-[#e4e9ec] hover:border-blue-300'}`}
              >
                {plan.highlighted && (
                  <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6 w-max">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-[#111518]'}`}>{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-gray-300' : 'text-[#617689]'}`}>{plan.description}</p>
                <div className="mb-8">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                </div>

                <button 
                  onClick={plan.highlighted ? handleUpgrade : () => navigate(isAuthenticated ? '/dashboard' : '/login')}
                  disabled={isProcessing}
                  className={`w-full py-3 rounded-xl font-bold transition-all mb-8 ${plan.highlighted ? 'bg-white text-[#111518] hover:bg-gray-100' : 'bg-[#f0f3f4] text-[#111518] hover:bg-[#e4e9ec]'} ${isProcessing && plan.highlighted ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {isProcessing && plan.highlighted ? 'Processing...' : plan.buttonText}
                </button>

                <div className="flex flex-col gap-4 mt-auto">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.highlighted ? 'bg-blue-500/20 text-blue-300' : 'bg-green-100 text-green-600'}`}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <span className={`text-sm font-medium ${plan.highlighted ? 'text-gray-200' : 'text-[#415363]'}`}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-auto flex justify-center border-t border-[#e4e9ec] bg-white">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                <a className="text-[#617689] text-base font-normal leading-normal min-w-40" href="/about">About</a>
                <a className="text-[#617689] text-base font-normal leading-normal min-w-40" href="/contact">Contact</a>
                <a className="text-[#617689] text-base font-normal leading-normal min-w-40" href="/terms">Terms of Service</a>
                <a className="text-[#617689] text-base font-normal leading-normal min-w-40" href="/privacy">Privacy Policy</a>
              </div>
              <p className="text-[#617689] text-base font-normal leading-normal">© 2026 SponZilla. All rights reserved.</p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PricingPage;
