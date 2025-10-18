'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroPrimary() {
  return (
    <section className="relative pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-container mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 좌측 콘텐츠 */}
          <div className="relative z-10">
            <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              좋은 건설사,
              <br />
              어떻게 찾으세요?
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              수십 년 경력의 전문가들이
              <br />
              투명한 견적부터 완공까지 함께합니다.
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/contact"
                className="px-8 py-4 bg-primary hover:bg-primary-hover text-white text-base font-semibold rounded-lg transition-colors duration-120 text-center shadow-soft hover:shadow-soft-hover"
              >
                무료 건축 견적 요청하기
              </Link>
              <Link
                href="/partners/register"
                className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 text-base font-medium rounded-lg transition-colors duration-120 text-center border-2 border-gray-200"
              >
                건축 전문가로 등록하기
              </Link>
            </div>

            {/* 신뢰 배지 */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                <span>누적 견적 요청 5,420건</span>
              </div>
              <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                <span>등록 파트너 1,250곳</span>
              </div>
              <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                <span>평균 공사비 절감 18%</span>
              </div>
            </div>
          </div>

          {/* 우측 이미지 */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-card overflow-hidden shadow-soft">
              <Image
                src="/images/hero/hero-main.jpg"
                alt="건축 현장"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
              />
            </div>
            
            {/* 플로팅 카드 - 오프그리드 요소 (1개만) */}
            <div className="hidden lg:block absolute -bottom-8 -left-8 bg-white p-6 rounded-card shadow-soft-hover">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">3,500억</div>
                  <div className="text-sm text-gray-600">누적 매칭 금액</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

