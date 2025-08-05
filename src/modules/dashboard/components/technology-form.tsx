import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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

import { technologySchema } from "../schemas";
import { useDashboardStore } from "../stores/dashboard-store";
import type { Technology } from "../types";
import type { z } from "zod";

interface TechnologyFormProps {
  technology?: Technology;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const technologyIcons = [
  "react",
  "vue",
  "angular",
  "nodejs",
  "python",
  "java",
  "typescript",
  "javascript",
  "docker",
  "kubernetes",
  "aws",
  "azure",
  "gcp",
  "mongodb",
  "postgresql",
  "mysql",
  "redis",
  "elasticsearch",
  "kafka",
  "rabbitmq",
];

const technologyColors = [
  "#3B82F6", // blue
  "#10B981", // emerald
  "#F59E0B", // amber
  "#EF4444", // red
  "#8B5CF6", // violet
  "#06B6D4", // cyan
  "#84CC16", // lime
  "#F97316", // orange
  "#EC4899", // pink
  "#6366F1", // indigo
];

export function TechnologyForm({
  technology,
  open,
  onOpenChange,
}: TechnologyFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addTechnology, updateTechnology, categories } = useDashboardStore();

  const form = useForm({
    resolver: zodResolver(technologySchema),
    defaultValues: {
      name: technology?.name || "",
      description: technology?.description || "",
      category: technology?.category || "",
      icon: technology?.icon || "",
      color: technology?.color || "#3B82F6",
      isActive: technology?.isActive ?? true,
    },
  });

  const onSubmit = async (data: z.infer<typeof technologySchema>) => {
    setIsLoading(true);
    try {
      if (technology) {
        updateTechnology(technology.id, data);
        toast.success("Technology updated successfully");
      } else {
        addTechnology(data);
        toast.success("Technology created successfully");
      }
      onOpenChange(false);
      form.reset();
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {technology ? "Edit Technology" : "Add New Technology"}
          </DialogTitle>
          <DialogDescription>
            {technology
              ? "Update the technology information below."
              : "Add a new technology to your portfolio."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="e.g., React, Node.js"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={form.watch("category")}
                onValueChange={(value) => form.setValue("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.length === 0 ? (
                    <div className="px-2 py-1.5 text-sm text-muted-foreground">
                      No categories available. Please create a category first.
                    </div>
                  ) : (
                    categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {form.formState.errors.category && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the technology"
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-500">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Select
                value={form.watch("icon")}
                onValueChange={(value) => form.setValue("icon", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  {technologyIcons.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.icon && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.icon.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Select
                value={form.watch("color")}
                onValueChange={(value) => form.setValue("color", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {technologyColors.map((color) => (
                    <SelectItem key={color} value={color}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        {color}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.color && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.color.message}
                </p>
              )}
            </div>
          </div>

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
              {technology ? "Update" : "Create"} Technology
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
