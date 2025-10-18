import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '건축사례 상세 - 오프로',
  description: '오프로와 함께한 성공적인 건축 프로젝트 사례를 확인하세요',
};

// 임시 데이터 (실제로는 API나 DB에서)
async function getCaseDetail(slug: string) {
  const cases = {
    'case1': {
      id: 'case1',
      title: '김치 제조장 HACCP 신규 인증',
      category: '김치·반찬',
      location: '경기 이천',
      client: '맛있는김치 (주)',
      projectManager: '김건축',
      duration: '5개월',
      budget: '8억원',
      savings: '1.2억원',
      description: '교차오염 제로, 5개월 만에 인증 완료',
      tags: ['HACCP', '신축', '동선최적화'],
      story: {
        problem: '기존 공장에서 교차오염 위험과 HACCP 인증 실패로 인한 영업 중단 위기',
        solution: '오프로의 BIM 기반 동선 최적화와 HACCP 인증 전문가 매칭으로 완벽한 해결',
        result: '5개월 만에 HACCP 인증 완료, 생산 효율 30% 향상, 안전성 확보'
      },
      progress: {
        current: 100,
        milestones: [
          { name: '기초 공사', date: '2024-01-15', status: 'completed' },
          { name: '골조 공사', date: '2024-02-28', status: 'completed' },
          { name: '설비 설치', date: '2024-04-10', status: 'completed' },
          { name: 'HACCP 인증', date: '2024-05-30', status: 'completed' }
        ]
      },
      payment: {
        total: 800000000,
        paid: 800000000,
        remaining: 0
      },
      images: [
        { url: '/images/cases/case1/1.jpg', caption: '기초 공사 현장' },
        { url: '/images/cases/case1/2.jpg', caption: '골조 완성' },
        { url: '/images/cases/case1/3.jpg', caption: '설비 설치' },
        { url: '/images/cases/case1/4.jpg', caption: '최종 완성' }
      ],
      testimonial: {
        quote: '오프로 덕분에 HACCP 인증을 빠르게 받을 수 있었고, 투명한 공정 관리로 안심하고 진행할 수 있었습니다.',
        author: '맛있는김치 대표이사',
        rating: 5
      }
    },
    'case2': {
      id: 'case2',
      title: '냉동만두 라인 증설 프로젝트',
      category: '냉동식품',
      location: '충남 천안',
      client: '스마트식품 (주)',
      projectManager: '이건설',
      duration: '3개월',
      budget: '5억원',
      savings: '0.8억원',
      description: '병목 제거로 생산량 2.3배 증가',
      tags: ['증설', '라인시뮬', '원가절감'],
      story: {
        problem: '기존 생산라인의 병목 현상으로 인한 생산량 제한과 고객 주문 대응 어려움',
        solution: '오프로의 라인 시뮬레이션으로 최적 설비 배치 설계, 전문 시공사 매칭으로 효율적 증설',
        result: '생산량 2.3배 증가, 에너지 효율 25% 개선, 투자 회수 기간 단축'
      },
      progress: {
        current: 100,
        milestones: [
          { name: '기존 라인 분석', date: '2024-02-01', status: 'completed' },
          { name: '설계 및 시뮬레이션', date: '2024-02-15', status: 'completed' },
          { name: '증설 공사', date: '2024-04-01', status: 'completed' },
          { name: '시운전 및 완료', date: '2024-05-01', status: 'completed' }
        ]
      },
      payment: {
        total: 500000000,
        paid: 500000000,
        remaining: 0
      },
      images: [
        { url: '/images/cases/case2/1.jpg', caption: '기존 라인 분석' },
        { url: '/images/cases/case2/2.jpg', caption: '증설 공사 진행' },
        { url: '/images/cases/case2/3.jpg', caption: '새 라인 설치' },
        { url: '/images/cases/case2/4.jpg', caption: '완성된 생산라인' }
      ],
      testimonial: {
        quote: '라인 시뮬레이션을 통해 최적의 설비 배치를 미리 확인할 수 있어서 매우 만족합니다.',
        author: '스마트식품 생산팀장',
        rating: 5
      }
    },
    'case3': {
      id: 'case3',
      title: '베이커리 공장 신축 프로젝트',
      category: '베이커리',
      location: '서울 강남',
      client: '프리미엄베이커리 (주)',
      projectManager: '박건설',
      duration: '4개월',
      budget: '14억원',
      savings: '2.1억원',
      description: 'BIM 설계로 공사비 15% 절감, 4개월 완공',
      tags: ['신축', 'BIM', '원가절감'],
      story: {
        problem: '기존 임대 공장의 제약으로 인한 생산성 저하와 확장 불가능성',
        solution: '오프로의 BIM 설계로 최적의 공간 활용과 설비 배치, 투명한 견적 비교로 공사비 절감',
        result: 'BIM 설계로 공사비 15% 절감, 생산 효율 35% 향상, 4개월 만에 완공'
      },
      progress: {
        current: 100,
        milestones: [
          { name: 'BIM 설계', date: '2024-01-01', status: 'completed' },
          { name: '기초 공사', date: '2024-02-01', status: 'completed' },
          { name: '골조 및 설비', date: '2024-03-15', status: 'completed' },
          { name: '마감 및 완공', date: '2024-05-01', status: 'completed' }
        ]
      },
      payment: {
        total: 1400000000,
        paid: 1400000000,
        remaining: 0
      },
      images: [
        { url: '/images/cases/case3/1.jpg', caption: 'BIM 설계 모델' },
        { url: '/images/cases/case3/2.jpg', caption: '기초 공사 현장' },
        { url: '/images/cases/case3/3.jpg', caption: '설비 설치' },
        { url: '/images/cases/case3/4.jpg', caption: '완성된 베이커리' }
      ],
      testimonial: {
        quote: 'BIM 설계 덕분에 공사비를 크게 절감할 수 있었고, 투명한 관리로 안심하고 진행했습니다.',
        author: '프리미엄베이커리 대표',
        rating: 5
      }
    }
  };

  return cases[slug as keyof typeof cases] || null;
}

export default async function CaseDetailPage({ params }: { params: { slug: string } }) {
  const caseDetail = await getCaseDetail(params.slug);

  if (!caseDetail) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">사례를 찾을 수 없습니다</h1>
          <Link href="/cases" className="text-primary hover:underline">
            사례 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const progressPercentage = caseDetail.progress.current;

  return (
    <main className="min-h-screen pt-16">
      {/* 헤더 */}
      <section className="pt-20 pb-16 bg-white">
        <div className="max-w-container mx-auto px-5">
          <div className="max-w-4xl">
            <div className="mb-6">
              <Link href="/cases" className="text-primary hover:underline text-sm">
                ← 건축사례 목록
              </Link>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {caseDetail.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                {caseDetail.category}
              </span>
              <span>📍 {caseDetail.location}</span>
              <span>👤 {caseDetail.client}</span>
              <span>📅 {caseDetail.duration}</span>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed">
              {caseDetail.description}
            </p>
          </div>
        </div>
      </section>

      {/* 핵심 지표 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-container mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{caseDetail.budget}</div>
              <div className="text-sm text-gray-600">총 공사비</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{caseDetail.savings}</div>
              <div className="text-sm text-gray-600">절감 효과</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{caseDetail.duration}</div>
              <div className="text-sm text-gray-600">공사 기간</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{progressPercentage}%</div>
              <div className="text-sm text-gray-600">완료율</div>
            </div>
          </div>
        </div>
      </section>

      {/* 프로젝트 스토리 */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-5">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              건축주님의 고민과 오프로의 해결 과정
            </h2>
            
            <div className="space-y-12">
              {/* 문제 */}
              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-red-800 mb-4">🤔 프로젝트 시작 전 고민</h3>
                <p className="text-gray-700 leading-relaxed">{caseDetail.story.problem}</p>
              </div>

              {/* 해결책 */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-4">💡 오프로의 해결책</h3>
                <p className="text-gray-700 leading-relaxed">{caseDetail.story.solution}</p>
              </div>

              {/* 결과 */}
              <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-green-800 mb-4">🎉 최종 결과</h3>
                <p className="text-gray-700 leading-relaxed">{caseDetail.story.result}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 투명 관리 대시보드 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-container mx-auto px-5">
          <div className="max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              모든 과정은 투명하게, 오프로 프로젝트 관리 시스템
            </h2>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* 공정률 섹션 */}
              <div className="bg-white rounded-card p-6 shadow-soft">
                <h3 className="text-xl font-bold text-gray-900 mb-6">📊 실시간 공정률</h3>
                <div className="text-center mb-6">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#1A2DFF"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${progressPercentage * 2.51} 251`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">{progressPercentage}%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {caseDetail.progress.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{milestone.name}</span>
                      <div className="flex items-center">
                        {milestone.status === 'completed' ? (
                          <span className="text-green-600 text-sm">✓ 완료</span>
                        ) : (
                          <span className="text-gray-400 text-sm">진행중</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 대금 지급 현황 */}
              <div className="bg-white rounded-card p-6 shadow-soft">
                <h3 className="text-xl font-bold text-gray-900 mb-6">💰 대금 지급 현황</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">총 공사비</span>
                    <span className="font-bold text-gray-900">{caseDetail.budget}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">지급 완료</span>
                    <span className="font-bold text-green-600">{caseDetail.budget}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">잔여 금액</span>
                    <span className="font-bold text-gray-400">0원</span>
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-sm text-blue-800 font-medium">에스크로 안전 관리 완료</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 프로젝트 매니저 */}
              <div className="bg-white rounded-card p-6 shadow-soft">
                <h3 className="text-xl font-bold text-gray-900 mb-6">👨‍💼 전담 매니저</h3>
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👨‍💼</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{caseDetail.projectManager}</h4>
                  <p className="text-sm text-gray-600 mb-4">프로젝트 매니저</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span>실시간 현장 점검</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      <span>일일 진행 보고</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      <span>리스크 사전 관리</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 현장 투명 공개 */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-5">
          <div className="max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              현장 투명 공개 - 숨길 것이 없습니다
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {caseDetail.images.map((image, index) => (
                <div key={index} className="group">
                  <div className="aspect-square bg-gray-100 rounded-card overflow-hidden mb-3">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-sm">이미지 준비 중</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">{image.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 고객 후기 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-container mx-auto px-5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">고객 후기</h2>
            <div className="bg-white rounded-card p-8 shadow-soft">
              <div className="flex justify-center mb-4">
                {[...Array(caseDetail.testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed">
                "{caseDetail.testimonial.quote}"
              </blockquote>
              <cite className="text-gray-600 font-medium">
                - {caseDetail.testimonial.author}
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-container mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold mb-6">나의 건축 프로젝트 시작하기</h2>
          <p className="text-xl mb-8 opacity-90">
            오프로와 함께 투명하고 안전한 건축 프로젝트를 경험해보세요
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-120 shadow-soft hover:shadow-soft-hover"
          >
            <span>무료 견적 요청하기</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
