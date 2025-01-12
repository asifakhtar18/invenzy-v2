"use client";

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import dynamic from 'next/dynamic';

const NoSsrComponent = dynamic(() => import('../../components/NoSsrComponent'), {
    ssr: false,
});

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            router.push('/inventories')
        }

    }, [router])

    return (
        <NoSsrComponent>
            {children}
        </NoSsrComponent>
    )
}
