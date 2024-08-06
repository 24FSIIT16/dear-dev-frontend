export interface DashboardDTO {
  activeSprintEndDate: string;
  averageHappinessScore: number;
  lastSubmissionDateOfHappiness: string;
  mostTrackedEmotions: string[];
  mostTrackedWorkKind: string;
  numberOfDaysWithHappinessSurvey: number;
  numberOfHappinessSurveysToday: number;
  numberOfTeamMembers: number;
  numberOfTeams: number;
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
