import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { SmartNavbar } from '../../components/layout/Navbar';
import { eventsAPI } from '../../services/api';
import type { Event } from '../../services/api';

const EventManagement: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  useEffect(() => {
    if (!eventId) {
      navigate('/club-dashboard');
      return;
    }

    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await eventsAPI.getEventById(eventId);
        const ev = response.event;
        setEvent(ev);
        setEventName(ev.title);
        setEventDescription(ev.description);
        if (ev.eventDate) {
          const d = new Date(ev.eventDate);
          setEventDate(d.toISOString().split('T')[0]);
          setEventTime(d.toTimeString().slice(0, 5));
        }
        setEventLocation(ev.venue);
      } catch (err: any) {
        setError(err.message || 'Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, navigate]);

  const handleSave = async () => {
    if (!eventId) return;
    setError(null);
    setSuccessMsg(null);

    const dateTimeString = eventTime
      ? `${eventDate}T${eventTime}:00`
      : `${eventDate}T00:00:00`;

    try {
      setSaving(true);
      const response = await eventsAPI.updateEvent(eventId, {
        title: eventName,
        description: eventDescription,
        eventDate: dateTimeString,
        venue: eventLocation,
      } as any);
      setEvent(response.event);
      setSuccessMsg('Event updated successfully!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
        <div className="layout-container flex h-full grow flex-col">
          <SmartNavbar />
          <div className="flex items-center justify-center flex-1">
            <p className="text-[#617989] text-lg">Loading event...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
        <div className="layout-container flex h-full grow flex-col">
          <SmartNavbar />
          <div className="flex items-center justify-center flex-1 flex-col gap-4">
            <p className="text-red-500 text-lg">{error}</p>
            <Link to="/club-dashboard" className="text-[#1980e6] text-sm font-medium hover:underline">Back to Dashboard</Link>
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
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 p-4">
              <Link to="/club-dashboard" className="text-[#617989] text-base font-medium leading-normal">Dashboard</Link>
              <span className="text-[#617989] text-base font-medium leading-normal">/</span>
              <span className="text-[#111518] text-base font-medium leading-normal">Event: {event?.title}</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight text-left">{event?.title}</p>
                <p className="text-[#617989] text-sm font-normal leading-normal text-left">Manage all aspects of your event, from details to sponsor interactions.</p>
              </div>
            </div>

            {error && (
              <div className="mx-4 mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="mx-4 mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                {successMsg}
              </div>
            )}

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
                  type="date"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </label>
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Time</p>
                <input
                  type="time"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Venue</p>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                />
              </label>
            </div>

            <div className="flex px-4 py-3 justify-start">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="truncate">{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>

            {/* Sponsorship Management Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Sponsorship Management</h2>

            {/* Sponsorship Tiers */}
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">Sponsorship Tiers</h3>
            {event?.sponsorshipTiers && event.sponsorshipTiers.length > 0 ? (
              <div className="px-4 py-3 @container">
                <div className="flex overflow-hidden rounded-xl border border-[#dbe1e6] bg-white">
                  <table className="flex-1">
                    <thead>
                      <tr className="bg-white">
                        <th className="px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Tier Name</th>
                        <th className="px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Benefits</th>
                        <th className="px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Price</th>
                        <th className="px-4 py-3 text-left text-[#111518] w-60 text-sm font-medium leading-normal">Spots</th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.sponsorshipTiers.map((tier, index) => (
                        <tr key={index} className="border-t border-t-[#dbe1e6]">
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">{tier.name}</td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">
                            {tier.benefits.join(', ')}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">
                            ${tier.amount.toLocaleString()}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-60 text-[#617989] text-sm font-normal leading-normal text-left">
                            {tier.spotsTaken}/{tier.spotsAvailable} taken
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="px-4 py-6">
                <p className="text-[#617989] text-sm">No sponsorship tiers configured for this event.</p>
              </div>
            )}

            {/* Sponsor Interactions */}
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">Sponsor Interactions</h3>
            <div className="px-4 py-6">
              <div className="flex flex-col items-center justify-center py-8 border border-[#dbe1e6] rounded-xl bg-[#f8f9fa]">
                <p className="text-[#617989] text-sm">No sponsor interactions yet.</p>
                <p className="text-[#617989] text-xs mt-1">Interactions will appear here once brands show interest in your event.</p>
              </div>
            </div>

            {/* Agreements */}
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">Agreements</h3>
            <div className="px-4 py-6">
              <div className="flex flex-col items-center justify-center py-8 border border-[#dbe1e6] rounded-xl bg-[#f8f9fa]">
                <p className="text-[#617989] text-sm">No agreements yet.</p>
                <p className="text-[#617989] text-xs mt-1">Sponsorship agreements will appear here once confirmed.</p>
              </div>
            </div>

            {/* Funds Tracking */}
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">Funds Tracking</h3>
            <div className="px-4 py-6">
              <div className="flex flex-col items-center justify-center py-8 border border-[#dbe1e6] rounded-xl bg-[#f8f9fa]">
                <p className="text-[#617989] text-sm">No funds received yet.</p>
                <p className="text-[#617989] text-xs mt-1">Fund tracking will be available once sponsorships are confirmed.</p>
              </div>
            </div>

            {/* Analytics Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Analytics</h2>
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Views</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">
                  {event?.analytics?.views?.toLocaleString() || '0'}
                </p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Impressions</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">
                  {event?.analytics?.impressions?.toLocaleString() || '0'}
                </p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Applications</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">
                  {event?.analytics?.applications?.toLocaleString() || '0'}
                </p>
              </div>
            </div>

            {/* Promotional Tools Section */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Promotional Tools</h2>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">Access resources to promote your event and attract more attendees.</p>
            <div className="flex px-4 py-3 justify-start">
              <Link
                to="/ai-pitch-deck"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Generate AI Email Pitch</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
