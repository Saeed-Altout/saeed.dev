import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

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
import { Checkbox } from "@/components/ui/checkbox";

import { signInSchema, type SignInSchema } from "../schemas";
import { simulateLoginApi } from "../api";
import { WrapperForm } from "./wrapper-form";

/**
 * SignInForm - A pure, accessible, and robust sign-in form component.
 * Uses react-hook-form with Zod validation, and follows best practices for accessibility and UI.
 */
export function SignInForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  /**
   * Handles the sign-in process, including error handling and navigation.
   */
  const handleSignIn: SubmitHandler<SignInSchema> = async (values) => {
    setIsLoading(true);
    try {
      const authResult = await simulateLoginApi(values.email, values.password);

      if (authResult.success) {
        toast.success(authResult.message);
        localStorage.setItem("token", authResult.token ?? "");
        navigate("/");
      } else {
        toast.error(authResult.message);
      }
    } catch (error) {
      toast.error("An error occurred during sign in. Please try again.");
      // Log error for debugging, but avoid leaking sensitive info
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.error("SignInForm - handleSignIn error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WrapperForm
      title="Welcome to Flexify"
      description="Enter your credentials to securely access your Flexify account."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignIn)}
          className="space-y-5"
          aria-label="Sign in form"
          autoComplete="on"
          noValidate
        >
          {/* Email Field */}
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
                    placeholder="example@gmail.com"
                    autoComplete="email"
                    {...field}
                    disabled={isLoading}
                    aria-required="true"
                    aria-invalid={!!form.formState.errors.email}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password-input">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="password-input"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      autoComplete="current-password"
                      {...field}
                      disabled={isLoading}
                      className="pr-12"
                      aria-required="true"
                      aria-invalid={!!form.formState.errors.password}
                    />
                    <button
                      type="button"
                      tabIndex={0}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-primary transition"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" aria-hidden="true" />
                      ) : (
                        <Eye className="size-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
                <div className="mt-1 text-right">
                  <Link
                    to="/auth/forgot-password"
                    className="text-xs text-primary hover:underline"
                    tabIndex={isLoading ? -1 : 0}
                  >
                    Forgot your password?
                  </Link>
                </div>
              </FormItem>
            )}
          />
          {/* Remember Me Checkbox */}
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                    id="remember-me-checkbox"
                    aria-checked={field.value}
                  />
                </FormControl>
                <FormLabel
                  htmlFor="remember-me-checkbox"
                  className="text-sm font-normal"
                >
                  Remember me
                </FormLabel>
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            aria-label="Sign in"
            disabled={isLoading}
          >
            Sign In
          </Button>
        </form>
      </Form>
      {/* Sign Up Link */}
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Don't have an account? </span>
        <Link
          to="/auth/sign-up"
          className="text-primary hover:underline font-medium"
        >
          Create Account
        </Link>
      </div>
    </WrapperForm>
  );
}
SignInForm.displayName = "SignInForm";
