import React from 'react';
import { SmartNavbar } from '../components/layout/Navbar';

const ClubProfile: React.FC = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <SmartNavbar />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex p-4 @container">
              <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
                <div className="flex gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAgaZSpZoEXQy70pqSUHYrCv93Wgr7eiaa4WpYSkeZTLNaD4oJBX3cDIFn-41vBy5Ljek7EpVRIQf25jww6bmyixeUFNEt24T8l9CyCkjHxXKLPXCbzNa8WtkLRax1BjNBOtc34LpClD0z5ji5F22sMPsNN__p50ERX5YyrQohr7ZAw-asoWSLqpAr4NmvP7v0iH-Y7B7_9TlEdE2PUxN_tTS4hXf6x-ifd2Hfs71Fve-EnJ7-2sNHG3cD3pVrAgKKglXIjoAa5mfs")' }}
                  ></div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] text-left">Tech Innovators Club</p>
                    <p className="text-[#617989] text-base font-normal leading-normal text-left">Empowering students to explore and innovate in technology.</p>
                  </div>
                </div>
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px] @[480px]:w-auto">
                  <span className="truncate">Edit Profile</span>
                </button>
              </div>
            </div>
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">About Us</h2>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              The Tech Innovators Club is a vibrant community of students passionate about technology and innovation. We organize workshops, hackathons, and networking events to
              foster creativity and collaboration among our members. Our goal is to provide a platform for students to learn, experiment, and build impactful projects that address
              real-world challenges.
            </p>
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Contact Information</h2>
            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-5">
                <p className="text-[#617989] text-sm font-normal leading-normal text-left">Email</p>
                <p className="text-[#111518] text-sm font-normal leading-normal text-left">techinnovators@example.edu</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-5">
                <p className="text-[#617989] text-sm font-normal leading-normal text-left">Website</p>
                <p className="text-[#111518] text-sm font-normal leading-normal text-left">techinnovators.example.edu</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-5">
                <p className="text-[#617989] text-sm font-normal leading-normal text-left">Social Media</p>
                <p className="text-[#111518] text-sm font-normal leading-normal text-left">@techinnovators</p>
              </div>
            </div>
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Upcoming Events</h2>
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-xl">
                <div className="flex flex-col gap-1 flex-[2_2_0px]">
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">Oct 26, 2024</p>
                  <p className="text-[#111518] text-base font-bold leading-tight text-left">AI Hackathon</p>
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">Join us for a 24-hour hackathon focused on developing AI solutions.</p>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAVxosjfgSJ_yJaCRxytLZuC9UqeTDmfTgY397lFxFB7fm1YtxnD-LgyHp8TZ1C6fjf6Ynz00B0-T0ce3wEoHhLITWwzbDAesN7G4DHi2kUZPVJCK6KUTnREJ3-48jDX-Km1K7O0mF4vCMaL0rdfsQl3y1mb07yagaeA0a1zlxCsBAYsSmHc4G6pMDnsqIEf9EJ9Oaz6-2sJh6XQrqGeDDKSwoQpLnNvzbiKO0JowxpdVOoAQh1RTF2I7gvcbcZBV_gFWHP67HuCTI")' }}
                ></div>
              </div>
            </div>
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Past Events</h2>
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-xl">
                <div className="flex flex-col gap-1 flex-[2_2_0px]">
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">Sep 15, 2024</p>
                  <p className="text-[#111518] text-base font-bold leading-tight text-left">Robotics Workshop</p>
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">Hands-on workshop on building and programming robots.</p>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDslvP8yrQ082frQpdyF1Es8vTENyxqoRfpGggmqRHyMposu4_N60c7P9Wkg4f7ho-21RAKoabPS2josVw8q2M1nHE9LUfZMi6o2-Ng2JhscrO3h2_N6hiAKShMS4GnhorRIcU_UEKcQkqFMdF0MCI3eWo4vbw7hC-sJQHOkfRr7qvQbPBuwgjoKWa9U3wviQXciy0ptgsLZ8JzTpoX-0IqfSSGiqzAc23CU9fLV7MtnfkSEA_Zid_kq8B4KKwNx_YvJZkdxd3EhG8")' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProfile;
