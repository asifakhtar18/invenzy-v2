'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MenuIcon } from 'lucide-react';

import dynamic from 'next/dynamic';

const NoSsrComponent = dynamic(() => import('../../components/NoSsrComponent'), {
    ssr: false,
});


export function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const isMobile = useMediaQuery("(max-width: 768px)");

    let token;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    if (isMobile) {
        return (
            <NoSsrComponent>
                <nav className="bg-white shadow-sm  p-4">

                    <Menubar className='border-none shadow-none'>
                        <MenubarMenu>
                            <div className='w-full flex items-center justify-between'>
                                <span className="text-2xl font-bold text-indigo-600">Invenzy</span>
                                <MenubarTrigger className='' >
                                    <MenuIcon className='h-6 w-6 pt-1' />
                                </MenubarTrigger>
                            </div>
                            <MenubarContent className='mr-4' >
                                <MenubarItem >
                                    <Link href="/dashboard">Dashboard</Link>
                                </MenubarItem>
                                <MenubarItem >
                                    <Link href="/inventories">Inventories</Link>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem onClick={handleLogout}>Logout</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </nav>
            </NoSsrComponent>
        );
    }


    return (
        <NoSsrComponent>
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center items-start">
                                <Link href="/">
                                    <span className="text-2xl font-bold text-indigo-600">Invenzy</span>
                                </Link>
                            </div>
                            {
                                token && (
                                    <div className="flex ml-6 items-center space-x-4">
                                        <Link href="/dashboard">
                                            <Button
                                                variant={pathname === '/dashboard' ? 'default' : 'ghost'}>
                                                Dashboard
                                            </Button>
                                        </Link>
                                        <Link href="/inventories">
                                            <Button variant={pathname === '/inventories' ? 'default' : 'ghost'}>
                                                Inventories
                                            </Button>
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                        <div className="flex ml-6 items-center space-x-4">
                            {
                                token ? (
                                    <Button onClick={handleLogout}>
                                        Logout
                                    </Button>
                                ) : (
                                    <>
                                        <Button onClick={() => router.push('/login')} variant="outline">Login</Button>
                                        <Button onClick={() => router.push('/register')} variant="default" className="ml-3">Sign up</Button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </NoSsrComponent>
    );
}
