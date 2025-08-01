import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BrowseEventsWithSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedAttendance, setSelectedAttendance] = useState('');

  // Sample events data
  const events = [
    {
      id: 1,
      name: 'Tech Conference 2024',
      date: 'October 26, 2024',
      organizer: 'Tech Innovators Club'
    },
    {
      id: 2,
      name: 'Entrepreneurship Summit',
      date: 'November 15, 2024',
      organizer: 'Business Leaders Society'
    },
    {
      id: 3,
      name: 'Sustainability Fair',
      date: 'December 5, 2024',
      organizer: 'Environmental Action Group'
    },
    {
      id: 4,
      name: 'Winter Arts Festival',
      date: 'January 20, 2025',
      organizer: 'Arts & Culture Collective'
    },
    {
      id: 5,
      name: 'Wellness Workshop Series',
      date: 'February 10, 2025',
      organizer: 'Health & Wellness Initiative'
    }
  ];

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header with Search - Matching Original Design */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f2f4] px-10 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-[#121416]">
              <div className="size-4">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em]">SponZilla</h2>
            </div>
            <div className="flex items-center gap-9">
              <a className="text-[#121416] text-sm font-medium leading-normal" href="#">Home</a>
              <a className="text-[#121416] text-sm font-medium leading-normal" href="#">Events</a>
              <a className="text-[#121416] text-sm font-medium leading-normal" href="#">Clubs</a>
              <a className="text-[#121416] text-sm font-medium leading-normal" href="#">My Profile</a>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <label className="flex flex-col min-w-40 !h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <div
                  className="text-[#6a7681] flex border-none bg-[#f1f2f4] items-center justify-center pl-4 rounded-l-xl border-r-0"
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
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] focus:border-none h-full placeholder:text-[#6a7681] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </label>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_zJ7or90fpw0Y23nFRLpwgo8FtvOFgkdkwtao4GSyn72YgZ9c1VKM_S_RNIiQsKDrJMqxOz4bwCNgTHJdeDQivXRmOoLArEeG6snWmFFkitmsRfKVUoJ6lwIvL_x0nAxxMA0ddSzItyhGWti5GdG4cmY6eMmD1B7tzHYzblP77PxCE_1wqzquVAx4F1QFhs9UaxK22g13fcJz_-8zUz4lIc0pQcO-N6zmmG6X2yqGxi8Nto3PvqShgWwU3vJUZ8oJm6jw6iTSw_E")' }}
            ></div>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Page Title */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#121416] tracking-light text-[32px] font-bold leading-tight min-w-72">Browse Events</p>
            </div>

            {/* Filters Row 1 */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2">Date</p>
                <input
                  placeholder="Select Date"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  type="date"
                />
              </label>
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2">Category</p>
                <select
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="tech">Technology</option>
                  <option value="business">Business</option>
                  <option value="arts">Arts & Culture</option>
                  <option value="health">Health & Wellness</option>
                  <option value="environment">Environment</option>
                </select>
              </label>
            </div>

            {/* Filters Row 2 */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2">University</p>
                <select
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                >
                  <option value="">Select University</option>
                  <option value="stanford">Stanford University</option>
                  <option value="mit">MIT</option>
                  <option value="harvard">Harvard University</option>
                  <option value="berkeley">UC Berkeley</option>
                </select>
              </label>
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2">Expected Attendance</p>
                <select
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                  value={selectedAttendance}
                  onChange={(e) => setSelectedAttendance(e.target.value)}
                >
                  <option value="">Select Attendance</option>
                  <option value="small">Small ({"<"} 50)</option>
                  <option value="medium">Medium (50-200)</option>
                  <option value="large">Large (200-500)</option>
                  <option value="xlarge">Very Large (500+)</option>
                </select>
              </label>
            </div>

            {/* Events Section */}
            <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Upcoming Events</h2>
            
            {/* Event List */}
            {events.map((event) => (
              <div key={event.id} className="flex gap-4 bg-white px-4 py-3 justify-between text-left">
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-[#121416] text-base font-medium leading-normal">{event.name}</p>
                  <p className="text-[#6a7681] text-sm font-normal leading-normal">{event.date}</p>
                  <p className="text-[#6a7681] text-sm font-normal leading-normal">{event.organizer}</p>
                </div>
                <div className="shrink-0">
                  <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#f1f2f4] text-[#121416] text-sm font-medium leading-normal w-fit"
                    onClick={() => {
                      navigate(`/view-event/${event.id}`);
                    }}
                  >
                    <span className="truncate">View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseEventsWithSearchPage;
