"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { Document } from "../../types/document";

interface TableHeaderRowProps {
    table: Table<Document> | null;
}

export function TableHeaderRow({ table }: TableHeaderRowProps) {
    const titleColumn = table?.getColumn("title");
    const lastModifiedColumn = table?.getColumn("lastModified");
    const createdColumn = table?.getColumn("createdAt");

    return (
        <div className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] gap-2 px-4 h-12 text-sm font-medium text-muted-foreground max-w-6xl mx-auto">
            <div className="flex items-center">
                <Button
                    variant="ghost"
                    className="hover:bg-transparent"
                    style={{ padding: 0 }}
                    onClick={() =>
                        titleColumn?.toggleSorting(
                            titleColumn.getIsSorted() === "asc"
                        )
                    }
                    disabled={!table}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
            <div className="flex items-center">Description</div>
            <div className="flex items-center">
                <Button
                    variant="ghost"
                    className="hover:bg-transparent"
                    style={{ padding: 0 }}
                    onClick={() =>
                        lastModifiedColumn?.toggleSorting(
                            lastModifiedColumn.getIsSorted() === "asc"
                        )
                    }
                    disabled={!table}
                >
                    Last Modified
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
            <div className="flex items-center">
                <Button
                    variant="ghost"
                    className="hover:bg-transparent"
                    style={{ padding: 0 }}
                    onClick={() =>
                        createdColumn?.toggleSorting(
                            createdColumn.getIsSorted() === "asc"
                        )
                    }
                    disabled={!table}
                >
                    Created
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
            <div className="w-10"></div>
        </div>
    );
}
