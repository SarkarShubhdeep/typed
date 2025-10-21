"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/navbar";
import DocumentCard from "../components/ui/document-card";
import CustomScrollbar from "../components/custom-scrollbar";
import { ProgressiveBlur } from "../components/ui/progressive-blur";
import { DocumentsTableView } from "../components/documents/documents-table-view";
import { ViewMode } from "../types/view";
import { Table } from "@tanstack/react-table";
import { Document } from "../types/document";
import { staticDocuments } from "../data/documents";

export default function Home() {
    const [view, setView] = useState<ViewMode>("grid");
    const [tableInstance, setTableInstance] = useState<Table<Document> | null>(
        null
    );
    return (
        <div className="h-screen flex flex-col">
            {/* Fixed Header */}
            <ProgressiveBlur position="top" height="174px" />
            <header className="fixed top-0 left-0 right-0 z-50 px-4">
                {/* Logo Section */}
                <div className="flex items-center justify-center h-24 ">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={122}
                        height={59}
                        className="dark:invert"
                    />
                </div>

                {/* Navigation Bar */}
                <Navbar
                    view={view}
                    onViewChange={setView}
                    tableInstance={tableInstance}
                />
            </header>

            {/* Scrollable Content Area */}
            <main className="flex-1 overflow-auto pt-[230px] pb-24">
                {/* Content goes here */}
                {view === "grid" ? (
                    <div className="grid grid-cols-3 max-w-6xl mx-auto gap-2  px-4">
                        {staticDocuments.map((doc) => (
                            <DocumentCard
                                key={doc.id}
                                id={doc.id}
                                title={doc.title}
                                description={doc.description}
                                createdAt={doc.createdAt}
                                lastModified={doc.lastModified}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="max-w-6xl mx-auto">
                        <DocumentsTableView onTableReady={setTableInstance} />
                    </div>
                )}
            </main>

            {/* Custom Scrollbar */}
            <CustomScrollbar />
        </div>
    );
}
