import * as z from "zod";

export const verifyEmailSchema = z.object({
  verificationCode: z
    .string()
    .min(6, {
      message: "Verification code must be 6 digits",
    })
    .max(6, {
      message: "Verification code must be 6 digits",
    })
    .regex(/^\d{6}$/, {
      message: "Verification code must contain only numbers",
    }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address",
    })
    .optional(),
});

export const resendVerificationSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Please enter a valid email address",
    }),
});

export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;
export type ResendVerificationSchema = z.infer<typeof resendVerificationSchema>;
