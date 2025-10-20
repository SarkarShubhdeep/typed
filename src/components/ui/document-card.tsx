import { Button } from "./button";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "./dropdown-menu";

export default function DocumentCard({
    title,
    description,
    key,
}: {
    title: string;
    description: string;
    key: number;
}) {
    return (
        <div
            className="flex flex-col justify-between flex-1 p-4 transition-all min-h-[160px]  bg-slate-100 dark:bg-card hover:bg-accent outline-2 outline-transparent outline-offset-2 hover:outline-offset-0 hover:outline-muted-foreground group relative cursor-pointer"
            key={key}
        >
            <span className="text-xs text-muted-foreground">
                Saved 20 mins ago
            </span>
            <div className="flex flex-col justify-between gap-2">
                <h3 className="font-semibold text-2xl">{title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                    {description}
                </p>
            </div>

            <div className="items-center flex-col gap-2 absolute top-2 right-2">
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
