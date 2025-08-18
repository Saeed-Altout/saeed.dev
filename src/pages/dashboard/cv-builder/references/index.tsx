import { useState, useEffect } from "react";
import { Plus, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Search } from "@/components/ui/search";
import { Grid } from "@/components/ui/grid";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  CvReferenceCard,
  CvReferenceCardSkeleton,
} from "@/components/cards/cv-reference-card";
import { CvReferenceModal } from "@/components/dialog/cv-reference-modal";

import {
  useGetReferencesQuery,
  useDeleteReferenceMutation,
} from "@/hooks/cv-builder";
import { useModalStore } from "@/stores/modal";
import type { Reference } from "@/types/cv-builder";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function ReferencesPage() {
  const { onOpen } = useModalStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingReference, setEditingReference] = useState<Reference | null>(
    null
  );

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);

  const { mutate: deleteReference } = useDeleteReferenceMutation();
  const { data: references, isLoading } = useGetReferencesQuery({
    q: debouncedSearchQuery,
  });

  const handleEdit = (reference: Reference) => {
    setEditingReference(reference);
    onOpen("cv-reference");
  };

  return (
    <div className="space-y-6">
      <Heading
        title="References"
        description="Manage your professional references and contacts"
      >
        <Button onClick={() => onOpen("cv-reference")} disabled={isLoading}>
          <Plus className="size-4" />
          Add Reference
        </Button>
      </Heading>

      <Separator />

      <Search
        placeholder="Search references..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Grid>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <CvReferenceCardSkeleton key={idx} />
          ))
        ) : !references?.data?.data?.length ? (
          <EmptyState
            title="No references found"
            description="Start by adding your first reference to strengthen your CV with professional contacts."
            icon={User}
          />
        ) : (
          references?.data?.data?.map((reference) => (
            <CvReferenceCard
              key={reference.id}
              reference={reference}
              handleEditReference={handleEdit}
              handleDeleteReference={deleteReference}
            />
          ))
        )}
      </Grid>

      <CvReferenceModal initialData={editingReference} />

      {!!references?.data?.data?.length &&
        references?.data?.data?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">References Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You have {references.data.data?.length} reference records. Keep
                your CV up to date by regularly updating your reference details.
              </p>
            </CardContent>
          </Card>
        )}
    </div>
  );
}

ReferencesPage.displayName = "ReferencesPage";
