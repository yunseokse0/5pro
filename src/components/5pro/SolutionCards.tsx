'use client';

import Link from 'next/link';

const solutions = [
  {
    id: 'line-sim',
    title: '원가·라인 시뮬레이션',
    slug: 'line-sim',
    description: 'CAPEX 가시화, 병목 제거',
    details: [
      '설비·공사비 명세표 자동 생성',
      '공정별 생산량·대기시간 시뮬',
      '투자 시나리오 3안 비교',
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
    id: 'haccp',
    title: 'HACCP·동선 검토',
    slug: 'haccp',
    description: '교차오염 리스크, 사전에 차단',
    details: [
      '청결·준청결·일반구역 구획',
      '원료→완제품 흐름 검증',
      '인증 심사 대비 체크리스트',
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
    id: 'cm',
    title: 'CM·현장관리',
    slug: 'cm',
    description: '공정·품질·안전, 한 화면에서',
    details: [
      '주간 공정률 모니터링',
      '품질·안전 체크리스트 관리',
      '변경·지연 사항 즉시 보고',
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
    id: 'mes-wms',
    title: 'MES·WMS 연동',
    slug: 'mes-wms',
    description: '운영 데이터와 연결',
    details: [
      '생산·재고·출하 실시간 집계',
      '기존 ERP와 양방향 연동',
      '모바일 대시보드 제공',
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* 클라우드와 연결된 시스템들 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M15 13l-3 3-3-3" />
        {/* 연결된 시스템 박스들 */}
        <rect x="4" y="8" width="4" height="3" strokeWidth={1.6} rx="0.5" />
        <rect x="16" y="8" width="4" height="3" strokeWidth={1.6} rx="0.5" />
        {/* 연결 화살표 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 9.5h2M14 9.5h2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M10 9.5l2-1M14 9.5l-2-1" />
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
            문제를 정확히 풉니다
          </h2>
          <p className="text-lg text-gray-600">
            4가지 핵심 솔루션으로 리스크를 줄이고 성과를 냅니다
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

