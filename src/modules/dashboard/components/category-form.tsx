import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Loader2,
  Folder,
  Monitor,
  Globe,
  Smartphone,
  Palette,
  Wrench,
  BarChart3,
  Rocket,
  Zap,
  Target,
  Code,
  Database,
  Server,
  Cloud,
  Shield,
  Users,
  Settings,
  Home,
  BookOpen,
} from "lucide-react";

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

import { categorySchema } from "../schemas";
import { useDashboardStore } from "../stores/dashboard-store";
import type { Category } from "../types";
import type { z } from "zod";

interface CategoryFormProps {
  category?: Category;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode?: "dialog" | "standalone";
}

// Define available icons with their display names
const categoryIcons = [
  { value: "folder", label: "Folder", icon: Folder },
  { value: "monitor", label: "Monitor", icon: Monitor },
  { value: "globe", label: "Globe", icon: Globe },
  { value: "smartphone", label: "Smartphone", icon: Smartphone },
  { value: "palette", label: "Palette", icon: Palette },
  { value: "wrench", label: "Wrench", icon: Wrench },
  { value: "bar-chart-3", label: "Bar Chart", icon: BarChart3 },
  { value: "rocket", label: "Rocket", icon: Rocket },
  { value: "zap", label: "Zap", icon: Zap },
  { value: "target", label: "Target", icon: Target },
  { value: "code", label: "Code", icon: Code },
  { value: "database", label: "Database", icon: Database },
  { value: "server", label: "Server", icon: Server },
  { value: "cloud", label: "Cloud", icon: Cloud },
  { value: "shield", label: "Shield", icon: Shield },
  { value: "users", label: "Users", icon: Users },
  { value: "settings", label: "Settings", icon: Settings },
  { value: "home", label: "Home", icon: Home },
  { value: "book-open", label: "Book Open", icon: BookOpen },
];

export function CategoryForm({
  category,
  open = true,
  onOpenChange,
  mode = "dialog",
}: CategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addCategory, updateCategory } = useDashboardStore();

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      color: category?.color || "#3b82f6",
      icon: category?.icon || "folder",
      isActive: category?.isActive ?? true,
    },
  });

  const onSubmit = async (data: z.infer<typeof categorySchema>) => {
    setIsLoading(true);
    try {
      if (category) {
        updateCategory(category.id, data);
        toast.success("Category updated successfully");
      } else {
        addCategory(data);
        toast.success("Category created successfully");
      }
      if (onOpenChange) {
        onOpenChange(false);
      }
      form.reset();
    } catch {
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

  const formContent = (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Category Name *</Label>
        <Input
          id="name"
          placeholder="e.g., Web Development"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Brief description of the category"
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
          <Label htmlFor="icon">Icon</Label>
          <Select
            value={form.watch("icon")}
            onValueChange={(value) => form.setValue("icon", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an icon" />
            </SelectTrigger>
            <SelectContent>
              {categoryIcons.map((iconOption) => {
                const IconComponent = iconOption.icon;
                return (
                  <SelectItem key={iconOption.value} value={iconOption.value}>
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4" />
                      <span>{iconOption.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
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
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="#3b82f6">🔵 Blue</SelectItem>
              <SelectItem value="#10b981">🟢 Green</SelectItem>
              <SelectItem value="#f59e0b">🟡 Yellow</SelectItem>
              <SelectItem value="#ef4444">🔴 Red</SelectItem>
              <SelectItem value="#8b5cf6">🟣 Purple</SelectItem>
              <SelectItem value="#06b6d4">🔵 Cyan</SelectItem>
              <SelectItem value="#84cc16">🟢 Lime</SelectItem>
              <SelectItem value="#f97316">🟠 Orange</SelectItem>
              <SelectItem value="#ec4899">🩷 Pink</SelectItem>
              <SelectItem value="#6b7280">⚫ Gray</SelectItem>
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
            {category ? "Update" : "Create"} Category
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
            {category ? "Update" : "Create"} Category
          </Button>
        </div>
      )}
    </form>
  );

  if (mode === "dialog") {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {category ? "Edit Category" : "Add New Category"}
            </DialogTitle>
            <DialogDescription>
              {category
                ? "Update the category information below."
                : "Add a new category to organize your content."}
            </DialogDescription>
          </DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  return formContent;
}
