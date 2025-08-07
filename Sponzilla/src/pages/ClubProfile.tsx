import React from 'react';
import { Link } from 'react-router-dom';

const ClubProfile: React.FC = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f3f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111518]">
            <Link to="/" className="flex items-center gap-4 cursor-pointer">
              <div className="size-4">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em]">SponZilla</h2>
            </Link>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <Link to="/club-dashboard" className="text-[#111518] text-sm font-medium leading-normal text-left">Dashboard</Link>
              <Link to="/find-brands" className="text-[#111518] text-sm font-medium leading-normal text-left">Find Brands</Link>
              <Link to="/ai-pitch-deck" className="text-[#111518] text-sm font-medium leading-normal text-left">AI Pitch Deck Generator</Link>
            </div>
            <div className="flex gap-2">
              <Link to="/messages" className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f0f3f4] text-[#111518] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                <div className="text-[#111518]" data-icon="ChatCircleDots" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                  </svg>
                </div>
              </Link>
              <Link to="/help" className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f0f3f4] text-[#111518] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                <div className="text-[#111518]" data-icon="Question" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                  </svg>
                </div>
              </Link>
            </div>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA08A1tfgaYnkVc1l1HJ2Y1yOjyi0GCNIIhxsEtXcMyX2tw6nb3pof_rhTXUaae-Q0WDb3BmPnF3iSmicmc4t5BgE0t_oyN6mrjuSYo3uwgI-_FiGxWSqEwoODPsIV534EizOyqX3I0HxCTx2Uwav-mbHjvASDLCrzVTkVhC36gCV17BUVnRqMiPz23d9sGHirB4woO6EOW520x8fzSLKKYYu1cYpj8ipfgaAyf2Ev25xbYo70HdRgy8r501RLRHRn0RY1xDTdZgC8")' }}
            ></div>
          </div>
        </header>
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
