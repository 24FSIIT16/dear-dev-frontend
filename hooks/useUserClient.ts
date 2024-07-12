import axios, { AxiosResponse } from 'axios';
import { useAuth } from '@providers/AuthProvider';
import { UserWithProvider } from '@/types/UserType';
import { API_BASE_URL } from '@/lib/api/apiClient';

const client = axios.create({ withCredentials: true, baseURL: API_BASE_URL });

const useUserClient = () => {
  const { accessToken } = useAuth();

  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const update = async (values: UserWithProvider): Promise<AxiosResponse<UserWithProvider>> =>
    client.put(`/v1/user-with-provider/${values.id}`, values);

  return {
    update,
  };
};

export default useUserClient;
