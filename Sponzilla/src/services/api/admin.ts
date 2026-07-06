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

export interface ActivityItem {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  occurredAt: string;
  status: string;
  amount?: number;
}

export interface AdminStats {
  totalUsers: number;
  totalClubs: number;
  totalBrands: number;
  totalEvents: number;
  publishedEvents: number;
  verifiedClubs: number;
  verifiedBrands: number;
  totalSponsorshipValue: number;
  acceptedSponsorshipValue: number;
  acceptedSponsorshipCount: number;
  pendingSponsorshipCount: number;
  proofOfWorkCount: number;
  fundedEscrowCount: number;
  disputedEscrowCount: number;
  recentActivity: ActivityItem[];
}

export interface PlatformAnalytics {
  overview?: {
    totalEvents?: number;
    totalClubs?: number;
    totalBrands?: number;
    totalUsers?: number;
  };
  events?: {
    published?: number;
    completed?: number;
    draft?: number;
  };
}

export interface AdminSponsorship {
  _id: string;
  tierName: string;
  amount: number;
  status: string;
  createdAt: string;
  eventId?: {
    title?: string;
  };
  brandId?: {
    brandName?: string;
    industry?: string;
  };
  clubId?: {
    clubName?: string;
    university?: string;
  };
}

export interface ProofOfWorkMilestoneAdminItem {
  title: string;
  payoutAmount: number;
  status: string;
  submittedAt?: string;
  verifiedAt?: string;
}

export interface ProofOfWorkAdminItem {
  _id: string;
  escrowAmount: number;
  escrowStatus: 'pending_signatures' | 'unfunded' | 'funded' | 'partially_released' | 'fully_released' | 'disputed';
  agreementSigned: boolean;
  createdAt: string;
  updatedAt: string;
  clubId?: {
    clubName?: string;
  };
  brandId?: {
    brandName?: string;
  };
  eventId?: {
    title?: string;
    eventDate?: string;
  };
  sponsorshipRequestId?: {
    status?: string;
    amount?: number;
  };
  milestones: ProofOfWorkMilestoneAdminItem[];
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

  getSponsorships: (): Promise<{ success: boolean; sponsorships: AdminSponsorship[] }> =>
    apiRequest('/admin/sponsorships'),

  getProofOfWork: (): Promise<{ success: boolean; proofOfWork: ProofOfWorkAdminItem[] }> =>
    apiRequest('/admin/proof-of-work'),

  verifyClub: (id: string): Promise<{ success: boolean; verified: boolean; club: ClubProfile }> =>
    apiRequest(`/admin/clubs/${id}/verify`, { method: 'PUT' }),

  verifyBrand: (id: string): Promise<{ success: boolean; verified: boolean; brand: BrandProfile }> =>
    apiRequest(`/admin/brands/${id}/verify`, { method: 'PUT' }),

  featureEvent: (id: string): Promise<{ success: boolean; featured: boolean; event: Event }> =>
    apiRequest(`/admin/events/${id}/feature`, { method: 'PUT' }),

  deleteUser: (id: string): Promise<{ success: boolean; message: string }> =>
    apiRequest(`/admin/users/${id}`, { method: 'DELETE' }),

  deleteClub: (id: string): Promise<{ success: boolean; message: string }> =>
    apiRequest(`/admin/clubs/${id}`, { method: 'DELETE' }),

  deleteBrand: (id: string): Promise<{ success: boolean; message: string }> =>
    apiRequest(`/admin/brands/${id}`, { method: 'DELETE' }),
};
