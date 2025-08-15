import { apiClient } from "@/lib/axios";
import type {
  GetTechnologiesResponse,
  GetAllTechnologiesResponse,
  GetTechnologiesForProjectsResponse,
  GetTechnologyByIdResponse,
  GetTechnologyByValueResponse,
  CreateTechnologyRequest,
  CreateTechnologyResponse,
  BulkCreateTechnologyRequest,
  BulkCreateTechnologyResponse,
  UpdateTechnologyRequest,
  UpdateTechnologyResponse,
  DeleteTechnologyResponse,
  TechnologyQueryParams,
} from "@/types/technology";

const BASE_URL = "/technologies";

export const getTechnologies = async (
  params: TechnologyQueryParams = {}
): Promise<GetTechnologiesResponse> => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      if (typeof value === "string") {
        return value !== "";
      }
      if (typeof value === "number") {
        return value > 0;
      }
      return true;
    })
  );

  const response = await apiClient.get(BASE_URL, {
    params: filteredParams,
  });
  return response.data;
};

export const getAllTechnologies =
  async (): Promise<GetAllTechnologiesResponse> => {
    const response = await apiClient.get(`${BASE_URL}/all`);
    return response.data;
  };

export const getTechnologiesForProjects =
  async (): Promise<GetTechnologiesForProjectsResponse> => {
    const response = await apiClient.get(`${BASE_URL}/for-projects`);
    return response.data;
  };

export const getTechnologyById = async (
  id: string
): Promise<GetTechnologyByIdResponse> => {
  const response = await apiClient.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const getTechnologyByValue = async (
  value: string
): Promise<GetTechnologyByValueResponse> => {
  const response = await apiClient.get(`${BASE_URL}/by-value/${value}`);
  return response.data;
};

export const createTechnology = async (
  request: CreateTechnologyRequest
): Promise<CreateTechnologyResponse> => {
  const response = await apiClient.post(BASE_URL, request);
  return response.data;
};

export const bulkCreateTechnologies = async (
  request: BulkCreateTechnologyRequest
): Promise<BulkCreateTechnologyResponse> => {
  const response = await apiClient.post(`${BASE_URL}/bulk`, request);
  return response.data;
};

export const updateTechnology = async (
  id: string,
  request: UpdateTechnologyRequest
): Promise<UpdateTechnologyResponse> => {
  const response = await apiClient.put(`${BASE_URL}/${id}`, request);
  return response.data;
};

export const deleteTechnology = async (
  id: string
): Promise<DeleteTechnologyResponse> => {
  const response = await apiClient.delete(`${BASE_URL}/${id}`);
  return response.data;
};
