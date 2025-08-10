import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  type CreateProjectRequest,
  type UpdateProjectRequest,
  getTechnologies,
} from "@/lib/dashboard";

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-project"],
    mutationFn: (request: CreateProjectRequest) => createProject(request),
    onSuccess: (data) => {
      toast.success(data.message || "Project created successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Project creation failed");
      }
    },
  });
};

export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-project"],
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: UpdateProjectRequest;
    }) => updateProject(id, request),
    onSuccess: (data) => {
      toast.success(data.message || "Project updated successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Project update failed");
      }
    },
  });
};

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-project"],
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: (data) => {
      toast.success(data.message || "Project deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Project deletion failed");
      }
    },
  });
};

export const useGetProjectsQuery = (params: Record<string, string>) => {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => getProjects(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetProjectByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
    enabled: !!id,
  });
};

export const useGetTechnologiesQuery = () => {
  return useQuery({
    queryKey: ["technologies"],
    queryFn: getTechnologies,
  });
};
