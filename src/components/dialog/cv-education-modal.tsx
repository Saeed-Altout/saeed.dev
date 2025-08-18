import { useMemo } from "react";

import { Modal } from "@/components/ui/modal";
import { EducationForm } from "@/components/forms/education-form";

import { useModalStore } from "@/stores/modal";
import type { Education } from "@/types/cv-builder";

export function CVEducationModal({
  initialData,
}: React.ComponentProps<"div"> & {
  initialData: Education | null;
}) {
  const { isOpen, action, onClose } = useModalStore();

  const isOpenModal = useMemo(
    () => isOpen && action === "cv-education",
    [isOpen, action]
  );

  const title = useMemo(() => {
    return initialData ? "Update Education" : "Add Education";
  }, [initialData]);

  const description = useMemo(() => {
    return initialData
      ? "Update your education details and ensure your CV is always up to date."
      : "Provide your education details to showcase your academic background.";
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
      <EducationForm initialData={initialData} />
    </Modal>
  );
}
