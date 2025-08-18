import { useMemo } from "react";

import { Modal } from "@/components/ui/modal";
import { PersonalInfoForm } from "@/components/forms/personal-info-form";

import { useModalStore } from "@/stores/modal";
import type { PersonalInfo } from "@/types/cv-builder";

export function PersonalInformationModal({
  initialData,
}: React.ComponentProps<"div"> & {
  initialData: PersonalInfo | null;
}) {
  const { isOpen, action, onClose } = useModalStore();

  const isOpenModal = useMemo(
    () => isOpen && action === "cv-personal-info",
    [isOpen, action]
  );

  const title = useMemo(() => {
    return initialData
      ? "Update Your Personal Information"
      : "Add Your Personal Information";
  }, [initialData]);

  const description = useMemo(() => {
    return initialData
      ? "Update your personal details and ensure your CV is always up to date."
      : "Provide your personal details to get started with your CV.";
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
      <PersonalInfoForm initialData={initialData} />
    </Modal>
  );
}
