import { TeamMemberWithUser } from './TeamMemberType';

export interface Team {
  id: number;
  name: string;
  currentSprintId: number;
  configId: number;
  code: string;
  createdBy: number;
  createdAt: string;
  active: boolean;
  role: string;
}

export interface CreateTeamDTO {
  userId: string | undefined;
  name: string;
}

export interface JoinTeamDTO {
  userId: string | undefined;
  code: string;
}

export interface TeamWithMembers {
  isAdmin: boolean;
  team: Team;
  members: TeamMemberWithUser[];
}
