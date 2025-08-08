import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import {
  signIn,
  signUp,
  type SignInRequest,
  type SignUpRequest,
} from "@/lib/auth";

export const useSignInMutation = () => {
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: (request: SignInRequest) => signIn(request),
    onSuccess: (data) => {
      toast.success(data.message || "Sign in successful");
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
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Sign up failed");
      }
    },
  });
};
