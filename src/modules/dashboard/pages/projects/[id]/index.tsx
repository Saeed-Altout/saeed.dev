import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useDashboardStore } from "@/modules/dashboard/stores/dashboard-store";
import { ProjectForm } from "@/modules/dashboard/components/project-form";
import type { Project } from "@/modules/dashboard/types";

export default function ProjectPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getProjectById } = useDashboardStore();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewProject, setIsNewProject] = useState(false);

  useEffect(() => {
    if (id) {
      if (id === "new") {
        // Creating a new project
        setIsNewProject(true);
        setProject(null);
        setIsLoading(false);
      } else {
        // Editing an existing project
        setIsNewProject(false);
        const foundProject = getProjectById(id);
        if (foundProject) {
          setProject(foundProject);
        } else {
          // Project not found, redirect to projects list
          navigate("/dashboard/projects", { replace: true });
        }
        setIsLoading(false);
      }
    }
  }, [id, getProjectById, navigate]);

  const handleFormClose = () => {
    navigate("/dashboard/projects");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard/projects")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </div>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/dashboard/projects")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {isNewProject ? "Create New Project" : "Edit Project"}
        </h1>
        <p className="text-muted-foreground">
          {isNewProject
            ? "Add a new project to your portfolio. Fill in the details below."
            : "Update the project information below."}
        </p>
      </div>

      {/* Project Form */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Project Details</h2>
          <p className="text-sm text-muted-foreground">
            {isNewProject
              ? "Enter the project information. All fields marked with * are required."
              : "Update the project information. All fields marked with * are required."}
          </p>
        </div>
        <ProjectForm
          project={project || undefined}
          mode="standalone"
          onOpenChange={handleFormClose}
        />
      </div>
    </div>
  );
}
