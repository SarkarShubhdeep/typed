import { Button } from "./button";
import { MoreHorizontal } from "lucide-react";

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
            className="flex flex-col justify-between flex-1 p-4 transition-all min-h-[160px] outline bg-card hover:bg-accent group relative cursor-pointer"
            key={key}
        >
            <p className="text-xs text-muted-foreground">{description}</p>
            <h3 className="font-semibold text-2xl">{title}</h3>
            <Button
                variant="outline"
                size="icon"
                className="rounded-full group-hover:flex hidden absolute top-2 right-2"
            >
                <MoreHorizontal />
            </Button>
        </div>
    );
}
