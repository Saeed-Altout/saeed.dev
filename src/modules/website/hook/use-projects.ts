import { useMemo } from "react";
import { useDashboardStore } from "../../dashboard/stores/dashboard-store";
import type { Project as DashboardProject } from "../../dashboard/types";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  longDescription?: string;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  date?: string;
  author?: string;
}

// Transform dashboard project to website project format
const transformDashboardProject = (
  dashboardProject: DashboardProject,
  technologies: Array<{ id: string; name: string }>
): Project => {
  // Convert technology IDs to technology names
  const technologyNames = dashboardProject.technologies
    .map((techId) => {
      const tech = technologies.find((t) => t.id === techId);
      return tech?.name || techId;
    })
    .filter(Boolean);

  return {
    id: dashboardProject.id,
    title: dashboardProject.name,
    description: dashboardProject.description,
    category: dashboardProject.category,
    technologies: technologyNames,
    image: dashboardProject.cover,
    liveUrl: dashboardProject.demo,
    githubUrl: dashboardProject.github,
    featured: dashboardProject.isFeatured,
    longDescription: dashboardProject.description, // Using description as long description for now
    features: dashboardProject.features,
    challenges: [], // Not available in dashboard project
    solutions: [], // Not available in dashboard project
    date: new Date(dashboardProject.createdAt).getFullYear().toString(),
    author: "Saeed Al-Tout", // Default author
  };
};

export const useProjects = () => {
  const {
    projects: dashboardProjects,
    categories: dashboardCategories,
    technologies: dashboardTechnologies,
  } = useDashboardStore();

  const projects = useMemo(() => {
    // Only return active projects
    const activeProjects = dashboardProjects.filter(
      (project) => project.isActive
    );
    return activeProjects.map((project) =>
      transformDashboardProject(project, dashboardTechnologies)
    );
  }, [dashboardProjects, dashboardTechnologies]);

  const categories = useMemo(() => {
    // Get unique category names from active categories
    const activeCategories = dashboardCategories
      .filter((category) => category.isActive)
      .map((category) => category.name);

    return ["All", ...activeCategories];
  }, [dashboardCategories]);

  const featuredProjects = useMemo(() => {
    return projects.filter((project) => project.featured);
  }, [projects]);

  const getProjectsByCategory = (category: string): Project[] => {
    if (category === "All") return projects;
    return projects.filter((project) => project.category === category);
  };

  return {
    projects,
    categories,
    featuredProjects,
    getProjectsByCategory,
  };
};
