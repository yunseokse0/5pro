'use client';

import CTAGroup from './CTAGroup';

export default function Hero() {
  return (
    <section className="px-6 md:px-12 py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
          💡 스마트 견적 시스템
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          짓는 것에서 멈추지 않습니다.
          <br />
          <span className="text-indigo-600">운영까지 설계하는</span> 식품공장 솔루션
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          설계·HACCP 컨설팅·시공·스마트팩토리까지 원스톱. 
          <br className="hidden md:block" />
          데이터 기반 견적으로 더 정확하고 효율적인 공장을 완성합니다.
        </p>
        <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mt-6 mb-4">
          HACCP 컨설팅 제공
        </div>
        <p className="text-sm text-gray-600 mb-8">
          컨설팅(자문·교육·사전점검)을 통해 함께 준비합니다.
        </p>
        <div className="mt-8">
          <CTAGroup />
        </div>
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div>
            <div className="text-3xl font-bold text-indigo-600">95%</div>
            <div className="text-sm text-gray-600 mt-1">AI 견적 정확도</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600">20년</div>
            <div className="text-sm text-gray-600 mt-1">현장 노하우</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600">10년+</div>
            <div className="text-sm text-gray-600 mt-1">지속 운영 효율</div>
          </div>
        </div>
      </div>
    </section>
  );
}

