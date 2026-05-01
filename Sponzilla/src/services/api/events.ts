import { apiRequest } from './base';

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

export interface CreateEventData {
  title: string;
  description: string;
  eventDate: string;
  category: string;
  venue: string;
  expectedAttendees: number;
  duration?: number;
  targetAudience?: string[];
  budget: {
    total: number;
    sponsorshipNeeded: number;
    currency?: string;
  };
  sponsorshipTiers: Array<{
    name: string;
    amount: number;
    benefits: string[];
    spotsAvailable: number;
  }>;
  status?: 'draft' | 'published';
}

export interface EventsResponse {
  events: Event[];
}

export const eventsAPI = {
  getAllEvents: (params?: { category?: string; search?: string }): Promise<EventsResponse> => {
    let query = '';
    if (params) {
      const searchParams = new URLSearchParams();
      if (params.category) searchParams.append('category', params.category);
      if (params.search) searchParams.append('search', params.search);
      query = `?${searchParams.toString()}`;
    }
    return apiRequest(`/events${query}`);
  },

  getEventById: (id: string): Promise<{ event: Event }> =>
    apiRequest(`/events/${id}`),

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
};
