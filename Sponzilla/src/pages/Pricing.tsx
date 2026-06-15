import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
// TEMPORARILY DISABLED: Razorpay integration commented out for deployment
// import { paymentAPI } from '../services/paymentAPI';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [userType, setUserType] = useState<'club' | 'brand'>('club');
  const { isAuthenticated } = useUser();

  const handleUpgrade = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    alert("Pro subscriptions will be available soon! We are currently finalizing our payment gateway.");
  };

  const clubPlans = [
    {
      name: 'Starter',
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
      price: billingCycle === 'monthly' ? '₹299' : '₹2,990',
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
      price: billingCycle === 'monthly' ? '₹999' : '₹9,990',
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
      price: billingCycle === 'monthly' ? '₹4,999' : '₹49,990',
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
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Page Title */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight text-left">Pricing</p>
                <p className="text-[#617689] text-sm font-normal leading-normal text-left">
                  Whether you're a student club looking for funding, or a brand looking to reach the next generation — we have a plan for you.
                </p>
              </div>
            </div>

            {/* Toggle Section */}
            <div className="flex flex-col items-center gap-4 px-4 py-6">
              {/* User Type Toggle */}
              <div className="flex gap-2 p-1 rounded-xl bg-[#f0f3f4]">
                <button
                  onClick={() => setUserType('club')}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${userType === 'club' ? 'bg-white text-[#111518] shadow-sm' : 'text-[#617689]'}`}
                >
                  For Student Clubs
                </button>
                <button
                  onClick={() => setUserType('brand')}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${userType === 'brand' ? 'bg-white text-[#111518] shadow-sm' : 'text-[#617689]'}`}
                >
                  For Brands
                </button>
              </div>

              {/* Billing Cycle Toggle */}
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-[#111518]' : 'text-[#617689]'}`}>Monthly</span>
                <button
                  onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                  className="relative w-11 h-6 bg-[#111518] rounded-full transition-colors focus:outline-none"
                >
                  <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${billingCycle === 'yearly' ? 'translate-x-5' : ''}`}></div>
                </button>
                <span className={`text-sm font-medium flex items-center gap-2 ${billingCycle === 'yearly' ? 'text-[#111518]' : 'text-[#617689]'}`}>
                  Annually
                  <span className="text-[10px] font-bold uppercase bg-[#e8f5e9] text-[#078838] px-2 py-0.5 rounded-full">Save 16%</span>
                </span>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 p-4">
              {currentPlans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col gap-4 rounded-xl p-6 border ${plan.highlighted ? 'border-[#111518] bg-[#111518]' : 'border-[#dbe1e6] bg-white'}`}
                >
                  {/* Plan Header */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h2 className={`text-[22px] font-bold leading-tight tracking-[-0.015em] ${plan.highlighted ? 'text-white' : 'text-[#111518]'}`}>
                        {plan.name}
                      </h2>
                      {plan.highlighted && (
                        <span className="text-[10px] font-bold uppercase bg-[#dce8f3] text-[#111518] px-2 py-0.5 rounded-full">Popular</span>
                      )}
                    </div>
                    <p className={`text-sm font-normal leading-normal ${plan.highlighted ? 'text-[#9ba8b4]' : 'text-[#617689]'}`}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 pt-2">
                    <span className={`tracking-light text-[32px] font-bold leading-tight ${plan.highlighted ? 'text-white' : 'text-[#111518]'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm font-normal ${plan.highlighted ? 'text-[#9ba8b4]' : 'text-[#617689]'}`}>
                      {plan.priceNote}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={plan.highlighted ? handleUpgrade : () => navigate(isAuthenticated ? '/dashboard' : '/login')}
                    className={`flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] w-full ${plan.highlighted ? 'bg-[#dce8f3] text-[#111518] hover:bg-white' : 'bg-[#f0f3f4] text-[#111518] hover:bg-[#dbe1e6]'} transition-colors`}
                  >
                    <span className="truncate">{plan.buttonText}</span>
                  </button>

                  {/* Features */}
                  <div className="flex flex-col gap-3 pt-2">
                    <p className={`text-sm font-bold ${plan.highlighted ? 'text-[#9ba8b4]' : 'text-[#617689]'}`}>What's included:</p>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3">
                        <div className={`text-current ${plan.highlighted ? 'text-[#dce8f3]' : 'text-[#111518]'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                          </svg>
                        </div>
                        <span className={`text-sm font-normal leading-normal ${plan.highlighted ? 'text-white' : 'text-[#111518]'}`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-8 text-left">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-3 p-4">
              <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe1e6] bg-white p-4 flex-col">
                <h3 className="text-[#111518] text-base font-bold leading-tight">Can I change plans later?</h3>
                <p className="text-[#617689] text-sm font-normal leading-normal">Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.</p>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe1e6] bg-white p-4 flex-col">
                <h3 className="text-[#111518] text-base font-bold leading-tight">Is there a free trial for Pro?</h3>
                <p className="text-[#617689] text-sm font-normal leading-normal">We offer a 14-day free trial of Pro features so you can experience the full power of SponZilla before committing.</p>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe1e6] bg-white p-4 flex-col">
                <h3 className="text-[#111518] text-base font-bold leading-tight">What payment methods do you accept?</h3>
                <p className="text-[#617689] text-sm font-normal leading-normal">We accept all major credit/debit cards and UPI payments through our secure payment partner Razorpay.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center">
              <div className="flex flex-wrap items-center justify-center gap-6 sm:flex-row sm:justify-around">
                <Link className="text-[#617689] text-base font-normal leading-normal min-w-40" to="/about">About</Link>
                <Link to="/contact" className="text-[#617689] text-base font-normal leading-normal min-w-40">Contact Us</Link>
                <Link to="/privacy-policy" className="text-[#617689] text-base font-normal leading-normal min-w-40">Privacy Policy</Link>
                <Link to="/terms-of-service" className="text-[#617689] text-base font-normal leading-normal min-w-40">Terms of Service</Link>
              </div>
              <p className="text-[#617689] text-base font-normal leading-normal">© 2025 Krish. All rights reserved.</p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PricingPage;
