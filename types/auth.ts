export interface UserProfile {
  id?: string | number;
  name?: string;
  email?: string;
  username?: string;
}

export interface AuthSession {
  token: string;
  user: UserProfile;
}
