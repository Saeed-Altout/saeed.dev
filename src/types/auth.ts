export type AuthResponse<T> = {
  data: T;
  message: string;
  status: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
  created_at: string;
  updated_at: string;
};

export type SignInResponse = AuthResponse<{
  user: User;
  token: string;
}>;

export type SignUpResponse = AuthResponse<{
  user: User;
  token: string;
}>;

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
