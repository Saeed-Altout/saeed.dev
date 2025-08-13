import { Zap } from "lucide-react";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={`flex items-center space-x-2 ${className || ""}`}>
      <Zap className="size-6 text-primary" />
      <span className="font-bold text-xl text-foreground">Flexify</span>
    </div>
  );
}

Logo.displayName = "Logo";
