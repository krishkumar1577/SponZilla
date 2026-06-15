import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const paymentAPI = {
  createOrder: async (planType: 'monthly' | 'yearly') => {
    try {
      const response = await axios.post(
        `${API_URL}/payments/create-order`,
        { planType },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('Create Order Error:', error);
      throw error;
    }
  },

  verifyPayment: async (verificationData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    try {
      const response = await axios.post(
        `${API_URL}/payments/verify`,
        verificationData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('Verify Payment Error:', error);
      throw error;
    }
  }
};
