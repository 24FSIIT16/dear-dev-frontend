export interface InsightsDTO {
  happinessInsights: HappinessInsightsDTO[];
  workKindInsights: WorkKindInsightsDTO[];
  emotionInsights: EmotionInsightsDTO[];
  workKindCountPerDayInsights: WorkKindCountPerDayInsightDTO[];
  userAverageHappiness: number;
  teamAverageHappiness: number;
}

export interface HappinessInsightsDTO {
  day: string;
  userAverage: number;
  teamAverage: number;
}

export interface WorkKindInsightsDTO {
  workKindId: number;
  workKindName: string;
  userAverage: number;
  userCount: number;
  teamAverage: number;
  teamCount: number;
}

export interface EmotionInsightsDTO {
  emotionId: number;
  emotionName: string;
  userCount: number;
  teamCount: number;
}

export interface WorkKindCountPerDayInsightDTO {
  workKindCount: number;
  userAverageHappiness: number;
  teamAverageHappiness: number;
}
