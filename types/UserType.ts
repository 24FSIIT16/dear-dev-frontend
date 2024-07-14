export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  hasTeam: boolean;
}

export interface UpdatedUser {
  id: string | undefined;
  username: string;
}

export interface UserWithProvider {
  id: string;
  name: string;
  email: string;
  username: string;
  provider: string;
}
