import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ProjectForm } from "../../../components/project-form";

export default function NewProjectPage() {
  const navigate = useNavigate();

  const handleFormClose = () => {
    navigate("/dashboard/projects");
  };

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
          Create New Project
        </h1>
        <p className="text-muted-foreground">
          Add a new project to your portfolio. Fill in the details below.
        </p>
      </div>

      {/* Project Form */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Project Details</h2>
          <p className="text-sm text-muted-foreground">
            Enter the project information. All fields marked with * are
            required.
          </p>
        </div>
        <ProjectForm mode="standalone" onOpenChange={handleFormClose} />
      </div>
    </div>
  );
}
