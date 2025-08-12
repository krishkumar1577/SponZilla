import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SmartNavbar } from '../components/layout/Navbar';
import { getAllEvents } from '../data/mockEvents';

const BrowseEventsWithSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedAttendance, setSelectedAttendance] = useState('');

  // Get events from mockEvents data and apply filters
  const allEvents = getAllEvents();
  const filteredEvents = allEvents.filter(event => {
    // Filter by category if selected
    if (selectedCategory && event.category !== selectedCategory) {
      return false;
    }
    // Add more filters here as needed
    return true;
  });

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <SmartNavbar />

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
                  <option value="Technology">Technology</option>
                  <option value="Sports">Sports</option>
                  <option value="Business">Business</option>
                  <option value="Arts & Culture">Arts & Culture</option>
                  <option value="Environment">Environment</option>
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
            {filteredEvents.map((event) => (
              <div key={event.id} className="flex gap-4 bg-white px-4 py-3 justify-between text-left border-b border-[#f0f2f5]">
                <div className="flex flex-1 flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[#121416] text-base font-medium leading-normal">{event.name}</p>
                    <span className="bg-[#e8f4f8] text-[#0d7377] px-2 py-1 rounded text-xs font-medium">{event.category}</span>
                  </div>
                  <p className="text-[#6a7681] text-sm font-normal leading-normal">{event.date} • {event.time}</p>
                  <p className="text-[#6a7681] text-sm font-normal leading-normal">{event.location}</p>
                  <p className="text-[#6a7681] text-sm font-normal leading-normal">Hosted by {event.organizer}</p>
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
