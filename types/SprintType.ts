import { Team } from './TeamType';

export interface Sprint {
  id: number;
  sprintName: string;
  sprintGoal: string;
  team: Team;
  startDate: Date;
  endDate: Date;
  createdAt: string;
  createdBy: number;
  active: boolean;
}

export interface CreateSprintDTO {
  sprintName: string;
  sprintGoal: string;
  startDate: string;
  endDate: string;
}
