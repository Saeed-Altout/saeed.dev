import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Trash2, RotateCcw, Search, Clock, AlertTriangle } from "lucide-react";

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
import type { TrashItem } from "../types";

export function TrashList() {
  const { trash, restoreFromTrash, permanentlyDelete, cleanupExpiredTrash } =
    useDashboardStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingItem, setDeletingItem] = useState<TrashItem | undefined>();

  // Clean up expired trash on component mount
  useEffect(() => {
    cleanupExpiredTrash();
  }, [cleanupExpiredTrash]);

  const filteredTrash = trash.filter(
    (item) =>
      item.data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.data.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRestore = (item: TrashItem) => {
    restoreFromTrash(item.id);
    toast.success(`${item.type} restored successfully`);
  };

  const handleDelete = (item: TrashItem) => {
    setDeletingItem(item);
  };

  const confirmDelete = () => {
    if (deletingItem) {
      permanentlyDelete(deletingItem.id);
      toast.success(`${deletingItem.type} permanently deleted`);
      setDeletingItem(undefined);
    }
  };

  const getTimeUntilExpiry = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ${hours} hour${
        hours > 1 ? "s" : ""
      }`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      return "Less than 1 hour";
    }
  };

  const isExpiringSoon = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days <= 1;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Trash</h2>
          <p className="text-muted-foreground">
            Items in trash will be automatically deleted after 7 days.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={cleanupExpiredTrash}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clean Expired
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search trashed items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Trash Items */}
      {filteredTrash.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-muted-foreground">
            <Trash2 className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-sm font-semibold">No items in trash</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {searchTerm
              ? "Try adjusting your search terms."
              : "Deleted items will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTrash.map((item) => (
            <div
              key={item.id}
              className="group relative bg-background border rounded-lg overflow-hidden hover:bg-accent/50 transition-colors"
            >
              <div className="p-6">
                {/* Item Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-muted">
                    {item.type === "technology" && "💻"}
                    {item.type === "project" && "📁"}
                    {item.type === "category" && "🏷️"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold line-clamp-1">
                        {item.data.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.data.description}
                    </p>
                  </div>
                </div>

                {/* Expiry Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Expires in {getTimeUntilExpiry(item.expiresAt)}</span>
                    {isExpiringSoon(item.expiresAt) && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Expiring Soon
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Deleted {new Date(item.deletedAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRestore(item)}
                    className="gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Restore
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item)}
                    className="text-destructive hover:text-destructive gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Permanently
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingItem}
        onOpenChange={() => setDeletingItem(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Permanently?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{" "}
              <span className="font-semibold">{deletingItem?.data.name}</span>{" "}
              {deletingItem?.type}. This item cannot be restored.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
