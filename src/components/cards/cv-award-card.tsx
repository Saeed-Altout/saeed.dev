import { Edit, Trash2, Calendar, Award, Trophy } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModalStore } from "@/stores/modal";
import type { Award as AwardType } from "@/types/cv-builder";

export function CvAwardCard({
  award,
  handleEditAward,
  handleDeleteAward,
}: React.ComponentProps<"div"> & {
  award: AwardType;
  handleEditAward: (award: AwardType) => void;
  handleDeleteAward: (id: string) => void;
}) {
  const { onOpen } = useModalStore();

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Button size="icon" variant="outline">
            <Trophy className="size-5" />
          </Button>
        </div>
        <CardTitle className="text-lg">{award.name}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Award className="h-4 w-4" />
          <span>{award.issuer}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {/* Category */}

        {/* Location and Date */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="size-4" />
            <span>{format(new Date(award.date), "MMM yyyy")}</span>
          </div>
        </div>

        {/* Description */}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {
              handleEditAward(award);
              onOpen("cv-award");
            }}
          >
            <Edit className="size-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => handleDeleteAward(award.id)}
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export const CvAwardCardSkeleton = () => (
  <Card className="h-full">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <Skeleton className="size-10 rounded-md" />
        <div className="h-6 w-16 bg-muted rounded animate-pulse" />
      </div>
      <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
      <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
    </CardHeader>
    <CardContent className="pt-0 space-y-4">
      <div className="h-4 w-full bg-muted rounded animate-pulse" />
      <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
      <div className="h-4 w-full bg-muted rounded animate-pulse" />
      <div className="flex gap-2 pt-2">
        <div className="h-8 flex-1 bg-muted rounded animate-pulse" />
        <div className="h-8 flex-1 bg-muted rounded animate-pulse" />
      </div>
    </CardContent>
  </Card>
);
