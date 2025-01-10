import Link from 'next/link'

export default function Custom404() {
    return (
        <div>
            <h1>404 - Page not found</h1>
            <Link href="/">
                <a>Go back home</a>
            </Link>
        </div>
    )
}