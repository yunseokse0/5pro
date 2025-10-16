'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Calculator, 
  FileSignature, 
  ShieldCheck, 
  Gauge, 
  UserCheck,
  Phone,
  Users2,
  Box,
  Cpu,
  Building2
} from 'lucide-react'

const Navigation = () => {
  const pathname = usePathname()

  // 관리자 페이지에서는 하단 메뉴를 숨김
  if (pathname?.startsWith('/admin')) {
    return null
  }

  const navItems = [
    { href: '/', icon: Home, label: '홈' },
    { href: '/estimate', icon: Calculator, label: '견적' },
    { href: '/projects', icon: Building2, label: '프로젝트' },
    { href: '/signup', icon: Users2, label: '회원가입' },
    { href: '/3d-visualization', icon: Box, label: '3D 조감도' },
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
              className={`flex flex-col items-center py-3 px-2 min-w-0 flex-1 transition-all duration-200 ${
                isActive 
                  ? 'text-blue-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-br from-blue-50 to-indigo-100 shadow-sm' 
                  : 'hover:bg-gray-50'
              }`}>
                <Icon size={20} className="mb-0" strokeWidth={2.2} />
              </div>
              <span className="text-xs font-medium truncate mt-1">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Navigation
