import * as z from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Please enter a valid email address",
    })
    .max(100, {
      message: "Email must not exceed 100 characters",
    }),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
