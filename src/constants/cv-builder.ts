// CV Builder Constants

export const CV_SECTIONS = {
  PERSONAL_INFO: "personal_info",
  SKILLS: "skills",
  EXPERIENCE: "experience",
  EDUCATION: "education",
  CERTIFICATIONS: "certifications",
  AWARDS: "awards",
  INTERESTS: "interests",
  REFERENCES: "references",
} as const;

export const SENIORITY_LEVELS = [
  { value: "JUNIOR", label: "Junior", description: "0-2 years experience" },
  { value: "MID", label: "Mid-Level", description: "2-5 years experience" },
  { value: "SENIOR", label: "Senior", description: "5-8 years experience" },
  { value: "LEAD", label: "Lead", description: "8-10 years experience" },
  { value: "MANAGER", label: "Manager", description: "10+ years experience" },
  { value: "DIRECTOR", label: "Director", description: "15+ years experience" },
  { value: "CTO", label: "CTO", description: "20+ years experience" },
] as const;

export const SKILL_LEVELS = [
  { value: 0, label: "Beginner", color: "text-red-600", description: "Basic understanding" },
  { value: 25, label: "Elementary", color: "text-orange-600", description: "Some experience" },
  { value: 50, label: "Intermediate", color: "text-yellow-600", description: "Good understanding" },
  { value: 75, label: "Advanced", color: "text-blue-600", description: "Strong skills" },
  { value: 100, label: "Expert", color: "text-green-600", description: "Mastery level" },
] as const;

export const DEFAULT_SKILL_CATEGORIES = [
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "Mobile Development",
  "DevOps & Cloud",
  "Database & Data",
  "AI & Machine Learning",
  "Cybersecurity",
  "Project Management",
  "Soft Skills",
  "Design & UX",
  "Testing & QA",
  "Other",
] as const;

export const CV_TEMPLATES = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean and contemporary design",
    preview: "/cv-templates/modern-preview.png",
  },
  {
    id: "classic",
    name: "Classic Traditional",
    description: "Timeless and formal layout",
    preview: "/cv-templates/classic-preview.png",
  },
  {
    id: "creative",
    name: "Creative Portfolio",
    description: "Unique and artistic design",
    preview: "/cv-templates/creative-preview.png",
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Simple and focused layout",
    preview: "/cv-templates/minimal-preview.png",
  },
] as const;

export const CV_EXPORT_FORMATS = [
  { value: "pdf", label: "PDF", description: "Best for printing and sharing" },
  { value: "docx", label: "Word Document", description: "Editable format" },
  { value: "html", label: "HTML", description: "Web-friendly format" },
  { value: "json", label: "JSON", description: "Data format for integration" },
] as const;

export const CV_SHARING_OPTIONS = [
  { value: "public", label: "Public Link", description: "Anyone can view" },
  { value: "private", label: "Private Link", description: "Password protected" },
  { value: "email", label: "Email", description: "Send directly via email" },
  { value: "download", label: "Download", description: "Download file" },
] as const;
