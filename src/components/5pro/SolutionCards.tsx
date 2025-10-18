'use client';

import Link from 'next/link';

const solutions = [
  {
    id: 'transparent-quote',
    title: '투명한 견적 비교',
    slug: 'transparent-quote',
    description: '검증된 파트너의 공개 경쟁 입찰',
    details: [
      '수량 산출 내역 기반의 공사비 예측',
      '숨은 비용 없는 최적의 견적 리포트 제공',
      '실시간 견적 비교 및 분석 시스템',
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* 건물과 성장하는 그래프 */}
        <rect x="4" y="8" width="6" height="8" strokeWidth={1.6} rx="1" />
        <rect x="6" y="6" width="2" height="2" strokeWidth={1.6} />
        <rect x="5" y="10" width="1" height="2" strokeWidth={1.6} />
        <rect x="8" y="10" width="1" height="2" strokeWidth={1.6} />
        {/* 성장하는 그래프 */}
        <rect x="12" y="12" width="2" height="4" strokeWidth={1.6} rx="0.5" />
        <rect x="14" y="8" width="2" height="8" strokeWidth={1.6} rx="0.5" />
        <rect x="16" y="4" width="2" height="12" strokeWidth={1.6} rx="0.5" />
        <rect x="18" y="2" width="2" height="14" strokeWidth={1.6} rx="0.5" />
        {/* 화폐 기호 */}
        <circle cx="20" cy="2" r="1" strokeWidth={1.6} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19 2h2M19 1v2M21 1v2" />
      </svg>
    ),
    color: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    id: 'expert-matching',
    title: '건축 전문가 매칭',
    slug: 'expert-matching',
    description: '요구사항에 맞는 최적의 파트너 선정',
    details: [
      '현장 경험과 실적 기반의 건설사 정보 공개',
      '건축사, 건설사, 시공 전문가 원스톱 연결',
      '까다로운 검증을 통과한 신뢰할 수 있는 파트너',
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* 명함과 돋보기 */}
        <rect x="6" y="8" width="8" height="6" strokeWidth={1.6} rx="1" />
        <rect x="7" y="9" width="6" height="1" strokeWidth={1.6} />
        <rect x="7" y="11" width="4" height="1" strokeWidth={1.6} />
        <rect x="7" y="12.5" width="5" height="1" strokeWidth={1.6} />
        {/* 돋보기 */}
        <circle cx="17" cy="11" r="3" strokeWidth={1.6} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19 13l3 3" />
        {/* 방패 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 3l2 1-2 1-2-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 4l1 0.5-1 0.5-1-0.5z" />
      </svg>
    ),
    color: 'bg-green-50',
    textColor: 'text-green-600',
  },
  {
    id: 'construction-management',
    title: '공정 관리 및 안전 시스템',
    slug: 'construction-management',
    description: '투명한 공정 관리와 안전한 대금 지급',
    details: [
      '시공 매니저의 품질 진척도 관리',
      '실시간 현장 보고서 및 모바일 대시보드 제공',
      '공정별 대금 지급 안전 관리(에스크로 시스템)',
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* 안전모와 크레인 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 3c-1 0-2 1-2 2v1h4V5c0-1-1-2-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M10 5v2h4V5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 7h8v3H8V7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M10 8h4v2h-4V8z" />
        {/* 크레인 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 18v4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M6 18V6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M6 6h10" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M16 6v4" />
        <rect x="14" y="10" width="4" height="3" strokeWidth={1.6} rx="0.5" />
        {/* 클립보드 */}
        <rect x="17" y="13" width="3" height="4" strokeWidth={1.6} rx="0.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M18 14h1M18 15h1" />
      </svg>
    ),
    color: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    id: 'bim-analysis',
    title: '사업성 분석 및 BIM',
    slug: 'bim-analysis',
    description: '데이터 기반의 정확한 사업 계획',
    details: [
      '토지 법규 검토 및 최대 규모 산정',
      '3D BIM 기반의 설계 도면 시뮬레이션',
      '수익률 및 단계별 예상 공사비 분석',
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* 3D 건물 구조와 분석 그래프 */}
        <rect x="4" y="12" width="4" height="6" strokeWidth={1.6} rx="0.5" />
        <rect x="8" y="8" width="4" height="10" strokeWidth={1.6} rx="0.5" />
        <rect x="12" y="4" width="4" height="14" strokeWidth={1.6} rx="0.5" />
        {/* 3D 효과 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 8l2-2M12 4l2-2M16 12l2-2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 12l2 2M12 14l2 2M16 18l2 2" />
        {/* 분석 그래프 */}
        <rect x="18" y="14" width="2" height="4" strokeWidth={1.6} rx="0.5" />
        <rect x="20" y="10" width="2" height="8" strokeWidth={1.6} rx="0.5" />
        <rect x="22" y="6" width="2" height="12" strokeWidth={1.6} rx="0.5" />
        {/* 측정 도구 */}
        <circle cx="21" cy="5" r="1" strokeWidth={1.6} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M20 5h2M21 4v2" />
      </svg>
    ),
    color: 'bg-orange-50',
    textColor: 'text-orange-600',
  },
];

export default function SolutionCards() {
  return (
    <section className="pt-20 pb-20 bg-gray-50">
      <div className="max-w-container mx-auto px-5">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            건축의 시작부터 완공까지, 체계적으로
          </h2>
          <p className="text-lg text-gray-600">
            4가지 핵심 서비스로 투명하고 안전한 건축을 실현합니다
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution) => (
            <Link
              key={solution.id}
              href={`/solutions/${solution.slug}`}
              className="group bg-white p-8 rounded-card hover:shadow-soft-hover transition-all duration-120 border border-gray-100"
            >
              {/* 아이콘 */}
              <div className={`inline-flex w-16 h-16 ${solution.color} rounded-lg items-center justify-center ${solution.textColor} mb-6 group-hover:scale-105 transition-transform duration-120`}>
                {solution.icon}
              </div>

              {/* 제목 */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {solution.title}
              </h3>

              {/* 설명 */}
              <p className="text-gray-600 mb-6">
                {solution.description}
              </p>

              {/* 세부 기능 */}
              <ul className="space-y-2 mb-6">
                {solution.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg
                      className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>

              {/* 링크 */}
              <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all duration-120">
                <span>자세히 보기</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

