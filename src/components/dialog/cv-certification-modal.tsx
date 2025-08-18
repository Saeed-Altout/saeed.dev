import { useMemo } from "react";

import { Modal } from "@/components/ui/modal";
import { CertificationForm } from "@/components/forms/certification-form";

import { useModalStore } from "@/stores/modal";
import type { Certification } from "@/types/cv-builder";

export function CVCertificationModal({
  initialData,
}: React.ComponentProps<"div"> & {
  initialData: Certification | null;
}) {
  const { isOpen, action, onClose } = useModalStore();

  const isOpenModal = useMemo(
    () => isOpen && action === "cv-certification",
    [isOpen, action]
  );

  const title = useMemo(() => {
    return initialData ? "Update Certification" : "Add Certification";
  }, [initialData]);

  const description = useMemo(() => {
    return initialData
      ? "Update your certification details and ensure your CV is always up to date."
      : "Provide your certification details to showcase your professional credentials.";
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
      <CertificationForm initialData={initialData} />
    </Modal>
  );
}
