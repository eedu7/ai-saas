"use client";

import React from "react";
import { ArrowRightIcon, CodeIcon, ImageIcon, LucideIcon, MessageSquareIcon, MusicIcon, VideoIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const tools: { label: string; icon: LucideIcon; color: string; bgColor: string; href: string }[] = [
    {
        label: "Conversation",
        icon: MessageSquareIcon,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/conversation",
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        href: "/music",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
        href: "/image",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
        href: "/video",
    },
    {
        label: "Code Generation",
        icon: CodeIcon,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        href: "/code",
    },
];

export default function DashboardPage() {
    const router = useRouter();
    return (
        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-center text-2xl font-bold md:text-4xl">Explore the power of AI</h2>
                <p className="text-muted-foreground text-center text-sm font-light md:text-lg">
                    Chat with the smartest AI - Experience the power of AI
                </p>
            </div>
            <nav className="space-y-4 px-4 md:px-20 lg:px-32">
                {tools.map(({ label, icon: Icon, color, bgColor, href }) => (
                    <Card
                        onClick={() => router.push(href)}
                        key={href}
                        className="flex cursor-pointer flex-row items-center justify-between border-black/5 p-4 transition hover:shadow-md"
                    >
                        <div className="flex items-center gap-x-4">
                            <div className={cn("w-fit rounded-md p-2", bgColor)}>
                                <Icon className={cn("size-8", color)} />
                            </div>
                            <div className="font-semibold">{label}</div>
                        </div>
                        <ArrowRightIcon className="size-5" />
                    </Card>
                ))}
            </nav>
        </div>
    );
}
