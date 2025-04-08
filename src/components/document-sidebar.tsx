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
    LockIcon,
    LucideIcon,
    MessageSquareIcon,
    MusicIcon,
    SettingsIcon,
    VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { FreeCounter } from "@/components/free-counter";

const montserrat = Montserrat({
    weight: "600",
    subsets: ["latin"],
});

const routes: { label: string; icon: LucideIcon; href: string; color?: string; disable: boolean }[] = [
    {
        label: "Dashboard",
        icon: LayoutDashboardIcon,
        href: "/dashboard",
        color: "text-sky-500",
        disable: false,
    },
    {
        label: "Conversation",
        icon: MessageSquareIcon,
        href: "/conversation",
        color: "text-violet-500",
        disable: false,
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
        disable: false,
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-500",
        disable: true,
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        href: "/music",
        color: "text-emerald-500",
        disable: true,
    },
    {
        label: "Code Generation",
        icon: CodeIcon,
        href: "/code",
        color: "text-green-500",
        disable: false,
    },
    {
        label: "Settings",
        icon: SettingsIcon,
        href: "/settings",
        disable: false,
    },
];

export const DocumentSidebar = ({ apiLimitCount = 0 }: { apiLimitCount: number }) => {
    const pathName = usePathname();

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
                    {routes.map(({ label, icon: Icon, href, color, disable }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={(e) => {
                                if (disable) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            }}
                            className={cn(
                                "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm" +
                                    " font-medium transition",
                                !disable && "hover:bg-white/10 hover:text-white",
                                pathName === href ? "bg-white/10 text-white" : "text-zinc-400",
                                disable && "text-muted-foreground bg-white-100 cursor-default",
                            )}
                        >
                            <div className="flex flex-1 items-center">
                                <Icon className={cn("mr-3 size-5", color)} />
                                {label}
                            </div>
                            {disable && (
                                <div>
                                    <LockIcon className="size-5" />
                                </div>
                            )}
                        </Link>
                    ))}
                </nav>
            </div>
            <FreeCounter apiLimitCount={apiLimitCount} />
        </aside>
    );
};
