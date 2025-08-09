import { create } from "zustand";

type NewBranchState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewBranch = create<NewBranchState>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
