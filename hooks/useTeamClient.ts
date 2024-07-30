import axios, { AxiosResponse } from 'axios';
import { useAuth } from '@providers/AuthProvider';
import { API_BASE_URL } from '@/lib/api/apiClient';
import { CreateTeamDTO, JoinTeamDTO, Team } from '@/types/TeamType';
import { TeamConfigType } from '@/types/TeamConfigType';

const client = axios.create({ withCredentials: true, baseURL: API_BASE_URL });

const useTeamClient = () => {
  const { accessToken } = useAuth();

  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const createTeam = async (body: CreateTeamDTO): Promise<AxiosResponse<Team>> => client.post('/v1/team/create', body);

  const joinTeam = async (body: JoinTeamDTO): Promise<AxiosResponse<Team>> => client.post('/v1/team/join', body);

  const getTeamConfig = async (teamId: string): Promise<AxiosResponse<TeamConfigType>> =>
    client.get(`/v1/team/${teamId}/config`);

  const updateTeamConfig = async (teamId: string, body: TeamConfigType): Promise<AxiosResponse<TeamConfigType>> =>
    client.put(`v1/team/${teamId}/config`, body);

  return {
    createTeam,
    joinTeam,
    getTeamConfig,
    updateTeamConfig,
  };
};

export default useTeamClient;
