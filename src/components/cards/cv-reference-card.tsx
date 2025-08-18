import { Edit, Trash2, User, Building2, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModalStore } from "@/stores/modal";
import type { Reference } from "@/types/cv-builder";

export function CvReferenceCard({
  reference,
  handleEditReference,
  handleDeleteReference,
}: React.ComponentProps<"div"> & {
  reference: Reference;
  handleEditReference: (reference: Reference) => void;
  handleDeleteReference: (id: string) => void;
}) {
  const { onOpen } = useModalStore();

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Button size="icon" variant="outline">
            <User className="size-5" />
          </Button>
        </div>
        <CardTitle className="text-lg">{reference.name}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="h-4 w-4" />
          <span>
            {reference.position} at {reference.company}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {reference.email && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{reference.email}</span>
          </div>
        )}

        {reference.phone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{reference.phone}</span>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {
              handleEditReference(reference);
              onOpen("cv-reference");
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => handleDeleteReference(reference.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export const CvReferenceCardSkeleton = () => (
  <Card className="h-full">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <Skeleton className="size-10 rounded-md" />
      </div>
      <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
      <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
    </CardHeader>
    <CardContent className="pt-0 space-y-4">
      <div className="h-4 w-full bg-muted rounded animate-pulse" />
      <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
      <div className="flex gap-2 pt-2">
        <div className="h-8 flex-1 bg-muted rounded animate-pulse" />
        <div className="h-8 flex-1 bg-muted rounded animate-pulse" />
      </div>
    </CardContent>
  </Card>
);
