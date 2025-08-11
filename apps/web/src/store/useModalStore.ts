import { create } from "zustand";

export type ModalType = "draw" | "resign" | "game_over" | "match_making" | null;

interface ModalStoreI {
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}
export const useModalStore = create<ModalStoreI>((set) => ({
  activeModal: null,
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
}));
