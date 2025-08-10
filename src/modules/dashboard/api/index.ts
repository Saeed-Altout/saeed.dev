import { apiClient } from "@/lib/axios";
import type {
  GetProjectsResponse,
  GetProjectByIdResponse,
  CreateProjectRequest,
  CreateProjectResponse,
  UpdateProjectResponse,
  UpdateProjectRequest,
  DeleteProjectResponse,
  GetTechnologiesResponse,
} from "@/lib/dashboard";

export const getProjects = async (
  params: Record<string, string>
): Promise<GetProjectsResponse> => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0 && value.some((v) => v !== "");
      }
      return value !== "";
    })
  );

  const response = await apiClient.get(import.meta.env.VITE_PROJECTS_URL, {
    params: filteredParams,
  });
  return response.data;
};

export const getProjectById = async (
  id: string
): Promise<GetProjectByIdResponse> => {
  const response = await apiClient.get(
    `${import.meta.env.VITE_PROJECTS_URL}/${id}`
  );
  return response.data;
};

export const createProject = async (
  request: CreateProjectRequest
): Promise<CreateProjectResponse> => {
  const response = await apiClient.post(
    import.meta.env.VITE_PROJECTS_URL,
    request
  );
  return response.data;
};

export const updateProject = async (
  id: string,
  request: UpdateProjectRequest
): Promise<UpdateProjectResponse> => {
  const response = await apiClient.put(
    `${import.meta.env.VITE_PROJECTS_URL}/${id}`,
    request
  );
  return response.data;
};

export const deleteProject = async (
  id: string
): Promise<DeleteProjectResponse> => {
  const response = await apiClient.delete(
    `${import.meta.env.VITE_PROJECTS_URL}/${id}`
  );
  return response.data;
};

export const getTechnologies = async (): Promise<GetTechnologiesResponse> => {
  const response = await apiClient.get(
    `${import.meta.env.VITE_PROJECTS_URL}/technologies`
  );
  return response.data;
};
