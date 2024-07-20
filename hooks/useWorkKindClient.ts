import axios, { AxiosResponse } from 'axios';
import { useAuth } from '@providers/AuthProvider';
import { API_BASE_URL } from '@/lib/api/apiClient';
import { WorkKind } from '@/types/WorkKindType';

const client = axios.create({ withCredentials: true, baseURL: API_BASE_URL });

const useWorkKindClient = () => {
  const { accessToken } = useAuth();

  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const getWorkKinds = async (userId: string): Promise<AxiosResponse<WorkKind[]>> =>
    client.get(`/v1/workkinds/user/${userId}`);

  return {
    getWorkKinds,
  };
};

export default useWorkKindClient;
