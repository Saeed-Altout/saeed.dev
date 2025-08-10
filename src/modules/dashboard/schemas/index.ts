import * as z from "zod";
export const projectSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  brief: z.string().min(2, {
    message: "Brief must be at least 2 characters.",
  }),
  technologies: z.array(z.string()).min(1, {
    message: "At least one technology is required.",
  }),
  startDate: z.date(),
  endDate: z.date(),
  status: z.enum(["planning", "in-progress", "completed"]),
  isFeatured: z.boolean().optional(),
  isPublic: z.boolean(),
});

export type ProjectSchema = z.infer<typeof projectSchema>;
