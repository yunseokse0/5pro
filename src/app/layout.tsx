import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SiteHeader from '@/components/5pro/SiteHeader'
import SiteFooter from '@/components/5pro/SiteFooter'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://offro.kr'),
  title: {
    default: '오프로 - 건축 계획부터 완공까지',
    template: '%s | 오프로',
  },
  description: '좋은 건설사를 어떻게 찾으세요? 수십 년 경력의 전문가들이 투명한 견적부터 완공까지 함께합니다.',
  keywords: ['건축', '건설사', '견적', '건축견적', '건축비교', '건축매칭', '건축플랫폼'],
  authors: [{ name: '오프로' }],
  creator: '오프로',
  publisher: '오프로',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://offro.kr',
    siteName: '오프로',
    title: '오프로 - 건축 계획부터 완공까지',
    description: '좋은 건설사를 어떻게 찾으세요? 수십 년 경력의 전문가들이 투명한 견적부터 완공까지 함께합니다.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '오프로 - 건축 전문 플랫폼',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '오프로 - 건축 계획부터 완공까지',
    description: '좋은 건설사를 어떻게 찾으세요? 수십 년 경력의 전문가들이 투명한 견적부터 완공까지 함께합니다.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // TODO: 실제 인증 코드로 교체
    google: 'google-site-verification-code',
    other: {
      'naver-site-verification': 'naver-verification-code',
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1A2DFF',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '오프로',
    url: 'https://offro.kr',
    logo: 'https://offro.kr/images/logo.png',
    description: '건축 계획부터 완공까지 책임지는 파트너',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressLocality: '서울특별시',
      addressRegion: '강남구',
      streetAddress: '테헤란로 123',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+82-2-1234-5678',
      contactType: 'customer service',
      areaServed: 'KR',
      availableLanguage: ['Korean'],
    },
    sameAs: [
      'https://www.linkedin.com/company/offro',
      'https://www.youtube.com/@offro',
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '오프로',
    url: 'https://offro.kr',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://offro.kr/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-white">
          <SiteHeader />
          <div className="pt-16">
            {children}
          </div>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
