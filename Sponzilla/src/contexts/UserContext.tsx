import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { authAPI, type LoginCredentials, type RegisterData } from '../services/api';

export type UserType = 'guest' | 'club' | 'brand';

interface User {
  id?: string;
  name?: string;
  email?: string;
  type: UserType;
  profileImage?: string;
  token?: string;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const defaultUser: User = {
  type: 'guest'
};

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [loading, setLoading] = useState(false);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authAPI.login(credentials);
      
      const userData: User = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        type: response.user.role as UserType,
        token: response.token,
      };

      setUser(userData);
      
      // Store token and user data
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authAPI.register(data);
      
      const userData: User = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        type: response.user.role as UserType,
        token: response.token,
      };

      setUser(userData);
      
      // Store token and user data
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(defaultUser);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  const isAuthenticated = user.type !== 'guest' && !!user.token;

  // Load user from localStorage on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('authToken');
    
    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser);
        userData.token = savedToken;
        setUser(userData);
        
        // Optional: Verify token is still valid
        authAPI.getProfile()
          .then(() => {
            // Token is still valid
          })
          .catch(() => {
            // Token expired or invalid, logout
            logout();
          });
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        logout();
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      login, 
      register, 
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
