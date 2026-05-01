import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { eventsAPI, chatAPI, sponsorshipAPI, type Event } from '../services/api';
import SmartNavbar from '../components/layout/SmartNavbar';
import { useUser } from '../contexts/UserContext';
import { toast } from 'react-hot-toast';

const ViewEvent: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  const [eventData, setEventData] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<any>(null);
  const [bidMessage, setBidMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    if (eventId) {
      fetchEventData();
    }
  }, [eventId]);

  const fetchEventData = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await eventsAPI.getEventById(eventId!);
      setEventData(response.event);
    } catch (err) {
      console.error('Failed to fetch event:', err);
      setError('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  const handleSponsorClick = (tier: any) => {
    if (!isAuthenticated) {
      toast.error('Please login to sponsor events');
      navigate('/login');
      return;
    }
    if (user.type !== 'brand') {
      toast.error('Only brands can sponsor events');
      return;
    }
    setSelectedTier(tier);
    setIsModalOpen(true);
  };

  const handleSubmitBid = async () => {
    if (!selectedTier || !eventId) return;

    try {
      setIsSubmitting(true);
      const response = await sponsorshipAPI.apply({
        eventId,
        tierName: selectedTier.name,
        amount: selectedTier.amount,
        message: bidMessage || `I am interested in the ${selectedTier.name} sponsorship tier.`
      });

      if (response.success) {
        toast.success('Sponsorship request submitted successfully!');
        setIsModalOpen(false);
        setBidMessage('');
        // Optional: navigate to a "My Requests" page
        navigate('/messages');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
        <div className="layout-container flex h-full grow flex-col">
          <SmartNavbar />
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1980e6] mb-4"></div>
                <p className="text-[#617989] text-lg">Loading event details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If event not found or error, show error message
  if (error || !eventData) {
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
              <span className="text-[#111518] text-base font-medium leading-normal">{eventData.title}</span>
            </div>

            {/* Event Header with Image */}
            <div className="flex flex-wrap justify-between gap-3 p-4 text-left">
              <div className="flex min-w-72 flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#e8f4f8] text-[#0d7377] px-2 py-1 rounded text-xs font-medium">{eventData.category}</span>
                </div>
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight text-left">{eventData.title}</p>
                <p className="text-[#60768a] text-sm font-normal leading-normal text-left">Hosted by {eventData.clubId?.clubName || 'Unknown Club'}</p>
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
                style={{ backgroundImage: `url("${eventData.images?.[0] || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200'}")` }}
              ></div>
            </div>

            {/* Event Details */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Event Details</h2>
            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6 text-left">
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-5">
                <p className="text-[#60768a] text-sm font-normal leading-normal text-left">Date</p>
                <p className="text-[#111518] text-sm font-normal leading-normal text-left">{new Date(eventData.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-5">
                <p className="text-[#60768a] text-sm font-normal leading-normal text-left">Duration</p>
                <p className="text-[#111518] text-sm font-normal leading-normal text-left">{eventData.duration} day(s)</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-5">
                <p className="text-[#60768a] text-sm font-normal leading-normal text-left">Location</p>
                <p className="text-[#111518] text-sm font-normal leading-normal text-left">{eventData.venue}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-5">
                <p className="text-[#60768a] text-sm font-normal leading-normal text-left">Expected Attendance</p>
                <p className="text-[#111518] text-sm font-normal leading-normal text-left">{eventData.expectedAttendees.toLocaleString()}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-5">
                <p className="text-[#60768a] text-sm font-normal leading-normal text-left">Category</p>
                <p className="text-[#111518] text-sm font-normal leading-normal text-left">{eventData.category}</p>
              </div>
            </div>

            {/* Description */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Description</h2>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">{eventData.description}</p>

            {/* Sponsorship Opportunities */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Sponsorship Opportunities</h2>
            <div className="grid gap-3 p-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
              {eventData.sponsorshipTiers?.map((tier, index) => (
                <div key={index} className="flex flex-col gap-3 pb-3">
                  <div className="w-full bg-white rounded-xl border border-[#dbe1e6] flex flex-col p-5 h-full shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[#111518] text-lg font-bold leading-normal text-left">{tier.name}</p>
                      <p className="text-[#1980e6] text-lg font-bold leading-normal text-left">₹{tier.amount.toLocaleString()}</p>
                    </div>
                    <div className="mt-2 flex-grow">
                      <p className="text-[#60768a] text-xs font-bold leading-normal text-left uppercase tracking-wider mb-2">Benefits:</p>
                      <ul className="text-[#111518] text-sm font-normal leading-normal text-left space-y-2">
                        {tier.benefits?.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start">
                            <span className="text-[#1980e6] mr-2">✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[#60768a] text-xs font-medium">Availability</span>
                        <span className={`text-xs font-bold ${tier.spotsAvailable - tier.spotsTaken > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {tier.spotsAvailable - tier.spotsTaken} / {tier.spotsAvailable} spots left
                        </span>
                      </div>
                      <button
                        onClick={() => handleSponsorClick(tier)}
                        disabled={tier.spotsTaken >= tier.spotsAvailable}
                        className={`flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] transition-all ${tier.spotsTaken >= tier.spotsAvailable
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-[#1980e6] text-white hover:bg-[#1569bc] shadow-md hover:shadow-lg active:scale-[0.98]'
                          }`}
                      >
                        <span className="truncate">{tier.spotsTaken >= tier.spotsAvailable ? 'Fully Booked' : 'Sponsor Now'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Event Photos */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Event Photos</h2>
            <div className="grid gap-3 p-4 grid-cols-3">
              {eventData.images && eventData.images.length > 0 ? (
                eventData.images.map((image, index) => (
                  <div
                    key={index}
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl shadow-sm"
                    style={{ backgroundImage: `url("${image}")` }}
                  ></div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <p className="text-[#60768a] text-sm">No photos available for this event</p>
                </div>
              )}
            </div>

            {/* Contact & Apply Section */}
            <div className="flex flex-col gap-3 p-8 mt-10 items-center bg-[#f8f9fb] rounded-2xl border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-[#111518] text-xl font-bold leading-tight tracking-[-0.015em]">Ready to Sponsor?</h3>
              <p className="text-[#60768a] text-base font-normal leading-normal text-center max-w-[500px]">
                Not sure about the tiers? You can message the organizers directly to discuss custom opportunities.
              </p>
              <button
                className="mt-2 flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-white border-2 border-[#1980e6] text-[#1980e6] text-sm font-bold leading-normal hover:bg-blue-50 transition-colors disabled:opacity-50"
                disabled={chatLoading}
                onClick={async () => {
                  if (!eventData?.clubId || chatLoading) return;
                  if (!isAuthenticated) {
                    toast.error('Please login as a Brand to contact clubs.');
                    navigate('/login');
                    return;
                  }
                  try {
                    setChatLoading(true);
                    await chatAPI.sendMessage({
                      recipientId: eventData.clubId._id,
                      content: `Hi, I am interested in sponsoring your event: ${eventData.title}. Can we discuss the opportunities?`,
                      eventId: eventData._id
                    });
                    navigate('/messages');
                  } catch (err) {
                    console.error('Failed to start conversation:', err);
                    toast.error('Failed to start conversation. Please try again.');
                  } finally {
                    setChatLoading(false);
                  }
                }}
              >
                <span className="truncate text-center">
                  {chatLoading ? 'Starting Chat...' : 'Chat with Organizers'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Sponsorship Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Sponsor {eventData.title}</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 font-bold">{selectedTier?.name} Tier</span>
                    <span className="text-blue-900 font-black">₹{selectedTier?.amount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2 text-left">Personalized Message (Optional)</label>
                  <textarea
                    value={bidMessage}
                    onChange={(e) => setBidMessage(e.target.value)}
                    placeholder="Tell the club why you want to sponsor them..."
                    className="w-full h-32 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  ></textarea>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 h-12 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitBid}
                    disabled={isSubmitting}
                    className="flex-[2] h-12 rounded-xl font-bold text-white bg-[#1980e6] hover:bg-[#1569bc] transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm Sponsorship'}
                  </button>
                </div>

                <p className="mt-4 text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">
                  Payment details will be shared once accepted by the club
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEvent;
