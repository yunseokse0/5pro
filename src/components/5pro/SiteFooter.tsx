'use client';

import Link from 'next/link';

const footerLinks = {
  solutions: {
    title: '솔루션',
    links: [
      { label: '원가·라인 시뮬', href: '/solutions/line-sim' },
      { label: 'HACCP·동선', href: '/solutions/haccp' },
      { label: 'CM·현장관리', href: '/solutions/cm' },
      { label: 'MES·WMS', href: '/solutions/mes-wms' },
    ],
  },
  services: {
    title: '서비스',
    links: [
      { label: '프로젝트 관리', href: '/services/pm' },
      { label: '시공사 선정', href: '/services/contractor' },
      { label: '인증 지원', href: '/services/certification' },
    ],
  },
  company: {
    title: '회사',
    links: [
      { label: '회사 소개', href: '/about' },
      { label: '팀', href: '/team' },
      { label: '파트너스', href: '/partners' },
      { label: '채용', href: '/careers' },
    ],
  },
  support: {
    title: '지원',
    links: [
      { label: 'FAQ', href: '/support/faq' },
      { label: '가이드', href: '/support/guide' },
      { label: '블로그', href: '/blog' },
      { label: '문의', href: '/contact' },
    ],
  },
};

const socialLinks = [
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'Blog',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
];

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-container mx-auto px-5">
        {/* 메인 푸터 콘텐츠 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* 회사 정보 (2컬럼 너비) */}
          <div className="col-span-2">
            <div className="mb-4">
              <Link href="/" className="text-2xl font-bold text-white">
                오프로
              </Link>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              건축 계획부터 완공까지
              <br />
              끝까지 책임지는 파트너
            </p>
            
            {/* 연락처 */}
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400">서울특별시 강남구 테헤란로 123</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@5pro.kr" className="text-gray-400 hover:text-white transition-colors duration-120">
                  contact@5pro.kr
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:02-1234-5678" className="text-gray-400 hover:text-white transition-colors duration-120">
                  02-1234-5678
                </a>
              </div>
            </div>
          </div>

          {/* 링크 섹션들 */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-120"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* 저작권 & 정책 */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-500">
              <span>© {currentYear} 5PRO. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:text-gray-300 transition-colors duration-120">
                  개인정보처리방침
                </Link>
                <Link href="/terms" className="hover:text-gray-300 transition-colors duration-120">
                  이용약관
                </Link>
              </div>
            </div>

            {/* 소셜 링크 */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors duration-120"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

