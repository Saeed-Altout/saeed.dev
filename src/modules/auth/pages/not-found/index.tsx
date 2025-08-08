import { WrapperForm } from "@/lib/auth";

export default function AuthNotFound() {
  return (
    <WrapperForm
      title="Not Found"
      description="The page you are looking for does not exist."
      href="/auth/sign-in"
      label="Go to Sign In"
      message="Go to Sign In"
    >
      <p className="text-center text-7xl font-semibold">404</p>
    </WrapperForm>
  );
}

AuthNotFound.displayName = "AuthNotFound";
