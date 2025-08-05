import { Zap } from "lucide-react";

export function Logo({ isOpen = true }: { isOpen?: boolean }) {
  return (
    <div className="flex items-center space-x-2 mr-4">
      <Zap className="size-6 text-primary" />
      {isOpen && (
        <span className="font-bold text-xl text-foreground">Flexify</span>
      )}
    </div>
  );
}
Logo.displayName = "Logo";
