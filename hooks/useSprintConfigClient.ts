import axios, { AxiosResponse } from 'axios';
import { useAuth } from '@providers/AuthProvider';
import { API_BASE_URL } from '@/lib/api/apiClient';
import { Sprint, CreateSprintDTO } from '@/types/SprintType';

const client = axios.create({ withCredentials: true, baseURL: API_BASE_URL });

const useSprintConfigClient = () => {
  const { accessToken } = useAuth();

  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const createSprint = async (body: CreateSprintDTO): Promise<AxiosResponse<Sprint>> =>
    client.post('/v1/sprint/create', body);

  return {
    createSprint,
  };
};

export default useSprintConfigClient;
