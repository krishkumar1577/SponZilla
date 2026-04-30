import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas-pro';
import { useNavigate } from 'react-router-dom';
import { SmartNavbar } from '../../components/layout/Navbar';
import { eventsAPI } from '../../services/api';
import PitchCard from '../../components/club/PitchCard';

interface EventFormData {
  eventName: string;
  eventDescription: string;
  eventType: string;
  expectedAttendance: string;
  targetAudience: string;
  eventDate: string;
  location: string;
  budget: string;
  sponsorshipTiers: Array<{
    name: string;
    price: string;
    benefits: string;
  }>;
}

interface PitchContent {
  subjectLine: string;
  emailBody: string;
}

const AIPitchDeckGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pitchPreview, setPitchPreview] = useState<PitchContent | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<EventFormData>({
    eventName: '',
    eventDescription: '',
    eventType: '',
    expectedAttendance: '',
    targetAudience: '',
    eventDate: '',
    location: '',
    budget: '',
    sponsorshipTiers: [
      { name: 'Gold', price: '', benefits: '' },
      { name: 'Silver', price: '', benefits: '' },
      { name: 'Bronze', price: '', benefits: '' },
    ],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    tierIndex?: number
  ) => {
    const { name, value } = e.target;

    if (tierIndex !== undefined) {
      const newTiers = [...formData.sponsorshipTiers];
      newTiers[tierIndex] = {
        ...newTiers[tierIndex],
        [name]: value,
      };
      setFormData((prev) => ({
        ...prev,
        sponsorshipTiers: newTiers,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setError('');
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.eventName.trim()) {
          setError('Please enter an event name');
          return false;
        }
        if (!formData.eventDescription.trim()) {
          setError('Please enter an event description');
          return false;
        }
        if (!formData.eventType) {
          setError('Please select an event type');
          return false;
        }
        return true;

      case 2:
        if (!formData.expectedAttendance) {
          setError('Please enter expected attendance');
          return false;
        }
        if (!formData.targetAudience.trim()) {
          setError('Please describe your target audience');
          return false;
        }
        if (!formData.eventDate) {
          setError('Please select an event date');
          return false;
        }
        if (!formData.location.trim()) {
          setError('Please enter event location');
          return false;
        }
        return true;

      case 3:
        if (!formData.budget) {
          setError('Please enter budget information');
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (currentStep === 3) {
      await generatePitchPreview();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  const generatePitchPreview = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await eventsAPI.getPitchContentPreview({
        eventName: formData.eventName,
        eventDescription: formData.eventDescription,
        eventType: formData.eventType,
        expectedAttendance: formData.expectedAttendance,
        targetAudience: formData.targetAudience,
        eventDate: formData.eventDate,
        budget: formData.budget,
        sponsorshipTiers: formData.sponsorshipTiers.map((tier) => ({
          name: tier.name,
          price: parseInt(tier.price) || 0,
          benefits: tier.benefits.split('\n').filter((b) => b.trim()),
        })),
      });

      if (response.success) {
        setPitchPreview(response.data);
        setCurrentStep(4);
        setSuccess('Pitch email generated! Ready to copy?');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate pitch preview');
    } finally {
      setLoading(false);
    }
  };

  const handlePitchUpdate = (field: 'subjectLine' | 'emailBody', value: string) => {
    if (pitchPreview) {
      setPitchPreview({
        ...pitchPreview,
        [field]: value
      });
    }
  };

  const copyToClipboard = () => {
    if (!pitchPreview) return;
    const textToCopy = `Subject: ${pitchPreview.subjectLine}\n\n${pitchPreview.emailBody}`;
    navigator.clipboard.writeText(textToCopy);
    setSuccess('Pitch copied to clipboard! You can now paste it into your email client.');
    setTimeout(() => {
      navigate('/club-dashboard');
    }, 3000);
  };

  const downloadAsImage = async () => {
    if (!cardRef.current) return;
    try {
      setLoading(true);
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // High resolution
        backgroundColor: '#ffffff',
        useCORS: true
      });
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `${formData.eventName.replace(/\\s+/g, '_')}_Pitch_Card.png`;
      link.href = dataUrl;
      link.click();
      setSuccess('Pitch Card downloaded successfully!');
    } catch (err) {
      console.error('Failed to generate image', err);
      setError('Failed to download image.');
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = (currentStep / 4) * 100;

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{
        '--select-button-svg':
          'url(\'data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(97,121,137)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e\')',
        fontFamily: 'Inter, "Noto Sans", sans-serif',
      } as React.CSSProperties & Record<string, any>}
    >
      <div className="layout-container flex h-full grow flex-col">
        <SmartNavbar />

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight text-left">
                  AI Email Pitch Generator
                </p>
                <p className="text-[#617989] text-sm font-normal leading-normal text-left">
                  Generate a highly persuasive cold email to attract sponsors for your events.
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">
                  Step {currentStep} of 4: {['Event Details', 'Event Information', 'Sponsorship', 'Review & Copy'][currentStep - 1]}
                </p>
              </div>
              <div className="rounded bg-[#dbe1e6]">
                <div
                  className="h-2 rounded bg-[#118ee8] transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mx-4 p-3 mb-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="mx-4 p-3 mb-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}

            {/* STEP 1: Event Details */}
            {currentStep === 1 && (
              <>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">
                      Event Name
                    </p>
                    <input
                      name="eventName"
                      placeholder="Enter the name of your event"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      value={formData.eventName}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">
                      Event Description
                    </p>
                    <textarea
                      name="eventDescription"
                      placeholder="Describe your event in detail..."
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] min-h-36 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      value={formData.eventDescription}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">
                      Event Type
                    </p>
                    <select
                      name="eventType"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 bg-[image:var(--select-button-svg)] placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      value={formData.eventType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select event type</option>
                      <option value="academic">Academic Conference</option>
                      <option value="cultural">Cultural Event</option>
                      <option value="sports">Sports Tournament</option>
                      <option value="networking">Networking Event</option>
                      <option value="workshop">Workshop/Seminar</option>
                      <option value="fundraiser">Fundraiser</option>
                      <option value="social">Social Event</option>
                      <option value="competition">Competition</option>
                      <option value="hackathon">Hackathon</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>
              </>
            )}

            {/* STEP 2: Event Information */}
            {currentStep === 2 && (
              <>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">
                      Expected Attendance
                    </p>
                    <input
                      name="expectedAttendance"
                      placeholder="e.g., 500"
                      type="number"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      value={formData.expectedAttendance}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">
                      Target Audience
                    </p>
                    <input
                      name="targetAudience"
                      placeholder="e.g., Students, Tech enthusiasts, etc."
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      value={formData.targetAudience}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">
                      Event Date
                    </p>
                    <input
                      name="eventDate"
                      placeholder="Select event date"
                      type="date"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">
                      Event Location
                    </p>
                    <input
                      name="location"
                      placeholder="e.g., Main Hall, Building A"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </>
            )}

            {/* STEP 3: Sponsorship Tiers */}
            {currentStep === 3 && (
              <>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">
                      Total Event Budget
                    </p>
                    <input
                      name="budget"
                      placeholder="e.g., 50000"
                      type="number"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      value={formData.budget}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>

                <p className="text-[#111518] text-base font-medium leading-normal pb-2 px-4 pt-4 text-left">
                  Sponsorship Tiers
                </p>

                {formData.sponsorshipTiers.map((tier, index) => (
                  <div key={index} className="px-4 py-3 border-l-4 border-l-[#118ee8] bg-[#f0f3f4] rounded mb-3">
                    <div className="flex max-w-[480px] flex-wrap items-end gap-4 mb-3">
                      <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-[#111518] text-sm font-medium leading-normal pb-2 text-left">
                          Tier Name
                        </p>
                        <input
                          name="name"
                          placeholder="e.g., Gold"
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-10 placeholder:text-[#617989] p-[10px] text-sm font-normal leading-normal"
                          value={tier.name}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </label>
                    </div>

                    <div className="flex max-w-[480px] flex-wrap items-end gap-4 mb-3">
                      <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-[#111518] text-sm font-medium leading-normal pb-2 text-left">
                          Price
                        </p>
                        <input
                          name="price"
                          placeholder="e.g., 10000"
                          type="number"
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-10 placeholder:text-[#617989] p-[10px] text-sm font-normal leading-normal"
                          value={tier.price}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </label>
                    </div>

                    <div className="flex max-w-[480px] flex-wrap items-end gap-4">
                      <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-[#111518] text-sm font-medium leading-normal pb-2 text-left">
                          Benefits (one per line)
                        </p>
                        <textarea
                          name="benefits"
                          placeholder="Logo on website&#10;Social media mention&#10;Booth space"
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] min-h-20 placeholder:text-[#617989] p-[10px] text-sm font-normal leading-normal"
                          value={tier.benefits}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* STEP 4: Preview & Download */}
            {currentStep === 4 && pitchPreview && (
              <div className="px-4 py-5">
                <div className="bg-white rounded-xl shadow-sm border border-[#dbe1e6] p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[#111518] text-base font-medium">Generated Pitch Card</p>
                  </div>

                  <PitchCard
                    ref={cardRef}
                    pitchPreview={pitchPreview}
                    onUpdate={handlePitchUpdate}
                    formData={{
                      eventName: formData.eventName,
                      eventDate: formData.eventDate,
                      location: formData.location,
                      expectedAttendance: formData.expectedAttendance,
                      sponsorshipTiers: formData.sponsorshipTiers
                    }}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex px-4 py-3 justify-between gap-3">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1 || loading}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="truncate">Previous</span>
              </button>

              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#118ee8] text-white text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="truncate">{loading ? 'Generating...' : 'Next'}</span>
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    disabled={loading}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-white border border-[#dbe1e6] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span className="truncate">Copy Text</span>
                  </button>
                  <button
                    onClick={downloadAsImage}
                    disabled={loading}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#118ee8] text-white text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0f7bc9] shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="truncate">{loading ? 'Downloading...' : 'Download Card'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPitchDeckGenerator;
