'use client';

import CTAGroup from './CTAGroup';

export default function Hero() {
  return (
    <section className="px-6 md:px-12 py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
          🏭 식품 제조업 특화 통합 플랫폼
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          짓고 끝이 아닙니다.
          <br />
          <span className="text-indigo-600">운영 효율까지 책임지는</span> 스마트 식품공장 플랫폼
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          30% 절감, 95% 정확도 — 설립부터 운영까지 완전한 솔루션
          <br className="hidden md:block" />
          HACCP 인증과 스마트 운영을 한 번에, 5PRO로 완성하세요.
        </p>
        <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mt-6 mb-4">
          💰 1억 규모 스마트팩토리 구축
        </div>
        <p className="text-sm text-gray-600 mb-8">
          최소 1억 원 이상의 고도화된 시스템 구축 프로젝트
        </p>
        <div className="mt-8">
          <CTAGroup />
        </div>
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div>
            <div className="text-3xl font-bold text-indigo-600">30%</div>
            <div className="text-sm text-gray-600 mt-1">평균 비용 절감</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600">95%</div>
            <div className="text-sm text-gray-600 mt-1">AI 견적 정확도</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600">1억+</div>
            <div className="text-sm text-gray-600 mt-1">스마트팩토리 규모</div>
          </div>
        </div>
      </div>
    </section>
  );
}

