"use client";

import * as React from "react";
import { Folders, Home, Tag } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/common/logo";
import { useGetProjectsQuery } from "@/hooks/project";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: projects, isLoading } = useGetProjectsQuery({});
  const data = {
    user: {
      name: "Flexify",
      email: "flexify@example.com",
      avatar: "/avatars/flexify.jpg",
    },
    navMain: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: Home,
        isActive: true,
      },
      {
        title: "Projects",
        url: "/dashboard/projects",
        icon: Folders,
      },
      {
        title: "Technologies",
        url: "/dashboard/technologies",
        icon: Tag,
      },
    ],
    projects: projects?.data.projects?.map((project) => ({
      name: project.name,
      url: `/dashboard/projects/${project.id}`,
      icon: Folders,
    })),
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects ?? []} isLoading={isLoading} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
