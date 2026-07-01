import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useUser } from '../contexts/UserContext';
import { getPostAuthRoute } from '../utils/authRouting';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const { refreshUser, isAuthenticated, user } = useUser();
  const email = searchParams.get('email') || '';
  const [loading, setLoading] = useState(Boolean(token));
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(
    token ? 'Verifying your email...' : 'Check your inbox for the verification link.'
  );
  const [resendEmail, setResendEmail] = useState(email);

  useEffect(() => {
    if (resendEmail || !user.email) return;
    setResendEmail(user.email);
  }, [resendEmail, user.email]);

  useEffect(() => {
    if (token) return;
    if (!isAuthenticated) return;
    if (!user.isEmailVerified) return;
    navigate(getPostAuthRoute(user), { replace: true });
  }, [isAuthenticated, navigate, token, user]);

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      try {
        const response = await authAPI.verifyEmail(token);
        setMessage(response.message || 'Email verified successfully.');
        setError('');
        const refreshedUser = await refreshUser();

        setTimeout(() => {
          if (refreshedUser?.isEmailVerified) {
            navigate(getPostAuthRoute(refreshedUser), { replace: true });
            return;
          }

          navigate('/login?verified=1', { replace: true });
        }, 1200);
      } catch (err: any) {
        setError(err.message || 'Verification failed. Please request a new link.');
        setMessage('');
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [navigate, refreshUser, token]);

  const handleResend = async () => {
    if (!resendEmail) {
      setError('Please enter your email to resend verification.');
      return;
    }

    try {
      setResending(true);
      setError('');
      const response = await authAPI.resendVerificationEmail(resendEmail);
      setMessage(response.message);
    } catch (err: any) {
      setError(err.message || 'Failed to resend verification email.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9fa] px-6">
      <div className="w-full max-w-lg rounded-3xl border border-[#dde1e3] bg-white p-8 shadow-sm text-left">
        <h1 className="text-3xl font-bold text-[#121516]">
          {token ? 'Verifying email' : 'Verify your email'}
        </h1>
        <p className="mt-3 text-sm text-[#617989]">
          {email ? `We sent a verification link to ${email}.` : 'We sent you a verification link after signup.'}
        </p>

        <div className="mt-6 rounded-2xl bg-[#f6f8f9] p-4 text-sm text-[#121516]">
          {loading ? 'Please wait while we confirm your email...' : message}
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mt-4 flex flex-col gap-3">
          <input
            type="email"
            value={resendEmail}
            onChange={(e) => setResendEmail(e.target.value)}
            placeholder="Enter your email"
            className="rounded-2xl border border-[#dde1e3] px-4 py-3 text-sm"
          />
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="rounded-2xl border border-[#121516] px-5 py-3 text-sm font-bold text-[#121516] disabled:opacity-50"
          >
            {resending ? 'Resending...' : 'Resend verification email'}
          </button>
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            to="/login"
            className="rounded-2xl bg-[#121516] px-5 py-3 text-sm font-bold text-white"
          >
            Go to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
