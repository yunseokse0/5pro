'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { label: '솔루션', href: '/solutions' },
  { label: '서비스', href: '/services' },
  { label: '파트너스', href: '/partners' },
  { label: '건축사례', href: '/cases' },
  { label: '지원', href: '/support/faq' },
];

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActivePath = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-120 ease-smooth ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-gray-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-container mx-auto px-5">
          <div className="flex items-center justify-between h-16">
            {/* 로고 */}
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">오프로</span>
            </Link>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-120 relative ${
                    isActivePath(item.href)
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                  {isActivePath(item.href) && (
                    <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary" />
                  )}
                </Link>
              ))}
            </nav>

            {/* 로그인/회원가입 버튼 */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                href="/login"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors duration-120"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors duration-120"
              >
                회원가입
              </Link>
            </div>

            {/* 모바일 햄버거 버튼 */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              aria-label="메뉴 열기"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.6}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 드로어 */}
      {isMobileMenuOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black/40 z-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* 드로어 패널 */}
          <div className="fixed top-0 right-0 bottom-0 w-[78%] max-w-sm bg-white z-50 md:hidden animate-slide-in">
            <div className="flex flex-col h-full">
              {/* 헤더 */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200">
                <span className="text-lg font-bold text-gray-900">오프로</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                  aria-label="메뉴 닫기"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.6}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* 네비게이션 */}
              <nav className="flex-1 overflow-y-auto p-5">
                <ul className="space-y-1">
                  {navigation.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-120 ${
                          isActivePath(item.href)
                            ? 'bg-primary-50 text-primary'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* 로그인/회원가입 */}
              <div className="p-5 border-t border-gray-200 space-y-3">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-5 py-3 text-gray-700 hover:text-gray-900 text-center text-base font-medium rounded-lg transition-colors duration-120"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-5 py-3 bg-primary hover:bg-primary-hover text-white text-center text-base font-medium rounded-lg transition-colors duration-120"
                >
                  회원가입
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 200ms ease-out;
        }
      `}</style>
    </>
  );
}

