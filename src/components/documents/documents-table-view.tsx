"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { staticDocuments } from "@/data/documents";
import { Table } from "@tanstack/react-table";
import { Document } from "../../types/document";

interface DocumentsTableViewProps {
    onTableReady?: (table: Table<Document>) => void;
}

export function DocumentsTableView({ onTableReady }: DocumentsTableViewProps) {
    return (
        <div className="w-full">
            <DataTable columns={columns} data={staticDocuments} onTableReady={onTableReady} />
        </div>
    );
}
