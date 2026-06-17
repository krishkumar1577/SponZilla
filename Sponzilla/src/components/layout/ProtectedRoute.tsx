import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser, type UserType } from '../../contexts/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserType[];
  allowIncompleteProfile?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles, allowIncompleteProfile = false }) => {
  const { isAuthenticated, user, loading } = useUser();
  const location = useLocation();

  // If still loading the initial user state from localStorage/API
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="w-10 h-10 border-4 border-[#118ee8] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    // Redirect to login, but save the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but wrong role
  if (allowedRoles && !allowedRoles.includes(user.type)) {
    // Redirect to appropriate dashboard based on their actual role
    if (user.type === 'brand') {
      return <Navigate to="/brand-dashboard" replace />;
    } else if (user.type === 'club') {
      return <Navigate to="/club-dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  if (!allowIncompleteProfile && user.type !== 'admin' && !user.profileCompleted) {
    return <Navigate to={`/onboarding/${user.type}`} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
