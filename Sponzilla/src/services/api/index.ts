export * from './base';
export * from './auth';
export * from './events';
export * from './profiles';
export * from './analytics';
export * from './chat';
export * from './sponsorships';
export * from './sponsorship';
export * from './admin';
export * from './proofOfWork';

export const contactAPI = {
  submitContactForm: async (data: { name: string; email: string; subject: string; message: string }) => {
    const { apiRequest } = await import('./base');
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
};
