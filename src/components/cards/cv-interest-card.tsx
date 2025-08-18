import { Edit, Trash2, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModalStore } from "@/stores/modal";
import type { Interest } from "@/types/cv-builder";

export function CvInterestCard({
  interest,
  handleEditInterest,
  handleDeleteInterest,
}: React.ComponentProps<"div"> & {
  interest: Interest;
  handleEditInterest: (interest: Interest) => void;
  handleDeleteInterest: (id: string) => void;
}) {
  const { onOpen } = useModalStore();

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Button size="icon" variant="outline">
            <Heart className="size-5" />
          </Button>
        </div>
        <CardTitle className="text-lg">{interest.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {
              handleEditInterest(interest);
              onOpen("cv-interest");
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => handleDeleteInterest(interest.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export const CvInterestCardSkeleton = () => (
  <Card className="h-full">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <Skeleton className="size-10 rounded-md" />
      </div>
      <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
    </CardHeader>
    <CardContent className="pt-0 space-y-4">
      <div className="flex gap-2 pt-2">
        <div className="h-8 flex-1 bg-muted rounded animate-pulse" />
        <div className="h-8 flex-1 bg-muted rounded animate-pulse" />
      </div>
    </CardContent>
  </Card>
);
