import React, { forwardRef } from 'react';

interface PitchCardProps {
  pitchPreview: { subjectLine: string; emailBody: string };
  formData: {
    eventName: string;
    eventDate: string;
    location: string;
    expectedAttendance: string;
    sponsorshipTiers: Array<{ name: string; price: string; benefits: string }>;
  };
  onUpdate?: (field: 'subjectLine' | 'emailBody', value: string) => void;
}

const PitchCard = forwardRef<HTMLDivElement, PitchCardProps>(
  ({ pitchPreview, formData, onUpdate }, ref) => {
    const initial = formData.eventName?.charAt(0).toUpperCase() ?? 'S';

    // Calculate minimum package price
    const minPrice = formData.sponsorshipTiers.length > 0
      ? Math.min(...formData.sponsorshipTiers.filter(t => t.price).map(t => parseInt(t.price) || 0))
      : 5000;
    const formattedMinPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(minPrice);

    return (
      <div ref={ref} className="relative bg-[#F7F3EE] overflow-hidden" style={{ fontFamily: "'Syne', sans-serif" }}>
        {/* Left editorial bar */}
        <div className="absolute top-0 left-0 w-1 h-full bg-[#1A1A1A]" />

        {/* Hero — split layout */}
        <div className="grid relative overflow-hidden" style={{ gridTemplateColumns: '1fr 180px', background: '#1A1A1A' }}>
          <div className="p-10 pb-8 pl-10 text-left">
            <div className="flex items-center gap-2 mb-5">
              <span style={{
                fontFamily: "'Syne', sans-serif", fontSize: '9px', fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8A97E',
                border: '1px solid rgba(200,169,126,0.4)', padding: '4px 10px'
              }}>
                Sponsorship Proposal
              </span>
              <div className="flex-1 h-px" style={{ background: 'rgba(200,169,126,0.25)' }} />
            </div>

            {/* Subject Line Editable */}
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onUpdate?.('subjectLine', e.currentTarget.innerText)}
              className="outline-none focus:ring-1 focus:ring-[#C8A97E] rounded p-1 -ml-1"
              style={{
                fontFamily: "'Playfair Display', serif", fontSize: '1.2rem',
                fontWeight: 700, color: '#C8A97E', marginBottom: '10px'
              }}
            >
              {pitchPreview.subjectLine}
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif", fontSize: '2.1rem',
              fontWeight: 900, lineHeight: 1.05, color: '#F7F3EE'
            }}>
              Partner with<br />
              <em style={{ fontStyle: 'italic', fontWeight: 700, color: '#C8A97E' }}>
                {formData.eventName || 'TechSummit'}
              </em><br />
              2026.
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 py-8 px-4" style={{ background: '#C8A97E' }}>
            {[
              [`${formData.expectedAttendance || '5K'}+`, 'Attendees'],
              ['120', 'Speakers'],
              ['3', 'Days']
            ].map(([num, label], i, arr) => (
              <React.Fragment key={label}>
                <div className="text-center">
                  <div 
                    contentEditable={i > 0} // Attendees is driven by form, others are editable
                    suppressContentEditableWarning
                    className={i > 0 ? "outline-none focus:ring-1 focus:ring-[#1A1A1A] rounded px-1" : ""}
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 900, color: '#1A1A1A', lineHeight: 1 }}
                  >
                    {num}
                  </div>
                  <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.6)', marginTop: 3 }}>{label}</div>
                </div>
                {i < arr.length - 1 && <div style={{ width: 24, height: 1, background: 'rgba(26,26,26,0.25)' }} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Meta strip */}
        <div className="flex" style={{ background: '#242424', height: 36 }}>
          {[
            { icon: <CalIcon />, label: formData.eventDate || 'Date TBD' },
            { icon: <PinIcon />, label: formData.location || 'Location TBD' },
            { icon: <ClockIcon />, label: `Packages from ${formattedMinPrice}` },
          ].map(({ icon, label }, i) => (
            <div key={i} className="flex items-center gap-1.5 flex-1 px-4 text-left"
              style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              {icon}
              <span style={{ fontSize: '10px', color: 'rgba(247,243,238,0.7)', letterSpacing: '0.04em' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="px-10 py-8 text-left">
          <SectionLabel text="The opportunity" />
          <div className="mt-4">
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onUpdate?.('emailBody', e.currentTarget.innerText)}
              className="outline-none focus:ring-1 focus:ring-[#C8A97E] rounded p-2 -ml-2 transition-all min-h-[200px]"
              style={{
                fontSize: '13px',
                lineHeight: 1.8,
                color: '#3D3830',
                whiteSpace: 'pre-wrap',
                textAlign: 'left'
              }}
            >
              {pitchPreview.emailBody}
            </div>
          </div>

          {/* Value grid */}
          <div className="grid grid-cols-3 mt-6 text-left" style={{ border: '1px solid rgba(26,26,26,0.1)' }}>
            {[
              ['40%', 'C-suite audience'], 
              ['82%', 'Return sponsors'], 
              ['12M+', 'Media reach']
            ].map(([val, desc], i) => (
              <div key={i} className="p-4 text-left" style={{ borderRight: i < 2 ? '1px solid rgba(26,26,26,0.1)' : 'none' }}>
                <div 
                  contentEditable
                  suppressContentEditableWarning
                  className="outline-none focus:ring-1 focus:ring-[#C8A97E] rounded px-1 -ml-1 transition-all"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 900, color: '#1A1A1A', lineHeight: 1 }}
                >
                  {val}
                </div>
                <div 
                  contentEditable
                  suppressContentEditableWarning
                  className="outline-none focus:ring-1 focus:ring-[#C8A97E] rounded px-1 -ml-1 mt-1 transition-all"
                  style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.45)' }}
                >
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-10 pb-6 text-left" style={{ borderTop: '1px solid rgba(26,26,26,0.1)', paddingTop: '1.25rem' }}>
          <div className="flex items-center gap-3">
            <div style={{ width: 32, height: 32, background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 900, color: '#C8A97E' }}>
              {initial}
            </div>
            <div className="text-left">
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#1A1A1A' }}>{formData.eventName || 'Your Event'}</div>
              <div style={{ fontSize: '10px', color: 'rgba(26,26,26,0.4)', marginTop: 2 }}>Sponsorship Team</div>
            </div>
          </div>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.25)' }}>SponZilla</span>
        </div>
      </div>
    );
  }
);

PitchCard.displayName = 'PitchCard';
export default PitchCard;

const SectionLabel = ({ text }: { text: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8A97E' }}>
    {text}
    <div style={{ flex: 1, height: 1, background: 'rgba(26,26,26,0.12)' }} />
  </div>
);

const CalIcon = () => (
  <svg width="11" height="11" style={{ color: '#C8A97E', flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const PinIcon = () => (
  <svg width="11" height="11" style={{ color: '#C8A97E', flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
  </svg>
);
const ClockIcon = () => (
  <svg width="11" height="11" style={{ color: '#C8A97E', flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
  </svg>
);
