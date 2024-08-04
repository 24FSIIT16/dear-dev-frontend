import useSWR from 'swr';
import { useAuth } from '@providers/AuthProvider';
import apiClient from '@/lib/api/apiClient';

const useSWRClient = <T = Record<string, unknown>>(endpoint: string) => {
  const { token: accessToken } = useAuth();

  const fetcher = async (url: string): Promise<T> => {
    if (!accessToken) return null as unknown as T;

    const token = String(accessToken);
    return apiClient.get<T>(url, token);
  };

  const { data, error, isLoading, mutate } = useSWR<T>([endpoint, accessToken], () => fetcher(endpoint));

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useSWRClient;
