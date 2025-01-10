'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { FiMenu, FiX, FiHome, FiBox, FiUser, FiLogOut } from 'react-icons/fi'

const navLinks = [
  { icon: FiHome, label: 'Dashboard', href: '/dashboard' },
  { icon: FiBox, label: 'Inventories', href: '/inventories' },
  { icon: FiUser, label: 'Profile', href: '/profile' },
]

export const Sidebar = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }


  const router = useRouter()

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-20 md:hidden"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      <motion.nav
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 z-10 md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="text-2xl font-bold mb-8">Invenzy</div>
          <ul className="space-y-2 flex-grow">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <a
                    className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${router.pathname === item.href ? 'bg-gray-700' : ''
                      }`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {/* Implement logout logic */ }}
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700"
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </motion.nav>
    </div>
  )
}

