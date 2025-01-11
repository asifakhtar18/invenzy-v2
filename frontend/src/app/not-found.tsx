import Link from 'next/link'
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic'

const NotFoundAnimation = dynamic(
    () => import('../components/NotFoundAnimation').then(mod => mod.NotFoundAnimation),
    { ssr: false }
)

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <NotFoundAnimation>
                <h1 className="text-6xl font-bold text-gray-900 mb-4">
                    404
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Page not found
                </p>
                <Button asChild>
                    <Link href="/">
                        Go Home
                    </Link>
                </Button>
            </NotFoundAnimation>
        </div>
    )
}

