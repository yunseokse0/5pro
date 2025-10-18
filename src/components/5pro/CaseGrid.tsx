'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Case {
  id: string;
  title: string;
  category: string;
  location: string;
  scale: string;
  period: string;
  thumbnail: string;
  tags: string[];
  description: string;
}

export default function CaseGrid() {
  const [cases, setCases] = useState<Case[]>([]);
  const [displayCount, setDisplayCount] = useState(8);

  useEffect(() => {
    fetch('/data/cases.json')
      .then((res) => res.json())
      .then((data) => setCases(data.cases || []))
      .catch(console.error);
  }, []);

  const visibleCases = cases.slice(0, displayCount);
  const hasMore = cases.length > displayCount;

  return (
    <section className="pt-20 pb-20 bg-white">
      <div className="max-w-container mx-auto px-5">
        {/* 헤더 */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            오프로가 완성한 건축 이야기
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            이미 47개의 건축주님이 오프로를 통해 꿈을 실현했습니다.
          </p>
        </div>

        {/* 케이스 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {visibleCases.map((caseItem) => (
            <Link
              key={caseItem.id}
              href={`/cases/${caseItem.id}`}
              className="group bg-white rounded-card overflow-hidden border border-gray-100 hover:shadow-soft-hover transition-all duration-120"
            >
              {/* 썸네일 */}
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                {/* 플레이스홀더 이미지 - 실제 이미지로 교체 필요 */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                
                {/* 카테고리 배지 */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                  {caseItem.category}
                </div>
              </div>

              {/* 콘텐츠 */}
              <div className="p-4 sm:p-5">
                {/* 제목 */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-120">
                  {caseItem.title}
                </h3>

                {/* 설명 */}
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                  {caseItem.description}
                </p>

                {/* 태그 */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {caseItem.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 sm:py-1 bg-gray-100 text-[10px] sm:text-xs text-gray-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 메타 정보 */}
                <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {caseItem.location}
                  </div>
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {caseItem.scale}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 더보기 버튼 */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={() => setDisplayCount(prev => prev + 4)}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white hover:bg-gray-50 text-gray-900 text-sm sm:text-base font-medium rounded-lg border-2 border-gray-200 transition-colors duration-120"
            >
              더 많은 사례 보기
            </button>
          </div>
        )}

        {/* 전체 보기 링크 */}
        <div className="mt-6 sm:mt-8 text-center">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-primary text-sm sm:text-base font-medium hover:gap-3 transition-all duration-120"
          >
            <span>전체 사례 보기</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

