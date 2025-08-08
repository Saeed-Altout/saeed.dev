import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  rememberMe: z.boolean().optional(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
