import { Code, FolderOpen, TrendingUp } from "lucide-react";

import { useGetProjectsQuery, useGetTechnologiesQuery } from "@/hooks/project";
import { type Project, type Technology } from "@/types/project";
import { Heading } from "@/components/ui/heading";
import { StatsCard } from "@/components/stats-card";
import { Skeleton } from "@/components/ui/skeleton";

export function OverviewPage() {
  const { data: technologies, isLoading: isLoadingTechnologies } =
    useGetTechnologiesQuery();

  const { data: projects, isLoading: isLoadingProjects } = useGetProjectsQuery(
    {}
  );

  const isLoading: boolean = isLoadingTechnologies || isLoadingProjects;

  const technologiesList: Technology[] = technologies?.data ?? [];
  const projectsList: Project[] = projects?.data?.projects ?? [];

  const featuredProjects = projectsList.filter((project) => project.isFeatured);
  const technologiesCount = technologiesList.length;
  const projectsCount = projectsList.length;
  const featuredProjectsCount = featuredProjects.length;

  const stats = [
    {
      title: "Total Technologies",
      value: technologiesCount,
      description: `${technologiesCount} active`,
      icon: Code,
      href: "/dashboard/technologies",
    },
    {
      title: "Total Projects",
      value: projectsCount,
      description: `${projectsCount} active`,
      icon: FolderOpen,
      href: "/dashboard/projects",
    },
    {
      title: "Featured Projects",
      value: featuredProjectsCount,
      description: "Highlighted work",
      icon: TrendingUp,
      href: "/dashboard/projects",
    },
  ];

  return (
    <div className="space-y-6">
      <Heading
        title="Dashboard"
        description="Welcome to your portfolio dashboard. Here's an overview of your technologies and projects."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-24 w-full" />
            ))
          : stats.map((stat) => (
              <StatsCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                href={stat.href}
              />
            ))}
      </div>
    </div>
  );
}

OverviewPage.displayName = "OverviewPage";
