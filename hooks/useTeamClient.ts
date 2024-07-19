import axios, { AxiosResponse } from 'axios';
import { useAuth } from '@providers/AuthProvider';
import { API_BASE_URL } from '@/lib/api/apiClient';
import { CreateTeamDTO, JoinTeamDTO, Team } from '@/types/TeamType';

const client = axios.create({ withCredentials: true, baseURL: API_BASE_URL });

const useTeamClient = () => {
  const { accessToken } = useAuth();

  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const createTeam = async (body: CreateTeamDTO): Promise<AxiosResponse<Team>> => client.post('/v1/team/create', body);

  const joinTeam = async (body: JoinTeamDTO): Promise<AxiosResponse<Team>> => client.post('/v1/team/join', body);

  return {
    createTeam,
    joinTeam,
  };
};

export default useTeamClient;
