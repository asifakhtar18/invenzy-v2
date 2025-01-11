'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function NotFound() {
    const router = useRouter()

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <motion.div
                className="text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    className="text-6xl font-bold text-gray-900 mb-4"
                    variants={itemVariants}
                >
                    404
                </motion.h1>
                <motion.p
                    className="text-xl text-gray-600 mb-8"
                    variants={itemVariants}
                >
                    Page not found
                </motion.p>
                <motion.div variants={itemVariants}>
                    <Button
                        onClick={() => router.push('/')}
                        className="px-6 py-3"
                    >
                        Go Home
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    )
}

