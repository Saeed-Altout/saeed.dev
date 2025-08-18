import { useMemo } from "react";
import { Plus, User } from "lucide-react";

import {
  CvPersonalInfoCard,
  CvPersonalInfoCardSkeleton,
} from "@/components/cards/cv-personal-info-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { EmptyState } from "@/components/ui/empty-state";
import { useGetPersonalInfoQuery } from "@/hooks/cv-builder";
import { PersonalInformationModal } from "@/components/dialog/cv-personal-information-modal";

import { useModalStore } from "@/stores/modal";

export function PersonalInfoPage() {
  const { onOpen } = useModalStore();
  const { data: personalInfo, isLoading } = useGetPersonalInfoQuery();

  const buttonText = useMemo(() => {
    return personalInfo?.data ? "Update" : "Add";
  }, [personalInfo]);

  return (
    <section className="space-y-6">
      <Heading
        title="Personal Information"
        description="Manage your personal details and contact information for your CV"
      >
        <Button onClick={() => onOpen("cv-personal-info")}>
          <Plus className="size-4" />
          {buttonText} Personal Info
        </Button>
      </Heading>

      <Separator />

      {isLoading ? (
        <CvPersonalInfoCardSkeleton />
      ) : !personalInfo?.data ? (
        <EmptyState
          title="No personal information found"
          description="Please add your personal information to get started"
          icon={User}
        />
      ) : (
        <CvPersonalInfoCard personalInfo={personalInfo.data} />
      )}

      <PersonalInformationModal initialData={personalInfo?.data || null} />
    </section>
  );
}

PersonalInfoPage.displayName = "PersonalInfoPage";
