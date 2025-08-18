import { useState, useEffect } from "react";
import { Plus, Award } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Search } from "@/components/ui/search";
import { Grid } from "@/components/ui/grid";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  CvAwardCard,
  CvAwardCardSkeleton,
} from "@/components/cards/cv-award-card";
import { CVAwardModal } from "@/components/dialog/cv-award-modal";

import { useGetAwardsQuery, useDeleteAwardMutation } from "@/hooks/cv-builder";
import { useModalStore } from "@/stores/modal";
import type { Award as AwardType } from "@/types/cv-builder";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function AwardsPage() {
  const { onOpen } = useModalStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingAward, setEditingAward] = useState<AwardType | null>(null);

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);

  const { mutate: deleteAward } = useDeleteAwardMutation();
  const { data: awards, isLoading } = useGetAwardsQuery({
    q: debouncedSearchQuery,
  });

  const handleEdit = (award: AwardType) => {
    setEditingAward(award);
    onOpen("cv-award");
  };

  return (
    <div className="space-y-6">
      <Heading
        title="Awards & Recognition"
        description="Manage your achievements and professional recognition"
      >
        <Button onClick={() => onOpen("cv-award")} disabled={isLoading}>
          <Plus className="size-4" />
          Add Award
        </Button>
      </Heading>

      <Separator />

      <Search
        placeholder="Search awards..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Grid>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <CvAwardCardSkeleton key={idx} />
          ))
        ) : !awards?.data?.data?.length ? (
          <EmptyState
            title="No awards found"
            description="Start by adding your first award to showcase your achievements and recognition."
            icon={Award}
          />
        ) : (
          awards?.data?.data?.map((award) => (
            <CvAwardCard
              key={award.id}
              award={award}
              handleEditAward={handleEdit}
              handleDeleteAward={deleteAward}
            />
          ))
        )}
      </Grid>

      <CVAwardModal initialData={editingAward} />

      {!!awards?.data?.data?.length && awards?.data?.data?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Awards Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You have {awards.data.data?.length} award records. Keep your CV up
              to date by regularly updating your award details.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

AwardsPage.displayName = "AwardsPage";
