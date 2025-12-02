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
  sponsorshipTiers?: Array<{
    name: string;
    amount: number;
    benefits: string[];
    spotsAvailable: number;
    spotsTaken: number;
  }>;
  benefits?: string[];
  clubId: {
    _id: string;
    clubName: string;
    university: string;
    description?: string;
    logo?: string;
    contactPerson?: {
      name: string;
      email: string;
      phone: string;
    };
  };
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  sponsorshipRequests?: string[];
  analytics: {
    views: number;
    impressions: number;
    applications: number;
  };
  tags?: string[];
  pitchDeck?: string | null;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    website?: string;
  };
  highlights?: string[];
  previousEditions?: Array<{
    year: number;
    attendees: number;
    sponsors: number;
    budget: number;
  }>;
  featured: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClubProfile {
  _id: string;
  clubName: string;
  university: string;
  description: string;
  category: string;
  memberCount: number;
  establishedYear: number;
  website?: string;
  logo?: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
  contactPerson: {
    name: string;
    email: string;
    phone: string;
  };
  contactEmail?: string;
  verified: boolean;
  views?: number;
  createdAt: string;
  updatedAt: string;
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

export const profilesAPI = {
  // Get all clubs
  getAllClubs: (): Promise<{ clubs: ClubProfile[] }> =>
    apiRequest('/profiles/clubs'),

  // Get all brands
  getAllBrands: (): Promise<{ brands: BrandProfile[] }> =>
    apiRequest('/profiles/brands'),

  // Get current user's profile
  getMyProfile: (): Promise<{ profile: ClubProfile | BrandProfile }> =>
    apiRequest('/profiles/me'),

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
    apiRequest(`/profiles/brands${id ? `/${id}` : ''}`),

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
// ANALYTICS API  
// ============================================
export interface ClubAnalytics {
  overview: {
    totalSponsorshipsSecured: number;
    totalFundsRaised: number;
    averageSponsorshipValue: number;
    totalAttendance: number;
  };
  events: {
    totalEvents: number;
    publishedEvents: number;
    completedEvents: number;
    upcomingOpportunities: number;
  };
  analytics: {
    totalViews: number;
    totalImpressions: number;
    totalApplications: number;
    reach: number;
  };
  growth: {
    sponsorshipGrowth: number;
    fundsGrowth: number;
    attendanceGrowth: number;
  };
  goals: {
    totalSponsorshipGoal: number;
    achievementPercentage: number;
  };
}

export interface BrandAnalytics {
  investment: {
    totalInvestment: number;
    totalSponsored: number;
    averageInvestment: number;
    activeCampaigns: number;
    pendingProposals: number;
  };
  performance: {
    totalReach: number;
    impressions: number;
    engagementRate: number;
    roi: number;
  };
  growth: {
    reachGrowth: number;
    engagementGrowth: number;
    roiGrowth: number;
  };
  categories: Array<{
    name: string;
    performance: number;
  }>;
  demographics: {
    primaryAudience: string[];
    ageGroups: Array<{
      range: string;
      percentage: number;
    }>;
  };
}

export interface EventAnalytics {
  eventId: string;
  eventTitle: string;
  status: string;
  analytics: {
    views: number;
    impressions: number;
    applications: number;
    conversionRate: string;
  };
  sponsorshipStatus: {
    totalTiers: number;
    totalSpots: number;
    spotsTaken: number;
    potentialRevenue: number;
    confirmedRevenue: number;
  };
  timeline: {
    created: string;
    eventDate: string;
    daysUntilEvent: number;
  };
}

export const analyticsAPI = {
  // Club analytics (for club dashboard)
  getClubAnalytics: (): Promise<{ success: boolean; data: ClubAnalytics }> =>
    apiRequest('/analytics/club'),

  // Brand analytics (for brand dashboard)
  getBrandAnalytics: (): Promise<{ success: boolean; data: BrandAnalytics }> =>
    apiRequest('/analytics/brand'),

  // Event specific analytics
  getEventAnalytics: (eventId: string): Promise<{ success: boolean; data: EventAnalytics }> =>
    apiRequest(`/analytics/event/${eventId}`),

  // Platform overview (admin only)
  getPlatformAnalytics: (): Promise<{ success: boolean; data: any }> =>
    apiRequest('/analytics/platform'),
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