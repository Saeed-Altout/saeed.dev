import { Fragment, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, Link, useParams } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem as UIBreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";

import { DashboardProvider } from "@/providers/dashboard";
import { useGetProjectsQuery } from "@/hooks/project";

interface DashboardBreadcrumbItem {
  label: string;
  href: string;
  isCurrent: boolean;
}

function DashboardBreadcrumb() {
  const location = useLocation();
  const params = useParams();
  const { data: projectsData } = useGetProjectsQuery({});
  const [dynamicLabel, setDynamicLabel] = useState<string>("");

  const pathSegments = useMemo(
    () => location.pathname.split("/").filter(Boolean),
    [location.pathname]
  );

  const dashboardSegments = useMemo(
    () =>
      pathSegments[0] === "dashboard" ? pathSegments.slice(1) : pathSegments,
    [pathSegments]
  );

  const SEGMENT_LABELS: Record<string, string> = {
    "": "Dashboard",
    projects: "Projects",
    new: "New",
  };

  useEffect(() => {
    if (
      params.id &&
      params.id !== "new" &&
      dashboardSegments.includes("projects")
    ) {
      const project = projectsData?.data.projects?.find(
        (proj) => proj.id === params.id
      );
      setDynamicLabel(project?.name || "Project");
    } else if (params.id === "new") {
      setDynamicLabel("New");
    } else {
      setDynamicLabel("");
    }
  }, [params.id, dashboardSegments, projectsData]);

  const breadcrumbItems: DashboardBreadcrumbItem[] = useMemo(() => {
    const items: DashboardBreadcrumbItem[] = [
      {
        label: "Dashboard",
        href: "/dashboard",
        isCurrent: dashboardSegments.length === 0,
      },
    ];

    let accumulatedPath = "/dashboard";
    dashboardSegments.forEach((segment, idx) => {
      accumulatedPath += `/${segment}`;
      let label = SEGMENT_LABELS[segment] || segment;

      if (idx === dashboardSegments.length - 1 && params.id && dynamicLabel) {
        label = dynamicLabel;
      }

      items.push({
        label,
        href: accumulatedPath,
        isCurrent: idx === dashboardSegments.length - 1,
      });
    });

    return items;
  }, [dashboardSegments, params.id, dynamicLabel]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, idx) => (
          <Fragment key={item.href}>
            {idx > 0 && <BreadcrumbSeparator />}
            <UIBreadcrumbItem>
              {item.isCurrent ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </UIBreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

DashboardBreadcrumb.displayName = "DashboardBreadcrumb";

export function DashboardLayout() {
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
          <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </DashboardProvider>
  );
}

DashboardLayout.displayName = "DashboardLayout";
