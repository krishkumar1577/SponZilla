import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SmartNavbar } from '../../components/layout/Navbar';
import { profilesAPI } from '../../services/api';
import type { BrandProfile } from '../../services/api';

const BrandProfilePage: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const [brandData, setBrandData] = useState<BrandProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await profilesAPI.getBrandProfile(brandId);
        setBrandData(response.profile);
      } catch (err) {
        console.error('Error fetching brand data:', err);
        setError('Failed to load brand profile');
      } finally {
        setLoading(false);
      }
    };

    if (brandId) {
      fetchBrandData();
    }
  }, [brandId]);

  if (loading) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
        <div className="layout-container flex h-full grow flex-col">
          <SmartNavbar />
          <div className="flex items-center justify-center flex-1">
            <p className="text-[#617989] text-lg">Loading brand profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !brandData) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
        <div className="layout-container flex h-full grow flex-col">
          <SmartNavbar />
          <div className="flex items-center justify-center flex-1">
            <p className="text-red-500 text-lg">{error || 'Brand not found'}</p>
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
            {/* Hero Section */}
            <div className="@container">
              <div className="@[480px]:px-4 @[480px]:py-3">
                <div
                  className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-white @[480px]:rounded-xl min-h-[218px]"
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url("${brandData.logo || 'https://placehold.co/800x400/f0f3f4/617989?text=' + encodeURIComponent(brandData.brandName)}")`
                  }}
                >
                  <div className="flex p-4">
                    <p className="text-white tracking-light text-[28px] font-bold leading-tight text-left">{brandData.brandName}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="flex p-4 @container">
              <div className="flex w-full flex-col gap-4 items-start">
                <div className="flex gap-4 flex-col items-start">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl min-h-32 w-32"
                    style={{
                      backgroundImage: `url("${brandData.logo || `https://placehold.co/200x200/f0f3f4/617989?text=${encodeURIComponent(brandData.brandName.charAt(0))}`}")`
                    }}
                  ></div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] text-left">{brandData.brandName}</p>
                      {brandData.verified && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <p className="text-green-700 text-xs font-medium">Verified</p>
                        </div>
                      )}
                    </div>
                    <p className="text-[#617989] text-base font-normal leading-normal text-left">Industry: {brandData.industry || 'Not specified'}</p>
                    <p className="text-[#617989] text-base font-normal leading-normal text-left">
                      {brandData.description || 'No description available'}
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm font-medium text-[#111518]">Sponsorship Budget:</span>
                        <span className="text-sm text-[#617989]">
                          {brandData.sponsorshipBudget && brandData.sponsorshipBudget.min && brandData.sponsorshipBudget.max 
                            ? `$${brandData.sponsorshipBudget.min.toLocaleString()} - $${brandData.sponsorshipBudget.max.toLocaleString()}`
                            : 'Available upon request'
                          }
                        </span>
                      </div>
                      {brandData.website && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#111518]">Website:</span>
                          <a 
                            href={brandData.website.startsWith('http') ? brandData.website : `https://${brandData.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {brandData.website}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#111518]">Contact:</span>
                        <span className="text-sm text-[#617989]">{brandData.contactPerson.name}</span>
                        <a href={`mailto:${brandData.contactPerson.email}`} className="text-sm text-blue-600 hover:underline">
                          {brandData.contactPerson.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Sponsorships */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Current Sponsorships</h2>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#dbe1e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="table-current-sponsorships-column-120 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        Sponsorship
                      </th>
                      <th className="table-current-sponsorships-column-240 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        University
                      </th>
                      <th className="table-current-sponsorships-column-360 px-4 py-3 text-left text-[#111518] w-60 text-sm font-medium leading-normal">Status</th>
                      <th className="table-current-sponsorships-column-480 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        Performance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-current-sponsorships-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">
                        Hackathon 2023
                      </td>
                      <td className="table-current-sponsorships-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">
                        State University
                      </td>
                      <td className="table-current-sponsorships-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Active</span>
                        </button>
                      </td>
                      <td className="table-current-sponsorships-column-480 h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal">
                        <div className="flex items-center gap-3">
                          <div className="w-[88px] overflow-hidden rounded-sm bg-[#dbe1e6]">
                            <div className="h-1 rounded-full bg-[#111518]" style={{ width: '85.2273%' }}></div>
                          </div>
                          <p className="text-[#111518] text-sm font-medium leading-normal text-left">75</p>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-current-sponsorships-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">
                        Innovation Challenge
                      </td>
                      <td className="table-current-sponsorships-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">
                        City College
                      </td>
                      <td className="table-current-sponsorships-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Active</span>
                        </button>
                      </td>
                      <td className="table-current-sponsorships-column-480 h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal">
                        <div className="flex items-center gap-3">
                          <div className="w-[88px] overflow-hidden rounded-sm bg-[#dbe1e6]">
                            <div className="h-1 rounded-full bg-[#111518]" style={{ width: '56.8182%' }}></div>
                          </div>
                          <p className="text-[#111518] text-sm font-medium leading-normal text-left">50</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Past Sponsorships */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Past Sponsorships</h2>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#dbe1e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="table-past-sponsorships-column-120 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        Sponsorship
                      </th>
                      <th className="table-past-sponsorships-column-240 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        University
                      </th>
                      <th className="table-past-sponsorships-column-360 px-4 py-3 text-left text-[#111518] w-60 text-sm font-medium leading-normal">Status</th>
                      <th className="table-past-sponsorships-column-480 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        Performance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-past-sponsorships-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">
                        Tech Fair 2022
                      </td>
                      <td className="table-past-sponsorships-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">
                        State University
                      </td>
                      <td className="table-past-sponsorships-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Completed</span>
                        </button>
                      </td>
                      <td className="table-past-sponsorships-column-480 h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal">
                        <div className="flex items-center gap-3">
                          <div className="w-[88px] overflow-hidden rounded-sm bg-[#dbe1e6]">
                            <div className="h-1 rounded-full bg-[#111518]" style={{ width: '100%' }}></div>
                          </div>
                          <p className="text-[#111518] text-sm font-medium leading-normal text-left">90</p>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-past-sponsorships-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">
                        Coding Workshop
                      </td>
                      <td className="table-past-sponsorships-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">
                        City College
                      </td>
                      <td className="table-past-sponsorships-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Completed</span>
                        </button>
                      </td>
                      <td className="table-past-sponsorships-column-480 h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal">
                        <div className="flex items-center gap-3">
                          <div className="w-[88px] overflow-hidden rounded-sm bg-[#dbe1e6]">
                            <div className="h-1 rounded-full bg-[#111518]" style={{ width: '90.9091%' }}></div>
                          </div>
                          <p className="text-[#111518] text-sm font-medium leading-normal text-left">80</p>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-past-sponsorships-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">
                        Startup Pitch Competition
                      </td>
                      <td className="table-past-sponsorships-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">
                        Regional University
                      </td>
                      <td className="table-past-sponsorships-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Completed</span>
                        </button>
                      </td>
                      <td className="table-past-sponsorships-column-480 h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal">
                        <div className="flex items-center gap-3">
                          <div className="w-[88px] overflow-hidden rounded-sm bg-[#dbe1e6]">
                            <div className="h-1 rounded-full bg-[#111518]" style={{ width: '68.1818%' }}></div>
                          </div>
                          <p className="text-[#111518] text-sm font-medium leading-normal text-left">60</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sponsorship Preferences - Valuable for Clubs */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Sponsorship Preferences</h2>
            <div className="flex gap-3 p-4 flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <p className="text-[#111518] text-base font-medium leading-normal text-left">Preferred Event Types</p>
                  <div className="flex flex-wrap gap-2">
                    {brandData.preferredEventTypes && brandData.preferredEventTypes.length > 0 ? (
                      brandData.preferredEventTypes.map((type, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {type}
                        </span>
                      ))
                    ) : (
                      <span className="text-[#617989] text-sm">Open to all event types</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[#111518] text-base font-medium leading-normal text-left">Target Audience</p>
                  <div className="flex flex-wrap gap-2">
                    {brandData.targetAudience && brandData.targetAudience.length > 0 ? (
                      brandData.targetAudience.map((audience, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          {audience}
                        </span>
                      ))
                    ) : (
                      <span className="text-[#617989] text-sm">General audience</span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Social Media Links */}
              {(brandData.socialMedia?.instagram || brandData.socialMedia?.twitter || brandData.socialMedia?.linkedin) && (
                <div className="flex flex-col gap-2 mt-4">
                  <p className="text-[#111518] text-base font-medium leading-normal text-left">Connect With Us</p>
                  <div className="flex gap-4">
                    {brandData.socialMedia?.instagram && (
                      <a 
                        href={brandData.socialMedia.instagram.startsWith('http') ? brandData.socialMedia.instagram : `https://instagram.com/${brandData.socialMedia.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-pink-50 text-pink-700 text-sm font-medium rounded-lg hover:bg-pink-100"
                      >
                        📷 Instagram
                      </a>
                    )}
                    {brandData.socialMedia?.twitter && (
                      <a 
                        href={brandData.socialMedia.twitter.startsWith('http') ? brandData.socialMedia.twitter : `https://twitter.com/${brandData.socialMedia.twitter.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100"
                      >
                        🐦 Twitter
                      </a>
                    )}
                    {brandData.socialMedia?.linkedin && (
                      <a 
                        href={brandData.socialMedia.linkedin.startsWith('http') ? brandData.socialMedia.linkedin : `https://linkedin.com/company/${brandData.socialMedia.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100"
                      >
                        💼 LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @container(max-width:120px){.table-current-sponsorships-column-120{display: none;}}
        @container(max-width:240px){.table-current-sponsorships-column-240{display: none;}}
        @container(max-width:360px){.table-current-sponsorships-column-360{display: none;}}
        @container(max-width:480px){.table-current-sponsorships-column-480{display: none;}}
        @container(max-width:120px){.table-past-sponsorships-column-120{display: none;}}
        @container(max-width:240px){.table-past-sponsorships-column-240{display: none;}}
        @container(max-width:360px){.table-past-sponsorships-column-360{display: none;}}
        @container(max-width:480px){.table-past-sponsorships-column-480{display: none;}}
      `}</style>
    </div>
  );
};

export default BrandProfilePage;