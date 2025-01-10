'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'
import { useVerifyEmailQuery } from '@/redux/services/authApi'


interface VerifyEmailClientProps {
    token: string
}

export const VerifyEmailClient: React.FC<VerifyEmailClientProps> = ({ token }) => {
    const router = useRouter()
    const [countdown, setCountdown] = useState(5)

    const { isSuccess } = useVerifyEmailQuery(token, { skip: !token })

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem('token', token)
        }
        if (countdown === 0) {
            router.push(isSuccess ? '/inventories' : '/register')
        }
    }, [countdown, isSuccess, router])

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    }

    const iconVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1, transition: { delay: 0.2, type: 'spring', stiffness: 200 } },
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="text-center"
            >
                {isSuccess ? (
                    <>
                        <motion.div variants={iconVariants}>
                            <CheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4" />
                        </motion.div>
                        <h1 className="text-2xl font-bold mb-4">Email verified successfully!</h1>
                        <p>Redirecting to inventories in {countdown} seconds...</p>
                    </>
                ) : (
                    <>
                        <motion.div variants={iconVariants}>
                            <XCircle className="text-red-500 w-24 h-24 mx-auto mb-4" />
                        </motion.div>
                        <h1 className="text-2xl font-bold mb-4">Email verification failed</h1>
                        <p>Redirecting to registration page in {countdown} seconds...</p>
                    </>
                )}
                <Button
                    className="mt-4"
                    onClick={() => router.push(isSuccess ? '/inventories' : '/register')}
                >
                    {isSuccess ? 'Go to Inventories' : 'Register Again'}
                </Button>
            </motion.div>
        </div>
    )
}

