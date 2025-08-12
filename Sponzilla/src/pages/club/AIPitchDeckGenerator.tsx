import React, { useState } from 'react';
import { SmartNavbar } from '../../components/layout/Navbar';

interface EventFormData {
  eventName: string;
  eventDescription: string;
  eventType: string;
  expectedAttendance: string;
  targetAudience: string;
}

const AIPitchDeckGenerator: React.FC = () => {
  const [formData, setFormData] = useState<EventFormData>({
    eventName: '',
    eventDescription: '',
    eventType: '',
    expectedAttendance: '',
    targetAudience: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    // Handle form submission and proceed to next step
    console.log('Form data:', formData);
  };

  return (
    <div 
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" 
      style={{ 
        '--select-button-svg': 'url(\'data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(97,121,137)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e\')',
        fontFamily: 'Inter, "Noto Sans", sans-serif'
      } as React.CSSProperties & Record<string, any>}
    >
      <div className="layout-container flex h-full grow flex-col">
        <SmartNavbar />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight text-left">AI Pitch Deck Generator</p>
                <p className="text-[#617989] text-sm font-normal leading-normal text-left">Create a compelling pitch deck to attract sponsors for your club's events.</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Step 1 of 4: Event Details</p>
              </div>
              <div className="rounded bg-[#dbe1e6]">
                <div className="h-2 rounded bg-[#111518]" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Event Name</p>
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
                <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Event Description</p>
                <textarea
                  name="eventDescription"
                  placeholder="Describe your event in detail"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] min-h-36 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                  value={formData.eventDescription}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Event Type</p>
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
                </select>
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Expected Attendance</p>
                <input
                  name="expectedAttendance"
                  placeholder="Enter expected attendance"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                  value={formData.expectedAttendance}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Target Audience</p>
                <input
                  name="targetAudience"
                  placeholder="Describe your target audience"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="flex px-4 py-3 justify-end">
              <button
                onClick={handleNext}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#118ee8] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPitchDeckGenerator;
