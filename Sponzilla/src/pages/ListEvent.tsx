import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SmartNavbar } from '../components/layout/Navbar';
import { useUser } from '../contexts/UserContext';
import { eventsAPI } from '../services/api';
import type { CreateEventData } from '../services/api';

const ListEventPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expectedAttendees, setExpectedAttendees] = useState('');
  const [budgetTotal, setBudgetTotal] = useState('');
  const [sponsorshipNeeded, setSponsorshipNeeded] = useState('');

  const [goldAmount, setGoldAmount] = useState('');
  const [goldBenefits, setGoldBenefits] = useState('');
  const [silverAmount, setSilverAmount] = useState('');
  const [silverBenefits, setSilverBenefits] = useState('');
  const [bronzeAmount, setBronzeAmount] = useState('');
  const [bronzeBenefits, setBronzeBenefits] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.type !== 'club') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !eventDate || !venue || !description || !category || !expectedAttendees || !budgetTotal || !sponsorshipNeeded) {
      setError('Please fill in all required fields.');
      return;
    }

    const dateTimeString = eventTime
      ? `${eventDate}T${eventTime}:00`
      : `${eventDate}T00:00:00`;

    const tiers: CreateEventData['sponsorshipTiers'] = [];
    if (goldAmount) {
      tiers.push({
        name: 'Gold',
        amount: Number(goldAmount),
        benefits: goldBenefits.split('\n').filter(b => b.trim()),
        spotsAvailable: 1,
      });
    }
    if (silverAmount) {
      tiers.push({
        name: 'Silver',
        amount: Number(silverAmount),
        benefits: silverBenefits.split('\n').filter(b => b.trim()),
        spotsAvailable: 2,
      });
    }
    if (bronzeAmount) {
      tiers.push({
        name: 'Bronze',
        amount: Number(bronzeAmount),
        benefits: bronzeBenefits.split('\n').filter(b => b.trim()),
        spotsAvailable: 3,
      });
    }

    const eventData: CreateEventData = {
      title,
      description,
      eventDate: dateTimeString,
      category,
      venue,
      expectedAttendees: Number(expectedAttendees),
      budget: {
        total: Number(budgetTotal),
        sponsorshipNeeded: Number(sponsorshipNeeded),
      },
      sponsorshipTiers: tiers,
      status: 'published',
    };

    try {
      setLoading(true);
      await eventsAPI.createEvent(eventData);
      navigate('/club-dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal";
  const textareaClass = "form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] min-h-24 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal";

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <SmartNavbar />

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h1 className="text-[#121416] text-[32px] font-bold leading-tight tracking-[-0.015em] px-4 pb-6 pt-5">List Your Event</h1>

            {error && (
              <div className="mx-4 mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Event Name */}
              <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Event Name *</p>
                  <input
                    placeholder="Enter event name"
                    className={inputClass}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
              </div>

              {/* Category */}
              <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Category *</p>
                  <select
                    className={inputClass}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="cultural-fest">Cultural Fest</option>
                    <option value="sports-event">Sports Event</option>
                    <option value="workshop">Workshop</option>
                    <option value="conference">Conference</option>
                    <option value="competition">Competition</option>
                    <option value="seminar">Seminar</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              {/* Date */}
              <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Date *</p>
                  <input
                    type="date"
                    className={inputClass}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </label>
              </div>

              {/* Time */}
              <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Time</p>
                  <input
                    type="time"
                    className={inputClass}
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                  />
                </label>
              </div>

              {/* Location */}
              <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Venue *</p>
                  <input
                    placeholder="Enter event venue"
                    className={inputClass}
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                  />
                </label>
              </div>

              {/* Description */}
              <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Description *</p>
                  <textarea
                    placeholder="Describe your event and what makes it special..."
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] min-h-32 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
              </div>

              {/* Expected Attendance */}
              <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Expected Attendance *</p>
                  <input
                    type="number"
                    placeholder="Number of expected attendees"
                    className={inputClass}
                    value={expectedAttendees}
                    onChange={(e) => setExpectedAttendees(e.target.value)}
                  />
                </label>
              </div>

              {/* Budget Section */}
              <h3 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-4 pt-4">Budget</h3>

              <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Total Budget ($) *</p>
                  <input
                    type="number"
                    placeholder="e.g., 10000"
                    className={inputClass}
                    value={budgetTotal}
                    onChange={(e) => setBudgetTotal(e.target.value)}
                  />
                </label>
              </div>

              <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Sponsorship Needed ($) *</p>
                  <input
                    type="number"
                    placeholder="e.g., 8000"
                    className={inputClass}
                    value={sponsorshipNeeded}
                    onChange={(e) => setSponsorshipNeeded(e.target.value)}
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
                    className={inputClass}
                    value={goldAmount}
                    onChange={(e) => setGoldAmount(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Gold Tier Benefits</p>
                  <textarea
                    placeholder="List benefits, one per line..."
                    className={textareaClass}
                    value={goldBenefits}
                    onChange={(e) => setGoldBenefits(e.target.value)}
                  />
                </label>
              </div>

              {/* Tier 2 - Silver */}
              <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Silver Tier - Amount ($)</p>
                  <input
                    type="number"
                    placeholder="e.g., 3000"
                    className={inputClass}
                    value={silverAmount}
                    onChange={(e) => setSilverAmount(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Silver Tier Benefits</p>
                  <textarea
                    placeholder="List benefits, one per line..."
                    className={textareaClass}
                    value={silverBenefits}
                    onChange={(e) => setSilverBenefits(e.target.value)}
                  />
                </label>
              </div>

              {/* Tier 3 - Bronze */}
              <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Bronze Tier - Amount ($)</p>
                  <input
                    type="number"
                    placeholder="e.g., 1000"
                    className={inputClass}
                    value={bronzeAmount}
                    onChange={(e) => setBronzeAmount(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#121416] text-base font-medium leading-normal pb-2 text-left">Bronze Tier Benefits</p>
                  <textarea
                    placeholder="List benefits, one per line..."
                    className={textareaClass}
                    value={bronzeBenefits}
                    onChange={(e) => setBronzeBenefits(e.target.value)}
                  />
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex px-4 py-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="truncate">{loading ? 'Creating Event...' : 'List Event'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListEventPage;
