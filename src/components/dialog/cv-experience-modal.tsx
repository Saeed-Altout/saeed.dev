import { useMemo } from "react";

import { Modal } from "@/components/ui/modal";
import { ExperienceForm } from "@/components/forms/experience-form";

import { useModalStore } from "@/stores/modal";
import type { Experience } from "@/types/cv-builder";

export function CVExperienceModal({
  initialData,
}: React.ComponentProps<"div"> & {
  initialData: Experience | null;
}) {
  const { isOpen, action, onClose } = useModalStore();

  const isOpenModal = useMemo(
    () => isOpen && action === "cv-experience",
    [isOpen, action]
  );

  const title = useMemo(() => {
    return initialData ? "Update Work Experience" : "Add Work Experience";
  }, [initialData]);

  const description = useMemo(() => {
    return initialData
      ? "Update your work experience details and ensure your CV is always up to date."
      : "Provide your work experience details to showcase your professional journey.";
  }, [initialData]);

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpenModal}
      onClose={onClose}
      variant="sheet"
      className="min-w-2xl"
    >
      <ExperienceForm initialData={initialData} />
    </Modal>
  );
}
