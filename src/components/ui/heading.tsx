import * as React from "react";
import { cn } from "@/lib/utils";

export function Heading({
  title,
  description,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  title: string;
  description: string;
}) {
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      <div className="space-y-1 flex-1">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

export function Heading2({
  title,
  description,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  title: string;
  description: string;
}) {
  return (
    <div className={cn("space-y-1 flex-1 text-center", className)} {...props}>
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="text-sm md:text-base text-muted-foreground max-w-4xl mx-auto">
        {description}
      </p>
    </div>
  );
}
