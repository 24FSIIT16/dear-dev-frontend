export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  image: string | null;
}

export interface UpdatedUser {
  id: number;
  username: string;
}

export interface UserWithProvider {
  id: string;
  name: string;
  email: string;
  username: string;
  provider: string;
}
