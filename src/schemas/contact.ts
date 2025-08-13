import * as z from "zod";

export const contactSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  message: z
    .string()
    .min(10, {
      message:
        "Please provide details about your project or inquiry (at least 10 characters).",
    })
    .max(1000, { message: "Message is too long (max 1000 characters)." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  name: z.string().min(1, { message: "Name is required." }),
});

export type ContactSchema = z.infer<typeof contactSchema>;
