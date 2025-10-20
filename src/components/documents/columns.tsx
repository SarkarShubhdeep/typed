"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Document } from "../../types/document";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export const columns: ColumnDef<Document>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="hover:bg-transparent "
                    style={{ padding: 0 }}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("title")}</div>;
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            return (
                <div className="text-muted-foreground max-w-[200px] truncate text-sm">
                    {row.getValue("description")}
                </div>
            );
        },
    },
    {
        accessorKey: "lastModified",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="hover:bg-transparent"
                    style={{ padding: 0 }}
                >
                    Last Modified
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-muted-foreground text-sm">
                    {formatDate(row.getValue("lastModified"))}
                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="hover:bg-transparent"
                    style={{ padding: 0 }}
                >
                    Created
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-muted-foreground text-sm">
                    {formatDate(row.getValue("createdAt"))}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const document = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-muted-foreground/10"
                        >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={8}>
                        <DropdownMenuItem
                            onClick={() => console.log("Rename", document.id)}
                        >
                            Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => console.log("Share", document.id)}
                        >
                            Share
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                console.log("Duplicate", document.id)
                            }
                        >
                            Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => console.log("Delete", document.id)}
                        >
                            Move to Trash
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
