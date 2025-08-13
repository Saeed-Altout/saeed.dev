import { useState, useEffect } from "react";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";

import { ProjectCard } from "@/components/temp/project-card";
import {
  useGetPublicProjectsQuery,
  useGetTechnologiesQuery,
} from "@/hooks/project";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function ProjectsSection({
  searchable = false,
  featured = false,
}: {
  searchable?: boolean;
  featured?: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTechnology, setSelectedTechnology] = useState<string>("all");

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);

  const { data: technologies, isLoading: isLoadingTechnologies } =
    useGetTechnologiesQuery();
  const { data: projects, isLoading: isLoadingProjects } =
    useGetPublicProjectsQuery({
      q: searchable ? debouncedSearchQuery : "",
      technology: selectedTechnology === "all" ? "" : selectedTechnology,
      isFeatured: featured ? true : "",
    });

  const isLoading = isLoadingTechnologies || isLoadingProjects;

  const noProjects =
    !isLoading &&
    (!projects?.data.projects || projects.data.projects.length === 0);

  return (
    <>
      {searchable && (
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
      )}

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
          <EmptyState
            title="No projects found"
            description="Sorry, we couldn't find any projects matching your search."
          />
        ) : (
          projects?.data.projects?.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              redirectTo={`/projects/${project.id}`}
            />
          ))
        )}
      </div>
    </>
  );
}

ProjectsSection.displayName = "ProjectsSection";
