import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SmartNavbar } from '../components/layout/Navbar';
import { profilesAPI, eventsAPI } from '../services/api';
import type { ClubProfile as ClubProfileType, Event } from '../services/api';

const ClubProfile: React.FC = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const navigate = useNavigate();
  const [club, setClub] = useState<ClubProfileType | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const handleEventClick = (eventId: string) => {
    navigate(`/view-event/${eventId}`);
  };

  useEffect(() => {
    const fetchClub = async () => {
      try {
        setLoading(true);
        if (clubId) {
          // Viewing someone else's profile
          const response = await profilesAPI.getAllClubs();
          const foundClub = response.clubs.find(c => c._id === clubId);
          if (foundClub) {
            setClub(foundClub);
            
            // Fetch events for this specific club
            try {
              const eventsResponse = await eventsAPI.getAllEvents();
              const clubEvents = eventsResponse.events.filter(event => 
                event.clubId._id === clubId
              );
              setEvents(clubEvents);
            } catch (eventsError) {
              console.error('Failed to load events:', eventsError);
              // Don't set error for events, just continue without them
            }
          } else {
            setError('Club not found');
          }
        } else {
          // Viewing own profile - load current user's club profile
          try {
            const myProfileResponse = await profilesAPI.getMyProfile();
            if (myProfileResponse.profile && 'clubName' in myProfileResponse.profile) {
              setClub(myProfileResponse.profile);
              
              // Fetch events for current user's club
              try {
                const eventsResponse = await eventsAPI.getAllEvents();
                const clubEvents = eventsResponse.events.filter(event => 
                  event.clubId._id === myProfileResponse.profile._id
                );
                setEvents(clubEvents);
              } catch (eventsError) {
                console.error('Failed to load events:', eventsError);
              }
            } else {
              setError('No club profile found. Please create your club profile first.');
            }
          } catch (err) {
            setError('Failed to load your club profile. Please create one first.');
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load club');
      } finally {
        setLoading(false);
      }
    };

    fetchClub();
  }, [clubId]);

  if (loading) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
        <div className="layout-container flex h-full grow flex-col">
          <SmartNavbar />
          <div className="flex justify-center items-center flex-1">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading club profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
        <div className="layout-container flex h-full grow flex-col">
          <SmartNavbar />
          <div className="flex justify-center items-center flex-1">
            <div className="text-center">
              <p className="text-red-600">{error}</p>
              <button 
                onClick={() => window.history.back()} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Go Back
              </button>
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
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex p-4 @container">
              <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
                <div className="flex gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                    style={{ 
                      backgroundImage: `url("${club.logo || `https://placehold.co/128x128?text=${encodeURIComponent(club.clubName.charAt(0))}`}")`
                    }}
                  ></div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2">
                      <p className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] text-left">{club.clubName}</p>
                      {club.verified && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <p className="text-green-700 text-xs font-medium">Verified</p>
                        </div>
                      )}
                    </div>
                    <p className="text-[#617989] text-base font-normal leading-normal text-left">
                      {club.description || 'Empowering students to explore and innovate in technology.'}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full">
                        <span className="text-gray-600 text-xs">👁</span>
                        <p className="text-gray-700 text-xs font-medium">{club.views || 0} views</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">About Us</h2>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              {club.description || 
                `The ${club.clubName} is a vibrant community of students passionate about ${club.category?.toLowerCase() || 'their field'}. We organize workshops, events, and networking opportunities to foster creativity and collaboration among our members. Our goal is to provide a platform for students to learn, experiment, and build impactful projects that address real-world challenges.`
              }
            </p>
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Contact Information</h2>
            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-5">
                <p className="text-[#617989] text-sm font-normal leading-normal text-left">Email</p>
                <p className="text-[#111518] text-sm font-normal leading-normal text-left">{club.contactEmail || club.contactPerson?.email || 'contact@club.edu'}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-5">
                <p className="text-[#617989] text-sm font-normal leading-normal text-left">Website</p>
                <p className="text-[#111518] text-sm font-normal leading-normal text-left">{club.website || `${club.clubName.toLowerCase().replace(/\s+/g, '')}.example.edu`}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-5">
                <p className="text-[#617989] text-sm font-normal leading-normal text-left">Social Media</p>
                <div className="text-[#111518] text-sm font-normal leading-normal text-left">
                  {club.socialMedia ? (
                    <div className="flex flex-wrap gap-2">
                      {club.socialMedia.instagram && (
                        <a href={club.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Instagram
                        </a>
                      )}
                      {club.socialMedia.twitter && (
                        <a href={club.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Twitter
                        </a>
                      )}
                      {club.socialMedia.facebook && (
                        <a href={club.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Facebook
                        </a>
                      )}
                      {club.socialMedia.linkedin && (
                        <a href={club.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          LinkedIn
                        </a>
                      )}
                      {club.socialMedia.website && (
                        <a href={club.socialMedia.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Website
                        </a>
                      )}
                      {!club.socialMedia.instagram && !club.socialMedia.twitter && !club.socialMedia.facebook && !club.socialMedia.linkedin && !club.socialMedia.website && (
                        <span className="text-gray-500">@{club.clubName.toLowerCase().replace(/\s+/g, '')}</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-500">@{club.clubName.toLowerCase().replace(/\s+/g, '')}</span>
                  )}
                </div>
              </div>
            </div>
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Upcoming Events</h2>
            {events.filter(event => new Date(event.eventDate) > new Date()).length > 0 ? (
              events
                .filter(event => new Date(event.eventDate) > new Date())
                .slice(0, 3)
                .map((event) => (
                  <div key={event._id} className="p-4">
                    <div 
                      className="flex items-stretch justify-between gap-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors p-3"
                      onClick={() => handleEventClick(event._id)}
                    >
                      <div className="flex flex-col gap-1 flex-[2_2_0px]">
                        <p className="text-[#617989] text-sm font-normal leading-normal text-left">
                          {new Date(event.eventDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="text-[#111518] text-base font-bold leading-tight text-left">{event.title}</p>
                        <p className="text-[#617989] text-sm font-normal leading-normal text-left">
                          {event.description.length > 100 ? event.description.substring(0, 100) + '...' : event.description}
                        </p>
                      </div>
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                        style={{ 
                          backgroundImage: `url("${event.images?.[0] || 'https://placehold.co/600x400?text=' + encodeURIComponent(event.title.charAt(0))}")`
                        }}
                      ></div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="p-4">
                <p className="text-[#617989] text-sm text-center">No upcoming events scheduled.</p>
              </div>
            )}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Past Events</h2>
            {events.filter(event => new Date(event.eventDate) <= new Date()).length > 0 ? (
              events
                .filter(event => new Date(event.eventDate) <= new Date())
                .slice(0, 3)
                .map((event) => (
                  <div key={event._id} className="p-4">
                    <div 
                      className="flex items-stretch justify-between gap-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors p-3"
                      onClick={() => handleEventClick(event._id)}
                    >
                      <div className="flex flex-col gap-1 flex-[2_2_0px]">
                        <p className="text-[#617989] text-sm font-normal leading-normal text-left">
                          {new Date(event.eventDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="text-[#111518] text-base font-bold leading-tight text-left">{event.title}</p>
                        <p className="text-[#617989] text-sm font-normal leading-normal text-left">
                          {event.description.length > 100 ? event.description.substring(0, 100) + '...' : event.description}
                        </p>
                      </div>
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                        style={{ 
                          backgroundImage: `url("${event.images?.[0] || 'https://placehold.co/600x400?text=' + encodeURIComponent(event.title.charAt(0))}")`
                        }}
                      ></div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="p-4">
                <p className="text-[#617989] text-sm text-center">No past events to display.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProfile;