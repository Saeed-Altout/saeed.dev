import { useMemo } from "react";

import { Modal } from "@/components/ui/modal";
import { InterestForm } from "@/components/forms/interest-form";

import { useModalStore } from "@/stores/modal";
import type { Interest } from "@/types/cv-builder";

export function CvInterestModal({
  initialData,
}: React.ComponentProps<"div"> & {
  initialData: Interest | null;
}) {
  const { isOpen, action, onClose } = useModalStore();

  const isOpenModal = useMemo(
    () => isOpen && action === "cv-interest",
    [isOpen, action]
  );

  const title = useMemo(() => {
    return initialData ? "Update Interest" : "Add Interest";
  }, [initialData]);

  const description = useMemo(() => {
    return initialData
      ? "Update your interest details and ensure your CV is always up to date."
      : "Add your interests to showcase your personality and hobbies.";
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
      <InterestForm initialData={initialData} />
    </Modal>
  );
}
