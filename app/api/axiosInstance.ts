import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
// https://javascript.plainenglish.io/axios-a-simple-and-effective-way-to-make-api-calls-in-react-with-typescript-f0b1e7eebdc5

const axiosClient = (token: string | null = null): AxiosInstance => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    : {
        'Content-Type': 'multipart/form-data',
      };

  const client = axios.create({
    baseURL: 'http://localhost:8080', // process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090',
    headers,
    timeout: 60000,
    withCredentials: false,
  });

  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const localToken = localStorage.getItem('ACCESS_TOKEN');
    const newConfig = { ...config };
    newConfig.headers = newConfig.headers || {};
    if (localToken) {
      newConfig.headers.Authorization = `Bearer ${localToken}`;
    }
    return newConfig;
  });

  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      try {
        const { response } = error;
        if (response?.status === 401) {
          localStorage.removeItem('ACCESS_TOKEN');
        }
      } catch (e) {
        console.error(e);
      }
      throw error;
    }
  );

  return client;
};

export default axiosClient;
