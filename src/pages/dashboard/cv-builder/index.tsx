import { useState } from "react";

import { FileText } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Search } from "@/components/ui/search";
import { Grid } from "@/components/ui/grid";
import { EmptyState } from "@/components/ui/empty-state";
import {
  CvSectionCard,
  CvSectionCardSkeleton,
} from "@/components/cards/cv-section-card";

import {
  useGetCompleteCVQuery,
  useUpdateCVSectionMutation,
} from "@/hooks/cv-builder";

export function CVBuilderPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { mutate: updateCVSection, isPending } = useUpdateCVSectionMutation();
  const { data: completeCV, isLoading } = useGetCompleteCVQuery();

  const onCheckedChange = (name: string, is_active: boolean) => {
    updateCVSection({
      name,
      request: { is_active },
    });
  };

  return (
    <section className="space-y-6">
      <Heading
        title="CV Builder"
        description="Build and manage your professional CV with our comprehensive builder. Track your progress and ensure all sections are complete."
      />
      <Separator />
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search CV sections..."
      />
      <Grid>
        {isLoading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <CvSectionCardSkeleton key={idx} />
          ))
        ) : completeCV?.data.sections.length === 0 ? (
          <EmptyState
            title="No CV sections found"
            description="Try adjusting your search query."
            icon={FileText}
          />
        ) : (
          completeCV?.data.sections.map((section, index) => (
            <CvSectionCard
              key={index}
              cvSection={section}
              isLoading={isPending || isLoading}
              onCheckedChange={(checked) =>
                onCheckedChange(section.name, checked)
              }
            />
          ))
        )}
      </Grid>
    </section>
  );
}
