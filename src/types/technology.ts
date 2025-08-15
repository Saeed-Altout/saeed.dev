export type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};

export type Technology = {
  id: string;
  label: string;
  value: string;
  created_at: string;
  updated_at: string;
};

export type CreateTechnologyRequest = {
  label: string;
  value: string;
};

export type UpdateTechnologyRequest = {
  label?: string;
  value?: string;
};

export type BulkCreateTechnologyRequest = {
  technologies: CreateTechnologyRequest[];
};

// API Response Types
export type GetTechnologiesResponse = ApiResponse<{
  data: Technology[];
  total: number;
  page: number;
  limit: number;
  next: boolean;
  prev: boolean;
}>;

export type GetAllTechnologiesResponse = ApiResponse<Technology[]>;

export type GetTechnologiesForProjectsResponse = ApiResponse<string[]>;

export type GetTechnologyByIdResponse = ApiResponse<Technology>;

export type GetTechnologyByValueResponse = ApiResponse<Technology>;

export type CreateTechnologyResponse = ApiResponse<Technology>;

export type BulkCreateTechnologyResponse = ApiResponse<Technology[]>;

export type UpdateTechnologyResponse = ApiResponse<Technology>;

export type DeleteTechnologyResponse = ApiResponse<null>;

// Pagination and Filter Types
export type TechnologyQueryParams = {
  page?: number;
  limit?: number;
  q?: string;
};
