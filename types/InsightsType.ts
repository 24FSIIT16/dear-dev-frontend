export interface InsightsDTO {
  happinessInsights: HappinessInsightsDTO[];
  workKindInsights: WorkKindInsightsDTO[];
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
