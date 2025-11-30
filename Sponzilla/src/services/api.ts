// ============================================
// API SERVICE LAYER
// ============================================
// This file handles all HTTP requests to the backend

// API Base URL Configuration
// In development, use empty string to leverage Vite proxy (/api -> backend:5000)
// In production, use your actual backend domain
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://your-backend-domain.com' 
  : ''; // Empty string uses Vite proxy in development

// Generic API function with error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}/api${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ API Request failed:', error);
    throw error;
  }
}

// ============================================
// AUTHENTICATION API
// ============================================
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
};

// ============================================
// EVENTS API
// ============================================
export interface Event {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
  duration: number;
  venue: string;
  category: string;
  expectedAttendees: number;
  targetAudience: string[];
  images?: string[];
  budget: {
    total: number;
    sponsorshipNeeded: number;
    currency: string;
  };
  sponsorshipTiers: Array<{
    name: string;
    amount: number;
    benefits: string[];
    spotsAvailable: number;
    spotsTaken: number;
  }>;
  clubId: {
    _id: string;
    clubName: string;
    university: string;
    logo?: string;
  };
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  featured: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventsResponse {
  events: Event[];
  pagination?: {
    total: number;
    page: number;
    pages: number;
  };
}

export interface CreateEventData {
  title: string;
  description: string;
  eventDate: string;
  endDate?: string;
  location: {
    venue: string;
    city: string;
    address?: string;
  };
  category: string;
  expectedAttendance: number;
  budget: {
    total: number;
    sponsorshipGoal: number;
  };
  sponsorshipTiers: Array<{
    name: string;
    price: number;
    benefits: string[];
    slots: number;
  }>;
}

export const eventsAPI = {
  // Public endpoints
  getAllEvents: (params?: {
    category?: string;
    search?: string;
    upcoming?: boolean;
    page?: number;
    limit?: number;
  }): Promise<EventsResponse> => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.upcoming) searchParams.append('upcoming', 'true');
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    return apiRequest(`/events?${searchParams.toString()}`);
  },

  getEventById: (id: string): Promise<{ event: Event }> =>
    apiRequest(`/events/${id}`),

  getFeaturedEvents: (): Promise<EventsResponse> =>
    apiRequest('/events/featured'),

  getUpcomingEvents: (): Promise<EventsResponse> =>
    apiRequest('/events/upcoming'),

  getEventsByCategory: (category: string): Promise<EventsResponse> =>
    apiRequest(`/events/category/${category}`),

  // Protected endpoints (club only)
  createEvent: (data: CreateEventData): Promise<{ message: string; event: Event }> =>
    apiRequest('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateEvent: (id: string, data: Partial<CreateEventData>): Promise<{ message: string; event: Event }> =>
    apiRequest(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteEvent: (id: string): Promise<{ message: string }> =>
    apiRequest(`/events/${id}`, {
      method: 'DELETE',
    }),

  getMyEvents: (): Promise<EventsResponse> =>
    apiRequest('/events/my/events'),

  publishEvent: (id: string): Promise<{ message: string; event: Event }> =>
    apiRequest(`/events/${id}/publish`, {
      method: 'PUT',
    }),

  getEventStats: (id: string): Promise<any> =>
    apiRequest(`/events/${id}/stats`),
};

// ============================================
// PROFILES API
// ============================================
export interface ClubProfile {
  _id: string;
  userId: string;
  clubName: string;
  university: string;
  description: string;
  contactPerson: {
    name: string;
    email: string;
    phone: string;
  };
  logo?: string;
  website?: string;
  socialMedia: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  categories: string[];
  achievements: Array<{
    title: string;
    description: string;
    date: string;
  }>;
  verified: boolean;
}

export interface BrandProfile {
  _id: string;
  userId: string;
  brandName: string;
  description: string;
  industry: string;
  website: string;
  logo?: string;
  contactPerson: {
    name: string;
    email: string;
    phone: string;
  };
  socialMedia: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  sponsorshipBudget: {
    min: number;
    max: number;
  };
  targetAudience: string[];
  preferredEventTypes: string[];
  verified: boolean;
}

export const profilesAPI = {
  // Club profiles
  createClubProfile: (data: Omit<ClubProfile, '_id' | 'userId' | 'verified'>): Promise<{ message: string; profile: ClubProfile }> =>
    apiRequest('/profiles/club', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getClubProfile: (id?: string): Promise<{ profile: ClubProfile }> =>
    apiRequest(`/profiles/club${id ? `/${id}` : ''}`),

  updateClubProfile: (data: Partial<Omit<ClubProfile, '_id' | 'userId' | 'verified'>>): Promise<{ message: string; profile: ClubProfile }> =>
    apiRequest('/profiles/club', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Brand profiles
  createBrandProfile: (data: Omit<BrandProfile, '_id' | 'userId' | 'verified'>): Promise<{ message: string; profile: BrandProfile }> =>
    apiRequest('/profiles/brand', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getBrandProfile: (id?: string): Promise<{ profile: BrandProfile }> =>
    apiRequest(`/profiles/brand${id ? `/${id}` : ''}`),

  updateBrandProfile: (data: Partial<Omit<BrandProfile, '_id' | 'userId' | 'verified'>>): Promise<{ message: string; profile: BrandProfile }> =>
    apiRequest('/profiles/brand', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Search profiles
  searchClubs: (params?: {
    search?: string;
    university?: string;
    category?: string;
    verified?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ profiles: ClubProfile[]; pagination: any }> => {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.append('search', params.search);
    if (params?.university) searchParams.append('university', params.university);
    if (params?.category) searchParams.append('category', params.category);
    if (params?.verified) searchParams.append('verified', 'true');
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    return apiRequest(`/profiles/clubs/search?${searchParams.toString()}`);
  },

  searchBrands: (params?: {
    search?: string;
    industry?: string;
    verified?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ profiles: BrandProfile[]; pagination: any }> => {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.append('search', params.search);
    if (params?.industry) searchParams.append('industry', params.industry);
    if (params?.verified) searchParams.append('verified', 'true');
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    return apiRequest(`/profiles/brands/search?${searchParams.toString()}`);
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
export const utils = {
  // Test backend connection
  healthCheck: (): Promise<{ status: string; timestamp: string }> =>
    apiRequest('/health'),

  // Check if backend is reachable
  isBackendReachable: async (): Promise<boolean> => {
    try {
      await utils.healthCheck();
      return true;
    } catch {
      return false;
    }
  },
};