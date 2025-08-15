import React from 'react';
import { Link } from 'react-router-dom';

const ListEventPage: React.FC = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header matching the HTML exactly */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f2f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#121416]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em]">SponZilla</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-[#121416] text-sm font-medium leading-normal" href="#">Home</a>
              <a className="text-[#121416] text-sm font-medium leading-normal" href="#">Events</a>
              <Link to="/brand-landing" className="text-[#121416] text-sm font-medium leading-normal">For Brands</Link>
              <Link to="/club-landing" className="text-[#121416] text-sm font-medium leading-normal">For Clubs</Link>
            </div>
            <div className="flex gap-2">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f1f2f4] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Sign in</span>
              </button>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Sign up</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Title */}
            <h1 className="text-[#121416] text-[32px] font-bold leading-tight tracking-[-0.015em] px-4 pb-6 pt-5">List Your Event</h1>
            
            {/* Event Name */}
            <div className="flex flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Event Name</p>
                <input
                  placeholder="Enter event name"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            {/* Date */}
            <div className="flex flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Date</p>
                <input
                  type="date"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            {/* Time */}
            <div className="flex flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Time</p>
                <input
                  type="time"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            {/* Location */}
            <div className="flex flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Location</p>
                <input
                  placeholder="Enter event location"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            {/* Description */}
            <div className="flex flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Description</p>
                <textarea
                  placeholder="Describe your event and what makes it special..."
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] min-h-32 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                ></textarea>
              </label>
            </div>

            {/* Expected Attendance */}
            <div className="flex flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Expected Attendance</p>
                <input
                  type="number"
                  placeholder="Number of expected attendees"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            {/* Sponsorship Tiers Section */}
            <h3 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-4 pt-4">Sponsorship Tiers</h3>
            
            {/* Tier 1 - Gold */}
            <div className="flex flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Gold Tier - Amount ($)</p>
                <input
                  type="number"
                  placeholder="e.g., 5000"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            {/* Gold Tier Benefits */}
            <div className="flex flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Gold Tier Benefits</p>
                <textarea
                  placeholder="List the benefits for gold tier sponsors..."
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] min-h-24 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                ></textarea>
              </label>
            </div>

            {/* Tier 2 - Silver */}
            <div className="flex flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Silver Tier - Amount ($)</p>
                <input
                  type="number"
                  placeholder="e.g., 3000"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            {/* Silver Tier Benefits */}
            <div className="flex flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Silver Tier Benefits</p>
                <textarea
                  placeholder="List the benefits for silver tier sponsors..."
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] min-h-24 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                ></textarea>
              </label>
            </div>

            {/* Tier 3 - Bronze */}
            <div className="flex flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Bronze Tier - Amount ($)</p>
                <input
                  type="number"
                  placeholder="e.g., 1000"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            {/* Bronze Tier Benefits */}
            <div className="flex flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Bronze Tier Benefits</p>
                <textarea
                  placeholder="List the benefits for bronze tier sponsors..."
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] min-h-24 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                ></textarea>
              </label>
            </div>

            {/* Contact Information Section */}
            <h3 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-4 pt-4">Contact Information</h3>
            
            {/* Contact Name */}
            <div className="flex flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Contact Name</p>
                <input
                  placeholder="Enter contact name"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            {/* Contact Email */}
            <div className="flex flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Contact Email</p>
                <input
                  type="email"
                  placeholder="Enter contact email"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex px-4 py-3">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">List Event</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListEventPage;
