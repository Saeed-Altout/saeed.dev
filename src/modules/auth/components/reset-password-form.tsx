import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { resetPasswordSchema, type ResetPasswordSchema } from "../schemas";
import { simulateResetPasswordApi } from "../api";
import { WrapperForm } from "./wrapper-form";

/**
 * ResetPasswordForm - A secure password reset confirmation form.
 * Uses react-hook-form with Zod validation, handles token validation and new password setup.
 */
export function ResetPasswordForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const resetToken = searchParams.get("token");

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: resetToken || "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  useEffect(() => {
    if (resetToken) {
      form.setValue("token", resetToken);
    }
  }, [resetToken, form]);

  const handleResetPassword = async (
    values: ResetPasswordSchema
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await simulateResetPasswordApi(
        values.token,
        values.newPassword
      );

      if (result.success) {
        toast.success(result.message);

        // Clear any stored auth data
        localStorage.removeItem("token");
        localStorage.removeItem("userData");

        // Navigate to sign in with success message
        navigate("/auth/sign-in", {
          state: {
            message:
              "Password reset successful! You can now sign in with your new password.",
          },
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(
        "An error occurred while resetting your password. Please try again."
      );
      console.error("ResetPasswordForm - handleResetPassword error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // If no token is provided, show error state
  if (!resetToken) {
    return (
      <div
        className="max-w-md mx-auto p-0 space-y-6 text-center"
        aria-label="Invalid reset token error"
      >
        <div className="space-y-3">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-destructive">Invalid Link</h2>
          <p className="text-muted-foreground text-sm">
            The reset link is invalid or has expired.
            <span className="block mt-2">
              Please request a new password reset link.
            </span>
          </p>
        </div>

        <div className="space-y-3">
          <Link to="/auth/forgot-password">
            <Button className="w-full">Request New Link</Button>
          </Link>
        </div>

        <div className="text-center">
          <Link
            to="/auth/sign-in"
            className="text-primary hover:underline text-sm font-medium"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <WrapperForm
      title="Set New Password"
      description="Enter your new password for your Flexify account."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleResetPassword)}
          className="space-y-5"
          aria-label="Set new password form"
          autoComplete="on"
          noValidate
        >
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="new-password-input">New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="new-password-input"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      {...field}
                      disabled={isLoading}
                      className="pr-12"
                      autoFocus
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-label={
                        showNewPassword
                          ? "Hide new password"
                          : "Show new password"
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-primary transition"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      disabled={isLoading}
                    >
                      {showNewPassword ? (
                        <EyeOff className="size-4" aria-hidden="true" />
                      ) : (
                        <Eye className="size-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirm-new-password-input">
                  Confirm New Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="confirm-new-password-input"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                      {...field}
                      disabled={isLoading}
                      className="pr-12"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-primary transition"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-4" aria-hidden="true" />
                      ) : (
                        <Eye className="size-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-xs text-muted-foreground space-y-1">
            <p>Password must contain:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>At least 8 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one lowercase letter</li>
              <li>At least one number</li>
              <li>At least one special character (@$!%*?&)</li>
            </ul>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            aria-label="Set new password"
          >
            Set New Password
          </Button>
        </form>
      </Form>
      {/* Back to Sign In Link */}
      <div className="text-center">
        <Link
          to="/auth/sign-in"
          className="text-primary hover:underline text-sm font-medium"
        >
          Back to Sign In
        </Link>
      </div>
    </WrapperForm>
  );
}

ResetPasswordForm.displayName = "ResetPasswordForm";
