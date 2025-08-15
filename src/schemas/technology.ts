import { z } from "zod";

export const createTechnologySchema = z.object({
  label: z
    .string()
    .min(1, "Label is required")
    .min(2, "Label must be at least 2 characters")
    .max(100, "Label must be less than 100 characters"),
  value: z
    .string()
    .min(1, "Value is required")
    .min(2, "Value must be at least 2 characters")
    .max(50, "Value must be less than 50 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Value must contain only lowercase letters, numbers, and hyphens"
    ),
});

export const updateTechnologySchema = createTechnologySchema.partial();

export type CreateTechnologySchema = z.infer<typeof createTechnologySchema>;
export type UpdateTechnologySchema = z.infer<typeof updateTechnologySchema>;
