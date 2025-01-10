import Link from 'next/link'
import dynamic from 'next/dynamic'

const NoSsrComponent = dynamic(() => import('../components/NoSsrComponent'), {
    ssr: false,
});

export default function Custom404() {
    return (
        <NoSsrComponent>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
                <p className="text-gray-600">The page you are looking for does not exist.</p>
                <Link href="/" className="mt-4 text-indigo-600 hover:underline">
                    Go back to the homepage
                </Link>
            </div>
        </NoSsrComponent>
    )
}