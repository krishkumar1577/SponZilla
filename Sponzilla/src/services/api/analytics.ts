import { apiRequest } from './base';

export interface ClubAnalytics {
  profileExists?: boolean;
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
  profileExists?: boolean;
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
