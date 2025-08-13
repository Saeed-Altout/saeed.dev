import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (user && token) {
      navigate("/");
    }
  }, [user, token, navigate]);

  return <>{children}</>;
}
