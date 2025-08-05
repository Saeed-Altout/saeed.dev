export type Category = {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Technology = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  cover: string;
  github: string;
  demo: string;
  technologies: string[];
  features: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TrashItem = {
  id: string;
  type: "technology" | "project" | "category";
  data: Technology | Project | Category;
  deletedAt: string;
  expiresAt: string;
};

export type DashboardState = {
  technologies: Technology[];
  projects: Project[];
  categories: Category[];
  trash: TrashItem[];
  isLoading: boolean;
  error: string | null;
};
