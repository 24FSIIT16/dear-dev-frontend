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

  const updateSprint = async (sprintId: string, body: CreateSprintDTO): Promise<AxiosResponse<Sprint>> =>
    client.put(`v1/sprint/update/${sprintId}`, body);

  const startSprint = async (sprintId: string, teamId: string): Promise<AxiosResponse<void>> =>
    client.post('/v1/sprint/start', { sprintId, teamId });

  const completeSprint = async (sprintId: number): Promise<AxiosResponse<void>> =>
    client.put(`/v1/sprint/complete/${sprintId}`);

  return {
    createSprint,
    updateSprint,
    startSprint,
    completeSprint,
  };
};

export default useSprintConfigClient;
