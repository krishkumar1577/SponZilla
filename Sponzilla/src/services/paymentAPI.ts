import { apiRequest } from './api/base';

export type PlanName = 'club_pro' | 'brand_starter' | 'brand_pro';
export type BillingCycle = 'monthly' | 'yearly';

interface CreateOrderResponse {
  success: boolean;
  order: { id: string; amount: number; currency: string };
}

interface VerifyPaymentResponse {
  success: boolean;
  message: string;
}

export const paymentAPI = {
  createOrder: (planName: PlanName, billingCycle: BillingCycle) =>
    apiRequest<CreateOrderResponse>('/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({ planName, billingCycle }),
    }),

  verifyPayment: (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    planName: PlanName;
  }) =>
    apiRequest<VerifyPaymentResponse>('/payments/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
