'use client';

import Link from 'next/link';

export default function TransparencyTeaser() {
  return (
    <section className="pt-20 pb-20 bg-gradient-to-br from-primary to-blue-600 text-white relative overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-container mx-auto px-5 relative z-10">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            건축 중 발생하는 모든 문제,
            <br />
            오프로에서 투명하게 해결합니다
          </h2>
          <p className="text-xl text-primary-100">
            실시간 정보 공개로 불안함을 없애고, 안전한 대금 관리로 리스크를 제거합니다.
          </p>
        </div>

        {/* 모바일 화면 일러스트 및 핵심 가치 */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* 왼쪽: 간결한 모바일 일러스트 */}
          <div className="flex justify-center">
            <div className="relative">
              {/* 메인 모바일 화면 */}
              <div className="w-72 bg-white rounded-3xl p-4 shadow-2xl">
                <div className="bg-gray-100 rounded-2xl p-4 space-y-3">
                  {/* 현장 사진 아이콘 */}
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">현장 사진</p>
                      <p className="text-sm font-semibold text-gray-900">실시간 업데이트</p>
                    </div>
                  </div>

                  {/* 공정률 그래프 아이콘 */}
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">공정률</p>
                      <p className="text-sm font-semibold text-gray-900">65% 완료</p>
                    </div>
                  </div>

                  {/* 대금 관리 아이콘 */}
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">대금 현황</p>
                      <p className="text-sm font-semibold text-gray-900">안전 관리 중</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 플로팅 배지 */}
              <div className="absolute -right-4 -top-4 bg-white text-primary px-4 py-2 rounded-full shadow-lg text-sm font-bold">
                실시간 투명
              </div>
              <div className="absolute -left-4 -bottom-4 bg-white text-green-600 px-4 py-2 rounded-full shadow-lg text-sm font-bold">
                안전 관리
              </div>
            </div>
          </div>

          {/* 오른쪽: 핵심 가치 3가지 */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">1. 실시간 현장 투명 공개</h3>
                <p className="text-primary-100 leading-relaxed">
                  모바일로 언제든지 현장 사진과 진행 상황을 확인하세요. 숨길 것이 없습니다.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">2. 공정 기반 대금 안전 관리</h3>
                <p className="text-primary-100 leading-relaxed">
                  공사 진척도에 따라 단계별로 대금이 지급되어, 부도·먹튀 리스크를 원천 차단합니다.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">3. 전담 매니저 1:1 리스크 관리</h3>
                <p className="text-primary-100 leading-relaxed">
                  건축 전문가가 설계 변경부터 하자까지, 모든 이슈를 사전에 관리합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="text-center">
          <Link
            href="/transparency-system"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-120 shadow-soft hover:shadow-soft-hover"
          >
            <span>오프로의 투명 관리 시스템 자세히 보기</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

