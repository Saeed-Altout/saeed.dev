import { Zap } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

interface LogoProps {
  isOpen?: boolean;
  className?: string;
}

export function Logo({ isOpen, className }: LogoProps) {
  // Try to get sidebar state if available, otherwise use the isOpen prop
  let sidebarOpen = isOpen;

  const { open } = useSidebar();
  sidebarOpen = open;

  return (
    <div className={`flex items-center space-x-2 ${className || ""}`}>
      <Zap className="size-6 text-primary" />
      {sidebarOpen && (
        <span className="font-bold text-xl text-foreground">Flexify</span>
      )}
    </div>
  );
}

Logo.displayName = "Logo";
