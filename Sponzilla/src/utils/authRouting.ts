type RoutableUser = {
  type: 'guest' | 'club' | 'brand' | 'admin';
  profileCompleted: boolean;
};

export const getDefaultRouteForRole = (role: RoutableUser['type']) => {
  if (role === 'admin') return '/admin';
  if (role === 'club') return '/club-dashboard';
  if (role === 'brand') return '/brand-dashboard';
  return '/';
};

export const getPostAuthRoute = (user: RoutableUser) => {
  if (user.type === 'admin') {
    return '/admin';
  }

  if (!user.profileCompleted && user.type === 'guest') {
    return '/role-selection';
  }

  if (!user.profileCompleted && (user.type === 'club' || user.type === 'brand')) {
    return `/onboarding/${user.type}`;
  }

  return getDefaultRouteForRole(user.type);
};
