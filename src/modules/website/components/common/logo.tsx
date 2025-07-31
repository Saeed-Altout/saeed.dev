import { Zap } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center space-x-2 mr-4">
      <Zap className="size-6 text-primary" />
      <span className="font-bold text-xl text-foreground">Flexify</span>
    </div>
  );
}
Logo.displayName = "Logo";
