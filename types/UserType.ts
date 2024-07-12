export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

export interface UserWithProvider {
  id: string;
  name: string;
  email: string;
  provider: string;
}
