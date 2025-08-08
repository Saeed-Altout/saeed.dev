export type AuthResponse<T> = {
  data: T;
  message: string;
  status: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type SignInResponse = AuthResponse<User>;

export type SignUpResponse = AuthResponse<User>;

export type SignOutResponse = AuthResponse<null>;

export type GetUserResponse = AuthResponse<User>;

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  name: string;
};
