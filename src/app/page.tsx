import Image from "next/image";
import Navbar from "../components/navbar";

export default function Home() {
    return (
        <div className="h-screen flex flex-col">
            {/* Fixed Header */}
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
            <main className="flex-1 overflow-auto pt-[120px]">
                {/* Content goes here */}
                <div className="p-4 space-y-4">
                    {Array.from({ length: 50 }, (_, i) => (
                        <div key={i} className="p-4 border rounded-lg bg-card">
                            <h3 className="font-semibold">Item {i + 1}</h3>
                            <p className="text-sm text-muted-foreground">
                                This is placeholder content to test scrolling
                                functionality.
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
