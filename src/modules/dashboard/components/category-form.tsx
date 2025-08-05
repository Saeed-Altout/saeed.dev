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

import { categorySchema, type CategorySchema } from "../schemas";
import { useDashboardStore } from "../stores/dashboard-store";
import type { Category } from "../types";

interface CategoryFormProps {
  category?: Category;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode?: "dialog" | "standalone";
}

export function CategoryForm({
  category,
  open = true,
  onOpenChange,
  mode = "dialog",
}: CategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addCategory, updateCategory } = useDashboardStore();

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      color: category?.color || "#3b82f6",
      icon: category?.icon || "📁",
      isActive: category?.isActive ?? true,
    },
  });

  const onSubmit = async (data: CategorySchema) => {
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
              <SelectItem value="📁">📁 Folder</SelectItem>
              <SelectItem value="💻">💻 Computer</SelectItem>
              <SelectItem value="🌐">🌐 Web</SelectItem>
              <SelectItem value="📱">📱 Mobile</SelectItem>
              <SelectItem value="🎨">🎨 Design</SelectItem>
              <SelectItem value="🔧">🔧 Tools</SelectItem>
              <SelectItem value="📊">📊 Data</SelectItem>
              <SelectItem value="🚀">🚀 Rocket</SelectItem>
              <SelectItem value="⚡">⚡ Lightning</SelectItem>
              <SelectItem value="🎯">🎯 Target</SelectItem>
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
