import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    SearchIcon,
    PlusIcon,
    MoreHorizontal,
    Grid2X2,
    List,
} from "lucide-react";
import { ViewMode } from "../types/view";
import { TableHeaderRow } from "./documents/table-header-row";
import { Table } from "@tanstack/react-table";
import { Document } from "../types/document";

interface NavbarProps {
    view: ViewMode;
    onViewChange: (view: ViewMode) => void;
    tableInstance?: Table<Document> | null;
}

export default function Navbar({
    view,
    onViewChange,
    tableInstance,
}: NavbarProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between h-14 p-3 gap-4  bg-secondary/50 backdrop-blur-sm rounded-full max-w-6xl mx-auto border">
                <div className="flex items-center gap-2 text-xl font-semibold flex-1 ps-2">
                    All Writings
                    <div className="w-5 h-5 flex items-center justify-center bg-foreground text-xs text-background rounded-full">
                        4
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 bg-input rounded-full">
                        <Input
                            placeholder="Search"
                            className="border-none dark:bg-transparent
                        focus-visible:ring-0"
                        />
                        <Button variant="ghost" className="rounded-full">
                            <SearchIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex flex-1 justify-end text-muted-foreground gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                    >
                        <MoreHorizontal />
                    </Button>
                    <ThemeToggle />

                    {/* View toggle */}
                    <div className="flex items-center outline outline-border rounded-full">
                        <Button
                            variant={view === "grid" ? "default" : "ghost"}
                            size="icon"
                            className="rounded-full"
                            onClick={() => onViewChange("grid")}
                        >
                            <Grid2X2 className="w-4 h-4" />
                        </Button>
                        <Button
                            variant={view === "table" ? "default" : "ghost"}
                            size="icon"
                            className="rounded-full"
                            onClick={() => onViewChange("table")}
                        >
                            <List className="w-4 h-4" />
                        </Button>
                    </div>
                    <Button variant="default" className="rounded-full">
                        Add New
                        <PlusIcon className="w-4 h-4 " />
                    </Button>
                </div>
            </div>

            {/* Grid Header - slides in when grid view is active */}
            {view === "grid" && (
                <div className="bg-secondary max-w-6xl mx-auto rounded-md outline outline-border">
                    <div className="max-w-6xl mx-auto px-2 flex justify-end items-center h-12 gap-2">
                        <span className="text-xs text-muted-foreground">
                            Sort By
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                        >
                            Title
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                        >
                            Ascending
                        </Button>
                    </div>
                </div>
            )}

            {/* Table Header - slides in when table view is active */}
            {view === "table" && (
                <div className="bg-secondary max-w-6xl mx-auto  rounded-md outline outline-border">
                    <TableHeaderRow table={tableInstance || null} />
                </div>
            )}
        </div>
    );
}
