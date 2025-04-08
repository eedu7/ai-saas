import { CodeIcon, ImageIcon, LucideIcon, MessageSquareIcon, MusicIcon, VideoIcon } from "lucide-react";

export const tools: {
    label: string;
    icon: LucideIcon;
    color: string;
    bgColor: string;
    href: string;
    disable: boolean;
}[] = [
    {
        label: "Conversation",
        icon: MessageSquareIcon,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/conversation",
        disable: false,
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        href: "/music",
        disable: true,
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
        href: "/image",
        disable: false,
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
        href: "/video",
        disable: true,
    },
    {
        label: "Code Generation",
        icon: CodeIcon,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        href: "/code",
        disable: false,
    },
];
