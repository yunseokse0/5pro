'use client';

import Link from 'next/link';

export default function CTAGroup() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Link 
        href="/estimate" 
        className="px-5 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors min-h-[44px] flex items-center"
        aria-label="스마트팩토리 통합 공장 설립 무료 상담"
      >
        내 공장 견적 무료 확인하기
      </Link>
      <Link 
        href="/consulting" 
        className="px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors min-h-[44px] flex items-center"
        aria-label="HACCP + 운영 효율 포함 즉시 견적 확인"
      >
        HACCP 검증 설계 무료 상담받기
      </Link>
      <Link 
        href="/3d-visualization" 
        className="px-5 py-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors min-h-[44px] flex items-center"
        aria-label="스마트팩토리 시스템 구축 상담"
      >
        투명 공정 관리 체험하기
      </Link>
    </div>
  );
}

