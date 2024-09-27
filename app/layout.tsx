import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import {
  ClerkProvider
} from '@clerk/nextjs';
import { Toaster } from "@/components/ui/toaster"

const outfit = Outfit({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Buy a dino",
  description: "Your must go to",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <NextTopLoader color="#000"></NextTopLoader>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
