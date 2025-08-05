import { useState } from "react";
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
import { TechnologyForm } from "./technology-form";
import type { Technology } from "../types";

export function TechnologyList() {
  const { technologies, deleteTechnology } = useDashboardStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTechnology, setEditingTechnology] = useState<
    Technology | undefined
  >();
  const [deletingTechnology, setDeletingTechnology] = useState<
    Technology | undefined
  >();

  const filteredTechnologies = technologies.filter(
    (tech) =>
      tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (technology: Technology) => {
    setEditingTechnology(technology);
    setIsFormOpen(true);
  };

  const handleDelete = (technology: Technology) => {
    setDeletingTechnology(technology);
  };

  const confirmDelete = () => {
    if (deletingTechnology) {
      deleteTechnology(deletingTechnology.id);
      toast.success("Technology deleted successfully");
      setDeletingTechnology(undefined);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTechnology(undefined);
  };

  const handleAddNew = () => {
    setEditingTechnology(undefined);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Technologies</h2>
          <p className="text-muted-foreground">
            Manage your technology stack and skills.
          </p>
        </div>
        <Button onClick={handleAddNew} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Technology
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search technologies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Technologies Grid */}
      {filteredTechnologies.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-muted-foreground">
            <Search className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-sm font-semibold">No technologies found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {searchTerm
              ? "Try adjusting your search terms."
              : "Get started by adding your first technology."}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <Button onClick={handleAddNew}>
                <Plus className="mr-2 h-4 w-4" />
                Add Technology
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTechnologies.map((technology) => (
            <div
              key={technology.id}
              className="group relative p-6 bg-background border rounded-lg hover:bg-accent/50 transition-colors"
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <Badge variant={technology.isActive ? "default" : "secondary"}>
                  {technology.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              {/* Technology Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: technology.color }}
                >
                  {technology.icon.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold">{technology.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {technology.category}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {technology.description}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Updated {new Date(technology.updatedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(technology)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(technology)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Technology Form Dialog */}
      <TechnologyForm
        technology={editingTechnology}
        open={isFormOpen}
        onOpenChange={handleFormClose}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingTechnology}
        onOpenChange={() => setDeletingTechnology(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{" "}
              <span className="font-semibold">{deletingTechnology?.name}</span>{" "}
              technology.
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
