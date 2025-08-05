import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Edit, Trash2, Plus, Search } from "lucide-react";

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
import { CategoryForm } from "./category-form";
import type { Category } from "../types";

export function CategoryList() {
  const navigate = useNavigate();
  const { categories, deleteCategory } = useDashboardStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<
    Category | undefined
  >();
  const [deletingCategory, setDeletingCategory] = useState<
    Category | undefined
  >();

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleDelete = (category: Category) => {
    setDeletingCategory(category);
  };

  const confirmDelete = () => {
    if (deletingCategory) {
      deleteCategory(deletingCategory.id);
      toast.success("Category deleted successfully");
      setDeletingCategory(undefined);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingCategory(undefined);
  };

  const handleAddNew = () => {
    setEditingCategory(undefined);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Manage categories to organize your technologies and projects.
          </p>
        </div>
        <Button onClick={handleAddNew} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-muted-foreground">
            <Search className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-sm font-semibold">No categories found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {searchTerm
              ? "Try adjusting your search terms."
              : "Get started by adding your first category."}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <Button onClick={handleAddNew}>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-background border rounded-lg overflow-hidden hover:bg-accent/50 transition-colors"
            >
              {/* Content */}
              <div className="p-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: category.color + "20" }}
                  >
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  <Badge variant={category.isActive ? "default" : "secondary"}>
                    {category.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Updated {new Date(category.updatedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(category)}
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

      {/* Category Form Dialog */}
      <CategoryForm
        category={editingCategory}
        open={isFormOpen}
        onOpenChange={handleFormClose}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingCategory}
        onOpenChange={() => setDeletingCategory(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{" "}
              <span className="font-semibold">{deletingCategory?.name}</span>{" "}
              category.
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
