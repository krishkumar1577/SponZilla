// API Base URL Configuration
// In development, use empty string to leverage Vite proxy (/api -> backend:5000)
// In production, use your actual backend domain
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Generic API function with error handling
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}/api${endpoint}`;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (import.meta.env.DEV) console.error('❌ API Request failed:', error);
    throw error;
  }
}
