import React from 'react';
import { Link } from 'react-router-dom';
import SmartNavbar from '../../components/layout/SmartNavbar';

const ClubLanding: React.FC = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <SmartNavbar />
        
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            
            {/* Hero Section */}
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbeRUwg5t3-FAktff3_rIJJ4FwQnfc-YSQwGq7Dmeop98arN7DeEUEWNq8smHv97c7kpsO2mgX9I-YgzduwoMHbiHfyc22MbwhRSy3wJ_7g_WARwsIDBl3HuQI2eFCghd8o9PoZMT_49FylGg_IX4skpiEvUAasCdAUzNytcvOyDGS-vVgiFxvgfzhnFKTmYJw0pVzSyg0c5CMmAzh0tiS5Cm5MIAnSoqgzq6d5cup8p8P6uJ2oIlKSUQ3VDAugnodtY_4HKNWIf0")'
                  }}
                >
                  <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                      Empower Your Club with Sponsorships
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Connect with leading brands and secure funding for your events and initiatives. SponZilla helps student organizations thrive.
                    </h2>
                  </div>
                  <Link
                    to="/browse-events"
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#118ee8] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                  >
                    <span className="truncate">Get Started</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Who Can Benefit Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Who Can Benefit?</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe1e6] bg-white p-4 flex-col">
                <div className="text-[#111518]" data-icon="Users" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#111518] text-base font-bold leading-tight text-left">Academic Clubs</h2>
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">
                    From debate teams to engineering societies, we support clubs focused on academic excellence and professional development.
                  </p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe1e6] bg-white p-4 flex-col">
                <div className="text-[#111518]" data-icon="Users" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#111518] text-base font-bold leading-tight text-left">Social Clubs</h2>
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">Enhance your social events and community engagement with the backing of top brands.</p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe1e6] bg-white p-4 flex-col">
                <div className="text-[#111518]" data-icon="Users" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#111518] text-base font-bold leading-tight text-left">Sports Clubs</h2>
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">Secure sponsorships to fund your team's travel, equipment, and training needs.</p>
                </div>
              </div>
            </div>

            {/* How It Works Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">How It Works</h2>
            <div className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
              <div className="flex flex-col items-center gap-1 pt-3">
                <div className="text-[#111518]" data-icon="TextHThree" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M152,56V176a8,8,0,0,1-16,0V124H48v52a8,8,0,0,1-16,0V56a8,8,0,0,1,16,0v52h88V56a8,8,0,0,1,16,0Zm73.52,90.63,21-30A8,8,0,0,0,240,104H192a8,8,0,0,0,0,16h32.63l-19.18,27.41A8,8,0,0,0,212,160a20,20,0,1,1-14.29,34,8,8,0,1,0-11.42,11.19A36,36,0,0,0,248,180,36.07,36.07,0,0,0,225.52,146.63Z"></path>
                  </svg>
                </div>
                <div className="w-[1.5px] bg-[#dbe1e6] h-2 grow"></div>
              </div>
              <div className="flex flex-1 flex-col py-3">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Create Your Club Profile</p>
                <p className="text-[#617989] text-base font-normal leading-normal text-left">Showcase your club's mission, activities, and audience reach.</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-[1.5px] bg-[#dbe1e6] h-2"></div>
                <div className="text-[#111518]" data-icon="TextHThree" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M152,56V176a8,8,0,0,1-16,0V124H48v52a8,8,0,0,1-16,0V56a8,8,0,0,1,16,0v52h88V56a8,8,0,0,1,16,0Zm73.52,90.63,21-30A8,8,0,0,0,240,104H192a8,8,0,0,0,0,16h32.63l-19.18,27.41A8,8,0,0,0,212,160a20,20,0,1,1-14.29,34,8,8,0,1,0-11.42,11.19A36,36,0,0,0,248,180,36.07,36.07,0,0,0,225.52,146.63Z"></path>
                  </svg>
                </div>
                <div className="w-[1.5px] bg-[#dbe1e6] h-2 grow"></div>
              </div>
              <div className="flex flex-1 flex-col py-3">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Browse Sponsorship Opportunities</p>
                <p className="text-[#617989] text-base font-normal leading-normal text-left">Explore a wide range of sponsorship opportunities from brands eager to connect with students.</p>
              </div>
              <div className="flex flex-col items-center gap-1 pb-3">
                <div className="w-[1.5px] bg-[#dbe1e6] h-2"></div>
                <div className="text-[#111518]" data-icon="TextHThree" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M152,56V176a8,8,0,0,1-16,0V124H48v52a8,8,0,0,1-16,0V56a8,8,0,0,1,16,0v52h88V56a8,8,0,0,1,16,0Zm73.52,90.63,21-30A8,8,0,0,0,240,104H192a8,8,0,0,0,0,16h32.63l-19.18,27.41A8,8,0,0,0,212,160a20,20,0,1,1-14.29,34,8,8,0,1,0-11.42,11.19A36,36,0,0,0,248,180,36.07,36.07,0,0,0,225.52,146.63Z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex flex-1 flex-col py-3">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Secure Funding and Resources</p>
                <p className="text-[#617989] text-base font-normal leading-normal text-left">Gain access to funding, resources, and mentorship to elevate your club's impact.</p>
              </div>
            </div>

            {/* Success Stories Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Success Stories</h2>
            <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-stretch p-4 gap-3">
                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col bg-gradient-to-r from-blue-400 to-blue-600"></div>
                  <div>
                    <p className="text-[#111518] text-base font-medium leading-normal text-left">The Debate Society</p>
                    <p className="text-[#617989] text-sm font-normal leading-normal text-left">Secured funding for national competitions and workshops.</p>
                  </div>
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col bg-gradient-to-r from-green-400 to-green-600"></div>
                  <div>
                    <p className="text-[#111518] text-base font-medium leading-normal text-left">The Social Club</p>
                    <p className="text-[#617989] text-sm font-normal leading-normal text-left">Elevated their annual festival with brand partnerships.</p>
                  </div>
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col bg-gradient-to-r from-purple-400 to-purple-600"></div>
                  <div>
                    <p className="text-[#111518] text-base font-medium leading-normal text-left">The Soccer Team</p>
                    <p className="text-[#617989] text-sm font-normal leading-normal text-left">Funded their travel to regional tournaments and purchased new equipment.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="@container">
              <div className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-[#111518] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px] mx-auto">
                    Ready to Take Your Club to the Next Level?
                  </h1>
                </div>
                <div className="flex flex-1 justify-center">
                  <div className="flex justify-center">
                    <Link
                      to="/login"
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#118ee8] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] grow"
                    >
                      <span className="truncate">Get Started</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubLanding;
