import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type {
  Technology,
  Project,
  Category,
  TrashItem,
  DashboardState,
} from "../types";

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

  // Category actions
  addCategory: (
    category: Omit<Category, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  getCategoryById: (id: string) => Category | undefined;

  // Trash actions
  moveToTrash: (
    type: "technology" | "project" | "category",
    id: string
  ) => void;
  restoreFromTrash: (id: string) => void;
  permanentlyDelete: (id: string) => void;
  cleanupExpiredTrash: () => void;

  // Utility actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const generateId = () => uuidv4();
const generateTimestamp = () => new Date().toISOString();
const generateExpiryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7); // 7 days from now
  return date.toISOString();
};

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      technologies: [],
      projects: [],
      categories: [],
      trash: [],
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
        const tech = get().technologies.find((t) => t.id === id);
        if (tech) {
          get().moveToTrash("technology", id);
        }
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
        const project = get().projects.find((p) => p.id === id);
        if (project) {
          get().moveToTrash("project", id);
        }
      },

      getProjectById: (id) => {
        return get().projects.find((project) => project.id === id);
      },

      // Category actions
      addCategory: (categoryData) => {
        const newCategory: Category = {
          ...categoryData,
          id: generateId(),
          createdAt: generateTimestamp(),
          updatedAt: generateTimestamp(),
        };

        set((state) => ({
          categories: [...state.categories, newCategory],
          error: null,
        }));
      },

      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === id
              ? { ...category, ...updates, updatedAt: generateTimestamp() }
              : category
          ),
          error: null,
        }));
      },

      deleteCategory: (id) => {
        const category = get().categories.find((c) => c.id === id);
        if (category) {
          get().moveToTrash("category", id);
        }
      },

      getCategoryById: (id) => {
        return get().categories.find((category) => category.id === id);
      },

      // Trash actions
      moveToTrash: (type, id) => {
        const state = get();
        let item: Technology | Project | Category | undefined;

        switch (type) {
          case "technology":
            item = state.technologies.find((t) => t.id === id);
            if (item) {
              const trashItem: TrashItem = {
                id: generateId(),
                type,
                data: item,
                deletedAt: generateTimestamp(),
                expiresAt: generateExpiryDate(),
              };
              set((state) => ({
                technologies: state.technologies.filter((t) => t.id !== id),
                trash: [...state.trash, trashItem],
                error: null,
              }));
            }
            break;
          case "project":
            item = state.projects.find((p) => p.id === id);
            if (item) {
              const trashItem: TrashItem = {
                id: generateId(),
                type,
                data: item,
                deletedAt: generateTimestamp(),
                expiresAt: generateExpiryDate(),
              };
              set((state) => ({
                projects: state.projects.filter((p) => p.id !== id),
                trash: [...state.trash, trashItem],
                error: null,
              }));
            }
            break;
          case "category":
            item = state.categories.find((c) => c.id === id);
            if (item) {
              const trashItem: TrashItem = {
                id: generateId(),
                type,
                data: item,
                deletedAt: generateTimestamp(),
                expiresAt: generateExpiryDate(),
              };
              set((state) => ({
                categories: state.categories.filter((c) => c.id !== id),
                trash: [...state.trash, trashItem],
                error: null,
              }));
            }
            break;
        }
      },

      restoreFromTrash: (trashId) => {
        const state = get();
        const trashItem = state.trash.find((t) => t.id === trashId);
        if (trashItem) {
          set((state) => {
            const newState = { ...state };

            // Remove from trash
            newState.trash = state.trash.filter((t) => t.id !== trashId);

            // Restore to appropriate array
            switch (trashItem.type) {
              case "technology":
                newState.technologies = [
                  ...state.technologies,
                  trashItem.data as Technology,
                ];
                break;
              case "project":
                newState.projects = [
                  ...state.projects,
                  trashItem.data as Project,
                ];
                break;
              case "category":
                newState.categories = [
                  ...state.categories,
                  trashItem.data as Category,
                ];
                break;
            }

            return newState;
          });
        }
      },

      permanentlyDelete: (trashId) => {
        set((state) => ({
          trash: state.trash.filter((t) => t.id !== trashId),
          error: null,
        }));
      },

      cleanupExpiredTrash: () => {
        const now = new Date().toISOString();
        set((state) => ({
          trash: state.trash.filter((item) => item.expiresAt > now),
          error: null,
        }));
      },

      // Utility actions
      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "dashboard-storage",
      partialize: (state) => ({
        technologies: state.technologies,
        projects: state.projects,
        categories: state.categories,
        trash: state.trash,
      }),
    }
  )
);
