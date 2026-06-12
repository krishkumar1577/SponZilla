import React, { useState } from 'react';
import { profilesAPI } from '../../services/api';
import { useUser } from '../../contexts/UserContext';

interface OnboardingModalProps {
  role: 'club' | 'brand';
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ role, onComplete }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [industryOrUniv, setIndustryOrUniv] = useState('');
  const [typeOrAudience, setTypeOrAudience] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (role === 'club') {
        await profilesAPI.createClubProfile({
          clubName: name,
          university: industryOrUniv,
          category: typeOrAudience,
          description: description,
          memberCount: 0,
          establishedYear: new Date().getFullYear(),
          verified: false,
          contactPerson: {
            name: user?.name || '',
            email: user?.email || '',
            phone: ''
          }
        });
      } else {
        await profilesAPI.createBrandProfile({
          brandName: name,
          industry: industryOrUniv,
          targetAudience: typeOrAudience.split(',').map(s => s.trim()),
          description: description,
          companySize: '1-10',
          website: '',
          verified: false,
          interests: [],
          budget: { min: 0, max: 0 },
          contactPerson: {
            name: user?.name || '',
            email: user?.email || '',
            phone: ''
          },
          socialMedia: {}
        });
      }
      onComplete(); // Trigger dashboard reload
    } catch (err: any) {
      setError(err.message || 'Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-1">Welcome to SponZilla! 🚀</h2>
          <p className="text-blue-100 text-sm">
            Let's get your {role === 'club' ? 'Club' : 'Brand'} set up so you can start {role === 'club' ? 'raising sponsorships' : 'finding events'}.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-[#111518] text-sm font-semibold">
                {role === 'club' ? 'Club Name' : 'Brand Name'}
              </span>
              <input
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                placeholder={`Enter your ${role} name`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[#111518] text-sm font-semibold">
                {role === 'club' ? 'University / College' : 'Industry'}
              </span>
              <input
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                placeholder={role === 'club' ? 'e.g. Stanford University' : 'e.g. Technology, Food & Beverage'}
                value={industryOrUniv}
                onChange={(e) => setIndustryOrUniv(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[#111518] text-sm font-semibold">
                {role === 'club' ? 'Club Category' : 'Target Audience (comma separated)'}
              </span>
              <input
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                placeholder={role === 'club' ? 'e.g. Engineering, Arts, Sports' : 'e.g. Students, Tech Enthusiasts'}
                value={typeOrAudience}
                onChange={(e) => setTypeOrAudience(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[#111518] text-sm font-semibold">
                Short Description
              </span>
              <textarea
                required
                rows={3}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-none"
                placeholder="Tell us a little bit about what you do..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#111518] hover:bg-black text-white font-bold rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save & Continue'}
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">
              You can edit this and add more details (like logos) later in Settings.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
