import React from 'react';
import { SmartNavbar } from '../components/layout/Navbar';

const Messages: React.FC = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{fontFamily: 'Inter, "Noto Sans", sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
        <SmartNavbar />
        <div className="flex flex-1 items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4 max-w-md text-center px-4">
            <div className="w-16 h-16 rounded-full bg-[#f0f3f4] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#617989" viewBox="0 0 256 256">
                <path d="M216,48H40A16,16,0,0,0,24,64V224a15.84,15.84,0,0,0,9.25,14.5A16.05,16.05,0,0,0,40,240a15.89,15.89,0,0,0,10.25-3.78.69.69,0,0,0,.13-.11L82.5,208H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM40,224h0ZM216,192H82.5a16,16,0,0,0-10.25,3.78.69.69,0,0,0-.13.11L40,224V64H216Z" />
              </svg>
            </div>
            <h2 className="text-[#111518] text-2xl font-bold leading-tight">Messages Coming Soon</h2>
            <p className="text-[#617989] text-base leading-normal">
              We're building a messaging system so clubs and brands can communicate directly on the platform. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
