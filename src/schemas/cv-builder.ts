import * as z from "zod";

// CV Section Schema
export const cvSectionSchema = z.object({
  display_name: z.string().min(2, {
    message: "Display name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  is_active: z.boolean(),
  is_required: z.boolean(),
  sort_order: z.number().min(0, {
    message: "Sort order must be a positive number.",
  }),
});

// Personal Information Schema
export const personalInfoSchema = z.object({
  job_title: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  summary: z.string().min(50, {
    message: "Summary must be at least 50 characters.",
  }),
  profile_picture: z
    .string()
    .url({
      message: "Profile picture must be a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters.",
    })
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .min(10, {
      message: "Address must be at least 10 characters.",
    })
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url({
      message: "Website must be a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  linkedin: z
    .string()
    .url({
      message: "LinkedIn must be a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  github: z
    .string()
    .url({
      message: "GitHub must be a valid URL.",
    })
    .optional()
    .or(z.literal("")),
});

// Skill Schema
export const skillSchema = z.object({
  name: z.string().min(2, {
    message: "Skill name must be at least 2 characters.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .optional()
    .or(z.literal("")),
  level: z.number().min(0).max(100, {
    message: "Skill level must be between 0 and 100.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
});

// Experience Schema
export const experienceSchema = z
  .object({
    title: z.string().min(2, {
      message: "Job title must be at least 2 characters.",
    }),
    company: z.string().min(2, {
      message: "Company name must be at least 2 characters.",
    }),
    project_name: z
      .string()
      .min(2, {
        message: "Project name must be at least 2 characters.",
      })
      .optional()
      .or(z.literal("")),
    seniority_level: z.enum(
      ["JUNIOR", "MID", "SENIOR", "LEAD", "MANAGER", "DIRECTOR", "CTO"],
      {
        message: "Please select a valid seniority level.",
      }
    ),
    location: z
      .string()
      .min(2, {
        message: "Location must be at least 2 characters.",
      })
      .optional()
      .or(z.literal("")),
    start_date: z.string().min(1, {
      message: "Start date is required.",
    }),
    end_date: z.string().optional().or(z.literal("")),
    is_current: z.boolean(),
    description: z.string().min(50, {
      message: "Description must be at least 50 characters.",
    }),
    key_achievements: z
      .array(
        z.string().min(10, {
          message: "Each achievement must be at least 10 characters.",
        })
      )
      .min(1, {
        message: "At least one key achievement is required.",
      }),
    technologies: z
      .array(
        z.string().min(1, {
          message: "Technology names cannot be empty.",
        })
      )
      .min(1, {
        message: "At least one technology is required.",
      }),
  })
  .refine(
    (data) => {
      if (!data.is_current && !data.end_date) {
        return false;
      }
      return true;
    },
    {
      message: "End date is required when not currently employed.",
      path: ["end_date"],
    }
  );

// Education Schema
export const educationSchema = z
  .object({
    degree: z.string().min(2, {
      message: "Degree must be at least 2 characters.",
    }),
    institution: z.string().min(2, {
      message: "Institution must be at least 2 characters.",
    }),
    location: z
      .string()
      .min(2, {
        message: "Location must be at least 2 characters.",
      })
      .optional()
      .or(z.literal("")),
    start_date: z.string().min(1, {
      message: "Start date is required.",
    }),
    end_date: z.string().optional().or(z.literal("")),
    is_current: z.boolean(),
    description: z
      .string()
      .min(20, {
        message: "Description must be at least 20 characters.",
      })
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (!data.is_current && !data.end_date) {
        return false;
      }
      return true;
    },
    {
      message: "End date is required when not currently studying.",
      path: ["end_date"],
    }
  );

// Certification Schema
export const certificationSchema = z.object({
  name: z.string().min(2, {
    message: "Certification name must be at least 2 characters.",
  }),
  issuer: z.string().min(2, {
    message: "Issuer must be at least 2 characters.",
  }),
  issue_date: z.string().min(1, {
    message: "Issue date is required.",
  }),
  expiration_date: z.string().optional().or(z.literal("")),
  credential_id: z
    .string()
    .min(1, {
      message: "Credential ID must be at least 1 character.",
    })
    .optional()
    .or(z.literal("")),
  credential_url: z
    .string()
    .url({
      message: "Credential URL must be a valid URL.",
    })
    .optional()
    .or(z.literal("")),
});

// Award Schema
export const awardSchema = z.object({
  name: z.string().min(2, {
    message: "Award name must be at least 2 characters.",
  }),
  issuer: z.string().min(2, {
    message: "Issuer must be at least 2 characters.",
  }),
  date: z.string().min(1, {
    message: "Date is required.",
  }),
  description: z
    .string()
    .min(20, {
      message: "Description must be at least 20 characters.",
    })
    .optional()
    .or(z.literal("")),
});

// Interest Schema
export const interestSchema = z.object({
  name: z.string().min(2, {
    message: "Interest name must be at least 2 characters.",
  }),
});

// Reference Schema
export const referenceSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters.",
    })
    .optional()
    .or(z.literal("")),
});

// Export types
export type CVSectionSchema = z.infer<typeof cvSectionSchema>;
export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;
export type SkillSchema = z.infer<typeof skillSchema>;
export type ExperienceSchema = z.infer<typeof experienceSchema>;
export type EducationSchema = z.infer<typeof educationSchema>;
export type CertificationSchema = z.infer<typeof certificationSchema>;
export type AwardSchema = z.infer<typeof awardSchema>;
export type InterestSchema = z.infer<typeof interestSchema>;
export type ReferenceSchema = z.infer<typeof referenceSchema>;
