export interface InsightsDTO {
  happinessInsights: HappinessInsightsDTO[];
  workKindInsights: WorkKindInsightsDTO[];
}

export interface HappinessInsightsDTO {
  day: string;
  userAverage: number;
  teamAverage: number;
}

export interface WorkKindInsightsDTO {
  teamId: number | null;
  workKindId: number;
  workKindName: string;
  averageHappiness: number;
  totalCount: number;
}
