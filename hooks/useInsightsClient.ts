import axios, { AxiosResponse } from 'axios';
import { useAuth } from '@providers/AuthProvider';
import { API_BASE_URL } from '@/lib/api/apiClient';
import { InsightsDTO } from '@/types/InsightsType';

const client = axios.create({ withCredentials: true, baseURL: API_BASE_URL });

const useInsightsClient = () => {
  const { accessToken } = useAuth();

  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const getInsightsByTeamAndSprint = async (
    userId: string,
    teamId: number,
    sprintId: number
  ): Promise<AxiosResponse<InsightsDTO>> => client.get(`/v1/insights/${userId}/team/${teamId}/sprint/${sprintId}`);

  return {
    getInsightsByTeamAndSprint,
  };
};

export default useInsightsClient;
