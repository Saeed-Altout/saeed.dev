import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, FolderOpen } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Heading2 } from "@/components/ui/heading";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { ProjectCard } from "@/components/project-card";
import {
  useGetPublicProjectsQuery,
  useGetTechnologiesQuery,
} from "@/lib/dashboard";
import { Button } from "@/components/ui/button";

export function HomeProjectsSection() {
  const navigate = useNavigate();

  const [selectedTechnology, setSelectedTechnology] = useState<string>("all");

  const { data: technologies, isLoading: isLoadingTechnologies } =
    useGetTechnologiesQuery();
  const { data: projects, isLoading: isLoadingProjects } =
    useGetPublicProjectsQuery({
      technology: selectedTechnology === "all" ? "" : selectedTechnology,
      isFeatured: true,
      limit: 3,
    });

  const isLoading = isLoadingTechnologies || isLoadingProjects;

  const noProjects =
    !isLoading &&
    (!projects?.data.projects || projects.data.projects.length === 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-20">
      <Heading2
        title="Featured Projects"
        description="Explore some of the projects I've worked on, showcasing a diverse range of technologies, problem-solving approaches, and real-world applications."
      />
      <ScrollArea className="w-full overflow-x-auto">
        <div className="flex flex-row justify-center gap-2 py-4 px-1 whitespace-nowrap">
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

      <div className="flex justify-center">
        <Button onClick={() => navigate("/projects")}>
          View All Projects
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

HomeProjectsSection.displayName = "HomeProjectsSection";
