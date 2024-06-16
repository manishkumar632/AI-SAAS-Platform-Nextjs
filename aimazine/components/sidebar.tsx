"use client";
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { CodeIcon, ImageIcon, LayoutDashboard, MessageSquare, MusicIcon, Settings, VideoIcon } from "lucide-react";
const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "600", "700"]
});

const routes = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        color: "text-sky-500"
    },
    {
        label: "Conversations",
        href: "/conversation",
        icon: MessageSquare,
        color: "text-violet-500"
    },
    {
        label: "Image Generation",
        href: "/image",
        icon: ImageIcon,
        color: "text-pink-700"
    },
    {
        label: "Video Generation",
        href: "/video",
        icon: VideoIcon,
        color: "text-orange-700"
    },
    {
        label: "Music Generation",
        href: "/music",
        icon: MusicIcon,
        color: "text-emerald-700"
    },
    {
        label: "Code Generation",
        href: "/code",
        icon: CodeIcon,
        color: "text-green-700"
    },
    {
        label: "Setting",
        href: "/setting",
        icon: Settings,
    },
];
const Sidebar = () => {
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link
                    href="/dashboard"
                    className="flex items-center pl-3 mb-14"
                >
                    <div className="relative w-8 h-8 mr-4">
                        <Image fill src="/logo.png" alt="alt" />
                    </div>
                    <h1
                        className={cn(
                            montserrat.className,
                            "text-2xl font-bold"
                        )}
                    >
                        Aimazine
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link href={route.href} key={route.href} className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition">
                            <div className="flex items-center flex-1">
                                <route.icon
                                    className={cn("h-5 w-5 mr-3", route.color)}
                                />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
