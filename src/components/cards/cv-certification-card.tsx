import { Edit, Trash2, Calendar, Award, BookOpen } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModalStore } from "@/stores/modal";
import type { Certification } from "@/types/cv-builder";

export function CvCertificationCard({
  certification,
  handleEditCertification,
  handleDeleteCertification,
}: React.ComponentProps<"div"> & {
  certification: Certification;
  handleEditCertification: (certification: Certification) => void;
  handleDeleteCertification: (id: string) => void;
}) {
  const { onOpen } = useModalStore();

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <Button size="icon" variant="outline">
          <BookOpen className="size-5" />
        </Button>

        <CardTitle className="text-lg">{certification.name}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Award className="size-4" />
          <span>{certification.issuer}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {certification.credential_id && (
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline" className="text-xs">
              ID: {certification.credential_id}
            </Badge>
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="size-4" />
            <span>
              {format(new Date(certification.issue_date), "MMM yyyy")}
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {
              handleEditCertification(certification);
              onOpen("cv-certification");
            }}
          >
            <Edit className="size-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => handleDeleteCertification(certification.id)}
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export const CvCertificationCardSkeleton = () => (
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
