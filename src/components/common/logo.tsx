import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Zap className="size-6 text-primary" />
      <span className="font-semibold text-xl text-foreground">Flexify</span>
    </div>
  );
}
