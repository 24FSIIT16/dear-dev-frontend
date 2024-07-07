import useSWR from 'swr';
import { useAuth } from '@providers/AuthProvider';
import apiClient from '@/lib/api/apiClient';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const useApi = <T, B = Record<string, unknown>>(endpoint: string, method: HttpMethod, body?: B) => {
  const { token: accessToken } = useAuth();

  const fetcher = async (url: string) => {
    if (!accessToken) return null;

    const token = String(accessToken);
    const requestBody = body ? JSON.stringify(body) : {};

    switch (method) {
      case 'GET':
        return apiClient.get(url, token);
      case 'POST':
        return apiClient.post(url, token, requestBody);
      case 'PUT':
        return apiClient.put(url, token, requestBody);
      case 'DELETE':
        return apiClient.delete(url, token);
      default:
        throw new Error('Invalid method');
        return null;
    }
  };

  const { data, error, isLoading } = useSWR<T>([endpoint, accessToken], () => fetcher(endpoint));

  return {
    data,
    error,
    isLoading,
  };
};

export default useApi;
