import React, { useState } from 'react';

import Navbar from '../components/layout/Navbar';

// Reusable CaretDown Icon Component
const CaretDownIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
  </svg>
);

const Help: React.FC = () => {
  const [helpSearchValue, setHelpSearchValue] = useState('');

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{fontFamily: 'Inter, "Noto Sans", sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight text-left">Help Center</p>
                <p className="text-[#617889] text-sm font-normal leading-normal text-left">Find answers to common questions or contact support for assistance.</p>
              </div>
            </div>
            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div
                    className="text-[#617889] flex border-none bg-[#f0f3f4] items-center justify-center pl-4 rounded-l-lg border-r-0"
                    data-icon="MagnifyingGlass"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </div>
                  <input
                    placeholder="Search for answers"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] focus:border-none h-full placeholder:text-[#617889] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    value={helpSearchValue}
                    onChange={(e) => setHelpSearchValue(e.target.value)}
                  />
                </div>
              </label>
            </div>
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Frequently Asked Questions</h2>
            <div className="flex flex-col p-4 gap-3">
              <details className="flex flex-col rounded-lg border border-[#dbe1e6] bg-white px-[15px] py-[7px] group" open>
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                  <p className="text-[#111518] text-sm font-medium leading-normal text-left">Account Management</p>
                  <div className="text-[#111518] group-open:rotate-180" data-icon="CaretDown" data-size="20px" data-weight="regular">
                    <CaretDownIcon />
                  </div>
                </summary>
                <p className="text-[#617889] text-sm font-normal leading-normal pb-2 text-left">
                  To manage your account, navigate to your profile settings. Here, you can update your personal information, change your password, and manage your notification
                  preferences. If you encounter any issues, please contact our support team for assistance.
                </p>
              </details>
              <details className="flex flex-col rounded-lg border border-[#dbe1e6] bg-white px-[15px] py-[7px] group">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                  <p className="text-[#111518] text-sm font-medium leading-normal text-left">Sponsorship Process</p>
                  <div className="text-[#111518] group-open:rotate-180" data-icon="CaretDown" data-size="20px" data-weight="regular">
                    <CaretDownIcon />
                  </div>
                </summary>
                <p className="text-[#617889] text-sm font-normal leading-normal pb-2 text-left">
                  The sponsorship process involves several steps. First, create a detailed proposal outlining your event or initiative. Next, submit your proposal through the
                  platform. Brands will review your proposal and may contact you for further discussion. Once a sponsorship is agreed upon, finalize the terms and conditions.
                </p>
              </details>
              <details className="flex flex-col rounded-lg border border-[#dbe1e6] bg-white px-[15px] py-[7px] group">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                  <p className="text-[#111518] text-sm font-medium leading-normal text-left">Event Listing</p>
                  <div className="text-[#111518] group-open:rotate-180" data-icon="CaretDown" data-size="20px" data-weight="regular">
                    <CaretDownIcon />
                  </div>
                </summary>
                <p className="text-[#617889] text-sm font-normal leading-normal pb-2 text-left">
                  To list an event, go to the 'Events' section and click 'Create Event'. Fill in all the required details, including event name, description, date, time, location,
                  and any relevant images or attachments. Once submitted, your event will be reviewed and, upon approval, will be visible to all users.
                </p>
              </details>
              <details className="flex flex-col rounded-lg border border-[#dbe1e6] bg-white px-[15px] py-[7px] group">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                  <p className="text-[#111518] text-sm font-medium leading-normal text-left">Platform Features</p>
                  <div className="text-[#111518] group-open:rotate-180" data-icon="CaretDown" data-size="20px" data-weight="regular">
                    <CaretDownIcon />
                  </div>
                </summary>
                <p className="text-[#617889] text-sm font-normal leading-normal pb-2 text-left">
                  Our platform offers a range of features to enhance your experience. These include a comprehensive search function, personalized recommendations, direct messaging
                  with brands, event management tools, and detailed analytics to track your performance.
                </p>
              </details>
              <details className="flex flex-col rounded-lg border border-[#dbe1e6] bg-white px-[15px] py-[7px] group">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                  <p className="text-[#111518] text-sm font-medium leading-normal text-left">Contact Support</p>
                  <div className="text-[#111518] group-open:rotate-180" data-icon="CaretDown" data-size="20px" data-weight="regular">
                    <CaretDownIcon />
                  </div>
                </summary>
                <p className="text-[#617889] text-sm font-normal leading-normal pb-2 text-left">
                  If you need further assistance, you can contact our support team through the 'Contact Support' section or the Contact page. Fill out the form with your query, and our team will
                  respond as soon as possible.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
