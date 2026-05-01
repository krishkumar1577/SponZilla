import { apiRequest } from './base';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'club' | 'brand';
}

export interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface UserSettings {
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
    eventReminders: boolean;
    messageNotifications: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    loginAlerts: boolean;
    sessionTimeout: string;
  };
}

export const authAPI = {
  login: (credentials: LoginCredentials): Promise<AuthResponse> =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (data: RegisterData): Promise<AuthResponse> =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getProfile: (): Promise<{ user: any }> =>
    apiRequest('/auth/me'),

  changePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{ message: string }> =>
    apiRequest('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  updateAccount: (data: {
    name?: string;
    email?: string;
  }): Promise<{ message: string; user: any }> =>
    apiRequest('/auth/update-account', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  updateSettings: (data: {
    notifications?: {
      emailNotifications?: boolean;
      pushNotifications?: boolean;
      marketingEmails?: boolean;
      eventReminders?: boolean;
      messageNotifications?: boolean;
    };
    security?: {
      twoFactorAuth?: boolean;
      loginAlerts?: boolean;
      sessionTimeout?: string;
    };
  }): Promise<{ message: string }> =>
    apiRequest('/auth/update-settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getSettings: (): Promise<{
    notifications: any;
    security: any;
  }> =>
    apiRequest('/auth/settings'),
};
