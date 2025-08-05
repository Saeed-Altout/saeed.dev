import { useNavigate } from "react-router-dom";
import { Code, FolderOpen, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useDashboardStore } from "../stores/dashboard-store";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { technologies, projects } = useDashboardStore();

  const activeTechnologies = technologies.filter((tech) => tech.isActive);
  const activeProjects = projects.filter((project) => project.isActive);
  const featuredProjects = projects.filter((project) => project.isFeatured);

  const stats = [
    {
      title: "Total Technologies",
      value: technologies.length,
      description: `${activeTechnologies.length} active`,
      icon: Code,
      href: "/dashboard/technologies",
    },
    {
      title: "Total Projects",
      value: projects.length,
      description: `${activeProjects.length} active`,
      icon: FolderOpen,
      href: "/dashboard/projects",
    },
    {
      title: "Featured Projects",
      value: featuredProjects.length,
      description: "Highlighted work",
      icon: TrendingUp,
      href: "/dashboard/projects",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your portfolio dashboard. Here's an overview of your
          technologies and projects.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => navigate(stat.href)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
