"use client";
export default function MainLayout({ children }: { children: React.ReactNode }) {
    return <div className="min-h-screen p-4">{children}</div>;
}