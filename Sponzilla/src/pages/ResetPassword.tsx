import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { authAPI } from '../services/api';

const PASSWORD_RULE_MESSAGE = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
const PASSWORD_RULE_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!token) {
      setError('Invalid reset link.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!PASSWORD_RULE_REGEX.test(password)) {
      setError(PASSWORD_RULE_MESSAGE);
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.resetPassword(token, password);
      setMessage(response.message);
      setTimeout(() => navigate('/login'), 1200);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <div className="px-6 md:px-16 lg:px-24 flex flex-1 justify-center py-10">
          <div className="w-full max-w-lg rounded-3xl border border-[#dde1e3] bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-[#121516]">Create new password</h1>
            <p className="mt-3 text-sm text-[#617989]">Choose a strong password for your account.</p>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {message && (
              <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
                className="rounded-2xl border border-[#dde1e3] px-4 py-3"
                required
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="rounded-2xl border border-[#dde1e3] px-4 py-3"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-[#121516] px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
              >
                {loading ? 'Resetting...' : 'Reset password'}
              </button>
            </form>

            <div className="mt-6">
              <Link to="/login" className="text-sm font-semibold text-[#121516] underline">
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
