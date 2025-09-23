'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Calculator, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  User,
  Phone,
  Users,
  Eye
} from 'lucide-react'

const Navigation = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/', icon: Home, label: '홈' },
    { href: '/estimate', icon: Calculator, label: '견적' },
    { href: '/3d-visualization', icon: Eye, label: '3D 조감도' },
    { href: '/partners', icon: Users, label: '파트너사' },
    { href: '/contract', icon: FileText, label: '계약관리' },
    { href: '/consultation', icon: MessageSquare, label: '상담' },
    { href: '/progress', icon: BarChart3, label: '진행상황' },
    { href: '/login', icon: User, label: '로그인' },
    { href: '/contact', icon: Phone, label: '연락처' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center py-2 px-1 min-w-0 flex-1 ${
                isActive 
                  ? 'text-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium truncate">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Navigation
