import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SmartNavbar } from '../components/layout/Navbar';
import { eventsAPI, type Event } from '../services/api';

const BrowseEventsWithSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedAttendance, setSelectedAttendance] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Fetch events on component mount and when filters change
  useEffect(() => {
    fetchEvents();
  }, [selectedCategory, searchTerm]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await eventsAPI.getAllEvents({
        category: selectedCategory || undefined,
        search: searchTerm || undefined,
        limit: 20,
      });
      
      setEvents(response.events);
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setError('Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter events locally for additional filters
  const filteredEvents = events.filter(event => {
    // Date filter - if selected, filter by event date
    if (selectedDate) {
      const eventDate = new Date(event.eventDate).toISOString().split('T')[0];
      if (eventDate !== selectedDate) return false;
    }
    
    // University filter - filter by club's university
    if (selectedUniversity && event.clubId?.university) {
      if (!event.clubId.university.toLowerCase().includes(selectedUniversity.toLowerCase())) {
        return false;
      }
    }
    
    // Attendance filter
    if (selectedAttendance) {
      const attendance = event.expectedAttendees;
      switch (selectedAttendance) {
        case 'small':
          if (attendance >= 50) return false;
          break;
        case 'medium':
          if (attendance < 50 || attendance > 200) return false;
          break;
        case 'large':
          if (attendance < 200 || attendance > 500) return false;
          break;
        case 'xlarge':
          if (attendance < 500) return false;
          break;
      }
    }
    
    return true;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEvents();
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <SmartNavbar />

        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Page Title and Search */}
            <div className="flex flex-wrap justify-between items-center gap-3 p-4">
              <p className="text-[#121416] tracking-light text-[32px] font-bold leading-tight min-w-72">Browse Events</p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex max-w-[600px] gap-4 px-4 py-3">
              <input
                placeholder="Search events by name or description..."
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
              />
              <button
                type="submit"
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-4 bg-[#121516] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                Search
              </button>
            </form>

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
                  <option value="">All Categories</option>
                  <option value="hackathon">Hackathon</option>
                  <option value="workshop">Workshop</option>
                  <option value="cultural-fest">Cultural Festival</option>
                  <option value="sports-event">Sports Event</option>
                  <option value="conference">Conference</option>
                  <option value="competition">Competition</option>
                  <option value="seminar">Seminar</option>
                  <option value="other">Other</option>
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
            <div className="px-4 pb-3 pt-5">
              <div className="flex items-center justify-between">
                <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  Upcoming Events
                  {!loading && (
                    <span className="ml-2 text-[#6a7681] text-sm font-normal">
                      ({filteredEvents.length} found)
                    </span>
                  )}
                </h2>
                {loading && (
                  <div className="text-[#6a7681] text-sm">Loading events...</div>
                )}
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="mx-4 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
                <button 
                  onClick={fetchEvents}
                  className="mt-2 text-red-600 underline hover:no-underline"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="px-4 py-8">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse bg-gray-100 rounded-lg h-20"></div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredEvents.length === 0 && (
              <div className="px-4 py-8 text-center">
                <p className="text-[#6a7681] text-lg mb-2">No events found</p>
                <p className="text-[#6a7681] text-sm">Try adjusting your search criteria or check back later for new events.</p>
              </div>
            )}
            
            {/* Event List */}
            {!loading && !error && filteredEvents.map((event) => (
              <div key={event._id} className="flex gap-4 bg-white px-4 py-3 justify-between text-left border-b border-[#f0f2f5] hover:bg-[#f8f9fa] transition-colors">
                <div className="flex flex-1 flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[#121416] text-base font-medium leading-normal">{event.title}</p>
                    <span className="bg-[#e8f4f8] text-[#0d7377] px-2 py-1 rounded text-xs font-medium">{event.category}</span>
                    {event.status === 'published' && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Live</span>
                    )}
                  </div>
                  <p className="text-[#6a7681] text-sm font-normal leading-normal">
                    {new Date(event.eventDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-[#6a7681] text-sm font-normal leading-normal">
                    {event.venue}
                  </p>
                  <p className="text-[#6a7681] text-sm font-normal leading-normal">
                    Hosted by {event.clubId?.clubName || 'Unknown Club'}
                    {event.clubId?.university && ` • ${event.clubId.university}`}
                  </p>
                  <p className="text-[#6a7681] text-sm font-normal leading-normal">
                    Expected attendance: {event.expectedAttendees.toLocaleString()}
                  </p>
                </div>
                <div className="shrink-0 flex flex-col justify-center gap-2">
                  <div className="text-right text-sm text-[#6a7681]">
                    {event.analytics?.views || 0} views
                  </div>
                  <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#121516] text-white text-sm font-medium leading-normal w-fit hover:bg-[#2a2a2a] transition-colors"
                    onClick={() => {
                      navigate(`/view-event/${event._id}`);
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
