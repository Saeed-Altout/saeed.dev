import { useMemo } from "react";

import { Modal } from "@/components/ui/modal";
import { AwardForm } from "@/components/forms/award-form";

import { useModalStore } from "@/stores/modal";
import type { Award as AwardType } from "@/types/cv-builder";

export function CVAwardModal({
  initialData,
}: React.ComponentProps<"div"> & {
  initialData: AwardType | null;
}) {
  const { isOpen, action, onClose } = useModalStore();

  const isOpenModal = useMemo(
    () => isOpen && action === "cv-award",
    [isOpen, action]
  );

  const title = useMemo(() => {
    return initialData ? "Update Award" : "Add Award";
  }, [initialData]);

  const description = useMemo(() => {
    return initialData
      ? "Update your award details and ensure your CV is always up to date."
      : "Provide your award details to showcase your achievements and recognition.";
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
      <AwardForm initialData={initialData} />
    </Modal>
  );
}
