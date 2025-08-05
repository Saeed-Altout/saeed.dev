import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type { Technology, Project, DashboardState } from "../types";

interface DashboardStore extends DashboardState {
  // Technology actions
  addTechnology: (
    technology: Omit<Technology, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateTechnology: (id: string, updates: Partial<Technology>) => void;
  deleteTechnology: (id: string) => void;
  getTechnologyById: (id: string) => Technology | undefined;

  // Project actions
  addProject: (
    project: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProjectById: (id: string) => Project | undefined;

  // Utility actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const generateId = () => uuidv4();
const generateTimestamp = () => new Date().toISOString();

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      technologies: [],
      projects: [],
      isLoading: false,
      error: null,

      // Technology actions
      addTechnology: (technologyData) => {
        const newTechnology: Technology = {
          ...technologyData,
          id: generateId(),
          createdAt: generateTimestamp(),
          updatedAt: generateTimestamp(),
        };

        set((state) => ({
          technologies: [...state.technologies, newTechnology],
          error: null,
        }));
      },

      updateTechnology: (id, updates) => {
        set((state) => ({
          technologies: state.technologies.map((tech) =>
            tech.id === id
              ? { ...tech, ...updates, updatedAt: generateTimestamp() }
              : tech
          ),
          error: null,
        }));
      },

      deleteTechnology: (id) => {
        set((state) => ({
          technologies: state.technologies.filter((tech) => tech.id !== id),
          error: null,
        }));
      },

      getTechnologyById: (id) => {
        return get().technologies.find((tech) => tech.id === id);
      },

      // Project actions
      addProject: (projectData) => {
        const newProject: Project = {
          ...projectData,
          id: generateId(),
          createdAt: generateTimestamp(),
          updatedAt: generateTimestamp(),
        };

        set((state) => ({
          projects: [...state.projects, newProject],
          error: null,
        }));
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? { ...project, ...updates, updatedAt: generateTimestamp() }
              : project
          ),
          error: null,
        }));
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
          error: null,
        }));
      },

      getProjectById: (id) => {
        return get().projects.find((project) => project.id === id);
      },

      // Utility actions
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: "dashboard-storage",
      partialize: (state) => ({
        technologies: state.technologies,
        projects: state.projects,
      }),
    }
  )
);
