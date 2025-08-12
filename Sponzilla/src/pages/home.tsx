import React from 'react';
import { Link } from 'react-router-dom';
import { SmartNavbar } from '../components/layout/Navbar';

const HomePage: React.FC = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <SmartNavbar />
        
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Hero Section */}
            <div>
              <div className="sm:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat sm:gap-8 sm:rounded-xl items-center justify-center p-4"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBqeIeP0kwi0by_Kq5Hi2HrqcjU9F8PfYTscCNcZ2oQNrWjEQP6WskvvbkWo27Nr8b0cLHW1Cn-MUsb7L5kVqptRS4PITH1M9A5AAXP122_4O3EDVMy2JTkRAdvv1SFTUWaQ6TwdgQvpAQ_1KPCSyeSF_qA4r17QPkKNVxozG9TdsiWSQPUedmoEs9F9JyjVO4_Xs8e9qQkmItX_YSlk8gu3VYisVAonZMpLrNVE-FIQQj0gVuY2ruDEMYImY80Xwdcu8YCQ4rc9HU")'
                  }}
                >
                  <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl sm:font-black sm:leading-tight sm:tracking-[-0.033em]">
                      Connect with Students on Campus
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal sm:text-base sm:font-normal sm:leading-normal">
                      CampusConnect is the leading platform for student clubs and brands to collaborate on events and sponsorships.
                    </h2>
                  </div>
                  <div className="flex-wrap gap-3 flex justify-center">
                    <Link to="/list-event" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 sm:h-12 sm:px-5 bg-[#dce8f3] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em] sm:text-base sm:font-bold sm:leading-normal sm:tracking-[0.015em]">
                      <span className="truncate">List Your Event</span>
                    </Link>
                    <Link to="/browse-events" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 sm:h-12 sm:px-5 bg-[#f1f2f4] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em] sm:text-base sm:font-bold sm:leading-normal sm:tracking-[0.015em]">
                      <span className="truncate">Find Events</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* For Clubs Section */}
            <div className="flex flex-col gap-10 px-4 py-10">
              <div className="flex flex-col gap-4 text-center">
                <h1 className="text-[#121416] tracking-light text-[32px] font-bold leading-tight sm:text-4xl sm:font-black sm:leading-tight sm:tracking-[-0.033em] max-w-[720px] mx-auto">
                  For Clubs
                </h1>
                <p className="text-[#121416] text-base font-normal leading-normal max-w-[720px] mx-auto">Connect with brands and secure sponsorships for your events.</p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#dde1e3] bg-white p-4 flex-col">
                  <div className="text-[#121416]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#121416] text-base font-bold leading-tight">Reach a Wider Audience</h2>
                    <p className="text-[#6a7681] text-sm font-normal leading-normal">Promote your events to a broader audience of students and brands.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#dde1e3] bg-white p-4 flex-col">
                  <div className="text-[#121416]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,1,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136A23.76,23.76,0,0,1,171.16,150.45Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#121416] text-base font-bold leading-tight">Streamline Event Planning</h2>
                    <p className="text-[#6a7681] text-sm font-normal leading-normal">Simplify event logistics and coordination with our intuitive platform.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#dde1e3] bg-white p-4 flex-col">
                  <div className="text-[#121416]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M128,88a40,40,0,1,0,40,40A40,40,0,0,0,128,88Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,152ZM240,56H16a8,8,0,0,0-8,8V192a8,8,0,0,0,8,8H240a8,8,0,0,0,8-8V64A8,8,0,0,0,240,56ZM193.65,184H62.35A56.78,56.78,0,0,0,24,145.65v-35.3A56.78,56.78,0,0,0,62.35,72h131.3A56.78,56.78,0,0,0,232,110.35v35.3A56.78,56.78,0,0,0,193.65,184ZM232,93.37A40.81,40.81,0,0,1,210.63,72H232ZM45.37,72A40.81,40.81,0,0,1,24,93.37V72ZM24,162.63A40.81,40.81,0,0,1,45.37,184H24ZM210.63,184A40.81,40.81,0,0,1,232,162.63V184Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#121416] text-base font-bold leading-tight">Secure Funding</h2>
                    <p className="text-[#6a7681] text-sm font-normal leading-normal">Access funding opportunities and resources to support your club's activities.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Brands Section */}
            <div className="flex flex-col gap-10 px-4 py-10">
              <div className="flex flex-col gap-4 text-center">
                <h1 className="text-[#121416] tracking-light text-[32px] font-bold leading-tight sm:text-4xl sm:font-black sm:leading-tight sm:tracking-[-0.033em] max-w-[720px] mx-auto">
                  For Brands
                </h1>
                <p className="text-[#121416] text-base font-normal leading-normal max-w-[720px] mx-auto">Engage with students and build brand awareness on campus.</p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#dde1e3] bg-white p-4 flex-col">
                  <div className="text-[#121416]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-24.88-13.32L39.12,72A16,16,0,0,0,32,85.34V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96V208H144V96ZM48,85.34,128,32V208H48ZM112,112v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm-32,0v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm0,56v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Zm32,0v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#121416] text-base font-bold leading-tight">Targeted Marketing</h2>
                    <p className="text-[#6a7681] text-sm font-normal leading-normal">Reach your target audience of college students through relevant events.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#dde1e3] bg-white p-4 flex-col">
                  <div className="text-[#121416]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#121416] text-base font-bold leading-tight">Authentic Engagement</h2>
                    <p className="text-[#6a7681] text-sm font-normal leading-normal">Connect with students in a genuine and impactful way through campus events.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#dde1e3] bg-white p-4 flex-col">
                  <div className="text-[#121416]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,1,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136A23.76,23.76,0,0,1,171.16,150.45Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#121416] text-base font-bold leading-tight">Event Sponsorships</h2>
                    <p className="text-[#6a7681] text-sm font-normal leading-normal">Sponsor events that align with your brand values and marketing objectives.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center">
              <div className="flex flex-wrap items-center justify-center gap-6 sm:flex-row sm:justify-around">
                <Link className="text-[#6a7681] text-base font-normal leading-normal min-w-40" to="/about">About</Link>
                <Link to="/contact" className="text-[#617689] text-base font-normal leading-normal min-w-40">Contact Us</Link>
                <Link to="/privacy-policy" className="text-[#6a7681] text-base font-normal leading-normal min-w-40">Privacy Policy</Link>
                <Link to="/terms-of-service" className="text-[#6a7681] text-base font-normal leading-normal min-w-40">Terms of Service</Link>
              </div>
              <p className="text-[#6a7681] text-base font-normal leading-normal">© 2025 Krish. All rights reserved.</p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
