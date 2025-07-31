import * as z from "zod";

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message: "First name must be at least 2 characters long",
      })
      .max(50, {
        message: "First name must not exceed 50 characters",
      })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "First name must contain only letters",
      }),
    lastName: z
      .string()
      .min(2, {
        message: "Last name must be at least 2 characters long",
      })
      .max(50, {
        message: "Last name must not exceed 50 characters",
      })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Last name must contain only letters",
      }),
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
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(128, {
        message: "Password must not exceed 128 characters",
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    confirmPassword: z.string().min(1, {
      message: "Password confirmation is required",
    }),
    acceptTerms: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
