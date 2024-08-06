import { Team } from './TeamType';

export interface Sprint {
  id: number;
  sprintName: string;
  sprintGoal: string;
  team: Team;
  startDate: Date | string;
  endDate: Date | string;
  createdAt: string;
  createdBy: number;
  status: string;
}

export interface ActiveSprint {
  sprint: Sprint;
  teamName: string;
}

export interface CreateSprintDTO {
  sprintName: string;
  sprintGoal: string;
  startDate: string;
  endDate: string;
}

export interface SprintsAndTeams {
  teams: Team[];
  sprints: Sprint[];
}

export interface SprintDTO {
  id: number;
  sprintName: string;
  sprintGoal: string;
  startDate: string;
  endDate: string;
  status: string;
}
