"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "./dropdown-menu";

// Helper function to format dates
const formatDate = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 1) return "Just now";
    if (diffInMins < 60)
        return `${diffInMins} min${diffInMins > 1 ? "s" : ""} ago`;
    if (diffInHours < 24)
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    if (diffInDays < 7)
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
};

interface DocumentCardProps {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    lastModified: Date;
}

export default function DocumentCard({
    id,
    title,
    description,
    lastModified,
}: DocumentCardProps) {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/document/${id}`);
    };

    return (
        <div
            className="flex flex-col justify-between flex-1 p-4 transition-all min-h-[200px]  bg-slate-100 dark:bg-card hover:bg-accent outline-2 outline-transparent outline-offset-2 hover:outline-offset-0 hover:outline-muted-foreground group relative cursor-pointer"
            key={id}
            onClick={handleCardClick}
        >
            <span className="text-xs text-muted-foreground">
                Saved {formatDate(lastModified)}
            </span>
            <div className="flex flex-col justify-between gap-2">
                <h3 className="font-semibold text-2xl">{title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                    {description}
                </p>
            </div>

            <div 
                className="items-center flex-col gap-2 absolute top-2 right-2"
                onClick={(e) => e.stopPropagation()}
            >
                {/* menu button */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-muted-foreground/10"
                        >
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={8}>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Move to Trash</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
