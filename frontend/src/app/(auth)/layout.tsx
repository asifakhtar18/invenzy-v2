"use client";

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('token')) {
            router.push('/inventories')
        }
    }, [router])

    return (
        <>
            {children}
        </>
    )
}
