import { create } from "zustand";

interface useProModelInterface {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useProModel = create<useProModelInterface>((set) => ({
    isOpen: true, // TODO: change back to false
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
