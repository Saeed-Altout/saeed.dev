import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "sonner";

import type {
  SignInRequest,
  SignUpRequest,
  UploadProfilePictureRequest,
} from "@/types/auth";
import {
  signIn,
  signUp,
  signOut,
  getUser,
  getMe,
  uploadProfilePicture,
} from "@/api/auth";
import { useAuthStore } from "@/stores/auth";
import type { Me } from "@/types";

export const useSignInMutation = () => {
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: (request: SignInRequest) => signIn(request),
    onSuccess: (data) => {
      toast.success(data.message || "Sign in successful");
      useAuthStore.setState({
        user: data.data.user,
        token: data.data.token,
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Sign in failed");
      }
    },
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: (request: SignUpRequest) => signUp(request),
    onSuccess: (data) => {
      toast.success(data.message || "Sign up successful");
      useAuthStore.setState({
        user: data.data.user,
        token: data.data.token,
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Sign up failed");
      }
    },
  });
};

export const useSignOutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["sign-out"],
    mutationFn: signOut,
    onSuccess: (data) => {
      toast.success(data.message || "Sign out successful");
      queryClient.clear();
      useAuthStore.setState({
        user: null,
        token: null,
      });
      navigate("/auth/sign-in");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Sign out failed");
      }
    },
  });
};

export const useGetUserQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};

export const useMeQuery = () => {
  return useQuery<Me>({
    queryKey: ["me"],
    queryFn: getMe,
  });
};

export const useUploadProfilePictureMutation = () => {
  return useMutation({
    mutationKey: ["upload-profile-picture"],
    mutationFn: (request: UploadProfilePictureRequest) =>
      uploadProfilePicture(request),
    onSuccess: (data) => {
      useAuthStore.setState((state) => ({
        ...state,
        profile_picture: data.data.url,
      }));
      toast.success(data.message || "Profile picture uploaded successfully");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "Profile picture upload failed"
        );
      }
    },
  });
};
