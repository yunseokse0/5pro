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
                  {/* 현장 사진 아이콘 - 카메라와 눈 */}
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {/* 카메라 */}
                        <rect x="3" y="8" width="18" height="12" rx="2" strokeWidth={1.8} />
                        <circle cx="12" cy="14" r="3" strokeWidth={1.8} />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 8V6a1 1 0 011-1h4a1 1 0 011 1v2" />
                        {/* 눈 (실시간 관찰) */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 6l2-2M20 4l1 1" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">현장 사진</p>
                      <p className="text-sm font-semibold text-gray-900">실시간 업데이트</p>
                    </div>
                  </div>

                  {/* 공정률 그래프 아이콘 - 크레인과 진행률 바 */}
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {/* 크레인 */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 20h16" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 20V6" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 6h12" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 6v4" />
                        <rect x="18" y="10" width="4" height="3" strokeWidth={1.8} rx="0.5" />
                        {/* 진행률 바 */}
                        <rect x="4" y="16" width="8" height="2" strokeWidth={1.8} rx="1" />
                        <rect x="4" y="16" width="5" height="2" fill="currentColor" rx="1" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">공정률</p>
                      <p className="text-sm font-semibold text-gray-900">65% 완료</p>
                    </div>
                  </div>

                  {/* 대금 관리 아이콘 - 방패 안에 지갑 */}
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {/* 방패 */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2L4 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4z" />
                        {/* 지갑/돈 */}
                        <rect x="9" y="10" width="6" height="4" strokeWidth={1.8} rx="1" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 12h4" />
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
                  {/* 돋보기와 건물 */}
                  <circle cx="10" cy="10" r="7" strokeWidth={1.8} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-4.35-4.35" />
                  {/* 건물 */}
                  <rect x="6" y="6" width="4" height="6" strokeWidth={1.8} rx="0.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 8h2M7 10h2" />
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
                  {/* 금고/저금통 */}
                  <rect x="6" y="8" width="12" height="12" strokeWidth={1.8} rx="2" />
                  <circle cx="12" cy="14" r="2" strokeWidth={1.8} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 12v4" />
                  {/* 자물쇠 */}
                  <rect x="10" y="3" width="4" height="5" strokeWidth={1.8} rx="1" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 5V3a2 2 0 014 0v2" />
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
                  {/* 헤드셋 낀 사람 */}
                  <circle cx="12" cy="8" r="4" strokeWidth={1.8} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 20c0-4 3-7 8-7s8 3 8 7" />
                  {/* 헤드셋 */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 8h-1a2 2 0 00-2 2v2M16 8h1a2 2 0 012 2v2" />
                  {/* 체크 마크 */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 4l1.5 1.5L20 3" />
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

