import { apiRequest } from './base';
import type { ClubProfile, BrandProfile } from './profiles';
import type { Event } from './events';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  createdAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalClubs: number;
  totalBrands: number;
  totalEvents: number;
  publishedEvents: number;
  verifiedClubs: number;
  verifiedBrands: number;
}

export const adminAPI = {
  getStats: (): Promise<{ success: boolean; stats: AdminStats }> =>
    apiRequest('/admin/stats'),

  getUsers: (): Promise<{ success: boolean; users: User[] }> =>
    apiRequest('/admin/users'),

  getClubs: (): Promise<{ success: boolean; clubs: ClubProfile[] }> =>
    apiRequest('/admin/clubs'),

  getBrands: (): Promise<{ success: boolean; brands: BrandProfile[] }> =>
    apiRequest('/admin/brands'),

  getEvents: (): Promise<{ success: boolean; events: Event[] }> =>
    apiRequest('/admin/events'),

  getSponsorships: (): Promise<{ success: boolean; sponsorships: any[] }> =>
    apiRequest('/admin/sponsorships'),

  verifyClub: (id: string): Promise<{ success: boolean; verified: boolean; club: ClubProfile }> =>
    apiRequest(`/admin/clubs/${id}/verify`, { method: 'PUT' }),

  verifyBrand: (id: string): Promise<{ success: boolean; verified: boolean; brand: BrandProfile }> =>
    apiRequest(`/admin/brands/${id}/verify`, { method: 'PUT' }),

  featureEvent: (id: string): Promise<{ success: boolean; featured: boolean; event: Event }> =>
    apiRequest(`/admin/events/${id}/feature`, { method: 'PUT' }),

  deleteUser: (id: string): Promise<{ success: boolean; message: string }> =>
    apiRequest(`/admin/users/${id}`, { method: 'DELETE' }),
};
