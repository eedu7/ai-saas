import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeadingProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;
}

export const Heading = ({ title, description, icon: Icon, iconColor, bgColor }: HeadingProps) => {
    return (
        <header className="mb-8 flex items-center gap-x-3 px-4 lg:px-8">
            <div className={cn("w-fit rounded-md p-2", bgColor)}>
                <Icon className={cn("size-10", iconColor)} />
            </div>
            <div>
                <h2 className="text-3xl font-bold">{title}</h2>
                <p className="text-muted-foreground text-sm">{description}</p>
            </div>
        </header>
    );
};
