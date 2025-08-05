import { ExternalLink, Github, Star } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "../../hook/use-projects";

/**
 * ProjectCard - Pure component for displaying a single project.
 * Uses cn utility for merging classes.
 */
export function ProjectCard({
  project,
  featured = false,
}: React.ComponentProps<typeof Card> & {
  project: Project;
  featured: boolean;
}) {
  return (
    <Card className="group relative overflow-hidden pt-0">
      {/* Project Image */}
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <Badge className="bg-primary text-primary-foreground flex items-center gap-1 text-xs">
              <Star className="h-3 w-3" />
              Featured
            </Badge>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
          <Badge
            variant="secondary"
            className="backdrop-blur-sm bg-background/80 text-xs"
          >
            {project.category}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.liveUrl && (
            <Button
              size="sm"
              variant="secondary"
              className={cn("h-7 w-7 sm:h-8 sm:w-8 p-0")}
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button
              size="sm"
              variant="secondary"
              className={cn("h-7 w-7 sm:h-8 sm:w-8 p-0")}
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <Github className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Project Content */}
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors duration-300">
          {project.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground leading-relaxed line-clamp-2 text-sm">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Technologies */}
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

ProjectCard.displayName = "ProjectCard";
