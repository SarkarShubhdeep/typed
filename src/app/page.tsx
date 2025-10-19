import Image from "next/image";
import Navbar from "../components/navbar";
import DocumentCard from "../components/ui/document-card";
import CustomScrollbar from "../components/custom-scrollbar";
import { ProgressiveBlur } from "../components/ui/progressive-blur";

export default function Home() {
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
                <Navbar />
            </header>

            {/* Scrollable Content Area */}
            <main className="flex-1 overflow-auto pt-[174px] pb-24">
                {/* Content goes here */}
                <div className="grid grid-cols-3 max-w-6xl mx-auto gap-2  px-4">
                    {Array.from({ length: 13 }, (_, i) => (
                        <DocumentCard
                            key={i}
                            title={`Document ${i + 1}`}
                            description={`Description for document ${i + 1}`}
                        />
                    ))}
                </div>
            </main>

            {/* Custom Scrollbar */}
            <CustomScrollbar />
        </div>
    );
}
