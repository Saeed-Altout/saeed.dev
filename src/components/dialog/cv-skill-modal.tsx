import { useMemo } from "react";

import { Modal } from "@/components/ui/modal";
import { SkillForm } from "@/components/forms/skill-form";

import { useModalStore } from "@/stores/modal";
import type { Skill } from "@/types/cv-builder";

export function CVSkillModal({
  initialData,
}: React.ComponentProps<"div"> & {
  initialData: Skill | null;
}) {
  const { isOpen, action, onClose } = useModalStore();

  const isOpenModal = useMemo(
    () => isOpen && action === "cv-skill",
    [isOpen, action]
  );

  const title = useMemo(() => {
    return initialData ? "Update Your Skill" : "Add Your Skill";
  }, [initialData]);

  const description = useMemo(() => {
    return initialData
      ? "Update your skill details and ensure your CV is always up to date."
      : "Provide your skill details to get started with your CV.";
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
      <SkillForm initialData={initialData} />
    </Modal>
  );
}
