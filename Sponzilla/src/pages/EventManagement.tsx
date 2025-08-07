import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EventManagement: React.FC = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventLocationDetails, setEventLocationDetails] = useState('');

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
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
              <Link to="/club-dashboard" className="text-[#111518] text-sm font-medium leading-normal">Dashboard</Link>
              <Link to="/find-brands" className="text-[#111518] text-sm font-medium leading-normal">Find Brands</Link>
              <Link to="/ai-pitch-deck" className="text-[#111518] text-sm font-medium leading-normal">AI Pitch Deck Generator</Link>
            </div>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f0f3f4] text-[#111518] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
              <div className="text-[#111518]" data-icon="Bell" data-size="20px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
                </svg>
              </div>
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBH-_q8D31A0x-cKp5hR1Nd9fQdeKi6-mvNUqz4b5nxumJj9Gr5WLUX1S8YqJSvBg0nEobAL22W3EXaV62anNj_fxBfDZazIoR0EpfT4FbqYRPwN-fYyW9R9aSyciuLOImibLbuv1TaYxUYNeHJ8n5gqFKRYePqy8qVxTc2e9wNMDOjcBP0pPKXbSN8Zh5iiE_YJZFekuKaF9oOLY-2yiVwEAKxu-u4UxNYoSkvFis_9Z_-B4cei7D7m9Ne9iKjfjF0qX18p_S5TdQ")' }}
            ></div>
          </div>
        </header>

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 p-4">
              <Link to="/club-dashboard" className="text-[#617989] text-base font-medium leading-normal">Dashboard</Link>
              <span className="text-[#617989] text-base font-medium leading-normal">/</span>
              <span className="text-[#111518] text-base font-medium leading-normal">Event: Tech Summit 2024</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight text-left">Tech Summit 2024</p>
                <p className="text-[#617989] text-sm font-normal leading-normal text-left">Manage all aspects of your event, from details to sponsor interactions.</p>
              </div>
            </div>

            {/* Event Details Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Event Details</h2>
            
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Event Name</p>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Event Description</p>
                <textarea
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] min-h-36 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Date</p>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </label>
              <label className="flex flex-col min-w-40 flex-1">
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Location</p>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                />
              </label>
              <label className="flex flex-col min-w-40 flex-1">
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                  value={eventLocationDetails}
                  onChange={(e) => setEventLocationDetails(e.target.value)}
                />
              </label>
            </div>

            {/* Sponsorship Management Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Sponsorship Management</h2>
            
            {/* Sponsorship Tiers */}
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">Sponsorship Tiers</h3>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#dbe1e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="table-tiers-column-120 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Tier Name</th>
                      <th className="table-tiers-column-240 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Benefits</th>
                      <th className="table-tiers-column-360 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Price</th>
                      <th className="table-tiers-column-480 px-4 py-3 text-left text-[#617989] w-60 text-sm font-medium leading-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-tiers-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">Gold</td>
                      <td className="table-tiers-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">
                        Keynote speaking slot, logo placement on all materials, booth space
                      </td>
                      <td className="table-tiers-column-360 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">$5,000</td>
                      <td className="table-tiers-column-480 h-[72px] px-4 py-2 w-60 text-[#617989] text-sm font-bold leading-normal tracking-[0.015em] text-left">Edit</td>
                    </tr>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-tiers-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">Silver</td>
                      <td className="table-tiers-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">
                        Logo placement on materials, booth space
                      </td>
                      <td className="table-tiers-column-360 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">$2,500</td>
                      <td className="table-tiers-column-480 h-[72px] px-4 py-2 w-60 text-[#617989] text-sm font-bold leading-normal tracking-[0.015em] text-left">Edit</td>
                    </tr>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-tiers-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">Bronze</td>
                      <td className="table-tiers-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">
                        Logo placement on materials
                      </td>
                      <td className="table-tiers-column-360 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">$1,000</td>
                      <td className="table-tiers-column-480 h-[72px] px-4 py-2 w-60 text-[#617989] text-sm font-bold leading-normal tracking-[0.015em] text-left">Edit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <style>
                {`
                  @container(max-width:120px){.table-tiers-column-120{display: none;}}
                  @container(max-width:240px){.table-tiers-column-240{display: none;}}
                  @container(max-width:360px){.table-tiers-column-360{display: none;}}
                  @container(max-width:480px){.table-tiers-column-480{display: none;}}
                `}
              </style>
            </div>
            <div className="flex px-4 py-3 justify-start">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Add New Tier</span>
              </button>
            </div>

            {/* Sponsor Interactions */}
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">Sponsor Interactions</h3>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#dbe1e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="table-interactions-column-120 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Sponsor</th>
                      <th className="table-interactions-column-240 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Contact</th>
                      <th className="table-interactions-column-360 px-4 py-3 text-left text-[#111518] w-60 text-sm font-medium leading-normal">Status</th>
                      <th className="table-interactions-column-480 px-4 py-3 text-left text-[#617989] w-60 text-sm font-medium leading-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-interactions-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">Innovate Solutions</td>
                      <td className="table-interactions-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">Alex Chen</td>
                      <td className="table-interactions-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Confirmed</span>
                        </button>
                      </td>
                      <td className="table-interactions-column-480 h-[72px] px-4 py-2 w-60 text-[#617989] text-sm font-bold leading-normal tracking-[0.015em] text-left">Message</td>
                    </tr>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-interactions-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">TechGenius Inc.</td>
                      <td className="table-interactions-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">Sophia Lee</td>
                      <td className="table-interactions-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Negotiating</span>
                        </button>
                      </td>
                      <td className="table-interactions-column-480 h-[72px] px-4 py-2 w-60 text-[#617989] text-sm font-bold leading-normal tracking-[0.015em] text-left">Message</td>
                    </tr>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-interactions-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">DataMinds Corp</td>
                      <td className="table-interactions-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">Ethan Wong</td>
                      <td className="table-interactions-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Pending</span>
                        </button>
                      </td>
                      <td className="table-interactions-column-480 h-[72px] px-4 py-2 w-60 text-[#617989] text-sm font-bold leading-normal tracking-[0.015em] text-left">Message</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <style>
                {`
                  @container(max-width:120px){.table-interactions-column-120{display: none;}}
                  @container(max-width:240px){.table-interactions-column-240{display: none;}}
                  @container(max-width:360px){.table-interactions-column-360{display: none;}}
                  @container(max-width:480px){.table-interactions-column-480{display: none;}}
                `}
              </style>
            </div>

            {/* Agreements */}
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">Agreements</h3>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#dbe1e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="table-agreements-column-120 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Sponsor</th>
                      <th className="table-agreements-column-240 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Agreement</th>
                      <th className="table-agreements-column-360 px-4 py-3 text-left text-[#111518] w-60 text-sm font-medium leading-normal">Status</th>
                      <th className="table-agreements-column-480 px-4 py-3 text-left text-[#617989] w-60 text-sm font-medium leading-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-agreements-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">Innovate Solutions</td>
                      <td className="table-agreements-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">Agreement 1</td>
                      <td className="table-agreements-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Signed</span>
                        </button>
                      </td>
                      <td className="table-agreements-column-480 h-[72px] px-4 py-2 w-60 text-[#617989] text-sm font-bold leading-normal tracking-[0.015em] text-left">View</td>
                    </tr>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-agreements-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">TechGenius Inc.</td>
                      <td className="table-agreements-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">Agreement 2</td>
                      <td className="table-agreements-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Draft</span>
                        </button>
                      </td>
                      <td className="table-agreements-column-480 h-[72px] px-4 py-2 w-60 text-[#617989] text-sm font-bold leading-normal tracking-[0.015em] text-left">Edit</td>
                    </tr>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-agreements-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">DataMinds Corp</td>
                      <td className="table-agreements-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">Agreement 3</td>
                      <td className="table-agreements-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Pending</span>
                        </button>
                      </td>
                      <td className="table-agreements-column-480 h-[72px] px-4 py-2 w-60 text-[#617989] text-sm font-bold leading-normal tracking-[0.015em] text-left">Upload</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <style>
                {`
                  @container(max-width:120px){.table-agreements-column-120{display: none;}}
                  @container(max-width:240px){.table-agreements-column-240{display: none;}}
                  @container(max-width:360px){.table-agreements-column-360{display: none;}}
                  @container(max-width:480px){.table-agreements-column-480{display: none;}}
                `}
              </style>
            </div>
            <div className="flex px-4 py-3 justify-start">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Upload Agreement</span>
              </button>
            </div>

            {/* Funds Tracking */}
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">Funds Tracking</h3>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#dbe1e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="table-funds-column-120 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Sponsor</th>
                      <th className="table-funds-column-240 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Amount Received</th>
                      <th className="table-funds-column-360 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Date Received</th>
                      <th className="table-funds-column-480 px-4 py-3 text-left text-[#111518] w-60 text-sm font-medium leading-normal">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-funds-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">Innovate Solutions</td>
                      <td className="table-funds-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">$5,000</td>
                      <td className="table-funds-column-360 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">October 1, 2024</td>
                      <td className="table-funds-column-480 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Received</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-funds-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">TechGenius Inc.</td>
                      <td className="table-funds-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">$2,500</td>
                      <td className="table-funds-column-360 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">October 5, 2024</td>
                      <td className="table-funds-column-480 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Received</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-funds-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">DataMinds Corp</td>
                      <td className="table-funds-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">$0</td>
                      <td className="table-funds-column-360 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">N/A</td>
                      <td className="table-funds-column-480 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Pending</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <style>
                {`
                  @container(max-width:120px){.table-funds-column-120{display: none;}}
                  @container(max-width:240px){.table-funds-column-240{display: none;}}
                  @container(max-width:360px){.table-funds-column-360{display: none;}}
                  @container(max-width:480px){.table-funds-column-480{display: none;}}
                `}
              </style>
            </div>
            <div className="flex px-4 py-3 justify-start">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Record Funds Received</span>
              </button>
            </div>

            {/* Analytics Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Analytics</h2>
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Reach</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">15,000+</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Engagement</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">5,000+</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Inquiries</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">100+</p>
              </div>
            </div>

            {/* Promotional Tools Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Promotional Tools</h2>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">Access resources to promote your event and attract more attendees.</p>
            <div className="flex px-4 py-3 justify-start">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">View Promotional Resources</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
