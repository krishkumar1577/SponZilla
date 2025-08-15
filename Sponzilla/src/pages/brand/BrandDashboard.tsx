import React from 'react';
import { SmartNavbar } from '../../components/layout/Navbar';

const BrandDashboardPage: React.FC = () => {

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Brand Dashboard Header */}
        <SmartNavbar />        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Dashboard Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight text-left">Dashboard</p>
                <p className="text-[#617989] text-sm font-normal leading-normal text-left">Track your sponsorship performance and optimize your campaigns.</p>
              </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#f0f3f4]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Total Reach</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">150K+</p>
                <p className="text-[#078838] text-base font-medium leading-normal text-left">+15%</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#f0f3f4]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Engagement Rate</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">8.5%</p>
                <p className="text-[#e73908] text-base font-medium leading-normal text-left">-2%</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#f0f3f4]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">ROI</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">120%</p>
                <p className="text-[#078838] text-base font-medium leading-normal text-left">+10%</p>
              </div>
            </div>

            {/* Performance Overview */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Performance Overview</h2>
            <div className="flex flex-wrap gap-4 px-4 py-6">
              {/* Reach Over Time Chart */}
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#dbe1e6] p-6">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Reach Over Time</p>
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight truncate text-left">+12% from last month</p>
                <div className="flex gap-1">
                  <p className="text-[#617989] text-base font-normal leading-normal text-left">Last 3 Months</p>
                  <p className="text-[#078838] text-base font-medium leading-normal text-left">+12%</p>
                </div>
                <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
                  <svg width="100%" height="148" viewBox="-3 0 478 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                      fill="url(#paint0_linear_1131_5935)"
                    ></path>
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                      stroke="#617989"
                      strokeWidth="3"
                      strokeLinecap="round"
                    ></path>
                    <defs>
                      <linearGradient id="paint0_linear_1131_5935" x1="236" y1="1" x2="236" y2="149" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#f0f3f4"></stop>
                        <stop offset="1" stopColor="#f0f3f4" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="flex justify-around">
                    <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em] text-left">Jan</p>
                    <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em] text-left">Feb</p>
                    <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em] text-left">Mar</p>
                  </div>
                </div>
              </div>

              {/* Engagement by Event Chart */}
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#dbe1e6] p-6">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Engagement by Event</p>
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight truncate text-left">+5% from last month</p>
                <div className="flex gap-1">
                  <p className="text-[#617989] text-base font-normal leading-normal text-left">Last 3 Months</p>
                  <p className="text-[#078838] text-base font-medium leading-normal text-left">+5%</p>
                </div>
                <div className="grid min-h-[180px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3">
                  <div className="border-[#617989] bg-[#f0f3f4] border-t-2 w-full" style={{ height: '20%' }}></div>
                  <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em] text-left">Event A</p>
                  <div className="border-[#617989] bg-[#f0f3f4] border-t-2 w-full" style={{ height: '80%' }}></div>
                  <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em] text-left">Event B</p>
                  <div className="border-[#617989] bg-[#f0f3f4] border-t-2 w-full" style={{ height: '50%' }}></div>
                  <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em] text-left">Event C</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                <a className="text-[#617989] text-base font-normal leading-normal min-w-40 text-left" href="#">Terms of Service</a>
                <a className="text-[#617989] text-base font-normal leading-normal min-w-40 text-left" href="#">Privacy Policy</a>
              </div>
              <p className="text-[#617989] text-base font-normal leading-normal text-left">@2025 SponZilla. All rights reserved.</p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BrandDashboardPage;
