import axios, { AxiosResponse } from 'axios';
import { useAuth } from '@providers/AuthProvider';
import { API_BASE_URL } from '@/lib/api/apiClient';
import { HappinessInsightsChartDTO } from '@/types/InsightsType';

const client = axios.create({ withCredentials: true, baseURL: API_BASE_URL });

const useInsightsClient = () => {
  const { accessToken } = useAuth();

  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const getHappinessTeamVsPersonal = async (userId: string): Promise<AxiosResponse<HappinessInsightsChartDTO[]>> =>
    client.get(`/v1/insights/happiness/team-vs-personal/user/${userId}`);

  return {
    getHappinessTeamVsPersonal,
  };
};

export default useInsightsClient;