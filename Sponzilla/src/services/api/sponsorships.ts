import { apiRequest } from './base';

export const sponsorshipAPI = {
  getClubRequests: (): Promise<{ success: boolean; requests: any[] }> =>
    apiRequest('/sponsorships/club-requests'),

  getBrandRequests: (): Promise<{ success: boolean; requests: any[] }> =>
    apiRequest('/sponsorships/brand-requests'),

  updateStatus: (requestId: string, status: 'accepted' | 'rejected'): Promise<{ success: boolean; request: any }> =>
    apiRequest(`/sponsorships/status/${requestId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),

  apply: (data: { eventId: string; tierName: string; message: string }): Promise<{ success: boolean; request: any }> =>
    apiRequest('/sponsorships/apply', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
