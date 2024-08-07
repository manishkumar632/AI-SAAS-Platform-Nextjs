import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Aimazine",
    description:
        "Aimazine is AI saas platform that provides best AI solutions for your business"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={nunito.className}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
