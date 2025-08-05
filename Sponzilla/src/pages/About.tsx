import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const AboutPage: React.FC = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Use existing Navbar component */}
        <Navbar />
        
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight min-w-72 text-left">About SponZilla</p>
            </div>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              SponZilla is a platform designed to bridge the gap between student organizations and brands seeking partnerships. Our mission is to empower student groups by
              providing them with the resources they need to thrive, while offering brands a unique opportunity to connect with a highly engaged and influential audience.
            </p>
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-4 pt-5 text-left">Our Vision</h2>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              We envision a campus ecosystem where student initiatives are fully supported, and brands can authentically engage with the student community. SponZilla aims to be
              the leading platform for campus sponsorships, fostering mutually beneficial relationships that drive innovation and growth.
            </p>
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Value Proposition</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe1e6] bg-white p-4 flex-col">
                <div className="text-[#111518]" data-icon="UsersThree" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#111518] text-base font-bold leading-tight">For Student Groups</h2>
                  <p className="text-[#617689] text-sm font-normal leading-normal">Access to funding, resources, and mentorship to support your events and initiatives.</p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe1e6] bg-white p-4 flex-col">
                <div className="text-[#111518]" data-icon="Megaphone" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M240,120a48.05,48.05,0,0,0-48-48H152.2c-2.91-.17-53.62-3.74-101.91-44.24A16,16,0,0,0,24,40V200a16,16,0,0,0,26.29,12.25c37.77-31.68,77-40.76,93.71-43.3v31.72A16,16,0,0,0,151.12,214l11,7.33A16,16,0,0,0,186.5,212l11.77-44.36A48.07,48.07,0,0,0,240,120ZM40,199.93V40h0c42.81,35.91,86.63,45,104,47.24v65.48C126.65,155,82.84,164.07,40,199.93Zm131,8,0,.11-11-7.33V168h21.6ZM192,152H160V88h32a32,32,0,1,1,0,64Z"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#111518] text-base font-bold leading-tight">For Brands</h2>
                  <p className="text-[#617689] text-sm font-normal leading-normal">Targeted marketing opportunities, brand visibility, and direct engagement with students.</p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe1e6] bg-white p-4 flex-col">
                <div className="text-[#111518]" data-icon="Handshake" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M119.76,217.94A8,8,0,0,1,112,224a8.13,8.13,0,0,1-2-.24l-32-8a8,8,0,0,1-2.5-1.11l-24-16a8,8,0,1,1,8.88-13.31l22.84,15.23,30.66,7.67A8,8,0,0,1,119.76,217.94Zm132.69-96.46a15.89,15.89,0,0,1-8,9.25l-23.68,11.84-55.08,55.09a8,8,0,0,1-7.6,2.1l-64-16a8.06,8.06,0,0,1-2.71-1.25L35.86,142.87,11.58,130.73a16,16,0,0,1-7.16-21.46L29.27,59.58h0a16,16,0,0,1,21.46-7.16l22.06,11,53-15.14a8,8,0,0,1,4.4,0l53,15.14,22.06-11a16,16,0,0,1,21.46,7.16l24.85,49.69A15.9,15.9,0,0,1,252.45,121.48Zm-46.18,12.94L179.06,80H147.24L104,122c12.66,8.09,32.51,10.32,50.32-7.63a8,8,0,0,1,10.68-.61l34.41,27.57Zm-187.54-18,17.69,8.85L61.27,75.58,43.58,66.73ZM188,152.66l-27.71-22.19c-19.54,16-44.35,18.11-64.91,5a16,16,0,0,1-2.72-24.82.6.6,0,0,1,.08-.08L137.6,67.06,128,64.32,77.58,78.73,50.21,133.46l49.2,35.15,58.14,14.53Zm49.24-36.24L212.42,66.73l-17.69,8.85,24.85,49.69Z"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#111518] text-base font-bold leading-tight">Mutual Benefits</h2>
                  <p className="text-[#617689] text-sm font-normal leading-normal">
                    SponZilla facilitates transparent and effective partnerships, ensuring value for all stakeholders.
                  </p>
                </div>
              </div>
            </div>
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-4 pt-5 text-left">Our Story</h2>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              Founded in 2023 by a group of passionate students and alumni, SponZilla was born out of a shared passion for supporting student success. We recognized the challenges student groups face
              in securing funding and the potential for brands to connect with this vibrant community. SponZilla is our solution to create a more connected and resourceful
              campus environment.
            </p>
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Meet the Team</h2>
            <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-stretch p-4 gap-8">
                <div className="flex h-full flex-1 flex-col gap-4 text-center rounded-lg min-w-32 pt-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center w-full"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZ8po12yf8kzvV6NH6l4g65f3ZmLqHFgkHQPCHOkkdnHagoNXMY5AX2Gy9IuArMvbGUv3LBZXbv-KbsKaGZOkZpuvvD3x969oHAKG56MXMXYPZ9XbbpLM24WbKOWbHlHp89V3MpSpreNzIERrIbrRjZnl3XS2fsQRGsK99ZbSULy0K3ni7jgg0mraLhg7jHTKpDdAt0kwidHtHAKrplNxYTmExWh-M6yxc95uYekt__VSFEpkMuWjHfjd9XlNfltutgMLr94K8aZw")' }}
                  ></div>
                  <div>
                    <p className="text-[#111518] text-base font-medium leading-normal">Krish</p>
                    <p className="text-[#617689] text-sm font-normal leading-normal">CEO</p>
                  </div>
                </div>
                {/* 
                <div className="flex h-full flex-1 flex-col gap-4 text-center rounded-lg min-w-32 pt-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center w-full"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAxkp29AQBCffwmWPYqRpXW2p53nYlgLaXi-FwUjdHJlhq4FKhMGapZzn5GYiiKpjYpmDYfiGfjFaMig5Cbi5m0-tbCNfUYC2Q-nQrLFmMYLeOhpf10TZdrZS_w2008jvdiLMJ--M7oY_pINrq-H92Euq1RwSHxUK1jaLRGszn4IblTMgyU6tTfuBReFfGjeRpENMGPsDeweVVFUKx3mAVbm9wMYxWGjNH6HO3gWA6zvboglIigi8oNJ66d-Wt4LAzMGrovGPWiyTE")' }}
                  ></div>
                  <div>
                    <p className="text-[#111518] text-base font-medium leading-normal">Sophia Bennett</p>
                    <p className="text-[#617689] text-sm font-normal leading-normal">Head of Partnerships</p>
                  </div>
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 text-center rounded-lg min-w-32 pt-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center w-full"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBsKDDjgaLimgkERbtF5A7IWLzo15PVjlkbXHfTafp6Dd9J56t3W4pClbmh4frDWcNcsH-qdrVB2W_N396_jOnHZEx2EWh4dEXAx19zT2qkKG5uxAY2v_gdIFjJus5yyN7BtK-J0aYKPtATKmkwD3mlA7kuK35oH18RLc8bqK8Car2W_SM6vQRXlfiwcgyh3OH6YSs8KpitLrcgnPIkxFRX8zTyAlcbXr0h9GH_I26G9z4cIieYHXxWUjY6nZZJaiUlkkag3St8qvg")' }}
                  ></div>
                  <div>
                    <p className="text-[#111518] text-base font-medium leading-normal">Liam Harper</p>
                    <p className="text-[#617689] text-sm font-normal leading-normal">Head of Technology</p>
                  </div>
                </div>
                */}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center">
              <div className="flex flex-wrap items-center justify-center gap-6 sm:flex-row sm:justify-around">
                <a className="text-[#617689] text-base font-normal leading-normal min-w-40" href="#">Privacy Policy</a>
                <a className="text-[#617689] text-base font-normal leading-normal min-w-40" href="#">Terms of Service</a>
                <Link to="/contact" className="text-[#617689] text-base font-normal leading-normal min-w-40">Contact Us</Link>
              </div>
              <p className="text-[#617689] text-base font-normal leading-normal">© 2025 SponZilla. All rights reserved.</p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
