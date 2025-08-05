import type { Technology, Project } from "../types";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Technology API simulations
export const simulateGetTechnologies = async (): Promise<Technology[]> => {
  await delay(500);
  const stored = localStorage.getItem("dashboard-storage");
  if (stored) {
    const data = JSON.parse(stored);
    return data.state?.technologies || [];
  }
  return [];
};

export const simulateCreateTechnology = async (
  technology: Omit<Technology, "id" | "createdAt" | "updatedAt">
): Promise<{ success: boolean; data?: Technology; message: string }> => {
  await delay(300);
  return {
    success: true,
    data: {
      ...technology,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    message: "Technology created successfully",
  };
};

export const simulateUpdateTechnology = async (
  id: string,
  updates: Partial<Technology>
): Promise<{ success: boolean; data?: Technology; message: string }> => {
  await delay(300);
  return {
    success: true,
    data: {
      id,
      ...updates,
      updatedAt: new Date().toISOString(),
    } as Technology,
    message: "Technology updated successfully",
  };
};

export const simulateDeleteTechnology = async (
  _id: string
): Promise<{ success: boolean; message: string }> => {
  console.log("delete technology", _id);
  await delay(300);
  return {
    success: true,
    message: "Technology deleted successfully",
  };
};

// Project API simulations
export const simulateGetProjects = async (): Promise<Project[]> => {
  await delay(500);
  const stored = localStorage.getItem("dashboard-storage");
  if (stored) {
    const data = JSON.parse(stored);
    return data.state?.projects || [];
  }
  return [];
};

export const simulateCreateProject = async (
  project: Omit<Project, "id" | "createdAt" | "updatedAt">
): Promise<{ success: boolean; data?: Project; message: string }> => {
  await delay(300);
  return {
    success: true,
    data: {
      ...project,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    message: "Project created successfully",
  };
};

export const simulateUpdateProject = async (
  _id: string,
  updates: Partial<Project>
): Promise<{ success: boolean; data?: Project; message: string }> => {
  await delay(300);
  return {
    success: true,
    data: {
      id: _id,
      ...updates,
      updatedAt: new Date().toISOString(),
    } as Project,
    message: "Project updated successfully",
  };
};

export const simulateDeleteProject = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  console.log("delete project", id);
  await delay(300);
  return {
    success: true,
    message: "Project deleted successfully",
  };
};
