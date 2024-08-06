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
