import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useLocation, Link, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { DashboardProvider, useGetProjectsQuery } from "@/lib/dashboard";

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent: boolean;
}

// Dynamic breadcrumb component
function DashboardBreadcrumb() {
  const location = useLocation();
  const params = useParams();
  const { data: projects } = useGetProjectsQuery({});
  const [dynamicTitle, setDynamicTitle] = useState<string>("");

  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Remove 'dashboard' from the beginning if it exists
  const segments =
    pathSegments[0] === "dashboard" ? pathSegments.slice(1) : pathSegments;

  // Define breadcrumb mappings
  const breadcrumbMap: Record<string, string> = {
    "": "Dashboard",
    projects: "Projects",
    new: "New",
  };

  // Handle dynamic titles for project/technology details
  useEffect(() => {
    if (params.id && params.id !== "new") {
      if (segments.includes("projects")) {
        const project = projects?.data.projects?.find(
          (project) => project.id === params.id
        );
        if (project) {
          setDynamicTitle(project.name);
        } else {
          setDynamicTitle("Project");
        }
      }
    } else if (params.id === "new") {
      setDynamicTitle("New");
    } else {
      setDynamicTitle("");
    }
  }, [params.id, segments, projects]);

  // Generate breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [];
  let currentPath = "/dashboard";

  // Always add Dashboard as the first item
  breadcrumbItems.push({
    label: "Dashboard",
    href: "/dashboard",
    isCurrent: segments.length === 0,
  });

  // Add other segments
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    let label = breadcrumbMap[segment] || segment;

    // Handle dynamic titles for the last segment if it's an ID
    if (index === segments.length - 1 && params.id && dynamicTitle) {
      label = dynamicTitle;
    }

    const isCurrent = index === segments.length - 1;

    breadcrumbItems.push({
      label,
      href: currentPath,
      isCurrent,
    });
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <Fragment key={item.href}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.isCurrent ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function DashboardLayout() {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-x-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <DashboardBreadcrumb />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </DashboardProvider>
  );
}
