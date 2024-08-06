import axios, { AxiosResponse } from 'axios';
import { useAuth } from '@providers/AuthProvider';
import { API_BASE_URL } from '@/lib/api/apiClient';
import { SubmitEmotionsDTO, SubmitHappinessScoreDTO, SubmitWorkKindScoreDTO } from '@/types/SurveyType';

const client = axios.create({ withCredentials: true, baseURL: API_BASE_URL });

const useDashboardClient = () => {
  const { accessToken } = useAuth();

  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const submitHappinessScore = async (body: SubmitHappinessScoreDTO): Promise<AxiosResponse<SubmitHappinessScoreDTO>> =>
    client.post('/v1/dashboard/survey/happiness', body);

  const submitWorkKindScore = async (body: SubmitWorkKindScoreDTO): Promise<AxiosResponse<SubmitWorkKindScoreDTO>> =>
    client.post('/v1/dashboard/survey/workkind', body);

  const submitEmotions = async (body: SubmitEmotionsDTO): Promise<AxiosResponse<SubmitEmotionsDTO>> =>
    client.post('/v1/dashboard/survey/emotion', body);

  return {
    submitHappinessScore,
    submitWorkKindScore,
    submitEmotions,
  };
};

export default useDashboardClient;
