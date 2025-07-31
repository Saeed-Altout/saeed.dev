import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/**
 * AuthNotFound - 404 error page for authentication routes.
 * Clean, accessible error page with navigation options back to auth flows.
 */
export default function AuthNotFound() {
  return (
    <section
      className="max-w-md mx-auto p-0 space-y-8 text-center"
      aria-label="Page not found"
      tabIndex={-1}
    >
      {/* Error Icon and Number */}
      <div className="space-y-4">
        <div className="w-24 h-24 mx-auto bg-red-50 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-red-500">404</h1>
          <h2 className="text-2xl font-semibold text-primary">
            Page Not Found
          </h2>
        </div>
      </div>

      {/* Error Message */}
      <div className="space-y-3">
        <p className="text-muted-foreground text-base">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <p className="text-muted-foreground text-sm">
          The link may be broken or the page may have been removed.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          <Link to="/auth/sign-in">
            <Button className="w-full" size="lg">
              Sign In
            </Button>
          </Link>

          <Link to="/auth/sign-up">
            <Button variant="outline" className="w-full" size="lg">
              Create Account
            </Button>
          </Link>
        </div>

        <div className="pt-2">
          <Link to="/">
            <Button variant="ghost" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Help Section */}
      <div className="space-y-2 pt-4 border-t">
        <p className="text-sm text-muted-foreground font-medium">Need help?</p>
        <div className="flex justify-center gap-4 text-xs">
          <Link
            to="/auth/forgot-password"
            className="text-primary hover:underline"
          >
            Reset Password
          </Link>
        </div>
      </div>
    </section>
  );
}

AuthNotFound.displayName = "AuthNotFound";
