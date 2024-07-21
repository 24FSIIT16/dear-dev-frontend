export interface TeamMember {
  id: number;
  userId: number;
  teamId: number;
  role: string;
  active: boolean;
}

export interface TeamMemberWithUser {
  id: number;
  user: User;
  teamId: number;
  role: string;
  active: boolean;
}

type User = {
  id: number;
  email: string;
  image: string;
  name: string;
  username: string;
};
