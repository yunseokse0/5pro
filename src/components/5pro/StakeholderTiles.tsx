'use client';

const stakeholders = [
  {
    id: 'owner',
    title: '발주사',
    description: '예산·일정 안에서 공장 완성까지.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* 발주사 - 건물과 돈 */}
        <rect x="4" y="12" width="6" height="8" strokeWidth={1.6} rx="1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M6 14h2M6 16h2" />
        <rect x="14" y="14" width="4" height="6" strokeWidth={1.6} rx="1" />
        <circle cx="16" cy="16" r="1" strokeWidth={1.6} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M15 17h2" />
      </svg>
    ),
    features: [
      '타당성 검토부터 준공까지 원스톱',
      '투명한 원가 관리',
      '일정·품질 책임',
    ],
  },
  {
    id: 'design',
    title: '설계사',
    description: '위생 동선과 공정, 데이터로 협업.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* 설계사 - 도면과 컴퍼스 */}
        <rect x="3" y="6" width="12" height="12" strokeWidth={1.6} rx="1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M6 9h6M6 12h4M6 15h6" />
        <circle cx="18" cy="8" r="4" strokeWidth={1.6} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M18 6l2 2-2 2" />
      </svg>
    ),
    features: [
      'HACCP 동선 사전 반영',
      '3D 시뮬레이션 검토',
      '설비 배치 최적화',
    ],
  },
  {
    id: 'contractor',
    title: '시공사',
    description: '명확한 스펙, 공정·품질·안전 관리.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* 시공사 - 안전모와 크레인 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M6 8h12v2H6V8z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 6h8v2H8V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 2l-3 4 3 4 3-4-3-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M16 10v8" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M14 18l4-2" />
        <circle cx="18" cy="16" r="1.5" strokeWidth={1.6} />
      </svg>
    ),
    features: [
      '상세 시공 도면 제공',
      '주간 공정 회의',
      '안전·품질 체크리스트',
    ],
  },
];

export default function StakeholderTiles() {
  return (
    <section className="pt-20 pb-20 bg-gray-50">
      <div className="max-w-container mx-auto px-5">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            모두를 위한 파트너
          </h2>
          <p className="text-lg text-gray-600">
            발주사·설계사·시공사, 각자의 필요를 정확히 채웁니다
          </p>
        </div>

        {/* 타일 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stakeholders.map((stakeholder) => (
            <div
              key={stakeholder.id}
              className="group bg-white p-8 rounded-card hover:shadow-soft-hover transition-all duration-120 border border-gray-100"
            >
              {/* 아이콘 */}
              <div className="w-16 h-16 bg-primary-50 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-105 transition-transform duration-120">
                {stakeholder.icon}
              </div>

              {/* 제목 */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {stakeholder.title}
              </h3>

              {/* 설명 */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {stakeholder.description}
              </p>

              {/* 기능 목록 */}
              <ul className="space-y-3">
                {stakeholder.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

