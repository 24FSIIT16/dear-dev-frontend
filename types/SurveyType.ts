export interface SubmitHappinessScoreDTO {
  userId: string | undefined;
  score: number;
}

export interface SubmitWorkKindScoreDTO {
  userId: string | undefined;
  workKindId: number | undefined;
  score: number;
}

export interface SubmitEmotionsDTO {
  userId: string | undefined;
  emotionId: number | undefined;
}
