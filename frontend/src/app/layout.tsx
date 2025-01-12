"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { Suspense } from "react";
import { Loader } from "@/components/loaders/Loader";
import { Navbar } from "@/components/header/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Loader />}>
          <Providers>
            <main>
              <Navbar />
              {children}
            </main>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
