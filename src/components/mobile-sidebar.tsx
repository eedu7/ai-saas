import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DocumentSidebar } from "@/components/document-sidebar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                >
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent
                side="left"
                className="p-0"
            >
                <VisuallyHidden>
                    <SheetTitle>AI SaaS</SheetTitle>
                </VisuallyHidden>
                <DocumentSidebar />
            </SheetContent>
        </Sheet>
    );
};
