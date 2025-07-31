import { useState } from "react";
import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { toast } from "sonner";

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

import { forgotPasswordSchema, type ForgotPasswordSchema } from "../schemas";
import { simulateForgotPasswordApi } from "../api";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPassword = async (
    values: ForgotPasswordSchema
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await simulateForgotPasswordApi(values.email);

      if (result.success) {
        toast.success(result.message);
        setIsSubmitted(true);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred while sending the password reset link.");
      console.error("ForgotPasswordForm - handleForgotPassword error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        className="max-w-md mx-auto p-0 space-y-6 text-center"
        aria-label="Password reset link sent confirmation"
      >
        <div className="space-y-3">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-primary">Link Sent!</h2>
          <p className="text-muted-foreground text-sm">
            A password reset link has been sent to your email address.
            <span className="block mt-2">
              Please check your inbox and follow the instructions.
            </span>
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Didn't receive the email? Check your spam folder.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setIsSubmitted(false);
              form.reset();
            }}
            className="w-full"
          >
            Send Again
          </Button>
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
    <div
      className="max-w-md mx-auto p-0 space-y-6"
      aria-label="Password reset form"
    >
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-primary mb-1">Reset Password</h2>
        <p className="text-muted-foreground text-sm">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleForgotPassword)}
          className="space-y-5"
          aria-label="Password reset form"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email-input">Email Address</FormLabel>
                <FormControl>
                  <Input
                    id="email-input"
                    type="email"
                    placeholder="demo@saeed.dev"
                    autoComplete="username"
                    {...field}
                    disabled={isLoading}
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            aria-label="Send reset link"
          >
            Send Reset Link
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <Link
          to="/auth/sign-in"
          className="text-primary hover:underline text-sm font-medium"
        >
          Back to Sign In
        </Link>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        Or{" "}
        <Link to="/auth/sign-up" className="text-primary hover:underline">
          Create New Account
        </Link>
      </div>

      <div className="text-center text-xs text-muted-foreground mt-4">
        <span className="block">
          Having trouble? We're here to help you get back to coding.
        </span>
        <span className="block mt-1">
          Explore fullstack development at saeed.dev
        </span>
      </div>
    </div>
  );
}

ForgotPasswordForm.displayName = "ForgotPasswordForm";
