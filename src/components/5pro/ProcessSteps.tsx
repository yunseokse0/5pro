'use client';

const steps = [
  {
    id: 1,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* 견적 요청 - 문서와 계산기 */}
        <rect x="6" y="4" width="8" height="10" strokeWidth={1.6} rx="1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 7h4M8 9h3" />
        <rect x="16" y="6" width="4" height="6" strokeWidth={1.6} rx="0.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17 8h2M17 9h2" />
      </svg>
    ),
    title: '견적 요청',
    description: '간단하게 건축 정보 입력 및 견적 요청',
  },
  {
    id: 2,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* 파트너 선택 - 건물들과 화살표 */}
        <rect x="3" y="14" width="4" height="6" strokeWidth={1.6} rx="0.5" />
        <rect x="9" y="12" width="4" height="8" strokeWidth={1.6} rx="0.5" />
        <rect x="15" y="10" width="4" height="10" strokeWidth={1.6} rx="0.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M7 16h2M11 16h2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l2-1 2 1M13 11l2-1 2 1" />
      </svg>
    ),
    title: '파트너 선택',
    description: '최적의 조건과 실력의 파트너 비교 및 선택',
  },
  {
    id: 3,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* 안전한 진행 - 방패와 체크마크 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 2L8 6l4 4 4-4-4-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 10h8v6a2 2 0 01-2 2H10a2 2 0 01-2-2v-6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 13l1.5 1.5L15 11" />
        <circle cx="12" cy="18" r="2" strokeWidth={1.6} />
      </svg>
    ),
    title: '안전한 진행',
    description: '투명한 공정 관리와 안전한 계약 진행',
  },
];

export default function ProcessSteps() {
  return (
    <section className="pt-20 pb-20 bg-white">
      <div className="max-w-container mx-auto px-5">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            간편한 3단계 프로세스
          </h2>
          <p className="text-lg text-gray-600">
            견적 요청부터 완공까지, 투명하고 안전하게
          </p>
        </div>

        {/* 스텝 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative group"
            >
              {/* 연결선 (데스크톱에서만, 마지막 제외) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-gray-200 -translate-x-1/2 group-last:hidden" />
              )}

              <div className="relative bg-white p-8 rounded-card border-2 border-gray-100 hover:border-primary-100 hover:shadow-soft transition-all duration-120">
                {/* 번호 배지 */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-white text-sm font-bold rounded-full flex items-center justify-center shadow-soft">
                  {step.id}
                </div>

                {/* 아이콘 */}
                <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center text-gray-700 mb-4">
                  {step.icon}
                </div>

                {/* 제목 */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>

                {/* 설명 */}
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

