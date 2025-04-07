"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";
import {
    CodeIcon,
    ImageIcon,
    LayoutDashboardIcon,
    LucideIcon,
    MessageSquareIcon,
    MusicIcon,
    SettingsIcon,
    VideoIcon,
} from "lucide-react";

const montserrat = Montserrat({
    weight: "600",
    subsets: ["latin"],
});

const routes: { label: string; icon: LucideIcon; href: string; color?: string }[] = [
    {
        label: "Dashboard",
        icon: LayoutDashboardIcon,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Conversation",
        icon: MessageSquareIcon,
        href: "/conversation",
        color: "text-violet-500",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-500",
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        href: "/music",
        color: "text-emerald-500",
    },
    {
        label: "Code Generation",
        icon: CodeIcon,
        href: "/code",
        color: "text-green-500",
    },
    {
        label: "Settings",
        icon: SettingsIcon,
        href: "/settings",
    },
];

export const DocumentSidebar = () => {
    return (
        <aside className="flex h-full flex-col space-y-4 bg-[#111827] py-4 text-white">
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
                <nav className="space-y-1">
                    {routes.map(({ label, icon: Icon, href, color }) => (
                        <Link
                            key={href}
                            href={href}
                            className="group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-white/10 hover:text-white"
                        >
                            <div className="flex flex-1 items-center">
                                <Icon className={cn("mr-3 size-5", color)} />
                                {label}
                            </div>
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
};
