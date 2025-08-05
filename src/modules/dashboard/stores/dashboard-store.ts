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
      technologies: [
        {
          id: "tech-1",
          name: "React",
          description: "A JavaScript library for building user interfaces",
          category: "Frontend",
          icon: "react",
          color: "#61DAFB",
          isActive: true,
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z",
        },
        {
          id: "tech-2",
          name: "Node.js",
          description:
            "JavaScript runtime built on Chrome's V8 JavaScript engine",
          category: "Backend",
          icon: "nodejs",
          color: "#339933",
          isActive: true,
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z",
        },
        {
          id: "tech-3",
          name: "TypeScript",
          description: "Typed superset of JavaScript",
          category: "Language",
          icon: "typescript",
          color: "#3178C6",
          isActive: true,
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z",
        },
      ],
      projects: [
        {
          id: "proj-1",
          name: "E-Commerce Platform",
          description:
            "A modern e-commerce platform built with React and Node.js, featuring real-time inventory management and secure payment processing.",
          category: "Web Application",
          logo: "🛒",
          cover:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
          github: "https://github.com/example/ecommerce",
          demo: "https://ecommerce-demo.example.com",
          technologies: ["tech-1", "tech-2", "tech-3"],
          features: [
            "User authentication and authorization",
            "Product catalog with search and filtering",
            "Shopping cart and checkout process",
            "Secure payment integration",
            "Real-time inventory management",
            "Order tracking and management",
            "Admin dashboard for product management",
            "Responsive design for all devices",
          ],
          isActive: true,
          isFeatured: true,
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z",
        },
        {
          id: "proj-2",
          name: "Task Management App",
          description:
            "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
          category: "Productivity",
          logo: "📋",
          cover:
            "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
          github: "https://github.com/example/task-manager",
          demo: "https://task-manager-demo.example.com",
          technologies: ["tech-1", "tech-3"],
          features: [
            "Real-time task updates and notifications",
            "Drag-and-drop task organization",
            "Team collaboration and sharing",
            "Project templates and workflows",
            "Time tracking and reporting",
            "Mobile-responsive design",
            "Integration with popular tools",
            "Advanced search and filtering",
          ],
          isActive: true,
          isFeatured: true,
          createdAt: "2024-01-02T00:00:00.000Z",
          updatedAt: "2024-01-02T00:00:00.000Z",
        },
        {
          id: "proj-3",
          name: "AI Chat Assistant",
          description:
            "An intelligent chat assistant powered by machine learning, providing personalized responses and natural language processing.",
          category: "AI/ML",
          logo: "🤖",
          cover:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
          github: "https://github.com/example/ai-chat",
          demo: "https://ai-chat-demo.example.com",
          technologies: ["tech-1", "tech-2"],
          features: [
            "Natural language processing and understanding",
            "Context-aware conversations",
            "Multi-language support",
            "Integration with external APIs",
            "Conversation history and analytics",
            "Customizable responses and personality",
            "Real-time learning and adaptation",
            "Secure data handling and privacy",
          ],
          isActive: true,
          isFeatured: true,
          createdAt: "2024-01-03T00:00:00.000Z",
          updatedAt: "2024-01-03T00:00:00.000Z",
        },
      ],
      categories: [
        {
          id: "cat-1",
          name: "Web Application",
          description: "Full-stack web applications and platforms",
          color: "#3B82F6",
          icon: "🌐",
          isActive: true,
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z",
        },
        {
          id: "cat-2",
          name: "Productivity",
          description: "Tools and applications to improve productivity",
          color: "#10B981",
          icon: "⚡",
          isActive: true,
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z",
        },
        {
          id: "cat-3",
          name: "AI/ML",
          description: "Artificial Intelligence and Machine Learning projects",
          color: "#8B5CF6",
          icon: "🧠",
          isActive: true,
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z",
        },
        {
          id: "cat-4",
          name: "Design",
          description: "UI/UX design and creative projects",
          color: "#F59E0B",
          icon: "🎨",
          isActive: true,
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z",
        },
        {
          id: "cat-5",
          name: "Mobile",
          description: "Mobile applications and responsive designs",
          color: "#EF4444",
          icon: "📱",
          isActive: true,
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z",
        },
      ],
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
