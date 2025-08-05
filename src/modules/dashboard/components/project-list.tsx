import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Edit, Trash2, Plus, Search, ExternalLink, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useDashboardStore } from "../stores/dashboard-store";
import type { Project } from "../types";

export function ProjectList() {
  const navigate = useNavigate();
  const { projects, deleteProject, technologies, categories } =
    useDashboardStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingProject, setDeletingProject] = useState<Project | undefined>();

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((techId) => {
        const tech = technologies.find((t) => t.id === techId);
        return tech?.name.toLowerCase().includes(searchTerm.toLowerCase());
      }) ||
      (project.category &&
        categories
          .find((c) => c.id === project.category)
          ?.name.toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  const handleEdit = (project: Project) => {
    navigate(`/dashboard/projects/${project.id}`);
  };

  const handleDelete = (project: Project) => {
    setDeletingProject(project);
  };

  const confirmDelete = () => {
    if (deletingProject) {
      deleteProject(deletingProject.id);
      toast.success("Project deleted successfully");
      setDeletingProject(undefined);
    }
  };

  const handleAddNew = () => {
    navigate("/dashboard/projects/new");
  };

  const getTechnologyNames = (technologyIds: string[]) => {
    return technologyIds
      .map((id) => technologies.find((t) => t.id === id)?.name)
      .filter(Boolean);
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage your portfolio projects and showcase your work.
          </p>
        </div>
        <Button onClick={handleAddNew} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-muted-foreground">
            <Search className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-sm font-semibold">No projects found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {searchTerm
              ? "Try adjusting your search terms."
              : "Get started by adding your first project."}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <Button onClick={handleAddNew}>
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-background border rounded-lg overflow-hidden hover:bg-accent/50 transition-colors"
            >
              {/* Cover Image */}
              {project.cover && (
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img
                    src={project.cover}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}

              {/* Status Badges */}
              <div className="absolute top-4 right-4 flex gap-2">
                {project.isFeatured && (
                  <Badge
                    variant="default"
                    className="bg-yellow-500 hover:bg-yellow-600"
                  >
                    Featured
                  </Badge>
                )}
                <Badge variant={project.isActive ? "default" : "secondary"}>
                  {project.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Project Header */}
                <div className="flex items-center gap-3 mb-4">
                  {project.logo && (
                    <img
                      src={project.logo}
                      alt={`${project.name} logo`}
                      className="w-8 h-8 rounded object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-1">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Category */}
                {project.category && getCategoryName(project.category) && (
                  <div className="mb-4">
                    <Badge variant="outline" className="text-xs">
                      {getCategoryName(project.category)}
                    </Badge>
                  </div>
                )}

                {/* Technologies */}
                {project.technologies.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {getTechnologyNames(project.technologies)
                        .slice(0, 3)
                        .map((techName) => (
                          <Badge
                            key={techName}
                            variant="secondary"
                            className="text-xs"
                          >
                            {techName}
                          </Badge>
                        ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Features */}
                {project.features.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.features.slice(0, 2).map((feature) => (
                        <Badge
                          key={feature}
                          variant="outline"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                      {project.features.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.features.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex items-center gap-2 mb-4">
                  {project.github && (
                    <Button variant="ghost" size="sm">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button variant="ghost" size="sm">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Updated {new Date(project.updatedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(project)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(project)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingProject}
        onOpenChange={() => setDeletingProject(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{" "}
              <span className="font-semibold">{deletingProject?.name}</span>{" "}
              project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
