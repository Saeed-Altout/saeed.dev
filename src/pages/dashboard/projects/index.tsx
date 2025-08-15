import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Plus, Search, FolderOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";

import { ProjectCard } from "@/components/temp/project-card";
import { TechnologyFilter } from "@/components/common/technology-filter";
import { useGetProjectsQuery } from "@/hooks/project";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function ProjectsPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTechnology, setSelectedTechnology] = useState<string>("all");

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);

  const { data: projects, isLoading: isLoadingProjects } = useGetProjectsQuery({
    q: debouncedSearchQuery,
    technology: selectedTechnology === "all" ? "" : selectedTechnology,
  });

  const isLoading = isLoadingProjects;

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

      <TechnologyFilter
        selectedTechnology={selectedTechnology}
        onTechnologyChange={setSelectedTechnology}
        isLoading={isLoading}
      />
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
