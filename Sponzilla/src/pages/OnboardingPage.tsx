import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../components/layout/Navbar';
import { authAPI, profilesAPI } from '../services/api';
import { useUser } from '../contexts/UserContext';
import { getDefaultRouteForRole } from '../utils/authRouting';

type OnboardingRole = 'club' | 'brand';

interface OnboardingPageProps {
  role: OnboardingRole;
}

const brandIndustries = ['technology', 'finance', 'education', 'healthcare', 'retail', 'fmcg', 'automobile', 'entertainment', 'other'] as const;
const companySizes = ['startup', 'small', 'medium', 'large', 'enterprise'] as const;
const targetAudienceOptions = ['students', 'tech-enthusiasts', 'entrepreneurs', 'sports-fans', 'artists', 'general'] as const;
const interestOptions = ['hackathons', 'cultural-fests', 'sports-events', 'workshops', 'conferences', 'competitions', 'seminars'] as const;
const clubCategories = ['technical', 'cultural', 'sports', 'social', 'entrepreneurship', 'other'] as const;

const OnboardingPage: React.FC<OnboardingPageProps> = ({ role }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated, loading, completeAuth, setUser } = useUser();
  const signupToken = searchParams.get('signupToken');
  const provider = searchParams.get('provider');
  const signupName = searchParams.get('name') || '';
  const signupEmail = searchParams.get('email') || '';
  const [pageLoading, setPageLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [clubForm, setClubForm] = useState({
    clubName: '',
    university: '',
    category: 'technical',
    description: '',
    memberCount: '0',
    phone: '',
  });

  const [brandForm, setBrandForm] = useState({
    brandName: '',
    industry: 'technology',
    description: '',
    website: '',
    companySize: 'startup',
    phone: '',
    minBudget: '0',
    maxBudget: '0',
  });
  const [selectedAudience, setSelectedAudience] = useState<string[]>(['students']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['hackathons']);

  const identity = useMemo(() => {
    if (isAuthenticated) {
      return {
        name: user.name || '',
        email: user.email || '',
      };
    }

    if (signupName || signupEmail) {
      return {
        name: signupName,
        email: signupEmail,
      };
    }

    return {
      name: '',
      email: '',
    };
  }, [isAuthenticated, signupEmail, signupName, user.email, user.name]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (isAuthenticated) {
      if (user.type !== role) {
        navigate(getDefaultRouteForRole(user.type));
        return;
      }

      if (user.profileCompleted) {
        navigate(getDefaultRouteForRole(user.type));
        return;
      }

      setPageLoading(false);
      return;
    }

    if (!signupToken || !provider || !signupEmail) {
      setError('Your signup session is missing or expired. Please sign in again.');
    }

    setPageLoading(false);
  }, [isAuthenticated, loading, navigate, provider, role, signupEmail, signupToken, user.profileCompleted, user.type]);

  const toggleSelection = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => (
      prev.includes(value) ? prev.filter((entry) => entry !== value) : [...prev, value]
    ));
  };

  const finalizeProfileCompletion = (currentUser = user) => {
    const updatedUser = { ...currentUser, profileCompleted: true };
    setUser(updatedUser);
    toast.success('Profile completed successfully!');
    navigate(getDefaultRouteForRole(role));
  };

  const ensureAuthenticatedUser = async () => {
    if (isAuthenticated) {
      return user;
    }

    if (!signupToken) {
      throw new Error('Signup session missing. Please sign in again.');
    }

    const authResponse = await authAPI.completeOAuthSignup({ signupToken, role });
    return completeAuth(authResponse);
  };

  const handleClubSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const currentUser = await ensureAuthenticatedUser();

      await profilesAPI.createClubProfile({
        clubName: clubForm.clubName,
        university: clubForm.university,
        category: clubForm.category,
        description: clubForm.description,
        memberCount: Number(clubForm.memberCount) || 0,
        contactPerson: {
          name: identity.name || currentUser.name || '',
          email: identity.email || currentUser.email || '',
          phone: clubForm.phone,
        },
      });

      finalizeProfileCompletion(currentUser);
    } catch (err: any) {
      setError(err.message || 'Failed to complete onboarding.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBrandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const currentUser = await ensureAuthenticatedUser();

      await profilesAPI.createBrandProfile({
        brandName: brandForm.brandName,
        industry: brandForm.industry,
        description: brandForm.description,
        website: brandForm.website,
        companySize: brandForm.companySize,
        budget: {
          min: Number(brandForm.minBudget) || 0,
          max: Number(brandForm.maxBudget) || 0,
        },
        targetAudience: selectedAudience,
        interests: selectedInterests,
        contactPerson: {
          name: identity.name || currentUser.name || '',
          email: identity.email || currentUser.email || '',
          phone: brandForm.phone,
        },
      });

      finalizeProfileCompletion(currentUser);
    } catch (err: any) {
      setError(err.message || 'Failed to complete onboarding.');
    } finally {
      setSubmitting(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
        <div className="layout-container flex h-full grow flex-col">
          <Navbar />
          <div className="flex flex-1 items-center justify-center text-[#617989]">Preparing your onboarding...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <div className="px-6 md:px-16 lg:px-24 flex flex-1 justify-center py-10">
          <div className="w-full max-w-3xl rounded-3xl border border-[#dde1e3] bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-[#121516] text-left">
              {role === 'club' ? 'Set up your club' : 'Set up your brand'}
            </h1>
            <p className="mt-3 text-sm text-[#617989] text-left">
              {role === 'club'
                ? 'Complete your club profile so you can start creating events and raising sponsorships.'
                : 'Complete your brand profile so you can start discovering events and applying to sponsor them.'}
            </p>

            <div className="mt-6 rounded-2xl bg-[#f6f8f9] p-4 text-left">
              <p className="text-sm font-semibold text-[#121516]">{identity.name || 'Your account'}</p>
              <p className="text-sm text-[#617989]">{identity.email}</p>
            </div>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {role === 'club' ? (
              <form className="mt-8 grid gap-5" onSubmit={handleClubSubmit}>
                <input
                  required
                  value={clubForm.clubName}
                  onChange={(e) => setClubForm((prev) => ({ ...prev, clubName: e.target.value }))}
                  className="rounded-2xl border border-[#dde1e3] px-4 py-3"
                  placeholder="Club name"
                />
                <input
                  required
                  value={clubForm.university}
                  onChange={(e) => setClubForm((prev) => ({ ...prev, university: e.target.value }))}
                  className="rounded-2xl border border-[#dde1e3] px-4 py-3"
                  placeholder="University or college"
                />
                <select
                  value={clubForm.category}
                  onChange={(e) => setClubForm((prev) => ({ ...prev, category: e.target.value }))}
                  className="rounded-2xl border border-[#dde1e3] px-4 py-3 bg-white"
                >
                  {clubCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <textarea
                  required
                  minLength={10}
                  value={clubForm.description}
                  onChange={(e) => setClubForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="min-h-32 rounded-2xl border border-[#dde1e3] px-4 py-3"
                  placeholder="Describe your club"
                />
                <div className="grid gap-5 md:grid-cols-2">
                  <input
                    type="number"
                    min="0"
                    value={clubForm.memberCount}
                    onChange={(e) => setClubForm((prev) => ({ ...prev, memberCount: e.target.value }))}
                    className="rounded-2xl border border-[#dde1e3] px-4 py-3"
                    placeholder="Member count"
                  />
                  <input
                    required
                    value={clubForm.phone}
                    onChange={(e) => setClubForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="rounded-2xl border border-[#dde1e3] px-4 py-3"
                    placeholder="Contact phone"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-2xl bg-[#121516] px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : 'Finish setup'}
                  </button>
                </div>
              </form>
            ) : (
              <form className="mt-8 grid gap-5" onSubmit={handleBrandSubmit}>
                <input
                  required
                  value={brandForm.brandName}
                  onChange={(e) => setBrandForm((prev) => ({ ...prev, brandName: e.target.value }))}
                  className="rounded-2xl border border-[#dde1e3] px-4 py-3"
                  placeholder="Brand name"
                />
                <div className="grid gap-5 md:grid-cols-2">
                  <select
                    value={brandForm.industry}
                    onChange={(e) => setBrandForm((prev) => ({ ...prev, industry: e.target.value }))}
                    className="rounded-2xl border border-[#dde1e3] px-4 py-3 bg-white"
                  >
                    {brandIndustries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                  <select
                    value={brandForm.companySize}
                    onChange={(e) => setBrandForm((prev) => ({ ...prev, companySize: e.target.value }))}
                    className="rounded-2xl border border-[#dde1e3] px-4 py-3 bg-white"
                  >
                    {companySizes.map((companySize) => (
                      <option key={companySize} value={companySize}>{companySize}</option>
                    ))}
                  </select>
                </div>
                <input
                  required
                  type="url"
                  value={brandForm.website}
                  onChange={(e) => setBrandForm((prev) => ({ ...prev, website: e.target.value }))}
                  className="rounded-2xl border border-[#dde1e3] px-4 py-3"
                  placeholder="https://your-company.com"
                />
                <textarea
                  required
                  minLength={10}
                  value={brandForm.description}
                  onChange={(e) => setBrandForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="min-h-32 rounded-2xl border border-[#dde1e3] px-4 py-3"
                  placeholder="Describe your brand"
                />
                <div className="grid gap-5 md:grid-cols-3">
                  <input
                    required
                    value={brandForm.phone}
                    onChange={(e) => setBrandForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="rounded-2xl border border-[#dde1e3] px-4 py-3"
                    placeholder="Contact phone"
                  />
                  <input
                    type="number"
                    min="0"
                    value={brandForm.minBudget}
                    onChange={(e) => setBrandForm((prev) => ({ ...prev, minBudget: e.target.value }))}
                    className="rounded-2xl border border-[#dde1e3] px-4 py-3"
                    placeholder="Min budget"
                  />
                  <input
                    type="number"
                    min="0"
                    value={brandForm.maxBudget}
                    onChange={(e) => setBrandForm((prev) => ({ ...prev, maxBudget: e.target.value }))}
                    className="rounded-2xl border border-[#dde1e3] px-4 py-3"
                    placeholder="Max budget"
                  />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-[#121516] text-left">Target audience</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {targetAudienceOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleSelection(option, setSelectedAudience)}
                          className={`rounded-full border px-3 py-2 text-sm ${selectedAudience.includes(option) ? 'border-[#121516] bg-[#f6f8f9]' : 'border-[#dde1e3]'}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#121516] text-left">Sponsorship interests</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {interestOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleSelection(option, setSelectedInterests)}
                          className={`rounded-full border px-3 py-2 text-sm ${selectedInterests.includes(option) ? 'border-[#121516] bg-[#f6f8f9]' : 'border-[#dde1e3]'}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-2xl bg-[#121516] px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : 'Finish setup'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
