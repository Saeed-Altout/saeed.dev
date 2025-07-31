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

import { signUpSchema, type SignUpSchema } from "../schemas";
import { simulateSignUpApi } from "../api";

/**
 * SignUpForm - A pure, accessible, and robust sign-up form component.
 * Uses react-hook-form with Zod validation, and follows best practices for accessibility and UI.
 */
export function SignUpForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  /**
   * Handles the sign-up process, including error handling and navigation.
   */
  const handleSignUp: SubmitHandler<SignUpSchema> = async (values) => {
    setIsLoading(true);
    try {
      const authResult = await simulateSignUpApi({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        acceptTerms: values.acceptTerms,
      });

      if (authResult.success) {
        toast.success(authResult.message);
        localStorage.setItem("token", authResult.token ?? "");
        localStorage.setItem("userData", JSON.stringify(authResult.data));
        // Navigate to email verification page or dashboard
        navigate("/auth/verify-email", {
          state: { email: values.email, fromSignup: true },
        });
      } else {
        toast.error(authResult.message);
      }
    } catch (error) {
      toast.error(
        "An error occurred during account creation. Please try again."
      );
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.error("SignUpForm - handleSignUp error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="max-w-md mx-auto p-0 space-y-6"
      aria-label="Sign up form"
      tabIndex={-1}
    >
      <h2 className="text-2xl font-semibold text-primary text-center">
        Join <span className="font-bold">Flexify</span>
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignUp)}
          className="space-y-5"
          aria-label="Sign up form"
          autoComplete="on"
          noValidate
        >
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="first-name-input">First Name</FormLabel>
                  <FormControl>
                    <Input
                      id="first-name-input"
                      type="text"
                      placeholder="John"
                      autoComplete="given-name"
                      {...field}
                      disabled={isLoading}
                      aria-required="true"
                      aria-invalid={!!form.formState.errors.firstName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="last-name-input">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      id="last-name-input"
                      type="text"
                      placeholder="Doe"
                      autoComplete="family-name"
                      {...field}
                      disabled={isLoading}
                      aria-required="true"
                      aria-invalid={!!form.formState.errors.lastName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                    placeholder="john.doe@example.com"
                    autoComplete="username"
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
                      placeholder="Min. 8 characters"
                      autoComplete="new-password"
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
              </FormItem>
            )}
          />
          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirm-password-input">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="confirm-password-input"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      {...field}
                      disabled={isLoading}
                      className="pr-12"
                      aria-required="true"
                      aria-invalid={!!form.formState.errors.confirmPassword}
                    />
                    <button
                      type="button"
                      tabIndex={0}
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
          {/* Accept Terms Checkbox */}
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                    id="accept-terms-checkbox"
                    className="mt-1"
                    aria-checked={field.value}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel
                    htmlFor="accept-terms-checkbox"
                    className="text-sm font-normal cursor-pointer"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </Link>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            aria-label="Create Account"
            disabled={isLoading}
          >
            Create Account
          </Button>
        </form>
      </Form>
      {/* Sign In Link */}
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link
          to="/auth/sign-in"
          className="text-primary hover:underline font-medium"
        >
          Sign In
        </Link>
      </div>
    </section>
  );
}
SignUpForm.displayName = "SignUpForm";
