import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetTechnologiesForProjectsQuery } from "@/hooks/technology";

interface TechnologyFilterProps {
  selectedTechnology: string;
  onTechnologyChange: (technology: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function TechnologyFilter({
  selectedTechnology,
  onTechnologyChange,
  isLoading = false,
  className = "",
}: TechnologyFilterProps) {
  const { data: technologies, isLoading: isLoadingTechnologies } =
    useGetTechnologiesForProjectsQuery();

  const isLoadingFilter = isLoading || isLoadingTechnologies;

  return (
    <ScrollArea className={`w-full overflow-x-auto ${className}`}>
      <div className="flex flex-row gap-2 py-4 px-1 whitespace-nowrap">
        {isLoadingFilter ? (
          Array.from({ length: 8 }).map((_, idx) => (
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
              onClick={() => onTechnologyChange("all")}
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
                onClick={() => onTechnologyChange(technology)}
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
  );
}

TechnologyFilter.displayName = "TechnologyFilter";
