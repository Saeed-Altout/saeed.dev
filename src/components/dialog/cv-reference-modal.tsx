import { useMemo } from "react";

import { Modal } from "@/components/ui/modal";
import { ReferenceForm } from "@/components/forms/reference-form";

import { useModalStore } from "@/stores/modal";
import type { Reference } from "@/types/cv-builder";

export function CvReferenceModal({
  initialData,
}: React.ComponentProps<"div"> & {
  initialData: Reference | null;
}) {
  const { isOpen, action, onClose } = useModalStore();

  const isOpenModal = useMemo(
    () => isOpen && action === "cv-reference",
    [isOpen, action]
  );

  const title = useMemo(() => {
    return initialData ? "Update Reference" : "Add Reference";
  }, [initialData]);

  const description = useMemo(() => {
    return initialData
      ? "Update your reference details and ensure your CV is always up to date."
      : "Add professional references to strengthen your CV.";
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
      <ReferenceForm initialData={initialData} />
    </Modal>
  );
}
