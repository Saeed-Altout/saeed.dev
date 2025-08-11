import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
import { EmptyState } from "@/components/ui/empty-state";

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
    <section className="section">
      <div className="container flex flex-col gap-6">
        <Heading2
          title="Featured Projects"
          description="Explore some of the projects I've worked on, showcasing a diverse range of technologies, problem-solving approaches, and real-world applications."
        />

        <ScrollArea className="w-full overflow-x-auto">
          <div className="flex flex-row justify-center gap-2 py-4 px-1 whitespace-nowrap">
            {isLoading ? (
              Array.from({ length: 14 }).map((_, idx) => (
                <Skeleton key={idx} className="h-6 w-16 rounded-full" />
              ))
            ) : (
              <>
                <Badge
                  variant={selectedTechnology === "all" ? "default" : "outline"}
                  className="text-xs cursor-pointer"
                  onClick={() => setSelectedTechnology("all")}
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
              description="Try adjusting your search or create a new project."
            />
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
    </section>
  );
}

HomeProjectsSection.displayName = "HomeProjectsSection";
