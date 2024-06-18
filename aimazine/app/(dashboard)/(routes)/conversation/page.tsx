"use client";
import { Bot, Loader2, Send, User2, Copy } from "lucide-react"; // Import the Copy icon
import { useChat } from "@ai-sdk/react";
import Markdown from "../component/markdown";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
    const [chatStarted, setChatStarted] = useState(false);
    const [chatDivHeight, setChatDivHeight] = useState(0);
    const [chatDivWidth, setChatDivWidth] = useState(0);
    const [copiedMessage, setCopiedMessage] = useState(""); // State to track copied message
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        stop
    } = useChat({
        api: "api/genai"
    });

    const copyToClipboard = (text: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setCopiedMessage(text); // Set the text that was copied
                setTimeout(() => {
                    setCopiedMessage(""); // Clear after 2 seconds
                }, 2000);
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    };

    useEffect(() => {
        function handleResize() {
            const userProfileHeight =
                document.getElementsByClassName("userProfile")[0]?.clientHeight;
            const windowInnerHeight = window.innerHeight;
            const windowInnerWidth = window.innerWidth;
            const sidebarWidth =
                document.getElementsByClassName("dashboardSidebar")[0]
                    ?.clientWidth;

            setChatDivHeight(4 + windowInnerHeight - userProfileHeight * 2);
            setChatDivWidth(windowInnerWidth - sidebarWidth);
        }

        handleResize(); // Initial call
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <main
            className="flex flex-col items-center inset-0 bg-[#8BE0DB]/10 w-full"
            style={{ height: `${chatDivHeight}px`, width: `${chatDivWidth}px` }}
        >
            <div className="flex flex-col w-full overflow-y-auto mb-20 p-4 h-full">
                {chatStarted ? (
                    RenderMessages()
                ) : (
                    <div className="flex m-auto top-1/2 justify-center items-center w-[50%] h-[50%] animate-bounce">
                        <Image
                            src="/chat.svg"
                            alt="Chat Logo"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                )}
            </div>
            <div className="w-full bottom-0 flex justify-center">
                {RenderForm()}
            </div>
        </main>
    );

    function RenderForm() {
        return (
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    setChatStarted(true);
                    handleSubmit(event, {
                        data: {
                            prompt: input
                        }
                    });
                }}
                className="w-[70%] justify-center gap-2 items-center bg-white p-2 rounded-t-md shadow-lg flex mb-2"
            >
                <textarea
                    value={input}
                    onChange={(e) => {
                        handleInputChange(e);
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                    }}
                    placeholder={
                        isLoading ? "Generating..." : "Ask me anything..."
                    }
                    disabled={isLoading}
                    className="border-b border-dashed outline-none px-4 py-2 text-[#0842A0] placeholder:text-[#0842A099] text-left focus:placeholder-transparent disabled:bg-transparent rounded-md max-h-32 overflow-x-hidden w-full"
                />
                <button
                    type="submit"
                    className="rounded-full shadow-md border flex flex-row ml-2"
                >
                    {isLoading ? (
                        <Loader2
                            onClick={stop}
                            className="p-3 h-10 w-10 stroke-stone-500 animate-spin"
                        />
                    ) : (
                        <Send className="p-3 h-10 w-10 stroke-stone-500" />
                    )}
                </button>
            </form>
        );
    }

    function RenderMessages() {
        return (
            <div
                id="chatbox"
                className="flex flex-col w-full text-left mt-4 gap-4 whitespace-pre-wrap"
            >
                {messages.map((message, index) => {
                    return (
                        <div
                            key={index}
                            className={`shadow-md rounded-md ml-10 relative ${
                                message.role === "user" ? "bg-[#111827]/10" : ""
                            }`}
                        >
                            <Markdown text={message.content} />
                            <button
                                onClick={() => copyToClipboard(message.content)}
                                className="absolute top-2 right-2 bg-white/10 border rounded-full p-1 shadow-lg"
                                title="Copy to clipboard"
                            >
                                {copiedMessage === message.content ? (
                                    "Copied!"
                                ) : (
                                    <Copy className="h-4 w-4 text-white" />
                                )}
                            </button>
                            {message.role === "user" ? (
                                <User2 className="absolute top-2 -left-10 border rounded-full p-1 shadow-lg" />
                            ) : (
                                <Bot
                                    className={`absolute top-2 -left-10 border rounded-full p-1 shadow-lg stroke-[#0842A0] ${
                                        isLoading &&
                                        index === messages.length - 1
                                            ? "animate-bounce"
                                            : ""
                                    }`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
}
