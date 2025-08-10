export type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};

export type Technology = string;

export type Project = {
  id: string;
  name: string;
  logoUrl: string;
  coverUrl: string;
  description: string;
  brief: string;
  technologies: string[];
  githubLink: string;
  demoLink: string;
  isFeatured: boolean;
  isPublic: boolean;
  status: string;
  startDate: string;
  endDate: string;
  likes: number;
  comments: string;
  created_at: string;
  updated_at: string;
};

export type GetProjectsResponse = ApiResponse<{
  projects: Project[];
  total: number;
  page: number;
  limit: number;
}>;

export type GetProjectByIdResponse = ApiResponse<Project>;

export type CreateProjectResponse = ApiResponse<Project>;

export type UpdateProjectResponse = ApiResponse<Project>;

export type DeleteProjectResponse = ApiResponse<null>;

export type GetTechnologiesResponse = ApiResponse<string[]>;

export type CreateProjectRequest = {
  name: string;
  description: string;
  brief: string;
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
  coverUrl?: string;
  logoUrl?: string;
  isFeatured?: boolean;
  isPublic: boolean;
  status: string;
  startDate?: string;
  endDate?: string;
};

export type UpdateProjectRequest = {
  name?: string;
  description?: string;
  brief?: string;
  technologies?: string[];
  githubLink?: string;
  demoLink?: string;
  coverUrl?: string;
  logoUrl?: string;
  isFeatured?: boolean;
  isPublic?: boolean;
  status?: string;
  startDate?: string;
  endDate?: string;
  likes?: number;
  comments?: string;
};
