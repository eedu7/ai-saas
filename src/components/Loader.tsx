import React from "react";
import Image from "next/image";

export const Loader = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-y-4">
            <div className="relative h-10 w-10 animate-pulse duration-200 ease-in-out">
                <Image
                    alt="Logo"
                    fill
                    src="/icon/logo.svg"
                />
            </div>
            <p className="text-muted-foreground text-sm">AI SaaS is thinking...</p>
        </div>
    );
};
