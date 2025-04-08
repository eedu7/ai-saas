"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProModel } from "@/hooks/use-pro-model";

export const ProModal = () => {
    const { isOpen, onClose } = useProModel();

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex flex-col items-center justify-center gap-y-4 pb-2">
                        Upgrade to AI SaaS
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
