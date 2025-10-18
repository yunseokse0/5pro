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
        {/* 성장하는 막대 그래프와 화폐 기호 */}
        <rect x="3" y="16" width="3" height="5" strokeWidth={1.6} rx="1" />
        <rect x="7" y="12" width="3" height="9" strokeWidth={1.6} rx="1" />
        <rect x="11" y="8" width="3" height="13" strokeWidth={1.6} rx="1" />
        <rect x="15" y="4" width="3" height="17" strokeWidth={1.6} rx="1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M18 2h3v3" />
        <circle cx="20" cy="4" r="1.5" strokeWidth={1.6} />
        <text x="20" y="5.5" fontSize="6" textAnchor="middle" fill="currentColor">₩</text>
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
        {/* 건물 위에 방패와 체크마크 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M6 18h12v2H6v-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 18V8h6v10" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M10 12h4M10 14h4" />
        {/* 방패 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 4l2 2-2 2-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 6l1 1-1 1-1-1z" />
        {/* 체크마크 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 15l1.5 1.5L15 12" />
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
        {/* 안전모, 클립보드, 크레인 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 8h8v2H8V8z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M10 6h4v2h-4V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 2l-2 4 2 4 2-4-2-4z" />
        {/* 클립보드 */}
        <rect x="14" y="4" width="4" height="6" strokeWidth={1.6} rx="0.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M15 6h2M15 7h2" />
        {/* 크레인 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M18 10v6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M16 16l4-2" />
        <circle cx="20" cy="14" r="1" strokeWidth={1.6} />
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
        {/* 3D 큐브와 설계도 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 2l-8 4v8l8 4 8-4V6l-8-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 6v8" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 6l8 4 8-4" />
        {/* 측정 도구 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M18 18h4v4h-4v-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19 19l2 2" />
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

