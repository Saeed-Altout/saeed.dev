import { FolderOpen } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetTechnologiesQuery } from "@/lib/dashboard";

export default function TechnologiesPage() {
  const { data: technologies, isLoading } = useGetTechnologiesQuery();

  return (
    <div className="space-y-6">
      <Heading
        title="Technologies"
        description="Manage and explore your technologies."
      />
      <Separator />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, idx) => (
            <Skeleton key={idx} className="h-20 w-full rounded-lg" />
          ))
        ) : !technologies?.data || technologies.data.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <FolderOpen
              className="mx-auto mb-4 h-12 w-12 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-lg font-medium">No technologies found</span>
            <span className="text-sm mt-1">
              Try adjusting your search or create a new technology.
            </span>
          </div>
        ) : (
          technologies?.data.map((technology) => (
            <Card key={technology}>
              <CardContent className="font-semibold">{technology}</CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
