import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { authAPI, type AuthResponse, type LoginCredentials, type RegisterData } from '../services/api';

export type UserType = 'guest' | 'club' | 'brand' | 'admin';

interface User {
  id?: string;
  name?: string;
  email?: string;
  type: UserType;
  profileImage?: string;
  token?: string;
  profileCompleted: boolean;
  isEmailVerified: boolean;
  subscriptionPlan?: 'free' | 'pro';
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  login: (credentials: LoginCredentials) => Promise<User | null>;
  register: (data: RegisterData) => Promise<User | null>;
  completeAuth: (response: AuthResponse) => User;
  refreshUser: () => Promise<User | null>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const defaultUser: User = {
  type: 'guest',
  profileCompleted: false,
  isEmailVerified: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User>(defaultUser);
  const [loading, setLoading] = useState(true);

  const persistUser = (nextUser: User) => {
    setUserState(nextUser);

    if (nextUser.token) {
      localStorage.setItem('authToken', nextUser.token);
      localStorage.setItem('user', JSON.stringify(nextUser));
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  };

  const setUser = (nextUser: User) => {
    persistUser(nextUser);
  };

  const mapAuthResponseToUser = (response: AuthResponse): User => ({
    id: response.user.id,
    name: response.user.name,
    email: response.user.email,
    type: response.user.role as UserType,
    profileImage: response.user.avatar || undefined,
    token: response.accessToken,
    profileCompleted: response.user.profileCompleted,
    isEmailVerified: Boolean(response.user.isEmailVerified),
  });

  const completeAuth = (response: AuthResponse): User => {
    const userData = mapAuthResponseToUser(response);
    persistUser(userData);
    return userData;
  };

  const refreshUser = async (): Promise<User | null> => {
    try {
      const response = await authAPI.getProfile();
      const savedToken = localStorage.getItem('authToken') || user.token;

      if (!savedToken) {
        logout();
        return null;
      }

      const userData: User = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        type: response.user.role as UserType,
        profileImage: response.user.avatar || undefined,
        token: savedToken,
        profileCompleted: response.user.profileCompleted,
        isEmailVerified: Boolean(response.user.isEmailVerified),
      };

      persistUser(userData);
      return userData;
    } catch (error) {
      logout();
      return null;
    }
  };

  const login = async (credentials: LoginCredentials): Promise<User | null> => {
    try {
      setLoading(true);
      const response = await authAPI.login(credentials);
      return completeAuth(response);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<User | null> => {
    try {
      setLoading(true);
      const response = await authAPI.register(data);
      // Since response is now AuthResponse, complete auth just like login!
      return completeAuth(response as unknown as AuthResponse);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUserState(defaultUser);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setLoading(false);
  };

  const isAuthenticated = user.type !== 'guest' && !!user.token;

  // Load user from localStorage on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('authToken');

    if (!savedToken) {
      setLoading(false);
      return;
    }

    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        userData.token = savedToken;
        userData.profileCompleted = Boolean(userData.profileCompleted);
        setUserState(userData);
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
      }
    }

    refreshUser().finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      login, 
      register, 
      completeAuth,
      refreshUser,
      logout, 
      isAuthenticated, 
      loading 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Custom hook for easier access to user type
export const useUserType = (): UserType => {
  const { user } = useUser();
  return user.type;
};
