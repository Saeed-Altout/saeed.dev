import { apiClient } from "@/lib/axios";
import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  SignOutResponse,
  GetUserResponse,
} from "@/lib/auth";

export const signIn = async (
  request: SignInRequest
): Promise<SignInResponse> => {
  const response = await apiClient.post(
    import.meta.env.VITE_SIGN_IN_URL,
    request
  );
  return response.data;
};

export const signUp = async (
  request: SignUpRequest
): Promise<SignUpResponse> => {
  const response = await apiClient.post(
    import.meta.env.VITE_SIGN_UP_URL,
    request
  );
  return response.data;
};

export const signOut = async (): Promise<SignOutResponse> => {
  const response = await apiClient.post(import.meta.env.VITE_SIGN_OUT_URL);
  return response.data;
};

export const getUser = async (): Promise<GetUserResponse> => {
  const response = await apiClient.get(import.meta.env.VITE_GET_USER_URL);
  return response.data;
};
