import { Link, useNavigate } from "react-router-dom";
import { ExternalLink, Github, Star, Lock } from "lucide-react";
import { type MouseEvent } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";

import type { Project } from "@/types/project";

export function ProjectCard({
  project,
  redirectTo,
}: React.ComponentProps<typeof Card> & {
  project: Project;
  redirectTo?: string;
}) {
  const navigate = useNavigate();

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleCardClick = () => {
    if (redirectTo) {
      navigate(redirectTo);
    } else {
      navigate(`/dashboard/projects/${project.id}`, { state: { project } });
    }
  };

  return (
    <Card
      className="pt-0 overflow-hidden group relative"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for project ${project.name}`}
    >
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <Image src={project.coverUrl} alt={project.name} />

        <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Overlay lock icon if project is not public */}
        {!project.isPublic && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60"
            aria-label="Private Project"
            tabIndex={-1}
          >
            <Lock className="h-8 w-8 text-white mb-2" aria-hidden="true" />
            <span className="text-white text-xs font-semibold">Private</span>
          </div>
        )}

        {project.isFeatured && (
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-30">
            <Badge className="bg-primary text-primary-foreground flex items-center gap-1 text-xs">
              <Star className="h-3 w-3" />
              Featured
            </Badge>
          </div>
        )}

        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
          {project.demoLink && (
            <Button
              size="icon"
              variant="secondary"
              onClick={handleButtonClick}
              aria-label="Open live demo"
            >
              <Link
                to={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </Button>
          )}

          {project.githubLink && (
            <Button
              size="icon"
              variant="secondary"
              onClick={handleButtonClick}
              aria-label="Open GitHub repository"
            >
              <Link
                to={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">{project.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.brief}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 mt-auto">
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {project.technologies?.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies && project.technologies.length > 3 && (
            <Badge
              variant="outline"
              className="text-xs"
              title={project.technologies.slice(3).join(", ")}
            >
              +more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

ProjectCard.displayName = "ProjectCard";
