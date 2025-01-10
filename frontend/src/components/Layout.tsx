import { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      {children}
    </div>
  )
}

