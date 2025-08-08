import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import {
  WrapperForm,
  AcceptTermsField,
  EmailField,
  NameField,
  PasswordField,
  useSignUpMutation,
  signUpSchema,
  type SignUpSchema,
} from "@/lib/auth";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      acceptTerms: false,
    },
  });

  const { mutate: signUp, isPending } = useSignUpMutation();
  const onSubmit = (values: SignUpSchema) => {
    const { acceptTerms, ...rest } = values;
    console.log(acceptTerms);
    signUp({ ...rest });
  };

  return (
    <WrapperForm
      title="Create an Account"
      description="Join Flexify to get started with your account."
      href="/auth/sign-in"
      label="Sign In"
      message="Already have an account?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <NameField form={form} isPending={isPending} />
          <EmailField form={form} isPending={isPending} />
          <PasswordField
            form={form}
            isPending={isPending}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <AcceptTermsField form={form} isPending={isPending} />
          <Button
            type="submit"
            className="w-full"
            isLoading={isPending}
            disabled={isPending}
          >
            Create Account
          </Button>
        </form>
      </Form>
    </WrapperForm>
  );
}
SignUpForm.displayName = "SignUpForm";
