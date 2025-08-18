import {
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Building2,
  GraduationCap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModalStore } from "@/stores/modal";
import type { Education } from "@/types/cv-builder";

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

export function CvEducationCard({
  education,
  handleEditEducation,
  handleDeleteEducation,
}: React.ComponentProps<"div"> & {
  education: Education;
  handleEditEducation: (education: Education) => void;
  handleDeleteEducation: (id: string) => void;
}) {
  const { onOpen } = useModalStore();

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Button size="icon" variant="outline">
            <GraduationCap className="size-5" />
          </Button>
          {education.is_current && (
            <Badge variant="default" className="text-xs">
              Current
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg">{education.degree}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="h-4 w-4" />
          <span>{education.institution}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {education.location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{education.location}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {formatDate(education.start_date)} -{" "}
            {education.is_current ? "Present" : formatDate(education.end_date!)}
          </span>
        </div>

        {education.description && (
          <div>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {education.description}
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {
              handleEditEducation(education);
              onOpen("cv-education");
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => handleDeleteEducation(education.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export const CvEducationCardSkeleton = () => (
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
