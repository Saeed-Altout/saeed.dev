import { useState } from "react";
import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import {
  WrapperForm,
  EmailField,
  RememberMeField,
  PasswordField,
  useSignInMutation,
  signInSchema,
  type SignInSchema,
} from "@/lib/auth";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { mutate: signIn, isPending } = useSignInMutation();
  const onSubmit = (values: SignInSchema) => {
    const { rememberMe, ...rest } = values;
    console.log(rememberMe);
    signIn({ ...rest });
  };

  return (
    <WrapperForm
      title="Welcome to Flexify"
      description="Enter your credentials to securely access your Flexify account."
      href="/auth/sign-up"
      label="Create Account"
      message="Don't have an account?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <EmailField form={form} isPending={isPending} />
          <div className="space-y-1">
            <PasswordField
              form={form}
              isPending={isPending}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            <Link
              to="/auth/forgot-password"
              className="text-xs text-primary hover:underline"
              tabIndex={isPending ? -1 : 0}
            >
              Forgot your password?
            </Link>
          </div>
          <RememberMeField form={form} isPending={isPending} />
          <Button
            type="submit"
            className="w-full"
            isLoading={isPending}
            disabled={isPending}
          >
            Sign In
          </Button>
        </form>
      </Form>
    </WrapperForm>
  );
}
SignInForm.displayName = "SignInForm";
