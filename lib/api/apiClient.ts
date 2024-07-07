const API_BASE_URL = 'http://localhost:8080';

const setHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

const apiClient = {
  get: (endpoint: string, token: string) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: setHeaders(token),
    }).then((response) => response.json()),
  post: (endpoint: string, token: string, body: Record<string, unknown>) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: setHeaders(token),
      body: JSON.stringify(body),
    }).then((response) => response.json()),
  put: (endpoint: string, token: string, body: Record<string, unknown>) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: setHeaders(token),
      body: JSON.stringify(body),
    }).then((response) => response.json()),
  delete: (endpoint: string, token: string) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: setHeaders(token),
    }).then((response) => response.json()),
};

export default apiClient;
