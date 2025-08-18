import { useState, useEffect } from "react";
import { Plus, Briefcase } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Search } from "@/components/ui/search";
import { Grid } from "@/components/ui/grid";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  CvExperienceCard,
  CvExperienceCardSkeleton,
} from "@/components/cards/cv-experience-card";
import { CVExperienceModal } from "@/components/dialog/cv-experience-modal";

import {
  useGetExperienceQuery,
  useDeleteExperienceMutation,
} from "@/hooks/cv-builder";
import { useModalStore } from "@/stores/modal";
import type { Experience } from "@/types/cv-builder";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function ExperiencePage() {
  const { onOpen } = useModalStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null
  );

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);

  const { mutate: deleteExperience } = useDeleteExperienceMutation();
  const { data: experience, isLoading } = useGetExperienceQuery({
    q: debouncedSearchQuery,
  });

  const handleEdit = (exp: Experience) => {
    setEditingExperience(exp);
    onOpen("cv-experience");
  };

  return (
    <div className="space-y-6">
      <Heading
        title="Work Experience"
        description="Manage your professional work experience and achievements"
      >
        <Button onClick={() => onOpen("cv-experience")} disabled={isLoading}>
          <Plus className="size-4" />
          Add Work Experience
        </Button>
      </Heading>
      <Separator />
      <Search
        placeholder="Search experience..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Grid>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <CvExperienceCardSkeleton key={idx} />
          ))
        ) : !experience?.data?.data?.length ? (
          <EmptyState
            title="No work experience found"
            description="Start by adding your first work experience to showcase your professional journey."
            icon={Briefcase}
          />
        ) : (
          experience?.data?.data?.map((exp) => (
            <CvExperienceCard
              key={exp.id}
              experience={exp}
              handleEditExperience={handleEdit}
              handleDeleteExperience={deleteExperience}
            />
          ))
        )}
      </Grid>

      <CVExperienceModal initialData={editingExperience} />

      {!!experience?.data?.data?.length &&
        experience?.data?.data?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Experience Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You have {experience.data.data.length} work experience entries.
                Keep your CV up to date by regularly updating your experience
                details.
              </p>
            </CardContent>
          </Card>
        )}
    </div>
  );
}
