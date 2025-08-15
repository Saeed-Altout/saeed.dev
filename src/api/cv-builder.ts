import { apiClient } from "@/lib/axios";
import type {
  ApiResponse,
  CVSection,
  PersonalInfo,
  Skill,
  Experience,
  Education,
  Certification,
  Award,
  Interest,
  Reference,
  CompleteCV,
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

// Helper function to filter out empty query parameters
const filterParams = (params: CVQueryParams) => {
  const filtered: Record<string, unknown> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      filtered[key] = value;
    }
  });
  return filtered;
};

// Prefix for all CV Builder endpoints
const CV_BUILDER_PREFIX = "/cv-builder";

export const cvBuilderApi = {
  // CV Sections
  getCVSections: async (params?: CVQueryParams) => {
    const response = await apiClient.get<ApiResponse<CVSection[]>>(
      `${CV_BUILDER_PREFIX}/cv-sections`,
      {
        params: filterParams(params || {}),
      }
    );
    return response.data;
  },

  getCVSection: async (id: string) => {
    const response = await apiClient.get<ApiResponse<CVSection>>(
      `${CV_BUILDER_PREFIX}/cv-sections/${id}`
    );
    return response.data;
  },

  createCVSection: async (data: CreateCVSectionRequest) => {
    const response = await apiClient.post<ApiResponse<CVSection>>(
      `${CV_BUILDER_PREFIX}/cv-sections`,
      data
    );
    return response.data;
  },

  updateCVSection: async (id: string, data: UpdateCVSectionRequest) => {
    const response = await apiClient.put<ApiResponse<CVSection>>(
      `${CV_BUILDER_PREFIX}/cv-sections/${id}`,
      data
    );
    return response.data;
  },

  deleteCVSection: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${CV_BUILDER_PREFIX}/cv-sections/${id}`
    );
    return response.data;
  },

  // Personal Information
  getPersonalInfo: async (params?: CVQueryParams) => {
    const response = await apiClient.get<ApiResponse<PersonalInfo[]>>(
      `${CV_BUILDER_PREFIX}/personal-info`,
      {
        params: filterParams(params || {}),
      }
    );
    return response.data;
  },

  getPersonalInfoById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<PersonalInfo>>(
      `${CV_BUILDER_PREFIX}/personal-info/${id}`
    );
    return response.data;
  },

  createPersonalInfo: async (data: CreatePersonalInfoRequest) => {
    const response = await apiClient.post<ApiResponse<PersonalInfo>>(
      `${CV_BUILDER_PREFIX}/personal-info`,
      data
    );
    return response.data;
  },

  updatePersonalInfo: async (id: string, data: UpdatePersonalInfoRequest) => {
    const response = await apiClient.put<ApiResponse<PersonalInfo>>(
      `${CV_BUILDER_PREFIX}/personal-info/${id}`,
      data
    );
    return response.data;
  },

  deletePersonalInfo: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${CV_BUILDER_PREFIX}/personal-info/${id}`
    );
    return response.data;
  },

  // Skills
  getSkills: async (params?: CVQueryParams) => {
    const response = await apiClient.get<ApiResponse<Skill[]>>(
      `${CV_BUILDER_PREFIX}/skills`,
      {
        params: filterParams(params || {}),
      }
    );
    return response.data;
  },

  getSkillById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Skill>>(
      `${CV_BUILDER_PREFIX}/skills/${id}`
    );
    return response.data;
  },

  createSkill: async (data: CreateSkillRequest) => {
    const response = await apiClient.post<ApiResponse<Skill>>(
      `${CV_BUILDER_PREFIX}/skills`,
      data
    );
    return response.data;
  },

  updateSkill: async (id: string, data: UpdateSkillRequest) => {
    const response = await apiClient.put<ApiResponse<Skill>>(
      `${CV_BUILDER_PREFIX}/skills/${id}`,
      data
    );
    return response.data;
  },

  deleteSkill: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${CV_BUILDER_PREFIX}/skills/${id}`
    );
    return response.data;
  },

  // Experience
  getExperience: async (params?: CVQueryParams) => {
    const response = await apiClient.get<ApiResponse<Experience[]>>(
      `${CV_BUILDER_PREFIX}/experience`,
      {
        params: filterParams(params || {}),
      }
    );
    return response.data;
  },

  getExperienceById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Experience>>(
      `${CV_BUILDER_PREFIX}/experience/${id}`
    );
    return response.data;
  },

  createExperience: async (data: CreateExperienceRequest) => {
    const response = await apiClient.post<ApiResponse<Experience>>(
      `${CV_BUILDER_PREFIX}/experience`,
      data
    );
    return response.data;
  },

  updateExperience: async (id: string, data: UpdateExperienceRequest) => {
    const response = await apiClient.put<ApiResponse<Experience>>(
      `${CV_BUILDER_PREFIX}/experience/${id}`,
      data
    );
    return response.data;
  },

  deleteExperience: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${CV_BUILDER_PREFIX}/experience/${id}`
    );
    return response.data;
  },

  // Education
  getEducation: async (params?: CVQueryParams) => {
    const response = await apiClient.get<ApiResponse<Education[]>>(
      `${CV_BUILDER_PREFIX}/education`,
      {
        params: filterParams(params || {}),
      }
    );
    return response.data;
  },

  getEducationById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Education>>(
      `${CV_BUILDER_PREFIX}/education/${id}`
    );
    return response.data;
  },

  createEducation: async (data: CreateEducationRequest) => {
    const response = await apiClient.post<ApiResponse<Education>>(
      `${CV_BUILDER_PREFIX}/education`,
      data
    );
    return response.data;
  },

  updateEducation: async (id: string, data: UpdateEducationRequest) => {
    const response = await apiClient.put<ApiResponse<Education>>(
      `${CV_BUILDER_PREFIX}/education/${id}`,
      data
    );
    return response.data;
  },

  deleteEducation: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${CV_BUILDER_PREFIX}/education/${id}`
    );
    return response.data;
  },

  // Certifications
  getCertifications: async (params?: CVQueryParams) => {
    const response = await apiClient.get<ApiResponse<Certification[]>>(
      `${CV_BUILDER_PREFIX}/certifications`,
      {
        params: filterParams(params || {}),
      }
    );
    return response.data;
  },

  getCertificationById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Certification>>(
      `${CV_BUILDER_PREFIX}/certifications/${id}`
    );
    return response.data;
  },

  createCertification: async (data: CreateCertificationRequest) => {
    const response = await apiClient.post<ApiResponse<Certification>>(
      `${CV_BUILDER_PREFIX}/certifications`,
      data
    );
    return response.data;
  },

  updateCertification: async (id: string, data: UpdateCertificationRequest) => {
    const response = await apiClient.put<ApiResponse<Certification>>(
      `${CV_BUILDER_PREFIX}/certifications/${id}`,
      data
    );
    return response.data;
  },

  deleteCertification: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${CV_BUILDER_PREFIX}/certifications/${id}`
    );
    return response.data;
  },

  // Awards
  getAwards: async (params?: CVQueryParams) => {
    const response = await apiClient.get<ApiResponse<Award[]>>(
      `${CV_BUILDER_PREFIX}/awards`,
      {
        params: filterParams(params || {}),
      }
    );
    return response.data;
  },

  getAwardById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Award>>(
      `${CV_BUILDER_PREFIX}/awards/${id}`
    );
    return response.data;
  },

  createAward: async (data: CreateAwardRequest) => {
    const response = await apiClient.post<ApiResponse<Award>>(
      `${CV_BUILDER_PREFIX}/awards`,
      data
    );
    return response.data;
  },

  updateAward: async (id: string, data: UpdateAwardRequest) => {
    const response = await apiClient.put<ApiResponse<Award>>(
      `${CV_BUILDER_PREFIX}/awards/${id}`,
      data
    );
    return response.data;
  },

  deleteAward: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${CV_BUILDER_PREFIX}/awards/${id}`
    );
    return response.data;
  },

  // Interests
  getInterests: async (params?: CVQueryParams) => {
    const response = await apiClient.get<ApiResponse<Interest[]>>(
      `${CV_BUILDER_PREFIX}/interests`,
      {
        params: filterParams(params || {}),
      }
    );
    return response.data;
  },

  getInterestById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Interest>>(
      `${CV_BUILDER_PREFIX}/interests/${id}`
    );
    return response.data;
  },

  createInterest: async (data: CreateInterestRequest) => {
    const response = await apiClient.post<ApiResponse<Interest>>(
      `${CV_BUILDER_PREFIX}/interests`,
      data
    );
    return response.data;
  },

  updateInterest: async (id: string, data: UpdateInterestRequest) => {
    const response = await apiClient.put<ApiResponse<Interest>>(
      `${CV_BUILDER_PREFIX}/interests/${id}`,
      data
    );
    return response.data;
  },

  deleteInterest: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${CV_BUILDER_PREFIX}/interests/${id}`
    );
    return response.data;
  },

  // References
  getReferences: async (params?: CVQueryParams) => {
    const response = await apiClient.get<ApiResponse<Reference[]>>(
      `${CV_BUILDER_PREFIX}/references`,
      {
        params: filterParams(params || {}),
      }
    );
    return response.data;
  },

  getReferenceById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Reference>>(
      `${CV_BUILDER_PREFIX}/references/${id}`
    );
    return response.data;
  },

  createReference: async (data: CreateReferenceRequest) => {
    const response = await apiClient.post<ApiResponse<Reference>>(
      `${CV_BUILDER_PREFIX}/references`,
      data
    );
    return response.data;
  },

  updateReference: async (id: string, data: UpdateReferenceRequest) => {
    const response = await apiClient.put<ApiResponse<Reference>>(
      `${CV_BUILDER_PREFIX}/references/${id}`,
      data
    );
    return response.data;
  },

  deleteReference: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `${CV_BUILDER_PREFIX}/references/${id}`
    );
    return response.data;
  },

  // Complete CV
  getCompleteCV: async (params?: CVQueryParams) => {
    const response = await apiClient.get<ApiResponse<CompleteCV>>(
      `${CV_BUILDER_PREFIX}/complete`,
      {
        params: filterParams(params || {}),
      }
    );
    return response.data;
  },
};
