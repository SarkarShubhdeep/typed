"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    Table,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onTableReady?: (table: Table<TData>) => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onTableReady,
}: DataTableProps<TData, TValue>) {
    const router = useRouter();
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    // Expose table instance to parent
    React.useEffect(() => {
        if (onTableReady) {
            onTableReady(table);
        }
    }, [table, onTableReady]);

    return (
        <div>
            {/* Table Rows */}
            <div className="space-y-0">
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => {
                        const documentId = (row.original as { id: string }).id;
                        return (
                            <div
                                key={row.id}
                                className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] gap-2 px-4 py-3 border-b hover:bg-accent cursor-pointer transition-colors"
                                onClick={() => router.push(`/document/${documentId}`)}
                            >
                                {row.getVisibleCells().map((cell, index) => (
                                    <div 
                                        key={cell.id} 
                                        className="flex items-center"
                                        onClick={(e) => {
                                            // Prevent navigation when clicking on the actions column
                                            if (index === row.getVisibleCells().length - 1) {
                                                e.stopPropagation();
                                            }
                                        }}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </div>
                                ))}
                            </div>
                        );
                    })
                ) : (
                    <div className="h-24 flex items-center justify-center text-muted-foreground">
                        No documents found.
                    </div>
                )}
            </div>
        </div>
    );
}
