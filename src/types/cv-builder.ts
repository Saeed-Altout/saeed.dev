export type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};

// CV Section Configuration
export type CVSection = {
  id: string;
  name: string;
  display_name: string;
  description: string;
  is_active: boolean;
  is_required: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type CreateCVSectionRequest = {
  name: string;
  display_name: string;
  description: string;
  is_active: boolean;
  is_required: boolean;
  sort_order: number;
};

export type UpdateCVSectionRequest = {
  display_name?: string;
  description?: string;
  is_active?: boolean;
  is_required?: boolean;
  sort_order?: number;
};

// Personal Information
export type PersonalInfo = {
  id: string;
  user_id: string;
  name: string;
  job_title: string;
  summary: string;
  profile_picture?: string;
  phone?: string;
  address?: string;
  email?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  birthday?: Date;
  experience?: string;
  created_at: string;
  updated_at: string;
};

export type CreatePersonalInfoRequest = {
  name: string;
  job_title: string;
  summary: string;
  profile_picture?: string;
  phone?: string;
  address?: string;
  email?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  experience?: string;
  birthday?: Date;
  github?: string;
};

export type UpdatePersonalInfoRequest = Partial<CreatePersonalInfoRequest>;

// Skills
export type Skill = {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  level: number; // 0-100
  category: string;
  created_at: string;
  updated_at: string;
};

export type CreateSkillRequest = {
  name: string;
  description?: string;
  level: number;
  category: string;
};

export type UpdateSkillRequest = Partial<CreateSkillRequest>;

// Experience
export type SeniorityLevel =
  | "JUNIOR"
  | "MID"
  | "SENIOR"
  | "LEAD"
  | "MANAGER"
  | "DIRECTOR"
  | "CTO";

export type Experience = {
  id: string;
  user_id: string;
  title: string;
  company: string;
  project_name?: string;
  seniority_level: SeniorityLevel;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
  key_achievements: string[];
  technologies: string[];
  created_at: string;
  updated_at: string;
};

export type CreateExperienceRequest = {
  title: string;
  company: string;
  project_name?: string;
  seniority_level: SeniorityLevel;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
  key_achievements: string[];
  technologies: string[];
};

export type UpdateExperienceRequest = Partial<CreateExperienceRequest>;

// Education
export type Education = {
  id: string;
  user_id: string;
  degree: string;
  institution: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
};

export type CreateEducationRequest = {
  degree: string;
  institution: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
};

export type UpdateEducationRequest = Partial<CreateEducationRequest>;

// Certifications
export type Certification = {
  id: string;
  user_id: string;
  name: string;
  issuer: string;
  issue_date: string;
  expiration_date?: string;
  credential_id?: string;
  credential_url?: string;
  created_at: string;
  updated_at: string;
};

export type CreateCertificationRequest = {
  name: string;
  issuer: string;
  issue_date: string;
  expiration_date?: string;
  credential_id?: string;
  credential_url?: string;
};

export type UpdateCertificationRequest = Partial<CreateCertificationRequest>;

// Awards
export type Award = {
  id: string;
  user_id: string;
  name: string;
  issuer: string;
  date: string;
  description?: string;
  created_at: string;
  updated_at: string;
};

export type CreateAwardRequest = {
  name: string;
  issuer: string;
  date: string;
  description?: string;
};

export type UpdateAwardRequest = Partial<CreateAwardRequest>;

// Interests
export type Interest = {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type CreateInterestRequest = {
  name: string;
};

export type UpdateInterestRequest = Partial<CreateInterestRequest>;

// References
export type Reference = {
  id: string;
  user_id: string;
  name: string;
  position: string;
  company: string;
  email?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
};

export type CreateReferenceRequest = {
  name: string;
  position: string;
  company: string;
  email?: string;
  phone?: string;
};

export type UpdateReferenceRequest = Partial<CreateReferenceRequest>;

// Complete CV
export type CompleteCV = {
  personal_info?: PersonalInfo;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  awards: Award[];
  interests: Interest[];
  references: Reference[];
  sections: CVSection[];
};

// API Response Types
export type GetCVSectionsResponse = ApiResponse<{
  data: CVSection[];
  total: number;
  page: number;
  limit: number;
  next: string | null;
  prev: string | null;
}>;

export type UpdateCVSectionResponse = ApiResponse<CVSection>;

export type GetPersonalInfoResponse = ApiResponse<PersonalInfo>;
export type CreatePersonalInfoResponse = ApiResponse<PersonalInfo>;
export type UpdatePersonalInfoResponse = ApiResponse<PersonalInfo>;

export type GetSkillsResponse = ApiResponse<{
  data: Skill[];
  total: number;
  page: number;
  limit: number;
  next: string | null;
  prev: string | null;
}>;
export type CreateSkillResponse = ApiResponse<Skill>;
export type UpdateSkillResponse = ApiResponse<Skill>;
export type DeleteSkillResponse = ApiResponse<null>;

export type GetExperienceResponse = ApiResponse<{
  data: Experience[];
  total: number;
  page: number;
  limit: number;
  next: string | null;
  prev: string | null;
}>;
export type CreateExperienceResponse = ApiResponse<Experience>;
export type UpdateExperienceResponse = ApiResponse<Experience>;
export type DeleteExperienceResponse = ApiResponse<null>;

export type GetEducationResponse = ApiResponse<{
  data: Education[];
  total: number;
  page: number;
  limit: number;
  next: string | null;
  prev: string | null;
}>;
export type CreateEducationResponse = ApiResponse<Education>;
export type UpdateEducationResponse = ApiResponse<Education>;
export type DeleteEducationResponse = ApiResponse<null>;

export type GetCertificationsResponse = ApiResponse<{
  data: Certification[];
  total: number;
  page: number;
  limit: number;
  next: string | null;
  prev: string | null;
}>;
export type CreateCertificationResponse = ApiResponse<Certification>;
export type UpdateCertificationResponse = ApiResponse<Certification>;
export type DeleteCertificationResponse = ApiResponse<null>;

export type GetAwardsResponse = ApiResponse<{
  data: Award[];
  total: number;
  page: number;
  limit: number;
  next: string | null;
  prev: string | null;
}>;
export type CreateAwardResponse = ApiResponse<Award>;
export type UpdateAwardResponse = ApiResponse<Award>;
export type DeleteAwardResponse = ApiResponse<null>;

export type GetInterestsResponse = ApiResponse<{
  data: Interest[];
  total: number;
  page: number;
  limit: number;
  next: string | null;
  prev: string | null;
}>;
export type CreateInterestResponse = ApiResponse<Interest>;
export type UpdateInterestResponse = ApiResponse<Interest>;
export type DeleteInterestResponse = ApiResponse<null>;

export type GetReferencesResponse = ApiResponse<{
  data: Reference[];
  total: number;
  page: number;
  limit: number;
  next: string | null;
  prev: string | null;
}>;
export type CreateReferenceResponse = ApiResponse<Reference>;
export type UpdateReferenceResponse = ApiResponse<Reference>;
export type DeleteReferenceResponse = ApiResponse<null>;

export type GetCompleteCVResponse = ApiResponse<CompleteCV>;

// Query Parameters
export type CVQueryParams = {
  page?: number;
  limit?: number;
  q?: string;
  category?: string;
  company?: string;
  institution?: string;
  issuer?: string;
  technology?: string;
};
