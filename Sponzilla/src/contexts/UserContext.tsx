import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type UserType = 'guest' | 'club' | 'brand';

interface User {
  id?: string;
  name?: string;
  email?: string;
  type: UserType;
  profileImage?: string;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
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

  const login = (userData: User) => {
    setUser(userData);
    // Here you could also store to localStorage or sessionStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(defaultUser);
    localStorage.removeItem('user');
  };

  const isAuthenticated = user.type !== 'guest';

  // Load user from localStorage on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const value: UserContextType = {
    user,
    setUser,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <UserContext.Provider value={value}>
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
