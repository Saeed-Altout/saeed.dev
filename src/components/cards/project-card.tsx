import { Link, useNavigate } from "react-router-dom";
import {
  ExternalLink,
  Github,
  Star,
  Lock,
  Trash2,
  Edit3,
  Eye,
} from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import { toast } from "sonner";

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteProject } from "@/api/project";
import type { Project } from "@/types/project";

interface ProjectCardProps extends React.ComponentProps<typeof Card> {
  project: Project;
  onDelete?: (projectId: string) => void;
  showDeleteButton?: boolean;
  showEditButton?: boolean;
}

export function ProjectCard({
  project,
  onDelete,
  showDeleteButton = false,
  showEditButton = false,
}: ProjectCardProps) {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://placehold.co/600";
  };

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleViewDetails = () => {
    navigate(`/dashboard/projects/${project.id}`, { state: { project } });
  };

  const handleDelete = async () => {
    if (!onDelete) return;

    setIsDeleting(true);
    try {
      await deleteProject(project.id);
      onDelete(project.id);
      toast.success(`Project "${project.name}" deleted successfully`);
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error("Failed to delete project. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    navigate(`/dashboard/projects/${project.id}`, { state: { project } });
  };

  return (
    <Card className="pt-0 overflow-hidden group relative">
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img
          ref={imageRef}
          src={project.coverUrl}
          alt={project.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isImageLoaded ? "blur-none" : "blur-md"
          )}
          onError={handleImageError}
          onLoad={() => {
            setIsImageLoaded(true);
          }}
          loading="lazy"
        />

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
          <Button
            size="icon"
            variant="secondary"
            onClick={handleViewDetails}
            aria-label="View project details"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>

          {showEditButton && (
            <Button
              size="icon"
              variant="secondary"
              onClick={handleEdit}
              aria-label="Edit project"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              <Edit3 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          )}

          {showDeleteButton && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={handleButtonClick}
                  disabled={isDeleting}
                  aria-label="Delete project"
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Project</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{project.name}"? This
                    action cannot be undone and will permanently remove the
                    project and all its data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting ? "Deleting..." : "Delete Project"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

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
