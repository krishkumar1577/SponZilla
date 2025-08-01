import React from 'react';
import { useParams } from 'react-router-dom';

const ViewEvent: React.FC = () => {
  // const { eventId } = useParams<{ eventId: string }>();
  // Sample event data - in a real app, you'd fetch this based on eventId
  const eventData = {
    id: 1,
    name: 'Tech Conference',
    organizer: 'Computer Science Club',
    date: 'October 26, 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'Student Union Ballroom',
    expectedAttendance: '500+',
    description: 'The Tech Conference is an annual event organized by the Computer Science Club, bringing together students, faculty, and industry professionals for a day of learning, networking, and innovation. This year\'s conference will feature keynote speakers, workshops, and a career fair.'
  };

  const sponsorshipTiers = [
    {
      name: 'Bronze',
      price: '$500',
      benefits: [
        'Logo on event website',
        'Social media mention'
      ]
    },
    {
      name: 'Silver', 
      price: '$1,000',
      benefits: [
        'All Bronze benefits',
        'Booth at career fair',
        'Speaking slot'
      ]
    },
    {
      name: 'Gold',
      price: '$2,000', 
      benefits: [
        'All Silver benefits',
        'Keynote speaking slot',
        'Premium booth location'
      ]
    }
  ];

  const pastEventImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC3ccMPX69nkRnhKpMogD56tq1TotEw2R7CzBB2WIamPs28Q8kZWBOfY4pW1P4ineUKFSrWRH9a2t4vOC5lXk2kt5XWVKgRzMLsnTXxvQHR6-IsqD3lYb2GfpxoBoyG2zHq7yfoxaWCAItpjJ0BxR4t1jZuyCe3Lp0ANklD8I4KkCfkXg2JRefCurHGhVRka0L6Tw11M3UuJhPNBG1aoH_VNR7G2JaSUDvsBbU_Cc0z_LnT8B_RRblID9K58NCvKr_-mFol9-oUofE",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAHfMjs4387dt8VSB4Ixsrf6yffJVsSZcWJhmHyECS3pBD_tzexwCtcp4IHrMuW1Htg217EHNPLl6Re9kzdZN_OG5EvUpg9iLJrdUcHJE2VuKbrNW4P4Szn4sOmwH-wiK6izb-clj5EHGW7dMJkZMog-Os41bVnfCsm1Ei33BCjcu3FAoNBsuPUQJVb1fraxZVu_X8Ig5LwsGyqnoRmgEoGyUbaAFmlLXutdq3q3VTTGADe2JDHYvF1pCEYW9Pwq3sXxK6hcvu3Fuk",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBhW1gkOuPBduysbgE7boMQtsvbfLmO89XePO2UQogfNTA7JyclIicaIi6Q556m1y4CdcmmwTAAc_Y5ZW30WuhlDRh5qKqIaIdP0I6eU05KWw6jbEnVazCLhM7bUPidN7LuEXQJwVoulO06ir4NohPXj1rERtG_BceHOc94-IQ9zuELNPtu-HUQS-0ZcGURMWPDIlpzhKWflxSxOW52fkmJexewoNqOdPhf4GbsSJuRX4mtpqkrODfqYD5NyRHU4KFzZWyq9uGqXxk"
  ];

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-[#111518]">
              <div className="size-4">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em]">SponZilla</h2>
            </div>
            <div className="flex items-center gap-9">
              <a className="text-[#111518] text-sm font-medium leading-normal" href="#">Home</a>
              <a className="text-[#111518] text-sm font-medium leading-normal" href="#">Events</a>
              <a className="text-[#111518] text-sm font-medium leading-normal" href="#">Clubs</a>
              <a className="text-[#111518] text-sm font-medium leading-normal" href="#">Brands</a>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <label className="flex flex-col min-w-40 !h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <div
                  className="text-[#60768a] flex border-none bg-[#f0f2f5] items-center justify-center pl-4 rounded-l-xl border-r-0"
                  data-icon="MagnifyingGlass"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                    ></path>
                  </svg>
                </div>
                <input
                  placeholder="Search"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-full placeholder:text-[#60768a] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                />
              </div>
            </label>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f0f2f5] text-[#111518] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
              <div className="text-[#111518]" data-icon="Bell" data-size="20px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
                  ></path>
                </svg>
              </div>
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCuJEuC2-wUENINpqzdBkudXIMrSaOAsb1qxph80oh8tQkDMgofg8OZquW0yi3S-a3hqzAkvEGvDsx9UJmtjfhqJbzv-DWm3aM-m5O0_OOarg9-DuS2G4ZyC-NQ6Q1pAY3uNCJE4weZqlCkLvs6zeXAFtCGmxpydGq0L_STSIaL-xGTJ4tX8f4oFwWJD56MxtKwuLDJoVzuDwFr5TGY-1x5z06-BA7MogAviTq2qX210XGfclgb8H5H4Wq5CCLD9pCcmWgqkMHXxTI")' }}
            ></div>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 p-4">
              <a className="text-[#60768a] text-base font-medium leading-normal" href="#">Events</a>
              <span className="text-[#60768a] text-base font-medium leading-normal">/</span>
              <span className="text-[#111518] text-base font-medium leading-normal">{eventData.name}</span>
            </div>

            {/* Event Title */}
            <div className="flex flex-wrap justify-between gap-3 p-4 text-left">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight text-left">{eventData.name}</p>
                <p className="text-[#60768a] text-sm font-normal leading-normal text-left">Hosted by the {eventData.organizer}</p>
              </div>
            </div>

            {/* Event Details */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Event Details</h2>
            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6 text-left">
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-5">
                <p className="text-[#60768a] text-sm font-normal leading-normal text-left">Date</p>
                <p className="text-[#111518] text-sm font-normal leading-normal text-left">{eventData.date}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-5">
                <p className="text-[#60768a] text-sm font-normal leading-normal text-left">Time</p>
                <p className="text-[#111518] text-sm font-normal leading-normal text-left">{eventData.time}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-5">
                <p className="text-[#60768a] text-sm font-normal leading-normal text-left">Location</p>
                <p className="text-[#111518] text-sm font-normal leading-normal text-left">{eventData.location}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-5">
                <p className="text-[#60768a] text-sm font-normal leading-normal text-left">Expected Attendance</p>
                <p className="text-[#111518] text-sm font-normal leading-normal text-left">{eventData.expectedAttendance}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-5">
                <p className="text-[#60768a] text-sm font-normal leading-normal text-left">Organizer</p>
                <p className="text-[#111518] text-sm font-normal leading-normal text-left">{eventData.organizer}</p>
              </div>
            </div>

            {/* Description */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Description</h2>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              {eventData.description}
            </p>

            {/* Sponsorship Tiers */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Sponsorship Tiers</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(228px,1fr))] gap-2.5 px-4 py-3 @3xl:grid-cols-4 text-left">
              {sponsorshipTiers.map((tier, index) => (
                <div key={index} className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-[#dbe1e6] bg-white p-6 text-left">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-[#111518] text-base font-bold leading-tight text-left">{tier.name}</h1>
                    <span className="text-[#111518] text-4xl font-black leading-tight tracking-[-0.033em] text-left">{tier.price}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518] text-left">
                        <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                          </svg>
                        </div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Past Events */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Past Events</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {pastEventImages.map((imageUrl, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{ backgroundImage: `url("${imageUrl}")` }}
                  ></div>
                </div>
              ))}
            </div>

            {/* Express Interest Button */}
            <div className="flex px-4 py-3 justify-end">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-[#0b80ee] text-white text-base font-bold leading-normal tracking-[0.015em]"
                onClick={() => {
                  console.log(`Express interest for event: ${eventData.name}`);
                  // Handle express interest logic here
                }}
              >
                <span className="truncate">Express Interest</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEvent;
