import { Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "../cards/project-card";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce platform built with React and Node.js, featuring real-time inventory management and secure payment processing.",
    category: "Web Application",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true,
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    category: "Productivity",
    technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true,
  },
  {
    id: "3",
    title: "AI Chat Assistant",
    description:
      "An intelligent chat assistant powered by machine learning, providing personalized responses and natural language processing.",
    category: "AI/ML",
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true,
  },
  {
    id: "4",
    title: "Portfolio Website",
    description:
      "A stunning portfolio website showcasing creative work with smooth animations and responsive design.",
    category: "Design",
    technologies: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: "5",
    title: "Weather Dashboard",
    description:
      "A beautiful weather dashboard with real-time data, interactive maps, and detailed forecasts for multiple locations.",
    category: "Data Visualization",
    technologies: ["Vue.js", "D3.js", "OpenWeather API", "Chart.js"],
    image:
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: "6",
    title: "Social Media Analytics",
    description:
      "Comprehensive social media analytics platform with data visualization, reporting tools, and campaign tracking.",
    category: "Analytics",
    technologies: ["Angular", "Python", "PostgreSQL", "Redis"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
];

export function Projects() {
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4 sm:mb-6">
            Featured Projects
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Showcasing innovative solutions and cutting-edge technologies that
            demonstrate
            <span className="font-semibold text-foreground">
              {" "}
              performance, efficiency
            </span>{" "}
            and
            <span className="font-semibold text-foreground">
              {" "}
              exceptional user experience
            </span>
            .
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
        </div>

        {/* Other Projects */}
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-foreground">
            More Projects
          </h3>
          <p className="text-muted-foreground">
            Discover more of my work and contributions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} featured={false} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            <Github className="mr-2 h-5 w-5" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}

Projects.displayName = "Projects";
