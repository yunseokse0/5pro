import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '서비스 - 오프로',
  description: '데이터와 시스템으로 성공적인 건축을 보장하는 오프로의 차별화된 4가지 건축 관리 서비스를 경험하세요.',
};

const services = [
  {
    id: 'transparent-quote',
    title: '투명한 견적 비교와 합리적인 공사비 예측',
    description: 'BIM 기반 정확한 물량 산출과 공개 입찰로 최적의 견적을 제공합니다',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* BIM 큐브 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 2l-8 4v8l8 4 8-4V6l-8-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 6v8M4 6l8 4 8-4" />
        {/* 화폐 기호 */}
        <circle cx="18" cy="18" r="4" strokeWidth={1.6} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M16 18h4M18 16v4" />
      </svg>
    ),
    features: [
      {
        title: '3D BIM 시뮬레이션',
        description: 'Building Information Modeling 기반의 3차원 설계 시뮬레이션을 통해 나사 하나까지 정확한 자재 수량을 산출합니다.',
      },
      {
        title: '공개 경쟁 입찰',
        description: '파트너 건설사들의 견적을 비교하고, 숨은 비용이 없는 최적의 견적 리포트를 제공합니다.',
      },
      {
        title: '공사비 절감 시뮬레이션',
        description: '자재 등급 및 시공 방식을 변경하는 시뮬레이션을 통해 공사비를 사전에 절감할 수 있습니다.',
      },
    ],
    color: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
  },
  {
    id: 'expert-matching',
    title: '실력부터 인성까지, 검증된 전문가 매칭 시스템',
    description: '3단계 검증을 통과한 신뢰할 수 있는 건축 전문가만 연결합니다',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* 방패 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 2L4 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4z" />
        {/* 체크마크 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4" />
        {/* 돋보기 */}
        <circle cx="18" cy="18" r="4" strokeWidth={1.6} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M21 21l-1.5-1.5" />
      </svg>
    ),
    features: [
      {
        title: '3단계 검증 시스템',
        description: '실력 있는 파트너 건설사, 건축사만 참여합니다. 시공 실적, 재무 상태, 현장 대리인 경력을 꼼꼼하게 확인합니다.',
      },
      {
        title: '투명한 정보 공개',
        description: '건설사의 시공 실적, 재무 상태, 현장 대리인 경력 등 투명한 정보를 공개하여 신뢰할 수 있는 선택을 돕습니다.',
      },
      {
        title: '맞춤형 파트너 추천',
        description: '건축 계획과 예산에 가장 적합한 맞춤형 파트너를 추천하고 연결합니다.',
      },
    ],
    color: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-600',
  },
  {
    id: 'safe-payment',
    title: '공사 대금 안전 관리 및 투명한 정산 시스템',
    description: '에스크로 시스템으로 부도와 유용 리스크를 원천 차단합니다',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* 금고 */}
        <rect x="4" y="8" width="16" height="12" strokeWidth={1.6} rx="2" />
        <circle cx="12" cy="14" r="2" strokeWidth={1.6} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 12v4" />
        {/* 자물쇠 */}
        <rect x="10" y="3" width="4" height="5" strokeWidth={1.6} rx="1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M10 5V3a2 2 0 014 0v2" />
      </svg>
    ),
    features: [
      {
        title: '우리은행 에스크로 계좌',
        description: '공사 대금을 우리은행 에스크로 계좌에 안전하게 예치하여 건축주의 자금을 보호합니다.',
      },
      {
        title: '공정 기반 직접 지급',
        description: '시공 진척도 검사(기성 검사)를 거쳐, 실제 시공된 만큼만 하도급에 직접 지급하여 부도 및 유용 리스크를 완벽 차단합니다.',
      },
      {
        title: '실시간 대금 현황 확인',
        description: '모바일 대시보드에서 대금 지급 내역과 잔금을 실시간으로 확인할 수 있습니다.',
      },
    ],
    color: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-600',
  },
  {
    id: 'real-time-transparency',
    title: '모바일로 확인하는 실시간 현장 투명 시스템',
    description: '전담 매니저의 일일 점검과 실시간 보고로 안심하세요',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* 모바일 */}
        <rect x="7" y="2" width="10" height="20" strokeWidth={1.6} rx="2" />
        <circle cx="12" cy="19" r="1" strokeWidth={1.6} />
        {/* 카메라 */}
        <rect x="9" y="6" width="6" height="4" strokeWidth={1.6} rx="1" />
        <circle cx="12" cy="8" r="1.5" strokeWidth={1.6} />
        {/* 체크 리포트 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 13h6M9 15h4" />
      </svg>
    ),
    features: [
      {
        title: '현장 전담 매니저',
        description: '현장 전담 매니저가 시공 품질과 공사 진척도를 매일 검사하고 보고서를 업로드합니다.',
      },
      {
        title: '모바일 대시보드',
        description: '건축주는 모바일 대시보드를 통해 현장 사진, 공사 일지 등을 언제든 확인할 수 있어 안심할 수 있습니다.',
      },
      {
        title: '사전 리스크 관리',
        description: '설계 변경, 하자 발생 등 리스크 요소를 사전에 파악하고 전문가가 즉시 개입하여 해결합니다.',
      },
    ],
    color: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 히어로 섹션 */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-container mx-auto px-5 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              데이터와 시스템으로
              <br />
              성공적인 건축을 보장합니다
            </h1>
            <p className="text-xl lg:text-2xl text-primary-100 mb-8 leading-relaxed">
              오프로만의 차별화된 4가지 건축 관리 서비스 솔루션을 경험해보세요.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-120 shadow-soft hover:shadow-soft-hover"
              >
                무료 상담 신청하기
              </Link>
              <Link
                href="/bim-demo"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-colors duration-120 border-2 border-white/30"
              >
                BIM 데모 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 상세 섹션 */}
      <section className="py-20">
        <div className="max-w-container mx-auto px-5">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* 아이콘 및 제목 섹션 */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className={`inline-flex w-24 h-24 ${service.color} rounded-2xl items-center justify-center ${service.textColor} mb-6`}>
                    {service.icon}
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <Link
                    href={service.id === 'transparent-quote' ? '/bim-demo' : '/contact'}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-120"
                  >
                    <span>자세히 알아보기</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* 특징 카드 섹션 */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className={`bg-white rounded-2xl shadow-soft-hover p-8 border-2 ${service.borderColor}`}>
                    <div className="space-y-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-4">
                          <div className={`w-8 h-8 ${service.color} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                            <span className={`font-bold ${service.textColor}`}>{featureIndex + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                              {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 왜 오프로인가? 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-container mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              왜 오프로를 선택해야 할까요?
            </h2>
            <p className="text-xl text-gray-600">
              건축의 시작부터 완공까지, 체계적인 시스템이 함께합니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-soft hover:shadow-soft-hover transition-all duration-120">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">검증된 신뢰</h3>
              <p className="text-gray-600 leading-relaxed">
                5,420건의 견적 요청과 1,250곳의 검증된 파트너가 증명하는 신뢰성
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-soft hover:shadow-soft-hover transition-all duration-120">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">공사비 절감</h3>
              <p className="text-gray-600 leading-relaxed">
                투명한 견적 비교와 BIM 시뮬레이션으로 평균 18% 공사비 절감
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-soft hover:shadow-soft-hover transition-all duration-120">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">완전 투명</h3>
              <p className="text-gray-600 leading-relaxed">
                실시간 현장 공개와 공정 기반 대금 관리로 숨길 것이 없습니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 최종 CTA 섹션 */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            오프로와 함께 건축을 시작하세요
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            지금 바로 무료 상담을 신청하고,
            <br />
            성공적인 건축의 첫걸음을 내딛으세요.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-10 py-4 bg-primary hover:bg-primary-hover text-white text-lg font-semibold rounded-lg transition-colors duration-120 shadow-soft hover:shadow-soft-hover"
            >
              무료 건축 견적 요청하기
            </Link>
            <Link
              href="/signup"
              className="px-10 py-4 bg-white hover:bg-gray-50 text-gray-900 text-lg font-medium rounded-lg transition-colors duration-120 border-2 border-gray-200"
            >
              건축 전문가로 등록하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

