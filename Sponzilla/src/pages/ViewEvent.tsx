import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventById } from '../data/mockEvents';
import SmartNavbar from '../components/layout/SmartNavbar';

const ViewEvent: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  
  // Get event data based on the ID from URL
  const eventData = eventId ? getEventById(parseInt(eventId, 10)) : null;

  // If event not found, show error message
  if (!eventData) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
        <div className="layout-container flex h-full grow flex-col">
          <SmartNavbar />
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <h1 className="text-[#111518] text-4xl font-bold leading-tight tracking-[-0.033em] mb-4">Event Not Found</h1>
                <p className="text-[#617989] text-lg mb-6">The event you're looking for doesn't exist or may have been removed.</p>
                <Link 
                  to="/browse-events" 
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  Browse All Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <SmartNavbar />

        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 p-4">
              <Link to="/browse-events" className="text-[#60768a] text-base font-medium leading-normal hover:text-[#111518]">Events</Link>
              <span className="text-[#60768a] text-base font-medium leading-normal">/</span>
              <span className="text-[#111518] text-base font-medium leading-normal">{eventData.name}</span>
            </div>

            {/* Event Header with Image */}
            <div className="flex flex-wrap justify-between gap-3 p-4 text-left">
              <div className="flex min-w-72 flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#e8f4f8] text-[#0d7377] px-2 py-1 rounded text-xs font-medium">{eventData.category}</span>
                </div>
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight text-left">{eventData.name}</p>
                <p className="text-[#60768a] text-sm font-normal leading-normal text-left">Hosted by {eventData.organizer}</p>
              </div>
              <div className="flex items-start gap-3">
                <Link 
                  to="/browse-events" 
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  ← Back to Events
                </Link>
              </div>
            </div>

            {/* Event Image */}
            <div className="px-4 py-3">
              <div 
                className="aspect-video w-full bg-cover bg-center rounded-xl"
                style={{ backgroundImage: `url("${eventData.image}")` }}
              ></div>
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
                <p className="text-[#60768a] text-sm font-normal leading-normal text-left">Category</p>
                <p className="text-[#111518] text-sm font-normal leading-normal text-left">{eventData.category}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-5">
                <p className="text-[#60768a] text-sm font-normal leading-normal text-left">Contact</p>
                <div className="text-left">
                  <p className="text-[#111518] text-sm font-normal leading-normal">{eventData.contact.email}</p>
                  {eventData.contact.phone && (
                    <p className="text-[#111518] text-sm font-normal leading-normal">{eventData.contact.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Description</h2>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">{eventData.description}</p>

            {/* Sponsorship Opportunities */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Sponsorship Opportunities</h2>
            <div className="grid gap-3 p-4 grid-cols-[repeat(auto-fit,minmax(158px,1fr))]">
              {eventData.sponsorshipTiers.map((tier, index) => (
                <div key={index} className="flex flex-col gap-3 pb-3">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl border border-[#dbe1e6] flex flex-col justify-between p-4">
                    <div>
                      <p className="text-[#111518] text-base font-medium leading-normal text-left">{tier.name}</p>
                      <p className="text-[#60768a] text-sm font-normal leading-normal text-left">{tier.price}</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-[#60768a] text-xs font-normal leading-normal text-left mb-2">Benefits:</p>
                      <ul className="text-[#111518] text-xs font-normal leading-normal text-left space-y-1">
                        {tier.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start">
                            <span className="text-[#1980e6] mr-1">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em] w-full">
                    <span className="truncate">Sponsor Now</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Past Event Photos */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Past Event Photos</h2>
            <div className="grid gap-3 p-4 grid-cols-3">
              {eventData.pastEventImages.map((image, index) => (
                <div 
                  key={index}
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{ backgroundImage: `url("${image}")` }}
                ></div>
              ))}
            </div>

            {/* Contact & Apply Section */}
            <div className="flex flex-col gap-3 p-4 mt-6 items-center">
              <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em]">Ready to Sponsor?</h3>
              <p className="text-[#60768a] text-sm font-normal leading-normal text-center">
                Contact the organizers to express your interest in sponsoring this event.
              </p>
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                onClick={() => {
                  // Handle sponsorship application
                  console.log('Express interest for event:', eventData.name);
                }}
              >
                <span className="truncate">Express Interest in Sponsorship</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEvent;
