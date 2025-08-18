import { useState, useEffect } from "react";
import { Plus, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Search } from "@/components/ui/search";
import { Grid } from "@/components/ui/grid";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  CvCertificationCard,
  CvCertificationCardSkeleton,
} from "@/components/cards/cv-certification-card";
import { CVCertificationModal } from "@/components/dialog/cv-certification-modal";

import {
  useGetCertificationsQuery,
  useDeleteCertificationMutation,
} from "@/hooks/cv-builder";
import { useModalStore } from "@/stores/modal";
import type { Certification } from "@/types/cv-builder";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function CertificationsPage() {
  const { onOpen } = useModalStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingCertification, setEditingCertification] =
    useState<Certification | null>(null);

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);

  const { mutate: deleteCertification } = useDeleteCertificationMutation();
  const { data: certifications, isLoading } = useGetCertificationsQuery({
    q: debouncedSearchQuery,
  });

  const handleEdit = (cert: Certification) => {
    setEditingCertification(cert);
    onOpen("cv-certification");
  };

  return (
    <div className="space-y-6">
      <Heading
        title="Certifications"
        description="Manage your professional certifications and credentials"
      >
        <Button onClick={() => onOpen("cv-certification")} disabled={isLoading}>
          <Plus className="size-4" />
          Add Certification
        </Button>
      </Heading>

      <Separator />

      <Search
        placeholder="Search certifications..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Grid>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <CvCertificationCardSkeleton key={idx} />
          ))
        ) : !certifications?.data?.data?.length ? (
          <EmptyState
            title="No certifications found"
            description="Start by adding your first certification to showcase your professional credentials."
            icon={BookOpen}
          />
        ) : (
          certifications?.data?.data?.map((cert) => (
            <CvCertificationCard
              key={cert.id}
              certification={cert}
              handleEditCertification={handleEdit}
              handleDeleteCertification={deleteCertification}
            />
          ))
        )}
      </Grid>

      <CVCertificationModal initialData={editingCertification} />

      {!!certifications?.data?.data?.length &&
        certifications?.data?.data?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Certification Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You have {certifications.data.data?.length} certification
                records. Keep your CV up to date by regularly updating your
                certification details.
              </p>
            </CardContent>
          </Card>
        )}
    </div>
  );
}

CertificationsPage.displayName = "CertificationsPage";
