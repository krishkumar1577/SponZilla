import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { authAPI } from '../services/api';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState('');
  const [message, setMessage] = useState(
    token ? 'Verifying your email...' : 'Check your inbox for the verification link.'
  );

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      try {
        const response = await authAPI.verifyEmail(token);
        setMessage(response.message || 'Email verified successfully.');
        setError('');
        setTimeout(() => navigate('/login?verified=1'), 1200);
      } catch (err: any) {
        setError(err.message || 'Verification failed. Please request a new link.');
        setMessage('');
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [navigate, token]);

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
