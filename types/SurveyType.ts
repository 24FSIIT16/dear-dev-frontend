export interface SubmitHappinessScoreDTO {
  userId: string | undefined;
  score: number;
}

export interface AverageScoreResponse {
  averageScore: number;
}
