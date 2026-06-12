import { apiRequest } from './base';

export interface ProofOfWorkData {
  eventId: string;
  actualAttendees: number;
  socialImpressions: number;
  clickThroughs: number;
  postEventNotes?: string;
}

export const proofOfWorkAPI = {
  submitReport: (data: ProofOfWorkData) => 
    apiRequest('/proof-of-work/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  getReportByEvent: (eventId: string) => 
    apiRequest(`/proof-of-work/event/${eventId}`),
};
