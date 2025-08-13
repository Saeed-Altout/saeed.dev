import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormMessage,
  FormItem,
  FormField,
  FormLabel,
} from "@/components/ui/form";
import { useSignInMutation, useSignUpMutation } from "@/hooks/auth";
import { signInSchema, signUpSchema } from "@/schemas/auth";
import type { SignInSchema, SignUpSchema } from "@/schemas/auth";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { useModalStore } from "@/stores/modal";

export function AuthDialog() {
  const { isOpen, action, onClose } = useModalStore();
  const authDialogOpen = useMemo(
    () => action === "auth" && isOpen,
    [action, isOpen]
  );

  const [activeTab, setActiveTab] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);

  const signInForm = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: signIn, isPending: signInPending } = useSignInMutation();
  const handleSignIn = (values: SignInSchema) => {
    signIn(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const signUpForm = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate: signUp, isPending: signUpPending } = useSignUpMutation();
  const handleSignUp = (values: SignUpSchema) => {
    signUp(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={authDialogOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Welcome Back</DialogTitle>
          <DialogDescription>
            Sign in to your account or create a new one to continue
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            <Form {...signInForm}>
              <form
                onSubmit={signInForm.handleSubmit(handleSignIn)}
                className="space-y-4"
              >
                <FormField
                  control={signInForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@gmail.com"
                          type="email"
                          {...field}
                          disabled={signInPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-1">
                  <FormField
                    control={signInForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="********"
                              disabled={signInPending}
                              className="pr-12"
                              {...field}
                            />
                            <button
                              type="button"
                              tabIndex={0}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-primary transition"
                              onClick={() => setShowPassword((prev) => !prev)}
                              disabled={signInPending}
                            >
                              {showPassword ? (
                                <EyeOff className="size-4" />
                              ) : (
                                <Eye className="size-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Link
                    to="/auth/forgot-password"
                    className="text-xs text-primary hover:underline"
                    tabIndex={signInPending ? -1 : 0}
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  isLoading={signInPending}
                  disabled={signInPending}
                >
                  Sign In
                </Button>
              </form>
            </Form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                Twitter
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <Form {...signUpForm}>
              <form
                onSubmit={signUpForm.handleSubmit(handleSignUp)}
                className="space-y-4"
              >
                <FormField
                  control={signUpForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          {...field}
                          disabled={signUpPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@gmail.com"
                          {...field}
                          disabled={signUpPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-1">
                  <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="********"
                              className="pr-12"
                              {...field}
                              disabled={signUpPending}
                            />
                            <button
                              type="button"
                              tabIndex={0}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-primary transition"
                              onClick={() => setShowPassword((prev) => !prev)}
                              disabled={signUpPending}
                            >
                              {showPassword ? (
                                <EyeOff className="size-4" />
                              ) : (
                                <Eye className="size-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Link
                    to="/auth/forgot-password"
                    className="text-xs text-primary hover:underline"
                    tabIndex={signUpPending ? -1 : 0}
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  isLoading={signUpPending}
                  disabled={signUpPending}
                >
                  Create Account
                </Button>
              </form>
            </Form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                Twitter
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            By continuing, you agree to our{" "}
            <Link
              to="/terms"
              className="text-primary hover:underline"
              onClick={() => onClose()}
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-primary hover:underline"
              onClick={() => onClose()}
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

AuthDialog.displayName = "AuthDialog";
