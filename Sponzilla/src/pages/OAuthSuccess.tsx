import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser, type UserType } from '../contexts/UserContext';
import { toast } from 'react-hot-toast';

const OAuthSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useUser();

  useEffect(() => {
    const token = searchParams.get('token');
    const userString = searchParams.get('user');

    if (token && userString) {
      try {
        const decodedUser = JSON.parse(decodeURIComponent(userString));
        
        const userData = {
          id: decodedUser.id,
          name: decodedUser.name,
          email: decodedUser.email,
          type: decodedUser.role as UserType,
          profileImage: decodedUser.avatar || undefined,
          token: token,
        };

        // 1. Save to local storage
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));

        // 2. Update context state
        setUser(userData);

        toast.success(`Welcome back, ${userData.name}!`);

        // 3. Redirect to appropriate dashboard
        if (userData.type === 'club') {
          navigate('/club-dashboard');
        } else if (userData.type === 'brand') {
          navigate('/brand-dashboard');
        } else {
          navigate('/');
        }
      } catch (err) {
        console.error('Failed to parse OAuth user data:', err);
        toast.error('Authentication failed. Please try again.');
        navigate('/login');
      }
    } else {
      toast.error('Authentication failed: Missing tokens.');
      navigate('/login');
    }
  }, [navigate, searchParams, setUser]);

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
