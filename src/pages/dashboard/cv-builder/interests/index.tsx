import { useState, useEffect } from "react";
import { Plus, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Search } from "@/components/ui/search";
import { Grid } from "@/components/ui/grid";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  CvInterestCard,
  CvInterestCardSkeleton,
} from "@/components/cards/cv-interest-card";
import { CvInterestModal } from "@/components/dialog/cv-interest-modal";

import {
  useGetInterestsQuery,
  useDeleteInterestMutation,
} from "@/hooks/cv-builder";
import { useModalStore } from "@/stores/modal";
import type { Interest } from "@/types/cv-builder";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function InterestsPage() {
  const { onOpen } = useModalStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingInterest, setEditingInterest] = useState<Interest | null>(null);

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);

  const { mutate: deleteInterest } = useDeleteInterestMutation();
  const { data: interests, isLoading } = useGetInterestsQuery({
    q: debouncedSearchQuery,
  });

  const handleEdit = (interest: Interest) => {
    setEditingInterest(interest);
    onOpen("cv-interest");
  };

  return (
    <div className="space-y-6">
      <Heading
        title="Interests"
        description="Manage your personal interests and hobbies"
      >
        <Button onClick={() => onOpen("cv-interest")} disabled={isLoading}>
          <Plus className="size-4" />
          Add Interest
        </Button>
      </Heading>

      <Separator />

      <Search
        placeholder="Search interests..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Grid>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <CvInterestCardSkeleton key={idx} />
          ))
        ) : !interests?.data?.data?.length ? (
          <EmptyState
            title="No interests found"
            description="Start by adding your first interest to showcase your personality and hobbies."
            icon={Heart}
          />
        ) : (
          interests?.data?.data?.map((interest) => (
            <CvInterestCard
              key={interest.id}
              interest={interest}
              handleEditInterest={handleEdit}
              handleDeleteInterest={deleteInterest}
            />
          ))
        )}
      </Grid>

      <CvInterestModal initialData={editingInterest} />

      {!!interests?.data?.data?.length && interests?.data?.data?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Interests Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You have {interests.data.data?.length} interest records. Keep your
              CV up to date by regularly updating your interests.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

InterestsPage.displayName = "InterestsPage";
