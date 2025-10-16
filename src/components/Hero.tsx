'use client';

import CTAGroup from './CTAGroup';

export default function Hero() {
  return (
    <section className="px-6 md:px-12 py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold mb-6">
          🏭 식품 제조업 특화 통합 플랫폼
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
          <span className="block mb-2">20년 경력 HACCP 전문가가</span>
          <span className="text-indigo-600 dark:text-indigo-400">설계부터 검증까지 함께합니다</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          <span className="font-semibold text-gray-800 dark:text-gray-200">HACCP 검증부터 실시간 품질관리까지</span>, 
          모든 과정을 사진과 데이터로 투명하게 관리합니다. 
          <br className="hidden md:block" />
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">AI 견적으로 공사비 20% 절감</span>, 
          <span className="text-purple-600 dark:text-purple-400 font-semibold">스마트팩토리로 운영비 15% 절감</span>을 동시에 실현합니다.
        </p>
        <div className="mt-8 mb-8">
          <div className="inline-flex items-center space-x-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">200+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">완공 사례</div>
            </div>
            <div className="w-px h-12 bg-gray-200 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">20년</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">전문가 경력</div>
            </div>
            <div className="w-px h-12 bg-gray-200 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">HACCP 인증 성공률</div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <CTAGroup />
        </div>
        
        {/* 회원가입 유도 배너 */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-2xl p-6 text-white">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">
              🎁 지금 가입하고 <span className="text-yellow-300 dark:text-yellow-200">무료 혜택</span>을 받아보세요!
            </h3>
            <p className="text-indigo-100 dark:text-indigo-200 mb-4">
              맞춤형 분석 리포트 + 전문가 가이드북 + 1:1 상담까지 모두 무료
            </p>
            <a 
              href="/signup"
              className="inline-block px-6 py-3 bg-white dark:bg-gray-100 text-indigo-600 dark:text-indigo-700 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-200 transition-all transform hover:-translate-y-1"
            >
              무료 회원가입하기 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

