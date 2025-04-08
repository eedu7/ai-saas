import { create } from "zustand";

interface useProModelInterface {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useProModel = create<useProModelInterface>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
