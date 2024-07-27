export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const setHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

const apiClient = {
  get: async <T>(endpoint: string, token: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: setHeaders(token),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data as T;
  },
};

export default apiClient;
