import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { cvBuilderApi } from "@/api/cv-builder";
import type {
  CreateCVSectionRequest,
  UpdateCVSectionRequest,
  CreatePersonalInfoRequest,
  UpdatePersonalInfoRequest,
  CreateSkillRequest,
  UpdateSkillRequest,
  CreateExperienceRequest,
  UpdateExperienceRequest,
  CreateEducationRequest,
  UpdateEducationRequest,
  CreateCertificationRequest,
  UpdateCertificationRequest,
  CreateAwardRequest,
  UpdateAwardRequest,
  CreateInterestRequest,
  UpdateInterestRequest,
  CreateReferenceRequest,
  UpdateReferenceRequest,
  CVQueryParams,
} from "@/types/cv-builder";

// CV Sections Hooks
export const useGetCVSectionsQuery = (params?: CVQueryParams) => {
  return useQuery({
    queryKey: ["cv-sections", params],
    queryFn: () => cvBuilderApi.getCVSections(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetCVSectionQuery = (id: string) => {
  return useQuery({
    queryKey: ["cv-section", id],
    queryFn: () => cvBuilderApi.getCVSection(id),
    enabled: !!id,
  });
};

export const useCreateCVSectionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCVSectionRequest) =>
      cvBuilderApi.createCVSection(data),
    onSuccess: () => {
      toast.success("CV Section created successfully");
      queryClient.invalidateQueries({ queryKey: ["cv-sections"] });
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Failed to create CV Section");
    },
  });
};

export const useUpdateCVSectionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      request,
    }: {
      name: string;
      request: UpdateCVSectionRequest;
    }) => cvBuilderApi.updateCVSection(name, request),
    onSuccess: () => {
      toast.success("CV Section updated successfully");
      queryClient.invalidateQueries({ queryKey: ["cv-sections"] });
      queryClient.invalidateQueries({ queryKey: ["complete-cv"] });
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Failed to update CV Section");
    },
  });
};

export const useDeleteCVSectionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cvBuilderApi.deleteCVSection(id),
    onSuccess: () => {
      toast.success("CV Section deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["cv-sections"] });
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Failed to delete CV Section");
    },
  });
};

// Personal Information Hooks
export const useGetPersonalInfoQuery = (params?: CVQueryParams) => {
  return useQuery({
    queryKey: ["personal-info", params],
    queryFn: () => cvBuilderApi.getPersonalInfo(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetPersonalInfoByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["personal-info", id],
    queryFn: () => cvBuilderApi.getPersonalInfoById(id),
    enabled: !!id,
  });
};

export const useCreatePersonalInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePersonalInfoRequest) =>
      cvBuilderApi.createPersonalInfo(data),
    onSuccess: () => {
      toast.success("Personal information created successfully");
      queryClient.invalidateQueries({ queryKey: ["personal-info"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create personal information"
      );
    },
  });
};

export const useUpdatePersonalInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdatePersonalInfoRequest;
    }) => cvBuilderApi.updatePersonalInfo(id, data),
    onSuccess: () => {
      toast.success("Personal information updated successfully");
      queryClient.invalidateQueries({ queryKey: ["personal-info"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update personal information"
      );
    },
  });
};

export const useDeletePersonalInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cvBuilderApi.deletePersonalInfo(id),
    onSuccess: () => {
      toast.success("Personal information deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["personal-info"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete personal information"
      );
    },
  });
};

// Skills Hooks
export const useGetSkillsQuery = (params?: CVQueryParams) => {
  return useQuery({
    queryKey: ["skills", params],
    queryFn: () => cvBuilderApi.getSkills(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetSkillByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["skill", id],
    queryFn: () => cvBuilderApi.getSkillById(id),
    enabled: !!id,
  });
};

export const useCreateSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSkillRequest) => cvBuilderApi.createSkill(data),
    onSuccess: () => {
      toast.success("Skill created successfully");
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create skill");
    },
  });
};

export const useUpdateSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSkillRequest }) =>
      cvBuilderApi.updateSkill(id, data),
    onSuccess: () => {
      toast.success("Skill updated successfully");
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update skill");
    },
  });
};

export const useDeleteSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cvBuilderApi.deleteSkill(id),
    onSuccess: () => {
      toast.success("Skill deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete skill");
    },
  });
};

// Experience Hooks
export const useGetExperienceQuery = (params?: CVQueryParams) => {
  return useQuery({
    queryKey: ["experience", params],
    queryFn: () => cvBuilderApi.getExperience(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetExperienceByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["experience", id],
    queryFn: () => cvBuilderApi.getExperienceById(id),
    enabled: !!id,
  });
};

export const useCreateExperienceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExperienceRequest) =>
      cvBuilderApi.createExperience(data),
    onSuccess: () => {
      toast.success("Experience created successfully");
      queryClient.invalidateQueries({ queryKey: ["experience"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create experience"
      );
    },
  });
};

export const useUpdateExperienceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateExperienceRequest }) =>
      cvBuilderApi.updateExperience(id, data),
    onSuccess: () => {
      toast.success("Experience updated successfully");
      queryClient.invalidateQueries({ queryKey: ["experience"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update experience"
      );
    },
  });
};

export const useDeleteExperienceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cvBuilderApi.deleteExperience(id),
    onSuccess: () => {
      toast.success("Experience deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["experience"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete experience"
      );
    },
  });
};

// Education Hooks
export const useGetEducationQuery = (params?: CVQueryParams) => {
  return useQuery({
    queryKey: ["education", params],
    queryFn: () => cvBuilderApi.getEducation(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetEducationByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["education", id],
    queryFn: () => cvBuilderApi.getEducationById(id),
    enabled: !!id,
  });
};

export const useCreateEducationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEducationRequest) =>
      cvBuilderApi.createEducation(data),
    onSuccess: () => {
      toast.success("Education created successfully");
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create education"
      );
    },
  });
};

export const useUpdateEducationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEducationRequest }) =>
      cvBuilderApi.updateEducation(id, data),
    onSuccess: () => {
      toast.success("Education updated successfully");
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update education"
      );
    },
  });
};

export const useDeleteEducationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cvBuilderApi.deleteEducation(id),
    onSuccess: () => {
      toast.success("Education deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete education"
      );
    },
  });
};

// Certifications Hooks
export const useGetCertificationsQuery = (params?: CVQueryParams) => {
  return useQuery({
    queryKey: ["certifications", params],
    queryFn: () => cvBuilderApi.getCertifications(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetCertificationByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["certification", id],
    queryFn: () => cvBuilderApi.getCertificationById(id),
    enabled: !!id,
  });
};

export const useCreateCertificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCertificationRequest) =>
      cvBuilderApi.createCertification(data),
    onSuccess: () => {
      toast.success("Certification created successfully");
      queryClient.invalidateQueries({ queryKey: ["certifications"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create certification"
      );
    },
  });
};

export const useUpdateCertificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateCertificationRequest;
    }) => cvBuilderApi.updateCertification(id, data),
    onSuccess: () => {
      toast.success("Certification updated successfully");
      queryClient.invalidateQueries({ queryKey: ["certifications"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update certification"
      );
    },
  });
};

export const useDeleteCertificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cvBuilderApi.deleteCertification(id),
    onSuccess: () => {
      toast.success("Certification deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["certifications"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete certification"
      );
    },
  });
};

// Awards Hooks
export const useGetAwardsQuery = (params?: CVQueryParams) => {
  return useQuery({
    queryKey: ["awards", params],
    queryFn: () => cvBuilderApi.getAwards(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetAwardByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["award", id],
    queryFn: () => cvBuilderApi.getAwardById(id),
    enabled: !!id,
  });
};

export const useCreateAwardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAwardRequest) => cvBuilderApi.createAward(data),
    onSuccess: () => {
      toast.success("Award created successfully");
      queryClient.invalidateQueries({ queryKey: ["awards"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create award");
    },
  });
};

export const useUpdateAwardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAwardRequest }) =>
      cvBuilderApi.updateAward(id, data),
    onSuccess: () => {
      toast.success("Award updated successfully");
      queryClient.invalidateQueries({ queryKey: ["awards"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update award");
    },
  });
};

export const useDeleteAwardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cvBuilderApi.deleteAward(id),
    onSuccess: () => {
      toast.success("Award deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["awards"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete award");
    },
  });
};

// Interests Hooks
export const useGetInterestsQuery = (params?: CVQueryParams) => {
  return useQuery({
    queryKey: ["interests", params],
    queryFn: () => cvBuilderApi.getInterests(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetInterestByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["interest", id],
    queryFn: () => cvBuilderApi.getInterestById(id),
    enabled: !!id,
  });
};

export const useCreateInterestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInterestRequest) =>
      cvBuilderApi.createInterest(data),
    onSuccess: () => {
      toast.success("Interest created successfully");
      queryClient.invalidateQueries({ queryKey: ["interests"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create interest"
      );
    },
  });
};

export const useUpdateInterestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInterestRequest }) =>
      cvBuilderApi.updateInterest(id, data),
    onSuccess: () => {
      toast.success("Interest updated successfully");
      queryClient.invalidateQueries({ queryKey: ["interests"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update interest"
      );
    },
  });
};

export const useDeleteInterestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cvBuilderApi.deleteInterest(id),
    onSuccess: () => {
      toast.success("Interest deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["interests"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete interest"
      );
    },
  });
};

// References Hooks
export const useGetReferencesQuery = (params?: CVQueryParams) => {
  return useQuery({
    queryKey: ["references", params],
    queryFn: () => cvBuilderApi.getReferences(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetReferenceByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["reference", id],
    queryFn: () => cvBuilderApi.getReferenceById(id),
    enabled: !!id,
  });
};

export const useCreateReferenceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReferenceRequest) =>
      cvBuilderApi.createReference(data),
    onSuccess: () => {
      toast.success("Reference created successfully");
      queryClient.invalidateQueries({ queryKey: ["references"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create reference"
      );
    },
  });
};

export const useUpdateReferenceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateReferenceRequest }) =>
      cvBuilderApi.updateReference(id, data),
    onSuccess: () => {
      toast.success("Reference updated successfully");
      queryClient.invalidateQueries({ queryKey: ["references"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update reference"
      );
    },
  });
};

export const useDeleteReferenceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cvBuilderApi.deleteReference(id),
    onSuccess: () => {
      toast.success("Reference deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["references"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete reference"
      );
    },
  });
};

// Complete CV Hook
export const useGetCompleteCVQuery = (params?: CVQueryParams) => {
  return useQuery({
    queryKey: ["complete-cv", params],
    queryFn: () => cvBuilderApi.getCompleteCV(params),
    placeholderData: keepPreviousData,
  });
};
