import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BrandDashboardPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Brand Dashboard Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f3f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111518]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em]">SponZilla</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <Link to="/browse-events" className="text-[#111518] text-sm font-medium leading-normal">Event Browser</Link>
              <Link to="/find-clubs" className="text-[#111518] text-sm font-medium leading-normal">Find Clubs</Link>
              <Link to="/brand-dashboard" className="text-[#111518] text-sm font-medium leading-normal">Analytics Dashboard</Link>
            </div>
            <div className="flex gap-2">
              <Link to="/messages" className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f0f3f4] text-[#111518] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                <div className="text-[#111518]" data-icon="ChatCircleDots" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                  </svg>
                </div>
              </Link>
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f0f3f4] text-[#111518] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                <div className="text-[#111518]" data-icon="Question" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                  </svg>
                </div>
              </button>
            </div>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCanujA-hYauxn7UOxEnRuAOBOGGHlSFrhJUNhwNXcl5X95OIFQAZudPUYMixDbuQM8suLs726Zo_B5B1QA6nq5WY0hqUxLQeCYztr2UXCAGK4WjdagCfjo_3pcjfE7QWae-YqdfJcx7fqhXrpNP7tC82R7LlOUJkq_5PkLW_SkZ9NX5QMV14oPQiXITX2PeC9iJNRpjOrwDBZFxmlW3J2CTNSiLkkTeB3bhm_Fuy_i6YY2pxfYY8Qi_t8QXCwnh0fcZAr4X2fJg-U")' }}
            ></div>
          </div>
        </header>

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Dashboard Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight text-left">Dashboard</p>
                <p className="text-[#617989] text-sm font-normal leading-normal">Track your sponsorship performance and optimize your campaigns.</p>
              </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#f0f3f4]">
                <p className="text-[#111518] text-base font-medium leading-normal">Total Reach</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight">150K+</p>
                <p className="text-[#078838] text-base font-medium leading-normal">+15%</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#f0f3f4]">
                <p className="text-[#111518] text-base font-medium leading-normal">Engagement Rate</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight">8.5%</p>
                <p className="text-[#e73908] text-base font-medium leading-normal">-2%</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#f0f3f4]">
                <p className="text-[#111518] text-base font-medium leading-normal">ROI</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight">120%</p>
                <p className="text-[#078838] text-base font-medium leading-normal">+10%</p>
              </div>
            </div>

            {/* Performance Overview */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Performance Overview</h2>
            <div className="flex flex-wrap gap-4 px-4 py-6">
              {/* Reach Over Time Chart */}
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#dbe1e6] p-6">
                <p className="text-[#111518] text-base font-medium leading-normal">Reach Over Time</p>
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight truncate">+12% from last month</p>
                <div className="flex gap-1">
                  <p className="text-[#617989] text-base font-normal leading-normal">Last 3 Months</p>
                  <p className="text-[#078838] text-base font-medium leading-normal">+12%</p>
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
                    <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em]">Jan</p>
                    <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em]">Feb</p>
                    <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em]">Mar</p>
                  </div>
                </div>
              </div>

              {/* Engagement by Event Chart */}
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#dbe1e6] p-6">
                <p className="text-[#111518] text-base font-medium leading-normal">Engagement by Event</p>
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight truncate">+5% from last month</p>
                <div className="flex gap-1">
                  <p className="text-[#617989] text-base font-normal leading-normal">Last 3 Months</p>
                  <p className="text-[#078838] text-base font-medium leading-normal">+5%</p>
                </div>
                <div className="grid min-h-[180px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3">
                  <div className="border-[#617989] bg-[#f0f3f4] border-t-2 w-full" style={{ height: '20%' }}></div>
                  <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em]">Event A</p>
                  <div className="border-[#617989] bg-[#f0f3f4] border-t-2 w-full" style={{ height: '80%' }}></div>
                  <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em]">Event B</p>
                  <div className="border-[#617989] bg-[#f0f3f4] border-t-2 w-full" style={{ height: '50%' }}></div>
                  <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em]">Event C</p>
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
                <a className="text-[#617989] text-base font-normal leading-normal min-w-40" href="#">Terms of Service</a>
                <a className="text-[#617989] text-base font-normal leading-normal min-w-40" href="#">Privacy Policy</a>
              </div>
              <p className="text-[#617989] text-base font-normal leading-normal">@2025 SponZilla. All rights reserved.</p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BrandDashboardPage;
