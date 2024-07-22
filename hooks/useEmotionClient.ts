import axios, { AxiosResponse } from 'axios';
import { useAuth } from '@providers/AuthProvider';
import { API_BASE_URL } from '@/lib/api/apiClient';
import { Emotion } from '@/types/EmotionType';

const client = axios.create({ withCredentials: true, baseURL: API_BASE_URL });

const useEmotionClient = () => {
  const { accessToken } = useAuth();

  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const getEmotions = async (): Promise<AxiosResponse<Emotion[]>> => client.get(`/v1/emotions`);

  return {
    getEmotions,
  };
};

export default useEmotionClient;
