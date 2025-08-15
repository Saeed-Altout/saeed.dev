import { useState, useEffect } from "react";
import { Plus, Search, Code } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { TechnologyCard } from "@/components/cards/technology-card";
import { TechnologyForm } from "@/components/forms/technology-form";
import {
  useGetTechnologiesQuery,
  useCreateTechnologyMutation,
  useUpdateTechnologyMutation,
  useDeleteTechnologyMutation,
} from "@/hooks/technology";
import type {
  Technology,
  CreateTechnologyRequest,
  UpdateTechnologyRequest,
} from "@/types/technology";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function TechnologiesPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTechnology, setSelectedTechnology] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTechnology, setEditingTechnology] = useState<Technology | null>(
    null
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);

  const { data: technologies, isLoading: isLoadingTechnologies } =
    useGetTechnologiesQuery({
      q: debouncedSearchQuery,
      page: 1,
      limit: 100,
    });

  const createTechnologyMutation = useCreateTechnologyMutation();
  const updateTechnologyMutation = useUpdateTechnologyMutation();
  const deleteTechnologyMutation = useDeleteTechnologyMutation();

  const isLoading = isLoadingTechnologies;

  const noTechnologies =
    !isLoading &&
    (!technologies?.data.data || technologies.data.data.length === 0);

  const handleCreateTechnology = async (data: CreateTechnologyRequest) => {
    try {
      await createTechnologyMutation.mutateAsync(data);
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("Failed to create technology:", error);
    }
  };

  const handleEditTechnology = (technology: Technology) => {
    setEditingTechnology(technology);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTechnology = async (data: UpdateTechnologyRequest) => {
    if (!editingTechnology) return;

    try {
      await updateTechnologyMutation.mutateAsync({
        id: editingTechnology.id,
        request: data,
      });
      setIsEditDialogOpen(false);
      setEditingTechnology(null);
    } catch (error) {
      console.error("Failed to update technology:", error);
    }
  };

  const handleDeleteTechnology = async (id: string) => {
    try {
      await deleteTechnologyMutation.mutateAsync(id);
    } catch (error) {
      console.error("Failed to delete technology:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditDialogOpen(false);
    setEditingTechnology(null);
  };

  const handleCancelCreate = () => {
    setIsCreateDialogOpen(false);
  };

  // Get unique technology values for filtering
  const technologyValues = Array.from(
    new Set(technologies?.data.data?.map((tech) => tech.value) || [])
  ).filter(Boolean);

  return (
    <div className="space-y-6">
      <Heading
        title="Technologies"
        description="Manage and organize your technology stack."
      >
        <div className="flex items-center gap-2">
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Technology</DialogTitle>
                <DialogDescription>
                  Add a new technology to your stack.
                </DialogDescription>
              </DialogHeader>
              <TechnologyForm
                mode="create"
                // @ts-expect-error - TODO: fix this
                onSubmit={handleCreateTechnology}
                onCancel={handleCancelCreate}
                isLoading={createTechnologyMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>
      </Heading>

      <Separator />

      <div className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search technologies..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search technologies"
        />
      </div>

      <ScrollArea className="w-full overflow-x-auto">
        <div className="flex flex-row gap-2 py-4 px-1 whitespace-nowrap">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="h-6 w-16 rounded-full"
                aria-label="Loading technology filter"
              />
            ))
          ) : (
            <>
              <Badge
                variant={selectedTechnology === "all" ? "default" : "outline"}
                className="text-xs cursor-pointer"
                onClick={() => setSelectedTechnology("all")}
                tabIndex={0}
                role="button"
                aria-label="Show all technologies"
              >
                All
              </Badge>
              {technologyValues.map((technology) => (
                <Badge
                  key={technology}
                  variant={
                    selectedTechnology === technology ? "default" : "outline"
                  }
                  className="text-xs cursor-pointer"
                  onClick={() => setSelectedTechnology(technology)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Filter by ${technology}`}
                >
                  {technology}
                </Badge>
              ))}
            </>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, idx) => (
            <Skeleton key={idx} className="h-48 w-full rounded-lg" />
          ))
        ) : noTechnologies ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <Code
              className="mx-auto mb-4 h-12 w-12 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-lg font-medium">No technologies found</span>
            <span className="text-sm mt-1">
              Try adjusting your search or create a new technology.
            </span>
          </div>
        ) : (
          technologies?.data.data
            ?.filter(
              (tech) =>
                selectedTechnology === "all" ||
                tech.value === selectedTechnology
            )
            ?.map((technology) => (
              <TechnologyCard
                key={technology.id}
                technology={technology}
                onEdit={handleEditTechnology}
                onDelete={handleDeleteTechnology}
                isDeleting={deleteTechnologyMutation.isPending}
              />
            ))
        )}
      </div>

      {/* Edit Technology Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Technology</DialogTitle>
            <DialogDescription>
              Update the technology details.
            </DialogDescription>
          </DialogHeader>
          {editingTechnology && (
            <TechnologyForm
              mode="edit"
              technology={editingTechnology}
              onSubmit={handleUpdateTechnology}
              onCancel={handleCancelEdit}
              isLoading={updateTechnologyMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
