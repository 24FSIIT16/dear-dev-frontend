import axios, { AxiosResponse } from 'axios';
import { useAuth } from '@providers/AuthProvider';
import { API_BASE_URL } from '@/lib/api/apiClient';
import { SubmitHappinessScoreDTO } from '@/types/SurveyType';
import useTeamClient from '@hooks/useTeamClient';

const client = axios.create({ withCredentials: true, baseURL: API_BASE_URL });

const useSurveyClient = () => {
  const { accessToken } = useAuth();

  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const submitHappinessScore = async (body: SubmitHappinessScoreDTO): Promise<AxiosResponse<SubmitHappinessScoreDTO>> =>
    client.post('/v1/survey/happiness', body);

  return {
    submitHappinessScore,
  };
};

export default useSurveyClient;
