import React from "react";
import Image from "next/image";

interface EmptyProps {
    label: string;
    imageSrc: string;
}

export const Empty = ({ label, imageSrc }: EmptyProps) => {
    return (
        <div className="flex h-full flex-col items-center justify-center p-20">
            <div className="relative h-72 w-72">
                <Image
                    alt={label}
                    fill
                    src={imageSrc}
                />
            </div>
            <p className="text-muted-foreground text-center text-sm">{label}</p>
        </div>
    );
};
