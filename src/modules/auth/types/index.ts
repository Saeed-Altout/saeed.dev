export type AuthResponse<T> = {
  user: T;
  message: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
};
export type SignInResponse = AuthResponse<{
  accessToken: string;
  refreshToken: string;
  user: User;
}>;

export type SignUpResponse = AuthResponse<{
  accessToken: string;
  refreshToken: string;
  user: User;
}>;

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  name: string;
};
