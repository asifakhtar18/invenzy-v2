"use client";

import { useEffect } from "react";

export default function NoSsrComponent({ children }: { children: React.ReactNode }) {
    useEffect(() => {
    }, []);

    return <>{children}</>;
}