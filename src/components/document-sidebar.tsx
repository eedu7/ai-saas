"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";

const montserrat = Montserrat({
    weight: "600",
    subsets: ["latin"],
});

export const DocumentSidebar = () => {
    return (
        <div className="flex h-full flex-col space-y-4 bg-[#111827] py-4 text-white">
            <div className="flex-1 px-3 py-2">
                <Link
                    href="/dashboard"
                    className="mb-14 flex items-center pl-3"
                >
                    <div className="relative mr-4 size-8">
                        <Image
                            fill
                            alt="Logo"
                            src="/icon/logo.svg"
                        />
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>AI SaaS</h1>
                </Link>
            </div>
        </div>
    );
};
