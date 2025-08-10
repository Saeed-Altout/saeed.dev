import { useAuthStore } from "@/lib/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (!user || !token) {
      navigate("/auth/login");
    }
  }, [user, token, navigate]);

  return <>{children}</>;
}
