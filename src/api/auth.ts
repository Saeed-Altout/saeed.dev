import { apiClient } from "@/lib/axios";
import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  SignOutResponse,
  GetUserResponse,
  UploadProfilePictureResponse,
  UploadProfilePictureRequest,
} from "@/types/auth";
import type { Me } from "@/types";
import { me } from "@/data/me";

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

export function getMe(): Promise<Me> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(me);
    }, 800);
  });
}

export const uploadProfilePicture = async (
  request: UploadProfilePictureRequest
): Promise<UploadProfilePictureResponse> => {
  const formData = new FormData();
  formData.append("file", request.file);
  const response = await apiClient.post(
    import.meta.env.VITE_UPLOAD_PROFILE_PICTURE_URL,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
