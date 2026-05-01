import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SmartNavbar } from '../../components/layout/Navbar';
import { analyticsAPI, eventsAPI, profilesAPI, sponsorshipAPI, type ClubAnalytics, type Event, type BrandProfile, type ClubProfile } from '../../services/api';

const ClubDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [analytics, setAnalytics] = useState<ClubAnalytics | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [recommendedBrands, setRecommendedBrands] = useState<BrandProfile[]>([]);
  const [clubProfile, setClubProfile] = useState<ClubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [brandsLoading, setBrandsLoading] = useState(true);
  const [clubLoading, setClubLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [eventsError, setEventsError] = useState<string | null>(null);
  const [brandsError, setBrandsError] = useState<string | null>(null);
  const [clubError, setClubError] = useState<string | null>(null);
  const [sponsorshipRequests, setSponsorshipRequests] = useState<any[]>([]);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null); // 'current', 'potential', 'requests'

  // Helper functions for formatting
  const formatNumber = (num: number | undefined): string => {
    if (num === undefined) return '0';
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatCurrency = (amount: number | undefined): string => {
    if (amount === undefined) return '₹0';
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getGrowthIcon = (growth: number | undefined): string => {
    if (growth === undefined || growth === 0) return '→';
    return growth > 0 ? '↗' : '↘';
  };

  const getGrowthColor = (growth: number | undefined): string => {
    if (growth === undefined || growth === 0) return 'text-[#617989]';
    return growth > 0 ? 'text-green-600' : 'text-red-600';
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetch analytics data
      try {
        setLoading(true);
        const response = await analyticsAPI.getClubAnalytics();
        setAnalytics(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch club analytics:', err);
        setError('Failed to load analytics data');
      } finally {
        setLoading(false);
      }

      // Fetch events data
      try {
        setEventsLoading(true);
        const eventsResponse = await eventsAPI.getAllEvents({ limit: 10 });
        setEvents(eventsResponse.events || []);
        setEventsError(null);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setEventsError('Failed to load events data');
      } finally {
        setEventsLoading(false);
      }

      // Fetch recommended brands
      try {
        setBrandsLoading(true);
        const brandsResponse = await profilesAPI.getAllBrands();
        // For demo, get first 3 brands as recommendations
        setRecommendedBrands((brandsResponse.brands || []).slice(0, 3));
        setBrandsError(null);
      } catch (err) {
        console.error('Failed to fetch recommended brands:', err);
        setBrandsError('Failed to load recommended brands');
      } finally {
        setBrandsLoading(false);
      }

      // Fetch current club profile
      try {
        setClubLoading(true);
        const profileResponse = await profilesAPI.getMyProfile();
        // Check if the profile is a club profile (not brand profile)
        if (profileResponse.profile && 'clubName' in profileResponse.profile) {
          setClubProfile(profileResponse.profile as ClubProfile);
        }
        setClubError(null);
      } catch (err) {
        console.error('Failed to fetch club profile:', err);
        setClubError('Failed to load club profile');
      } finally {
        setClubLoading(false);
      }

      // Fetch sponsorship requests
      try {
        setRequestsLoading(true);
        const response = await sponsorshipAPI.getClubRequests();
        setSponsorshipRequests(response.requests || []);
      } catch (err) {
        console.error('Failed to fetch sponsorship requests:', err);
      } finally {
        setRequestsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateStatus = async (requestId: string, status: 'accepted' | 'rejected') => {
    try {
      const response = await sponsorshipAPI.updateStatus(requestId, status);
      if (response.success) {
        // Update local state
        setSponsorshipRequests(prev => 
          prev.map(req => req._id === requestId ? { ...req, status } : req)
        );
        // Refresh analytics as spotsTaken might have changed
        const analyticsResponse = await analyticsAPI.getClubAnalytics();
        setAnalytics(analyticsResponse.data);
      }
    } catch (err) {
      console.error('Failed to update request status:', err);
    }
  };

  const getEventBidCount = (eventId: string) => {
    return sponsorshipRequests.filter(req => req.eventId?._id === eventId).length;
  };

  // Filter events based on active tab
  const getFilteredEvents = () => {
    const now = new Date();
    switch (activeTab) {
      case 'upcoming':
        return events.filter(event =>
          new Date(event.eventDate) > now && event.status === 'published'
        );
      case 'past':
        return events.filter(event =>
          new Date(event.eventDate) < now || event.status === 'completed'
        );
      case 'drafts':
        return events.filter(event => event.status === 'draft');
      default:
        return events;
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <SmartNavbar />

        {/* Error State */}
        {error && (
          <div className="mx-4 my-2 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm font-medium">⚠ {error}</p>
            <p className="text-red-500 text-xs mt-1">Showing fallback data. Please refresh to try again.</p>
          </div>
        )}

        {/* Main Content */}
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[920px] flex-1">
            {/* Onboarding Banner for New Users */}
            {analytics && analytics.profileExists === false && (
              <div className="mb-6 p-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white shadow-lg animate-in fade-in slide-in-from-top duration-500">
                <div className="flex flex-col @[480px]:flex-row items-center justify-between gap-4">
                  <div className="text-center @[480px]:text-left">
                    <h3 className="text-xl font-bold mb-1">Welcome to Sponzilla! 🚀</h3>
                    <p className="text-blue-100 text-sm">Your profile is currently empty. Complete your club profile to start attracting brands and generating AI pitch decks.</p>
                  </div>
                  <button
                    onClick={() => navigate('/club-settings')}
                    className="px-6 py-2.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-sm"
                  >
                    Complete Profile
                  </button>
                </div>
              </div>
            )}

            {/* Dashboard Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight min-w-72 text-left">Dashboard</p>
              <button
                onClick={() => navigate('/list-event')}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal hover:bg-[#e8f0f5] transition-colors"
              >
                <span className="truncate">List Event</span>
              </button>
            </div>

            {/* Club Metrics */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Club Metrics</h2>
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Total Sponsorships Secured</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">
                  {loading ? '...' : error ? 'N/A' : analytics?.overview?.totalSponsorshipsSecured || 0}
                </p>
                <div className="flex items-center gap-1">
                  <span className={`${loading || error ? 'text-[#617989]' : getGrowthColor(analytics?.growth?.sponsorshipGrowth)} text-sm font-medium`}>
                    {loading ? '...' : error ? '-' : `${getGrowthIcon(analytics?.growth?.sponsorshipGrowth)} ${analytics?.growth?.sponsorshipGrowth?.toFixed(1) || '0'}%`}
                  </span>
                </div>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Total Funds Raised</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">
                  {loading ? '...' : error ? 'N/A' : formatCurrency(analytics?.overview?.totalFundsRaised)}
                </p>
                <div className="flex items-center gap-1">
                  <span className={`${loading || error ? 'text-[#617989]' : getGrowthColor(analytics?.growth?.fundsGrowth)} text-sm font-medium`}>
                    {loading ? '...' : error ? '-' : `${getGrowthIcon(analytics?.growth?.fundsGrowth)} ${analytics?.growth?.fundsGrowth?.toFixed(1) || '0'}%`}
                  </span>
                </div>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Average Sponsorship Value</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">
                  {loading ? '...' : error ? 'N/A' : formatCurrency(analytics?.overview?.averageSponsorshipValue)}
                </p>
                <div className="flex items-center gap-1">
                  <span className={`${loading || error ? 'text-[#617989]' : getGrowthColor(analytics?.growth?.sponsorshipGrowth)} text-sm font-medium`}>
                    {loading ? '...' : error ? '-' : `${getGrowthIcon(analytics?.growth?.sponsorshipGrowth)} ${analytics?.growth?.sponsorshipGrowth?.toFixed(1) || '0'}%`}
                  </span>
                </div>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Event Attendance</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">
                  {loading ? '...' : error ? 'N/A' : formatNumber(analytics?.overview?.totalAttendance)}
                </p>
                <div className="flex items-center gap-1">
                  <span className={`${loading || error ? 'text-[#617989]' : getGrowthColor(analytics?.growth?.attendanceGrowth)} text-sm font-medium`}>
                    {loading ? '...' : error ? '-' : `${getGrowthIcon(analytics?.growth?.attendanceGrowth)} ${analytics?.growth?.attendanceGrowth?.toFixed(1) || '0'}%`}
                  </span>
                </div>
              </div>
            </div>

            {/* Chart Section */}
            <div className="flex flex-wrap gap-4 px-4 py-6">
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#dbe1e6] p-6">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Upcoming Sponsorship Opportunities</p>
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight truncate text-left">
                  {loading ? '...' : error ? 'N/A' : analytics?.events?.upcomingOpportunities || 0}
                </p>
                <div className="flex gap-1">
                  <p className="text-[#617989] text-base font-normal leading-normal text-left">Next 3 Months</p>
                  <p className="text-[#078838] text-base font-medium leading-normal text-left">
                    {loading ? '...' : error ? '' : analytics?.growth?.sponsorshipGrowth ? `+${analytics.growth.sponsorshipGrowth.toFixed(1)}%` : '+0%'}
                  </p>
                </div>
                <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
                  <svg width="100%" height="148" viewBox="-3 0 478 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                      fill="url(#paint0_linear_1131_5935)"
                    ></path>
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                      stroke="#617989"
                      strokeWidth="3"
                      strokeLinecap="round"
                    ></path>
                    <defs>
                      <linearGradient id="paint0_linear_1131_5935" x1="236" y1="1" x2="236" y2="149" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#f0f3f4"></stop>
                        <stop offset="1" stopColor="#f0f3f4" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="flex justify-around">
                    <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em] text-left">Jul</p>
                    <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em] text-left">Aug</p>
                    <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em] text-left">Sep</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="pb-3">
              <div className="flex border-b border-[#dbe1e6] px-4 gap-8">
                <button
                  onClick={() => setActiveTab('past')}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${activeTab === 'past'
                    ? 'border-b-[#111518] text-[#111518]'
                    : 'border-b-transparent text-[#617989]'
                    }`}
                >
                  <p className={`text-sm font-bold leading-normal tracking-[0.015em] text-left ${activeTab === 'past' ? 'text-[#111518]' : 'text-[#617989]'
                    }`}>Past Events</p>
                </button>
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${activeTab === 'upcoming'
                    ? 'border-b-[#111518] text-[#111518]'
                    : 'border-b-transparent text-[#617989]'
                    }`}
                >
                  <p className={`text-sm font-bold leading-normal tracking-[0.015em] text-left ${activeTab === 'upcoming' ? 'text-[#111518]' : 'text-[#617989]'
                    }`}>Upcoming Events</p>
                </button>
                <button
                  onClick={() => setActiveTab('drafts')}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${activeTab === 'drafts'
                    ? 'border-b-[#111518] text-[#111518]'
                    : 'border-b-transparent text-[#617989]'
                    }`}
                >
                  <p className={`text-sm font-bold leading-normal tracking-[0.015em] text-left ${activeTab === 'drafts' ? 'text-[#111518]' : 'text-[#617989]'
                    }`}>Drafts</p>
                </button>
              </div>
            </div>

            {/* Additional Analytics Sections */}
            <div className="grid grid-cols-2 gap-4 px-4 py-6">
              {/* Event Performance */}
              <div className="flex flex-col gap-4 rounded-xl border border-[#dbe1e6] p-6">
                <h3 className="text-[#111518] text-lg font-semibold leading-tight">Event Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#617989] text-sm font-medium">Total Events</p>
                    <p className="text-[#111518] text-xl font-bold">
                      {loading ? '...' : error ? 'N/A' : analytics?.events?.totalEvents || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#617989] text-sm font-medium">Completed Events</p>
                    <p className="text-[#111518] text-xl font-bold">
                      {loading ? '...' : error ? 'N/A' : analytics?.events?.completedEvents || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#617989] text-sm font-medium">Published Events</p>
                    <p className="text-[#111518] text-xl font-bold">
                      {loading ? '...' : error ? 'N/A' : analytics?.events?.publishedEvents || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#617989] text-sm font-medium">Goal Achievement</p>
                    <p className="text-[#111518] text-xl font-bold">
                      {loading ? '...' : error ? 'N/A' : `${analytics?.goals?.achievementPercentage?.toFixed(1) || '0'}%`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Marketing & Reach Insights */}
              <div className="flex flex-col gap-4 rounded-xl border border-[#dbe1e6] p-6">
                <h3 className="text-[#111518] text-lg font-semibold leading-tight">Marketing & Reach Insights</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#617989] text-sm font-medium">Total Views</p>
                    <p className="text-[#111518] text-xl font-bold">
                      {loading ? '...' : error ? 'N/A' : formatNumber(analytics?.analytics?.totalViews)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#617989] text-sm font-medium">Total Reach</p>
                    <p className="text-[#111518] text-xl font-bold">
                      {loading ? '...' : error ? 'N/A' : formatNumber(analytics?.analytics?.reach)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#617989] text-sm font-medium">Applications</p>
                    <p className="text-[#111518] text-xl font-bold">
                      {loading ? '...' : error ? 'N/A' : formatNumber(analytics?.analytics?.totalApplications)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#617989] text-sm font-medium">Impressions</p>
                    <p className="text-[#111518] text-xl font-bold">
                      {loading ? '...' : error ? 'N/A' : formatNumber(analytics?.analytics?.totalImpressions)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Events Table */}
            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-xl border border-[#dbe1e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Event Name</th>
                      <th className="px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Date</th>
                      <th className="px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Location</th>
                      <th className="px-4 py-3 text-left text-[#111518] w-[200px] text-sm font-medium leading-normal">Sponsor Bids</th>
                      <th className="px-4 py-3 text-left text-[#111518] w-60 text-sm font-medium leading-normal">Status</th>
                      <th className="px-4 py-3 text-left text-[#617989] w-60 text-sm font-medium leading-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventsLoading ? (
                      <tr className="border-t border-t-[#dbe1e6]">
                        <td colSpan={5} className="h-[72px] px-4 py-2 text-center text-[#617989] text-sm">
                          Loading events...
                        </td>
                      </tr>
                    ) : eventsError ? (
                      <tr className="border-t border-t-[#dbe1e6]">
                        <td colSpan={5} className="h-[72px] px-4 py-2 text-center text-red-500 text-sm">
                          {eventsError}
                        </td>
                      </tr>
                    ) : getFilteredEvents().length === 0 ? (
                      <tr className="border-t border-t-[#dbe1e6]">
                        <td colSpan={5} className="h-[72px] px-4 py-2 text-center text-[#617989] text-sm">
                          No {activeTab} events found
                        </td>
                      </tr>
                    ) : (
                      getFilteredEvents().map((event) => (
                        <tr key={event._id} className="border-t border-t-[#dbe1e6]">
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">
                            {event.title}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">
                            {new Date(event.eventDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">
                            {event.venue}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[200px] text-sm font-bold leading-normal">
                            <span className="inline-flex items-center justify-center px-2 py-1 bg-blue-50 text-blue-700 rounded-lg">
                              {getEventBidCount(event._id)}
                            </span>
                          </td>
                          <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                            <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium ${event.status === 'published' ? 'bg-green-100 text-green-800' :
                              event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                event.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                  event.status === 'ongoing' ? 'bg-purple-100 text-purple-800' :
                                    'bg-gray-100 text-gray-800'
                              }`}>
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </span>
                          </td>
                          <td className="h-[72px] px-4 py-2 w-60 text-[#617989] text-sm font-bold leading-normal tracking-[0.015em] text-left">
                            <button
                              onClick={() => navigate(`/view-event/${event._id}`)}
                              className="hover:text-[#111518] transition-colors"
                            >
                              View
                            </button>
                            <span className="mx-2">|</span>
                            <button
                              onClick={() => navigate(`/event-management/${event._id}`)}
                              className="hover:text-[#111518] transition-colors"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="layout-content-container flex flex-col w-[360px]">
            {/* Manage Club Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Manage Club</h2>
            <div className="flex p-4">
              <div className="flex w-full flex-col gap-4 items-start">
                {clubLoading ? (
                  <div className="text-center text-[#617989] p-4">
                    <p>Loading club profile...</p>
                  </div>
                ) : clubError || !clubProfile ? (
                  <div className="flex gap-4 flex-col items-start">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                      style={{ backgroundImage: 'url("https://placehold.co/200x200/f0f3f4/617989?text=C")' }}
                    ></div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] text-left">SponZilla Club</p>
                      <p className="text-[#617989] text-base font-normal leading-normal text-left">Student Organization</p>
                      <p className="text-red-500 text-xs mt-1">⚠ {clubError || 'Unable to load profile'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4 flex-col items-start">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                      style={{
                        backgroundImage: clubProfile.logo
                          ? `url("${clubProfile.logo}")`
                          : `url("https://placehold.co/200x200/f0f3f4/617989?text=${encodeURIComponent(clubProfile.clubName.charAt(0))}")`
                      }}
                    ></div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] text-left">{clubProfile.clubName}</p>
                        {clubProfile.verified && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <p className="text-green-700 text-xs font-medium">Verified</p>
                          </div>
                        )}
                      </div>
                      <p className="text-[#617989] text-base font-normal leading-normal text-left">{clubProfile.university}</p>
                      <p className="text-[#617989] text-sm font-normal leading-normal text-left">{clubProfile.memberCount} members • Est. {clubProfile.establishedYear}</p>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => navigate('/club-settings')}
                  className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px] hover:bg-[#e8f0f5] transition-colors"
                >
                  <span className="truncate">Edit Profile</span>
                </button>
              </div>
            </div>

            {/* Manage Sponsors Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Manage Sponsors</h2>
            <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setActiveModal('current')}>
              <p className="text-[#111518] text-base font-normal leading-normal flex-1 truncate text-left">Current Sponsors</p>
              <div className="shrink-0"><button className="text-base font-medium leading-normal hover:text-[#111518] transition-colors">View</button></div>
            </div>
            <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setActiveModal('potential')}>
              <p className="text-[#111518] text-base font-normal leading-normal flex-1 truncate text-left">Potential Sponsors</p>
              <div className="shrink-0"><button className="text-base font-medium leading-normal hover:text-[#111518] transition-colors">View</button></div>
            </div>
            <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setActiveModal('requests')}>
              <p className="text-[#111518] text-base font-normal leading-normal flex-1 truncate text-left">Sponsorship Requests</p>
              <div className="shrink-0"><button className="text-base font-medium leading-normal hover:text-[#111518] transition-colors">View</button></div>
            </div>

            {/* Recommended Sponsors Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Recommended Sponsors</h2>
            {brandsLoading ? (
              <div className="p-4 text-center text-[#617989]">
                <p>Loading recommended sponsors...</p>
              </div>
            ) : brandsError ? (
              <div className="p-4 text-center text-red-500">
                <p>⚠ {brandsError}</p>
              </div>
            ) : recommendedBrands.length === 0 ? (
              <div className="p-4 text-center text-[#617989]">
                <p>No recommended sponsors available</p>
              </div>
            ) : (
              <>
                {recommendedBrands.map((brand) => {
                  // Calculate match percentage based on brand characteristics
                  const getMatchPercentage = (brand: BrandProfile) => {
                    let score = 80; // Base score
                    if (brand.verified) score += 10;
                    if (brand.targetAudience?.includes('students')) score += 5;
                    if (brand.industry === 'technology') score += 5;
                    return Math.min(score, 98);
                  };

                  const getMatchReason = (brand: BrandProfile) => {
                    if (brand.industry === 'technology') return 'tech events';
                    if (brand.industry === 'finance') return 'fintech events';
                    if (brand.industry === 'automobile') return 'automotive events';
                    return 'general events';
                  };

                  return (
                    <div
                      key={brand._id}
                      className="p-4 cursor-pointer hover:bg-gray-50 transition-colors rounded-xl mx-2"
                      onClick={() => navigate(`/brand-profile/${brand._id}`)}
                    >
                      <div className="flex items-stretch justify-between gap-4 rounded-xl">
                        <div className="flex flex-col gap-1 flex-[2_2_0px]">
                          <p className="text-[#617989] text-sm font-normal leading-normal text-left">Recommended</p>
                          <div className="flex items-center gap-2">
                            <p className="text-[#111518] text-base font-bold leading-tight text-left">{brand.brandName}</p>
                            {brand.verified && (
                              <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                <p className="text-green-700 text-xs font-medium">Verified</p>
                              </div>
                            )}
                          </div>
                          <p className="text-[#617989] text-sm font-normal leading-normal text-left">
                            {brand.description && brand.description.length > 80
                              ? brand.description.substring(0, 80) + '...'
                              : brand.description || 'Click to view their profile.'
                            }
                          </p>
                          <p className="text-[#078838] text-xs font-medium mt-1">
                            {getMatchPercentage(brand)}% match for {getMatchReason(brand)}
                          </p>
                        </div>
                        <div
                          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                          style={{
                            backgroundImage: brand.logo
                              ? `url("${brand.logo}")`
                              : `url("https://placehold.co/200x120/f0f3f4/617989?text=${encodeURIComponent(brand.brandName.charAt(0))}")`
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}

                {/* Demo Non-Existent Brand for Error Handling */}
                <div className="p-4 cursor-pointer hover:bg-gray-50 transition-colors rounded-xl mx-2" onClick={() => navigate('/brand-profile/999999999999999999999999')}>
                  <div className="flex items-stretch justify-between gap-4 rounded-xl">
                    <div className="flex flex-col gap-1 flex-[2_2_0px]">
                      <p className="text-[#617989] text-sm font-normal leading-normal text-left">Demo</p>
                      <p className="text-[#111518] text-base font-bold leading-tight text-left">Demo Non-Existent Brand</p>
                      <p className="text-[#617989] text-sm font-normal leading-normal text-left">
                        This is a demo brand with non-existent ID to show error handling. Click to see "Brand not found" message.
                      </p>
                      <p className="text-[#f44336] text-xs font-medium mt-1">⚠️ Demo: Will show error</p>
                    </div>
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")' }}
                    ></div>
                  </div>
                </div>
              </>
            )}

            {/* View All Sponsors Button */}
            <div className="px-4 pb-4">
              <button
                onClick={() => navigate('/find-brands')}
                className="w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#dce8f3] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#c8ddf0] transition-colors"
              >
                <span className="truncate">View All Sponsors</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Sponsorship Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">
                {activeModal === 'current' ? 'Current Sponsors' : 
                 activeModal === 'potential' ? 'Potential Sponsors' : 
                 'Sponsorship Requests'}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                </svg>
              </button>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {activeModal === 'requests' && (
                <div className="space-y-4">
                  {requestsLoading ? (
                    <p className="text-center py-4 text-gray-500">Loading requests...</p>
                  ) : sponsorshipRequests.filter(r => r.status === 'pending').length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No pending sponsorship requests</p>
                  ) : (
                    sponsorshipRequests.filter(r => r.status === 'pending').map((req) => (
                      <div key={req._id} className="p-4 border border-gray-100 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                              {req.brandId.brandName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{req.brandId.brandName}</p>
                              <p className="text-xs text-gray-500">Applied for {req.eventId.title}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-blue-600">₹{req.amount.toLocaleString()}</p>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">{req.tierName} Tier</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4 bg-white p-3 rounded-lg border border-gray-100 italic">
                          "{req.message}"
                        </p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleUpdateStatus(req._id, 'accepted')}
                            className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(req._id, 'rejected')}
                            className="flex-1 bg-white border border-red-200 text-red-600 py-2 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors"
                          >
                            Reject
                          </button>
                          <button 
                            onClick={() => navigate('/messages')}
                            className="px-4 bg-blue-50 text-blue-600 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors"
                          >
                            Chat
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeModal === 'current' && (
                <div className="space-y-4">
                  {sponsorshipRequests.filter(r => r.status === 'accepted').length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No active sponsors yet</p>
                  ) : (
                    sponsorshipRequests.filter(r => r.status === 'accepted').map((req) => (
                      <div key={req._id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center font-bold text-green-700 border border-green-100">
                            {req.brandId.brandName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{req.brandId.brandName}</p>
                            <p className="text-xs text-gray-500">Sponsoring {req.eventId.title}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">₹{req.amount.toLocaleString()}</p>
                          <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase">
                            {req.tierName}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeModal === 'potential' && (
                <div className="space-y-4">
                  {recommendedBrands.map((brand) => (
                    <div key={brand._id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-blue-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-700 border border-blue-100 overflow-hidden">
                          {brand.logo ? <img src={brand.logo} alt="" className="w-full h-full object-cover" /> : brand.brandName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{brand.brandName}</p>
                          <p className="text-xs text-gray-500">{brand.industry} • {brand.website}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => navigate(`/brand-profile/${brand._id}`)}
                        className="bg-[#1980e6] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
                      >
                        View Profile
                      </button>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => navigate('/find-brands')}
                      className="w-full py-3 text-blue-600 font-bold text-sm hover:underline"
                    >
                      Browse all potential sponsors →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubDashboard;
