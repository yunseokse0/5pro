'use client';

import Link from 'next/link';

export default function CTAGroup() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Link 
        href="/estimate" 
        className="px-5 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors min-h-[44px] flex items-center"
        aria-label="즉시 견적 보기"
      >
        즉시 견적 보기
      </Link>
      <Link 
        href="/consulting" 
        className="px-5 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors min-h-[44px] flex items-center"
        aria-label="전문가 상담 신청"
      >
        전문가 상담 신청
      </Link>
      <Link 
        href="/smart-factory" 
        className="px-5 py-3 rounded-lg bg-indigo-50 text-indigo-700 font-semibold hover:bg-indigo-100 transition-colors min-h-[44px] flex items-center"
        aria-label="스마트팩토리 데모 보기"
      >
        스마트팩토리 데모 보기
      </Link>
      <Link 
        href="/smart-factory#roi" 
        className="px-5 py-3 rounded-lg bg-white border border-indigo-200 text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors min-h-[44px] flex items-center"
        aria-label="운영 효율 시뮬레이션 받기"
      >
        운영 효율 시뮬레이션 받기
      </Link>
    </div>
  );
}

