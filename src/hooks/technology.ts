import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import {
  getTechnologies,
  getAllTechnologies,
  getTechnologiesForProjects,
  getTechnologyById,
  getTechnologyByValue,
  createTechnology,
  updateTechnology,
  deleteTechnology,
} from "@/api/technology";
import type {
  CreateTechnologyRequest,
  UpdateTechnologyRequest,
  TechnologyQueryParams,
} from "@/types/technology";

// Query Hooks
export const useGetTechnologiesQuery = (params: TechnologyQueryParams = {}) => {
  return useQuery({
    queryKey: ["technologies", params],
    queryFn: () => getTechnologies(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetAllTechnologiesQuery = () => {
  return useQuery({
    queryKey: ["all-technologies"],
    queryFn: getAllTechnologies,
  });
};

export const useGetTechnologiesForProjectsQuery = () => {
  return useQuery({
    queryKey: ["technologies-for-projects"],
    queryFn: getTechnologiesForProjects,
  });
};

export const useGetTechnologyByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["technology", id],
    queryFn: () => getTechnologyById(id),
    enabled: !!id,
  });
};

export const useGetTechnologyByValueQuery = (value: string) => {
  return useQuery({
    queryKey: ["technology-by-value", value],
    queryFn: () => getTechnologyByValue(value),
    enabled: !!value,
  });
};

// Mutation Hooks
export const useCreateTechnologyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-technology"],
    mutationFn: (request: CreateTechnologyRequest) => createTechnology(request),
    onSuccess: (data) => {
      toast.success(data.message || "Technology created successfully");
      queryClient.invalidateQueries({ queryKey: ["technologies"] });
      queryClient.invalidateQueries({ queryKey: ["all-technologies"] });
      queryClient.invalidateQueries({
        queryKey: ["technologies-for-projects"],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "Technology creation failed"
        );
      }
    },
  });
};

export const useUpdateTechnologyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-technology"],
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: UpdateTechnologyRequest;
    }) => updateTechnology(id, request),
    onSuccess: (data) => {
      toast.success(data.message || "Technology updated successfully");
      queryClient.invalidateQueries({ queryKey: ["technologies"] });
      queryClient.invalidateQueries({ queryKey: ["all-technologies"] });
      queryClient.invalidateQueries({
        queryKey: ["technologies-for-projects"],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Technology update failed");
      }
    },
  });
};

export const useDeleteTechnologyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-technology"],
    mutationFn: (id: string) => deleteTechnology(id),
    onSuccess: (data) => {
      toast.success(data.message || "Technology deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["technologies"] });
      queryClient.invalidateQueries({ queryKey: ["all-technologies"] });
      queryClient.invalidateQueries({
        queryKey: ["technologies-for-projects"],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "Technology deletion failed"
        );
      }
    },
  });
};
