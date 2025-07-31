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

interface Project {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

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
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
              <Star className="h-3 w-3" />
              Featured
            </Badge>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <Badge
            variant="secondary"
            className="backdrop-blur-sm bg-background/80"
          >
            {project.category}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.liveUrl && (
            <Button size="sm" variant="secondary" className={cn("h-8 w-8 p-0")}>
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
          {project.githubUrl && (
            <Button size="sm" variant="secondary" className={cn("h-8 w-8 p-0")}>
              <Github className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Project Content */}
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
          {project.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground leading-relaxed line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
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
