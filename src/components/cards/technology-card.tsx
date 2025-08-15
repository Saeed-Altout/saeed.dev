import { useState } from "react";
import { Edit2, Trash2, Code, Calendar, Hash } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";

import type { Technology } from "@/types/technology";

interface TechnologyCardProps {
  technology: Technology;
  onEdit: (technology: Technology) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function TechnologyCard({
  technology,
  onEdit,
  onDelete,
  isDeleting = false,
}: TechnologyCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEdit = () => {
    onEdit(technology);
  };

  const handleDelete = () => {
    onDelete(technology.id);
    setIsDeleteDialogOpen(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="group hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-foreground truncate">
              {technology.label}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              <Hash className="inline h-3 w-3 mr-1" />
              {technology.value}
            </CardDescription>
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleEdit}
              className="h-8 w-8"
              aria-label={`Edit ${technology.label}`}
            >
              <Edit2 className="h-4 w-4" />
            </Button>

            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  aria-label={`Delete ${technology.label}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Technology</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{technology.label}"? This
                    action cannot be undone.
                    {technology.value && (
                      <span className="block mt-2 text-sm">
                        <strong>Value:</strong> {technology.value}
                      </span>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-destructive  text-white hover:bg-destructive/90"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Code className="h-3 w-3" />
            <span>Technology ID: {technology.id.slice(0, 8)}...</span>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Created: {formatDate(technology.created_at)}</span>
            </div>

            {technology.updated_at !== technology.created_at && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Updated: {formatDate(technology.updated_at)}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

TechnologyCard.displayName = "TechnologyCard";
