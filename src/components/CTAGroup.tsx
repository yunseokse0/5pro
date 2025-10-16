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
        맞춤 견적으로 비용·일정 확인
      </Link>
      <Link 
        href="/consulting" 
        className="px-5 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors min-h-[44px] flex items-center"
        aria-label="HACCP + 운영 효율 포함 즉시 견적 확인"
      >
        스마트 운영 시스템 상담
      </Link>
      <Link 
        href="/3d-visualization" 
        className="px-5 py-3 rounded-lg bg-indigo-50 text-indigo-700 font-semibold hover:bg-indigo-100 transition-colors min-h-[44px] flex items-center"
        aria-label="스마트팩토리 시스템 구축 상담"
      >
        3D 조감도 미리보기
      </Link>
    </div>
  );
}

