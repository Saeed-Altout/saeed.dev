import { create } from "zustand";

export type ModalAction = "auth" | "settings" | null;

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
