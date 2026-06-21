import React from 'react';
import { Link } from 'react-router-dom';
import SmartNavbar from '../../components/layout/SmartNavbar';

const BrandLanding: React.FC = () => {
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
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBh20d-Cfzmhgt-7gF7evFGNR-65lFh9xjnioyxghJUCHD8RP065D46W6x908ViD6URhCw7L1J-iXUuIhAfk-UGn8lzT1v_8AMsGdHAdFqQLwmUMnS2xtxKcoQxHwXRHF0Ohri9r78mcw6h7SqnS7jURwLRAONfAt081cMaQ7mB5sYRSk4eKLSHrLxoNJRn7bSOy7EgR7gifFOyAdGjdURfq9tLuvTuz824LUyWapddF5mMxjUy_X2NHdwqZOR81vGoBsVooc7Ohf0")'
                  }}
                >
                  <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                      Connect with the Next Generation
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Reach a highly engaged student audience through targeted sponsorships of campus clubs and events.
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

            {/* Benefits Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Why Sponsor Student Clubs?</h2>
            <div className="flex flex-col gap-10 px-4 py-10 @container">
              <div className="flex flex-col gap-4 text-left">
                <h1 className="text-[#111518] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                  Benefits for Brands
                </h1>
                <p className="text-[#111518] text-base font-normal leading-normal max-w-[720px]">
                  Sponsoring student clubs and events offers a unique opportunity to connect with a valuable demographic.
                </p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe1e6] bg-white p-4 flex-col">
                  <div className="text-[#111518]" data-icon="Users" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#111518] text-base font-bold leading-tight text-left">Targeted Marketing</h2>
                    <p className="text-[#617989] text-sm font-normal leading-normal text-left">Reach a specific student demographic based on interests, majors, and activities.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe1e6] bg-white p-4 flex-col">
                  <div className="text-[#111518]" data-icon="Calendar" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136A23.76,23.76,0,0,1,171.16,150.45Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#111518] text-base font-bold leading-tight text-left">Brand Building</h2>
                    <p className="text-[#617989] text-sm font-normal leading-normal text-left">Increase brand awareness and loyalty among a key future consumer base.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe1e6] bg-white p-4 flex-col">
                  <div className="text-[#111518]" data-icon="PresentationChart" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,136H40V56H216V176ZM104,120v24a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32-16v40a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32-16v56a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#111518] text-base font-bold leading-tight text-left">Recruitment Opportunities</h2>
                    <p className="text-[#617989] text-sm font-normal leading-normal text-left">Gain access to talented students for internships and entry-level positions.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">How SponZilla Works</h2>
            <div className="flex flex-col gap-10 px-4 py-10 @container">
              <div className="flex flex-col gap-4 text-left">
                <h1 className="text-[#111518] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                  Our Platform
                </h1>
                <p className="text-[#111518] text-base font-normal leading-normal max-w-[720px]">
                  SponZilla simplifies the sponsorship process, connecting brands with relevant student organizations.
                </p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{
                      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD2jJbQ6Lzw794BV_MMwn4Uy2EBOQPrlghAhVxxwL7dDjP1dw_DQcw3tSOdBGaJHlKpELJvTSQvJd9CaGaFOvMwZTyGgcyxd3AHWvIpI30Oe5_RDpoHg1_CR_Sxu0YVoGDbjhu8lIJ-a7W4zF5-plvhl7gOcutCNcWG1x6Kzs3EdSrtDRS9VmMv_0QMvpwFdNiZvXoM2aqIJ6jXexrMXAaSxw_hSXvbJRDoY4IibsNj0aWVX3hXumDoNLEdf1cpf_qYcLSCjvPrHiY")'
                    }}
                  ></div>
                  <div>
                    <p className="text-[#111518] text-base font-medium leading-normal text-left">Browse Opportunities</p>
                    <p className="text-[#617989] text-sm font-normal leading-normal text-left">Explore a wide range of sponsorship opportunities from various student clubs and events.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{
                      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAKgBgqcaIEiuFIs814WiQKtjmiURTQLHl9pgnajRxGmzeqSrhpMpPtv5SXbRQUhimsEqOGlF2rH7uUHj2Xtes66h7Fe8xgeDEp30l4Na51ZCaHk_3GaAkZxuHQWwQJbnBZMUGUhg8leG9IR2zZ-H-YIELgOcCgGsR6azijCDNqNn-uP8crz7nP9kSoCVxnqXVudjn8Ws29a0j7UJ90Uuuw-wGNEb8IGiZaLW5RiwFDmTL6quh8JNPukrnS-gI5GxeNRi5ASUbiCic")'
                    }}
                  ></div>
                  <div>
                    <p className="text-[#111518] text-base font-medium leading-normal text-left">Connect with Clubs</p>
                    <p className="text-[#617989] text-sm font-normal leading-normal text-left">Easily connect with club leaders to discuss sponsorship details and negotiate terms.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{
                      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCiELH2NpCpFPTRMzVJp1VljRdgcdb3wAeWbcmK6Vbq21zH-45lKbsUl_2RSJfks1aGsC4NKPY4eniaY28_GhqnnOTEOn4XMgqe9-agDk4G5i4UDai3v0P5luV_ivtkOLsNTz8oF2Zy3a2kXZBxx1neBhmr2rD-dL8TkB-J11GUw7Aq46ZbbqDld5eqoAKMhbWAucvvW2dIuIcFbjN2uf5e_7hbQbfEF0VKDeko3r_jlnk2ZBhb6-AqkwhVz1QCjk9UXg5zSisCHEs")'
                    }}
                  ></div>
                  <div>
                    <p className="text-[#111518] text-base font-medium leading-normal text-left">Track Your Impact</p>
                    <p className="text-[#617989] text-sm font-normal leading-normal text-left">Monitor the performance of your sponsorships and measure your return on investment.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Stories Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Success Stories</h2>
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-xl">
                <div className="flex flex-col gap-1 flex-[2_2_0px]">
                  <p className="text-[#111518] text-base font-bold leading-tight text-left">TechCorp Partners with Computer Science Club</p>
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">
                    TechCorp sponsored a hackathon organized by the Computer Science Club, resulting in increased brand visibility and valuable recruitment leads.
                  </p>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC0dnnbhKad2mlhH_G2XjQrzrQkVItyir9ZN5vC96kyJIgmYJ7O0z9XDO2AR_GMx4dK46fdGI2LDIKQPSQBsNv9-8DcnTUnypb6jHDASPD3FDPsKNqNM7oTeZlB2q4TFcNVNa9zw3Mk7yP2Ti27uMjJDRh5P-mCLTPI3VSv1s8lquVcE_xuMrcWDtjKN53YuyjMsqnvCHCw5JasXMlYXITiqmRcArfcOvsxwPpw-jxUblFHLweJD55M6R7aldlTQZEQCpzPIOH4paY")'
                  }}
                ></div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-xl">
                <div className="flex flex-col gap-1 flex-[2_2_0px]">
                  <p className="text-[#111518] text-base font-bold leading-tight text-left">FashionForward Sponsors Fashion Show</p>
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">
                    FashionForward sponsored the annual fashion show, gaining exposure to a large audience of fashion-conscious students and generating social media buzz.
                  </p>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCln3lYCpwRdMge8enij_1pAy0GuRnxDWxMa12u1h2mxVwLBFJHrBuQ0RXK4xLtt3meDU92KYhWwJ0QkmkJjOLEeUxE15Joowfk-9NMcaSgN4DtZygwi5jtITIVq7V2Daqhy41RCPu-FoHhK10uthL1bI8OpIY76NEHqKFloCiFMyds-Xtt80DTy-QZDt5VNcwHwCwBruSwY1QjlZv7Zjf2-2iwouIqTG8Oxg-3lPwqo6pfZCy4Ammx-euJR92fhyBJivLGyvM9K_k")'
                  }}
                ></div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="@container">
              <div className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-[#111518] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px] mx-auto">
                    Ready to Connect with Students?
                  </h1>
                  <p className="text-[#111518] text-base font-normal leading-normal max-w-[720px] mx-auto">
                    Join SponZilla today and start building meaningful relationships with the next generation of consumers.
                  </p>
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

export default BrandLanding;
