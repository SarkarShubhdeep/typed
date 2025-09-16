"use client";

import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SequentialTypingText } from "@/components/sequential-typing-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthScreen from "./auth/page";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex h-screen mx-auto w-3/4 flex-col py-[60px]">
            {/* top nav */}
            <nav className="flex justify-between items-center">
                <Image
                    src="/typed-logo.svg"
                    alt="Logo"
                    width={100}
                    height={32}
                    className="invert dark:invert-0"
                />

                <div className="flex items-center gap-4">
                    <Button
                        variant="default"
                        onClick={() => {
                            router.push("/auth");
                        }}
                    >
                        Sign In
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            router.push("/auth");
                        }}
                    >
                        Create Account
                    </Button>
                </div>
            </nav>

            {/* main */}
            <main className="h-full bg-lime-500/0 py-[60px]">
                <div className="flex flex-col px-12 justify-center h-full">
                    <p className="text-[5rem] text-neutral-800/40 dark:text-neutral-100/40 font-medium font-sans leading-[1.2]">
                        It's about typing.
                    </p>
                    <p className="text-[5rem] text-neutral-800/40 dark:text-neutral-100/40 font-medium font-sans leading-[1.2]">
                        Without distractions.
                    </p>
                    <p className="text-[5rem] text-neutral-800/40 dark:text-neutral-100/40 font-medium font-sans leading-[1.2]">
                        That's all.
                    </p>
                </div>
            </main>

            {/* footer */}
            <footer className="flex justify-between items-center">
                <ModeToggle />
                <div className="flex items-center gap-4">
                    <p>
                        <span className="opacity-50">Developed by</span>{" "}
                        Shubhdeep Sarkar
                    </p>
                    <Avatar>
                        <AvatarImage src="https://github.com/sarkarshubhdeep.png" />
                        <AvatarFallback>SS</AvatarFallback>
                    </Avatar>
                </div>
            </footer>
            {/* guides */}
            {/* <div className="w-screen h-[1px] bg-lime-500 absolute top-[60px] left-0 opacity-50"></div>
            <div className="w-screen h-[1px] bg-lime-500 absolute bottom-[60px] left-0 opacity-50"></div> */}

            {/* mode toggle */}
            <div className="absolute top-4 right-4"></div>
        </div>
    );
}
