// TEMPORARILY DISABLED: Razorpay payment API
// Uncomment and install axios (`npm i axios`) when Razorpay account is ready.

/*
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const paymentAPI = {
  createOrder: async (planType: 'monthly' | 'yearly') => {
    const response = await axios.post(`${API_URL}/payments/create-order`, { planType }, { withCredentials: true });
    return response.data;
  },
  verifyPayment: async (verificationData: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
    const response = await axios.post(`${API_URL}/payments/verify`, verificationData, { withCredentials: true });
    return response.data;
  }
};
*/
