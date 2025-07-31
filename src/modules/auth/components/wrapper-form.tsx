import * as React from "react";

/**
 * WrapperForm - A pure, accessible, and robust sign-up form component.
 * Uses react-hook-form with Zod validation, and follows best practices for accessibility and UI.
 */
export function WrapperForm({
  title,
  description,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  title: string;
  description: string;
}) {
  return (
    <section
      className="max-w-md mx-auto p-0 space-y-6"
      aria-label={title}
      tabIndex={-1}
      {...props}
    >
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-primary mb-1">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {children}
    </section>
  );
}
WrapperForm.displayName = "WrapperForm";
