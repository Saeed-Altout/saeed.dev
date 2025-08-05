import * as z from "zod";

export const technologySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  category: z.string().min(1, "Category is required"),
  icon: z.string().min(1, "Icon is required"),
  color: z.string().min(1, "Color is required"),
  isActive: z.boolean().default(true),
});

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters"),
  category: z.string().min(1, "Category is required"),
  logo: z.string().default(""),
  cover: z.string().default(""),
  github: z.string().default(""),
  demo: z.string().default(""),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required"),
  features: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  color: z.string().min(1, "Color is required"),
  icon: z.string().min(1, "Icon is required"),
  isActive: z.boolean().default(true),
});

export type TechnologySchema = z.infer<typeof technologySchema>;
export type ProjectSchema = z.infer<typeof projectSchema>;
export type CategorySchema = z.infer<typeof categorySchema>;
