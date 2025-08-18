import { useState, useEffect } from "react";
import { Plus, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Search } from "@/components/ui/search";
import { Grid } from "@/components/ui/grid";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  CvEducationCard,
  CvEducationCardSkeleton,
} from "@/components/cards/cv-education-card";
import { CVEducationModal } from "@/components/dialog/cv-education-modal";

import {
  useGetEducationQuery,
  useDeleteEducationMutation,
} from "@/hooks/cv-builder";
import { useModalStore } from "@/stores/modal";
import type { Education } from "@/types/cv-builder";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function EducationPage() {
  const { onOpen } = useModalStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null
  );

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);

  const { mutate: deleteEducation } = useDeleteEducationMutation();
  const { data: education, isLoading } = useGetEducationQuery({
    q: debouncedSearchQuery,
  });

  const handleEdit = (edu: Education) => {
    setEditingEducation(edu);
    onOpen("cv-education");
  };

  return (
    <div className="space-y-6">
      <Heading
        title="Education"
        description="Manage your academic background and qualifications"
      >
        <Button onClick={() => onOpen("cv-education")} disabled={isLoading}>
          <Plus className="size-4" />
          Add Education
        </Button>
      </Heading>

      <Separator />

      <Search
        placeholder="Search education..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Grid>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <CvEducationCardSkeleton key={idx} />
          ))
        ) : !education?.data?.data.length ? (
          <EmptyState
            title="No education records found"
            description="Start by adding your first education record to showcase your academic background."
            icon={GraduationCap}
          />
        ) : (
          education?.data?.data.map((edu) => (
            <CvEducationCard
              key={edu.id}
              education={edu}
              handleEditEducation={handleEdit}
              handleDeleteEducation={deleteEducation}
            />
          ))
        )}
      </Grid>

      <CVEducationModal initialData={editingEducation} />

      {!!education?.data?.data.length && education?.data?.data.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Education Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You have {education.data.data.length} education records. Keep your
              CV up to date by regularly updating your education details.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

EducationPage.displayName = "EducationPage";
