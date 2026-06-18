import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { toast } from 'react-hot-toast';
import { getPostAuthRoute } from '../utils/authRouting';

const OAuthSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { completeAuth } = useUser();
  const hasHandledCallback = useRef(false);

  useEffect(() => {
    if (hasHandledCallback.current) {
      return;
    }

    hasHandledCallback.current = true;

    const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : '';
    const hashParams = new URLSearchParams(hash);
    const token = hashParams.get('token');
    const refreshToken = hashParams.get('refreshToken') || undefined;
    const rawUser = hashParams.get('user');

    if (!token || !rawUser) {
      toast.error('Authentication failed. Please try again.');
      navigate('/login');
      return;
    }

    try {
      const user = JSON.parse(rawUser);
      const userData = completeAuth({
        message: 'OAuth login successful',
        accessToken: token,
        refreshToken,
        user,
      });

      window.history.replaceState({}, document.title, window.location.pathname);
      toast.success(`Welcome back, ${userData.name}!`);
      navigate(getPostAuthRoute(userData));
    } catch (error) {
      console.error('Failed to complete OAuth login:', error);
      toast.error('Authentication failed. Please try again.');
      navigate('/login');
    }
  }, [completeAuth, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-700 font-bold">Completing sign in...</h2>
        <p className="mt-2 text-sm text-gray-500">Please wait while we secure your session.</p>
      </div>
    </div>
  );
};

export default OAuthSuccessPage;
