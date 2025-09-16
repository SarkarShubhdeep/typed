"use client";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SequentialTypingText } from "@/components/sequential-typing-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Tabs,
    TabsContents,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/animate-ui/primitives/radix/tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AuthScreen() {
    const [value, setValue] = useState("login");
    return (
        <div className="flex h-screen mx-auto w-3/4 flex-col py-[60px]">
            {/* top nav */}
            <nav className="flex justify-center items-center">
                <Image
                    src="/typed-logo.svg"
                    alt="Logo"
                    width={100}
                    height={32}
                    className="invert dark:invert-0"
                />
            </nav>

            {/* main */}
            <main className="h-full bg-lime-500/0 py-[60px] flex flex-col justify-center">
                <Tabs
                    defaultValue={value}
                    onValueChange={setValue}
                    className="sm:w-[400px] w-full mx-auto"
                >
                    <TabsList className="mb-6 rounded-full border border-neutral-800/20 dark:border-neutral-800/70 w-fit">
                        <TabsTrigger
                            value="login"
                            className={`py-2 px-4 cursor-pointer rounded-full ${
                                value === "login"
                                    ? "bg-neutral-700 text-neutral-100"
                                    : ""
                            }`}
                        >
                            Login
                        </TabsTrigger>
                        <TabsTrigger
                            value="register"
                            className={`py-2 px-4 cursor-pointer rounded-full ${
                                value === "register"
                                    ? "bg-neutral-700 text-neutral-100"
                                    : ""
                            }`}
                        >
                            Register
                        </TabsTrigger>
                    </TabsList>
                    <TabsContents className="flex flex-col justify-center h-full">
                        <TabsContent value="login" className="space-y-4">
                            <p className="text-2xl font-medium">
                                Sign into your account
                            </p>
                            <form className="flex flex-col justify-center h-full gap-2">
                                <Input
                                    type="email"
                                    placeholder="you@email.com"
                                    className="bg-neutral-800/10 dark:bg-neutral-800 border-none placeholder:text-neutral-800/50 dark:placeholder:text-neutral-600 shadow-none"
                                />
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    className="bg-neutral-800/10 dark:bg-neutral-800 border-none placeholder:text-neutral-800/50 dark:placeholder:text-neutral-600 shadow-none"
                                />

                                <Button type="submit" className="font-semibold">
                                    Login
                                </Button>
                            </form>
                        </TabsContent>
                        <TabsContent value="register" className="space-y-4">
                            <p className="text-2xl font-medium">
                                Create a new account
                            </p>
                            <form className="flex flex-col justify-center h-full gap-2">
                                <Input
                                    type="text"
                                    placeholder="Your Name"
                                    className="bg-neutral-800/10 dark:bg-neutral-800 border-none placeholder:text-neutral-800/50 dark:placeholder:text-neutral-600 shadow-none"
                                />
                                <Input
                                    type="email"
                                    placeholder="you@email.com"
                                    className="bg-neutral-800/10 dark:bg-neutral-800 border-none placeholder:text-neutral-800/50 dark:placeholder:text-neutral-600 shadow-none"
                                />
                                <Input
                                    type="password"
                                    placeholder="Set Password"
                                    className="bg-neutral-800/10 dark:bg-neutral-800 border-none placeholder:text-neutral-800/50 dark:placeholder:text-neutral-600 shadow-none"
                                />

                                <Button type="submit" className="font-semibold">
                                    Sign Up
                                </Button>
                            </form>
                        </TabsContent>
                    </TabsContents>
                </Tabs>
            </main>

            {/* footer */}
            <footer className="flex sm:justify-between justify-center items-center">
                <ModeToggle />
                {/* avatar */}
                <div className="hidden sm:flex items-center gap-4">
                    <p>
                        <span className="opacity-50">Developed by</span>{" "}
                        Shubhdeep Sarkar
                    </p>
                    <Avatar className="">
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
