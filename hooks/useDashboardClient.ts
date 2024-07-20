import axios, { AxiosResponse } from 'axios';
import { useAuth } from '@providers/AuthProvider';
import { API_BASE_URL } from '@/lib/api/apiClient';
import { SubmitHappinessScoreDTO, SubmitWorkKindScoreDTO } from '@/types/SurveyType';
import { AverageScoreResponse, DashboardDTO } from '@/types/DashboardType';

const client = axios.create({ withCredentials: true, baseURL: API_BASE_URL });

const useDashboardClient = () => {
  const { accessToken } = useAuth();

  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const submitHappinessScore = async (body: SubmitHappinessScoreDTO): Promise<AxiosResponse<SubmitHappinessScoreDTO>> =>
    client.post('/v1/dashboard/survey/happiness', body);

  const getAverageScore = async (userId: string): Promise<AxiosResponse<AverageScoreResponse>> =>
    client.get(`/v1/dashboard/happiness/average/${userId}`);

  const submitWorkKindScore = async (body: SubmitWorkKindScoreDTO): Promise<AxiosResponse<SubmitWorkKindScoreDTO>> =>
    client.post('/v1/dashboard/survey/workkind', body);

  const getDashboardData = async (userId: string): Promise<AxiosResponse<DashboardDTO>> =>
    client.get(`/v1/dashboard/${userId}`);

  return {
    submitHappinessScore,
    submitWorkKindScore,
    getAverageScore,
    getDashboardData,
  };
};

export default useDashboardClient;
