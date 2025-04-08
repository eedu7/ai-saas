"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProModel } from "@/hooks/use-pro-model";
import { Badge } from "@/components/ui/badge";

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
                        <div className="flex items-center gap-x-2 py-1 font-bold">
                            Upgrade to AI SaaS
                            <Badge
                                variant="premium"
                                className="py-1 text-sm uppercase"
                            >
                                pro
                            </Badge>
                        </div>
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
