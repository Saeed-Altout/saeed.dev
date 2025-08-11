import { cn } from "@/lib/utils";
import { FolderOpen, type LucideIcon } from "lucide-react";

export function EmptyState({
  title = "No results found",
  description = "Sorry, we couldn't find any results.",
  icon: Icon = FolderOpen,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  title: string;
  description: string;
  icon?: LucideIcon;
}) {
  return (
    <div
      className={cn(
        "col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground",
        className
      )}
      {...props}
    >
      <Icon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
      <span className="text-lg font-semibold">{title}</span>
      <span className="paragraph">{description}</span>
    </div>
  );
}

EmptyState.displayName = "EmptyState";
