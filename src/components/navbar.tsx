import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    SearchIcon,
    PlusIcon,
    MoreHorizontal,
    FilterIcon,
    Grid2X2,
} from "lucide-react";

export default function Navbar() {
    return (
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
                <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreHorizontal />
                </Button>
                <ThemeToggle />
                <Button variant="outline" size="icon" className="rounded-full">
                    <FilterIcon className="w-4 h-4 " />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                    <Grid2X2 className="w-4 h-4 " />
                </Button>
                <Button variant="default" className="rounded-full">
                    Add New
                    <PlusIcon className="w-4 h-4 " />
                </Button>
            </div>
        </div>
    );
}
