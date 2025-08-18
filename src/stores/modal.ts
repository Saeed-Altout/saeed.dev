import { create } from "zustand";

export type ModalAction =
  | "auth"
  | "settings"
  | "cv-personal-info"
  | "cv-skill"
  | "cv-experience"
  | "cv-education"
  | "cv-certification"
  | "cv-award"
  | "cv-interest"
  | "cv-reference"
  | null;

type ModalStore = {
  isOpen: boolean;
  action: ModalAction;
  onOpen: (action: ModalAction) => void;
  onClose: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  action: null,
  onOpen: (action: ModalAction) => set({ isOpen: true, action }),
  onClose: () => set({ isOpen: false, action: null }),
}));
