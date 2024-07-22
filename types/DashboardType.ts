export interface DashboardDTO {
  averageScore: number;
  mostVotedWorkKind: MostVotedWorkKind;
}

export interface MostVotedWorkKind {
  workKindId: number;
  workKindName: string;
  voteCount: number;
  happinessScore: number;
}

export interface AverageScoreResponse {
  averageScore: number;
}
