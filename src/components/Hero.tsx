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
          <span className="block mb-2">투명한 공정으로</span>
          <span className="text-indigo-600">완성하는 스마트 식품공장</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          <span className="font-semibold text-gray-800">AI 견적부터 HACCP 인증까지</span> — 
          설계·시공·운영의 모든 과정을 <span className="text-indigo-600 font-semibold">한 번에</span> 관리하는 
          <br className="hidden md:block" />
          <span className="text-indigo-600 font-semibold">식품공장 통합 플랫폼</span>입니다.
        </p>
        <div className="mt-8 mb-8">
          <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-indigo-600">30%</div>
              <div className="text-sm text-gray-600">평균 비용 절감</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-600">95%</div>
              <div className="text-sm text-gray-600">AI 견적 정확도</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-gray-600">투명 공정 관리</div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <CTAGroup />
        </div>
      </div>
    </section>
  );
}

