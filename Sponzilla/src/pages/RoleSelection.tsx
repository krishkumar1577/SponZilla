import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authAPI, type PendingOAuthSignup } from '../services/api';
import Navbar from '../components/layout/Navbar';
import { useUser } from '../contexts/UserContext';
import { getDefaultRouteForRole } from '../utils/authRouting';

const RoleSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user, loading } = useUser();
  const [session, setSession] = useState<PendingOAuthSignup | null>(null);
  const [selectedRole, setSelectedRole] = useState<'club' | 'brand'>('club');
  const [error, setError] = useState('');
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('oauthSession');

    if (loading) {
      return;
    }

    if (isAuthenticated) {
      navigate(getDefaultRouteForRole(user.type));
      return;
    }

    if (!sessionId) {
      setError('Your signup session is missing or expired. Please try signing in again.');
      setPageLoading(false);
      return;
    }

    authAPI.getPendingOAuthSignup(sessionId)
      .then((response) => {
        setSession(response);
      })
      .catch((err: Error) => {
        setError(err.message || 'Failed to load your signup session.');
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, [isAuthenticated, loading, navigate, searchParams, user.type]);

  const handleContinue = () => {
    if (!session) return;
    navigate(`/onboarding/${selectedRole}?oauthSession=${session.sessionId}`);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <div className="px-6 md:px-16 lg:px-24 flex flex-1 justify-center py-10">
          <div className="w-full max-w-2xl rounded-3xl border border-[#dde1e3] bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-[#121516] text-left">Choose how you’ll use SponZilla</h1>
            <p className="mt-3 text-sm text-[#617989] text-left">
              We’ve authenticated your account. Your next step is choosing whether you’re joining as a club or a brand.
            </p>

            {pageLoading && (
              <div className="py-10 text-center text-[#617989]">Loading your signup session...</div>
            )}

            {!pageLoading && error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {!pageLoading && session && (
              <>
                <div className="mt-6 rounded-2xl bg-[#f6f8f9] p-4 text-left">
                  <p className="text-sm font-semibold text-[#121516]">{session.name}</p>
                  <p className="text-sm text-[#617989]">{session.email}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#617989]">
                    Signed in with {session.provider}
                  </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('club')}
                    className={`rounded-3xl border p-6 text-left transition-colors ${selectedRole === 'club' ? 'border-[#121516] bg-[#f6f8f9]' : 'border-[#dde1e3] bg-white hover:bg-[#fafbfb]'}`}
                  >
                    <p className="text-xl font-bold text-[#121516]">Club</p>
                    <p className="mt-2 text-sm text-[#617989]">
                      For student clubs and campus communities that create events and raise sponsorships.
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('brand')}
                    className={`rounded-3xl border p-6 text-left transition-colors ${selectedRole === 'brand' ? 'border-[#121516] bg-[#f6f8f9]' : 'border-[#dde1e3] bg-white hover:bg-[#fafbfb]'}`}
                  >
                    <p className="text-xl font-bold text-[#121516]">Brand</p>
                    <p className="mt-2 text-sm text-[#617989]">
                      For companies and teams looking to discover events and sponsor the right audiences.
                    </p>
                  </button>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="rounded-2xl bg-[#121516] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-black"
                  >
                    Continue
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
