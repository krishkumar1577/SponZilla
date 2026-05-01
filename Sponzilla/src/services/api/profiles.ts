import { apiRequest } from './base';

export interface ClubProfile {
  _id: string;
  userId: string;
  clubName: string;
  university: string;
  description: string;
  category: string;
  memberCount: number;
  establishedYear: number;
  website?: string;
  logo?: string;
  banner?: string;
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
  companySize: string;
  website: string;
  logo?: string;
  banner?: string;
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
  sponsorshipBudget?: {
    min: number;
    max: number;
  };
  preferredEventTypes?: string[];
  budget: {
    min: number;
    max: number;
  };
  targetAudience: string[];
  interests: string[];
  verified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const profilesAPI = {
  getClubProfile: (id: string): Promise<{ profile: ClubProfile }> =>
    apiRequest(`/profiles/club/${id}`),

  getBrandProfile: (id: string): Promise<{ profile: BrandProfile }> =>
    apiRequest(`/profiles/brand/${id}`),

  getMyProfile: (): Promise<{ profile: ClubProfile | BrandProfile }> =>
    apiRequest('/profiles/me'),

  updateClubProfile: (data: Partial<ClubProfile>): Promise<{ profile: ClubProfile }> =>
    apiRequest('/profiles/club', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  updateBrandProfile: (data: Partial<BrandProfile>): Promise<{ profile: BrandProfile }> =>
    apiRequest('/profiles/brand', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  createClubProfile: (data: Partial<ClubProfile>): Promise<{ profile: ClubProfile }> =>
    apiRequest('/profiles/club', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createBrandProfile: (data: Partial<BrandProfile>): Promise<{ profile: BrandProfile }> =>
    apiRequest('/profiles/brand', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getAllClubs: (): Promise<{ success: boolean; clubs: ClubProfile[] }> =>
    apiRequest('/profiles/clubs'),

  getAllBrands: (): Promise<{ success: boolean; brands: BrandProfile[] }> =>
    apiRequest('/profiles/brands'),
};
