import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, FolderOpen } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { ProjectCard } from "@/components/project-card";
import { useGetProjectsQuery, useGetTechnologiesQuery } from "@/lib/dashboard";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function ProjectsPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTechnology, setSelectedTechnology] = useState<string>("all");

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);

  const { data: technologies, isLoading: isLoadingTechnologies } =
    useGetTechnologiesQuery();
  const { data: projects, isLoading: isLoadingProjects } = useGetProjectsQuery({
    q: debouncedSearchQuery,
    technology: selectedTechnology === "all" ? "" : selectedTechnology,
  });

  const isLoading = isLoadingTechnologies || isLoadingProjects;

  const noProjects =
    !isLoading &&
    (!projects?.data.projects || projects.data.projects.length === 0);

  return (
    <div className="space-y-6">
      <Heading title="Projects" description="Manage and explore your projects.">
        <Button onClick={() => navigate("/dashboard/projects/new")}>
          <Plus className="h-4 w-4" />
          Create New
        </Button>
      </Heading>
      <Separator />

      <div className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search projects"
        />
      </div>

      <ScrollArea className="w-full overflow-x-auto">
        <div className="flex flex-row gap-2 py-4 px-1 whitespace-nowrap">
          {isLoading ? (
            Array.from({ length: 14 }).map((_, idx) => (
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
              {Array.from(
                new Set((technologies?.data ?? []).filter(Boolean))
              ).map((technology) => (
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, idx) => (
            <Skeleton key={idx} className="h-64 w-full rounded-lg" />
          ))
        ) : noProjects ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <FolderOpen
              className="mx-auto mb-4 h-12 w-12 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-lg font-medium">No projects found</span>
            <span className="text-sm mt-1">
              Try adjusting your search or create a new project.
            </span>
          </div>
        ) : (
          projects?.data.projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  );
}
