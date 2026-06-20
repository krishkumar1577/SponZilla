import { apiRequest } from './base';

export interface Milestone {
  _id: string;
  title: string;
  description: string;
  payoutAmount: number;
  evidenceType: 'image' | 'link' | 'receipt' | 'text';
  status: 'pending' | 'submitted' | 'verified' | 'rejected';
  evidenceData?: string;
  brandFeedback?: string;
  submittedAt?: string;
  verifiedAt?: string;
}

export interface Escrow {
  _id: string;
  eventId: any;
  clubId: any;
  brandId: any;
  sponsorshipRequestId: string;
  escrowAmount: number;
  escrowStatus: 'unfunded' | 'funded' | 'partially_released' | 'fully_released' | 'disputed';
  milestones: Milestone[];
  createdAt: string;
  updatedAt: string;
}

export const proofOfWorkAPI = {
  getMyEscrows: (): Promise<{ success: boolean; escrows: Escrow[] }> => 
    apiRequest('/proof-of-work/my-escrows'),
    
  getEscrowBySponsorship: (sponsorshipId: string): Promise<{ success: boolean; escrow: Escrow }> => 
    apiRequest(`/proof-of-work/sponsorship/${sponsorshipId}`),

  submitMilestoneEvidence: (escrowId: string, milestoneId: string, data: { evidenceData: string; evidenceType?: string }): Promise<{ success: boolean; escrow: Escrow }> =>
    apiRequest(`/proof-of-work/${escrowId}/milestones/${milestoneId}/submit`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  verifyMilestone: (escrowId: string, milestoneId: string, data: { status: 'verified' | 'rejected'; brandFeedback?: string }): Promise<{ success: boolean; escrow: Escrow }> =>
    apiRequest(`/proof-of-work/${escrowId}/milestones/${milestoneId}/verify`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
