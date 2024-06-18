"use client";
import { Bot, Loader2, Send, User2, Copy } from "lucide-react"; // Import the Copy icon
import { useChat } from "@ai-sdk/react";
import Markdown from "../component/markdown";
import { useState } from "react";

export default function Home() {
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

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            {RenderForm()}
            {RenderMessages()}
        </main>
    );

    function RenderForm() {
        return (
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit(event, {
                        data: {
                            prompt: input
                        }
                    });
                }}
                className="w-full flex flex-row gap-2 items-center h-full"
            >
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder={
                        isLoading ? "Generating..." : "Ask me anything..."
                    }
                    disabled={isLoading}
                    className="border-b border-dashed outline-none w-full px-4 py-2 text-[#0842A0] placeholder:text-[#0842A099] text-right focus:placeholder-transparent disabled:bg-transparent"
                />
                <button
                    type="submit"
                    className="rounded-full shadow-md border flex flex-row"
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
                className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap"
            >
                {messages.map((message, index) => {
                    return (
                        <div
                            key={index}
                            className={`shadow-md rounded-md ml-10 relative ${
                                message.role === "user" ? "bg-stone-300" : ""
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
