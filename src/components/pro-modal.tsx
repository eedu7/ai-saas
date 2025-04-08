"use client";
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProModel } from "@/hooks/use-pro-model";
import { Badge } from "@/components/ui/badge";
import { tools } from "@/constants/tools";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckIcon, LockIcon, ZapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export const ProModal = () => {
    const { isOpen, onClose } = useProModel();

    const [loading, setLoading] = React.useState(false);

    const onSubscribe = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");
            window.location.href = response.data.url;
        } catch (error) {
            console.log("[Subscribe]", error);
        } finally {
            setLoading(false);
        }
    };

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
                    <div className="space-y-2 pt-2 text-center font-medium text-zinc-900">
                        {tools.map(({ label, icon: Icon, color, bgColor, href, disable }) => (
                            <Card
                                key={label}
                                className={cn(
                                    "flex cursor-pointer flex-row items-center justify-between border-black/5 p-3" +
                                        " transition",
                                    !disable && "hover:shadow-md",
                                    disable && "text-muted-foreground cursor-default bg-gray-100",
                                )}
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("w-fit rounded-md p-2", bgColor)}>
                                        <Icon className={cn("size-6", color)} />
                                    </div>
                                    <div className="text-sm font-semibold">{label}</div>
                                </div>
                                {disable ? (
                                    <LockIcon className="size-5" />
                                ) : (
                                    <CheckIcon className="text-primary size-5" />
                                )}
                            </Card>
                        ))}
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={onSubscribe}
                        variant="premium"
                        disabled={loading}
                        className="w-full cursor-pointer"
                    >
                        Upgrade
                        <ZapIcon className="ml-2 size-4 fill-white" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
