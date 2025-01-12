'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface NotFoundAnimationProps {
    children: React.ReactNode
}

export function NotFoundAnimation({ children }: NotFoundAnimationProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return;

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

    return (
        <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {children}
        </motion.div>
    )
}

