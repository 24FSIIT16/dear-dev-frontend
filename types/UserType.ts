export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  hasTeam: boolean;
  githubUserName: string;
}

export interface UpdatedUser {
  id: string | undefined;
  username: string;
  githubUserName: string;
}

export interface UserWithProvider {
  id: string;
  name: string;
  email: string;
  username: string;
  provider: string;
  githubUserName: string;
}
