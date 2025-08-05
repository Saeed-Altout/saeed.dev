import { Github } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "../cards/project-card";
import { useProjects } from "../../hook/use-projects";

export function Projects() {
  const { featuredProjects } = useProjects();

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

        {/* CTA Section */}
        <div className="text-center">
          <Link to="/projects">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              <Github className="mr-2 h-5 w-5" />
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

Projects.displayName = "Projects";
