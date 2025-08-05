import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { projectSchema, type ProjectSchema } from "../schemas";
import { useDashboardStore } from "../stores/dashboard-store";
import type { Project } from "../types";

interface ProjectFormProps {
  project?: Project;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode?: "dialog" | "standalone";
}

export function ProjectForm({
  project,
  open = true,
  onOpenChange,
  mode = "dialog",
}: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const { addProject, updateProject, technologies } = useDashboardStore();

  const form = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name || "",
      description: project?.description || "",
      logo: project?.logo || "",
      cover: project?.cover || "",
      github: project?.github || "",
      demo: project?.demo || "",
      technologies: project?.technologies || [],
      features: project?.features || [],
      isActive: project?.isActive ?? true,
      isFeatured: project?.isFeatured ?? false,
    },
  });

  const watchedFeatures = form.watch("features");
  const watchedTechnologies = form.watch("technologies");

  const onSubmit = async (data: ProjectSchema) => {
    setIsLoading(true);
    try {
      if (project) {
        updateProject(project.id, data);
        toast.success("Project updated successfully");
      } else {
        addProject(data);
        toast.success("Project created successfully");
      }
      if (onOpenChange) {
        onOpenChange(false);
      }
      form.reset();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
    form.reset();
  };

  const addFeature = () => {
    if (newFeature.trim() && !watchedFeatures.includes(newFeature.trim())) {
      const updatedFeatures = [...watchedFeatures, newFeature.trim()];
      form.setValue("features", updatedFeatures);
      setNewFeature("");
    }
  };

  const removeFeature = (featureToRemove: string) => {
    const updatedFeatures = watchedFeatures.filter(
      (feature) => feature !== featureToRemove
    );
    form.setValue("features", updatedFeatures);
  };

  const addTechnology = (technologyId: string) => {
    if (!watchedTechnologies.includes(technologyId)) {
      const updatedTechnologies = [...watchedTechnologies, technologyId];
      form.setValue("technologies", updatedTechnologies);
    }
  };

  const removeTechnology = (technologyId: string) => {
    const updatedTechnologies = watchedTechnologies.filter(
      (id) => id !== technologyId
    );
    form.setValue("technologies", updatedTechnologies);
  };

  const formContent = (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Project Name *</Label>
          <Input
            id="name"
            placeholder="e.g., E-commerce Platform"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo">Logo URL</Label>
          <Input
            id="logo"
            placeholder="https://example.com/logo.png"
            {...form.register("logo")}
          />
          {form.formState.errors.logo && (
            <p className="text-sm text-red-500">
              {form.formState.errors.logo.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Brief description of the project"
          {...form.register("description")}
        />
        {form.formState.errors.description && (
          <p className="text-sm text-red-500">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cover">Cover Image URL</Label>
          <Input
            id="cover"
            placeholder="https://example.com/cover.jpg"
            {...form.register("cover")}
          />
          {form.formState.errors.cover && (
            <p className="text-sm text-red-500">
              {form.formState.errors.cover.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="github">GitHub URL</Label>
          <Input
            id="github"
            placeholder="https://github.com/username/repo"
            {...form.register("github")}
          />
          {form.formState.errors.github && (
            <p className="text-sm text-red-500">
              {form.formState.errors.github.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="demo">Demo URL</Label>
        <Input
          id="demo"
          placeholder="https://demo.example.com"
          {...form.register("demo")}
        />
        {form.formState.errors.demo && (
          <p className="text-sm text-red-500">
            {form.formState.errors.demo.message}
          </p>
        )}
      </div>

      {/* Technologies */}
      <div className="space-y-2">
        <Label>Technologies</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {watchedTechnologies.map((techId) => {
            const tech = technologies.find((t) => t.id === techId);
            return tech ? (
              <Badge key={techId} variant="secondary" className="gap-1">
                {tech.name}
                <button
                  type="button"
                  onClick={() => removeTechnology(techId)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null;
          })}
        </div>
        <Select onValueChange={addTechnology}>
          <SelectTrigger>
            <SelectValue placeholder="Add technology" />
          </SelectTrigger>
          <SelectContent>
            {technologies
              .filter((tech) => !watchedTechnologies.includes(tech.id))
              .map((tech) => (
                <SelectItem key={tech.id} value={tech.id}>
                  {tech.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {form.formState.errors.technologies && (
          <p className="text-sm text-red-500">
            {form.formState.errors.technologies.message}
          </p>
        )}
      </div>

      {/* Features */}
      <div className="space-y-2">
        <Label>Features</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {watchedFeatures.map((feature) => (
            <Badge key={feature} variant="outline" className="gap-1">
              {feature}
              <button
                type="button"
                onClick={() => removeFeature(feature)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add a feature"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addFeature())
            }
          />
          <Button type="button" onClick={addFeature} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isActive"
            checked={form.watch("isActive")}
            onCheckedChange={(checked) =>
              form.setValue("isActive", checked as boolean)
            }
          />
          <Label htmlFor="isActive">Active</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isFeatured"
            checked={form.watch("isFeatured")}
            onCheckedChange={(checked) =>
              form.setValue("isFeatured", checked as boolean)
            }
          />
          <Label htmlFor="isFeatured">Featured</Label>
        </div>
      </div>

      {mode === "dialog" ? (
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {project ? "Update" : "Create"} Project
          </Button>
        </DialogFooter>
      ) : (
        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {project ? "Update" : "Create"} Project
          </Button>
        </div>
      )}
    </form>
  );

  if (mode === "dialog") {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {project ? "Edit Project" : "Add New Project"}
            </DialogTitle>
            <DialogDescription>
              {project
                ? "Update the project information below."
                : "Add a new project to your portfolio."}
            </DialogDescription>
          </DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  return formContent;
}
