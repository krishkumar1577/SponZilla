import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useUser } from '../contexts/UserContext';
import { toast } from 'react-hot-toast';
import { getPostAuthRoute } from '../utils/authRouting';

const OAuthSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { completeAuth } = useUser();

  useEffect(() => {
    const sessionId = searchParams.get('session');

    if (!sessionId) {
      toast.error('Authentication failed: Missing OAuth session.');
      navigate('/login');
      return;
    }

    authAPI.exchangeOAuthSession(sessionId)
      .then((response) => {
        const userData = completeAuth(response);
        toast.success(`Welcome back, ${userData.name}!`);
        navigate(getPostAuthRoute(userData));
      })
      .catch((error) => {
        console.error('Failed to exchange OAuth session:', error);
        toast.error('Authentication failed. Please try again.');
        navigate('/login');
      });
  }, [completeAuth, navigate, searchParams]);

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
