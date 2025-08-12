import React, { useState } from 'react';
import { SmartNavbar } from '../../components/layout/Navbar';

const ClubDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <SmartNavbar />

        {/* Main Content */}
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[920px] flex-1">
            {/* Dashboard Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight min-w-72 text-left">Dashboard</p>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal">
                <span className="truncate">List Event</span>
              </button>
            </div>

            {/* Club Metrics */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Club Metrics</h2>
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Total Sponsorships Secured</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">12</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Total Funds Raised</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">$5,000</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Average Sponsorship Value</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">$416</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Event Attendance</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">2,500</p>
              </div>
            </div>

            {/* Chart Section */}
            <div className="flex flex-wrap gap-4 px-4 py-6">
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#dbe1e6] p-6">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Upcoming Sponsorship Opportunities</p>
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight truncate text-left">3</p>
                <div className="flex gap-1">
                  <p className="text-[#617989] text-base font-normal leading-normal text-left">Next 3 Months</p>
                  <p className="text-[#078838] text-base font-medium leading-normal text-left">+10%</p>
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
                    <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em] text-left">Jul</p>
                    <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em] text-left">Aug</p>
                    <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em] text-left">Sep</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="pb-3">
              <div className="flex border-b border-[#dbe1e6] px-4 gap-8">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                    activeTab === 'upcoming' 
                      ? 'border-b-[#111518] text-[#111518]' 
                      : 'border-b-transparent text-[#617989]'
                  }`}
                >
                  <p className={`text-sm font-bold leading-normal tracking-[0.015em] text-left ${
                    activeTab === 'upcoming' ? 'text-[#111518]' : 'text-[#617989]'
                  }`}>Upcoming Events</p>
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                    activeTab === 'past' 
                      ? 'border-b-[#111518] text-[#111518]' 
                      : 'border-b-transparent text-[#617989]'
                  }`}
                >
                  <p className={`text-sm font-bold leading-normal tracking-[0.015em] text-left ${
                    activeTab === 'past' ? 'text-[#111518]' : 'text-[#617989]'
                  }`}>Past Events</p>
                </button>
                <button
                  onClick={() => setActiveTab('drafts')}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                    activeTab === 'drafts' 
                      ? 'border-b-[#111518] text-[#111518]' 
                      : 'border-b-transparent text-[#617989]'
                  }`}
                >
                  <p className={`text-sm font-bold leading-normal tracking-[0.015em] text-left ${
                    activeTab === 'drafts' ? 'text-[#111518]' : 'text-[#617989]'
                  }`}>Drafts</p>
                </button>
              </div>
            </div>

            {/* Events Table */}
            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-xl border border-[#dbe1e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Event Name</th>
                      <th className="px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Date</th>
                      <th className="px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Location</th>
                      <th className="px-4 py-3 text-left text-[#111518] w-60 text-sm font-medium leading-normal">Status</th>
                      <th className="px-4 py-3 text-left text-[#617989] w-60 text-sm font-medium leading-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">CampusFest 2024</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">July 15, 2024</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">Student Union</td>
                      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Active</span>
                        </button>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-60 text-[#617989] text-sm font-bold leading-normal tracking-[0.015em] text-left">Manage</td>
                    </tr>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">TechTalk Series</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">August 22, 2024</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">Engineering Building</td>
                      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Active</span>
                        </button>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-60 text-[#617989] text-sm font-bold leading-normal tracking-[0.015em] text-left">Manage</td>
                    </tr>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">Charity Run</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">September 10, 2024</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">Campus Grounds</td>
                      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Active</span>
                        </button>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-60 text-[#617989] text-sm font-bold leading-normal tracking-[0.015em] text-left">Manage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="layout-content-container flex flex-col w-[360px]">
            {/* Manage Club Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Manage Club</h2>
            <div className="flex p-4">
              <div className="flex w-full flex-col gap-4 items-start">
                <div className="flex gap-4 flex-col items-start">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD9KViYfF9D-uDzqGGhmhrjPGHyJVAEpbkNCRoXADGErrV8bstUBCiLopZ5JSMMZSF9yLixw2Wi1kTnPcFVix3pI9BuE-bSyEYIcgX8XR-htefz_0s-kv7cGLw5IT_PnOU59Z_vR0OStcSFdCA399-YFogPw5gAq8lBqPIymIWplz59dZbiIZv4VIRSWy_aygzCOmbD1WzxPxgzvm82kTw3vDOw9sWVvNNU3ePPqj1c3AP2PKsrxs8u0t9eT9C9PA-tRkE_6bwJAqQ")' }}
                  ></div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] text-left">SponZilla Club</p>
                    <p className="text-[#617989] text-base font-normal leading-normal text-left">Student Organization</p>
                  </div>
                </div>
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px]">
                  <span className="truncate">Edit Profile</span>
                </button>
              </div>
            </div>

            {/* Manage Sponsors Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Manage Sponsors</h2>
            <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
              <p className="text-[#111518] text-base font-normal leading-normal flex-1 truncate text-left">Current Sponsors</p>
              <div className="shrink-0"><button className="text-base font-medium leading-normal">View</button></div>
            </div>
            <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
              <p className="text-[#111518] text-base font-normal leading-normal flex-1 truncate text-left">Potential Sponsors</p>
              <div className="shrink-0"><button className="text-base font-medium leading-normal">View</button></div>
            </div>
            <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
              <p className="text-[#111518] text-base font-normal leading-normal flex-1 truncate text-left">Sponsorship Requests</p>
              <div className="shrink-0"><button className="text-base font-medium leading-normal">View</button></div>
            </div>

            {/* Potential Sponsors Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Potential Sponsors</h2>
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-xl">
                <div className="flex flex-col gap-1 flex-[2_2_0px]">
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">Sponsored</p>
                  <p className="text-[#111518] text-base font-bold leading-tight text-left">Tech Solutions Inc.</p>
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">
                    Tech Solutions Inc. is a leading provider of innovative software solutions for businesses of all sizes.
                  </p>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDzEWrPTwWfEwrMeaHQrmd2VgQiPoJtAXseLyCCCR_uIZDUY7YCGYqqbV01PSkH3cG7sGb1dScyCELEQvrVFch-oIPCQlLPcG2iZKarIOIIITXeK-PHOcSq0oH4ADmV_N3P5zeDUQIBA5P9SWWCG6AudW6IPdgyRulC9tGwIz5Gk2fQiS_Wzy92KnNdJX7OKhTAWhahcSDXwvPViOiqVjy6ZXxAoEFJ-LkMYrlUpqOqybItDNhO-RJ_ght5GSC61Y28fjupAYSYW5g")' }}
                ></div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-xl">
                <div className="flex flex-col gap-1 flex-[2_2_0px]">
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">Sponsored</p>
                  <p className="text-[#111518] text-base font-bold leading-tight text-left">EduTech Innovations</p>
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">
                    EduTech Innovations is a company focused on developing cutting-edge educational tools and platforms.
                  </p>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCmkaHOw0-VFLo5HlqF_qka9TvB54_--17CB7I-f7UTtf6qi9hgSaK-gw9I8u4AwL9uSSkLXRYGdI7DE_t-fN0i4SnGkl93kZ6qQA0DEH91WNPgXBmyXKC7SVPotrudodjxZq7uqSE-7IjH1FcHhGbZfrbzlu3dZRmxa_c48HOND5lN8Odz6mxFh2pvFhbsGCYZ2z13upOwdxdS2qr80Rpdm9SeFvCvxlc6akSb5XqKhlssSf_-ESMlXb16GKzzKoP5nXPo3o8V6vI")' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDashboard;
