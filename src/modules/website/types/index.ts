import type { LucideIcon } from "lucide-react";

export type Skill = {
  name: string;
  category: string;
  description: string;
  percentage: number;
  icon: string;
};

export type Category = string[];
export type Value = {
  name: string;
  description: string;
};

export type Project = {
  name: string;
  description: string;
  logo: string;
  cover: string;
  github: string;
  demo: string;
  technologies: string[];
  features: string[];
  isActive: boolean;
  isFeatured: boolean;
};

export type Detail = {
  name: string;
  value: string;
  icon: LucideIcon;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
};

export type Me = {
  name: string;
  firstName: string;
  lastName: string;
  position: string;
  experiences: Experience[];
  expertise: string[];
  website: string;
  linkedin: string;
  github: string;
  facebook: string;
  bio: string;
  skills: Skill[];
  projects: Project[];
  values: Value[];
  details: Detail[];
};

export type FAQ = {
  question: string;
  answer: string;
};
