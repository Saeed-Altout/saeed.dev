import { useState, useMemo } from "react";
import { Search, Filter, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  {
    id: "7",
    title: "Mobile Banking App",
    description:
      "A secure mobile banking application with biometric authentication, real-time transactions, and financial insights.",
    category: "Mobile",
    technologies: ["React Native", "Node.js", "PostgreSQL", "JWT"],
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: "8",
    title: "Real-time Chat Platform",
    description:
      "A real-time messaging platform with video calls, file sharing, and group chat functionality.",
    category: "Communication",
    technologies: ["React", "Socket.io", "WebRTC", "MongoDB"],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: "9",
    title: "Inventory Management System",
    description:
      "A comprehensive inventory management system with barcode scanning, reporting, and automated reordering.",
    category: "Business",
    technologies: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=600&fit=crop",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
];

const categories = ["All", "Web Application", "Productivity", "AI/ML", "Design", "Data Visualization", "Analytics", "Mobile", "Communication", "Business"];

/**
 * ProjectsSection - Projects section with filtering and search functionality.
 */
export function ProjectsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4 sm:mb-6">
            My Projects
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore my <span className="font-semibold text-foreground">portfolio of projects</span> showcasing{" "}
            <span className="text-primary font-semibold">innovation, creativity, and technical expertise</span>
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects by name, description, or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Filter Button */}
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No projects found matching your criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

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

ProjectsSection.displayName = "ProjectsSection"; 