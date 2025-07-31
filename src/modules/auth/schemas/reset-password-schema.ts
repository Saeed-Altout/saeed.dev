import * as z from "zod";

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, {
      message: "Password reset token is required",
    }),
    newPassword: z
      .string()
      .min(8, {
        message: "New password must be at least 8 characters long",
      })
      .max(128, {
        message: "New password must not exceed 128 characters",
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    confirmNewPassword: z.string().min(1, {
      message: "New password confirmation is required",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
