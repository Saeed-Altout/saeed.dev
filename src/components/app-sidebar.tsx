"use client";

import * as React from "react";
import { Code, Folders, Frame } from "lucide-react";

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
import { Logo } from "@/lib";

const data = {
  user: {
    name: "Flexify",
    email: "flexify@example.com",
    avatar: "/avatars/flexify.jpg",
  },
  navMain: [
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: Folders,
      isActive: true,
      items: [
        {
          title: "All Projects",
          url: "/dashboard/projects",
        },
        {
          title: "Create Project",
          url: "/dashboard/projects/new",
        },
        {
          title: "Project Templates",
          url: "/dashboard/projects/templates",
        },
      ],
    },
    {
      title: "Technologies",
      url: "/dashboard/technologies",
      icon: Code,
      items: [
        {
          title: "All Technologies",
          url: "/dashboard/technologies",
        },
        {
          title: "Create Technology",
          url: "/dashboard/technologies/new",
        },
        {
          title: "Technology Templates",
          url: "/dashboard/technologies/templates",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Project 1",
      url: "/dashboard/projects/1",
      icon: Frame,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
