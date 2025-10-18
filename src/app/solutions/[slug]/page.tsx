import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const solutions: Record<string, {
  title: string;
  description: string;
  details: string[];
  benefits: string[];
}> = {
  'line-sim': {
    title: '원가·라인 시뮬레이션',
    description: 'CAPEX를 가시화하고 생산 라인의 병목을 제거합니다',
    details: [
      '설비·공사비 명세표 자동 생성',
      '공정별 생산량·대기시간 시뮬레이션',
      '투자 시나리오 3안 비교',
      '라인 밸런싱 최적화',
    ],
    benefits: [
      '투자 의사결정 명확화',
      '생산 효율 향상',
      '병목 구간 사전 제거',
      'ROI 예측 정확도 향상',
    ],
  },
  'haccp': {
    title: 'HACCP·동선 검토',
    description: '교차오염 리스크를 사전에 차단하고 인증을 지원합니다',
    details: [
      '청결·준청결·일반구역 구획 설계',
      '원료→완제품 흐름 검증',
      '인증 심사 대비 체크리스트',
      '현장 실사 및 개선안 제시',
    ],
    benefits: [
      'HACCP 인증 통과율 100%',
      '교차오염 리스크 제로',
      '인증 기간 단축',
      '재심사 대비 시간 절약',
    ],
  },
  'cm': {
    title: 'CM·현장관리',
    description: '공정·품질·안전을 한 화면에서 통합 관리합니다',
    details: [
      '주간 공정률 모니터링',
      '품질·안전 체크리스트 관리',
      '변경·지연 사항 즉시 보고',
      '시공사 협력 커뮤니케이션',
    ],
    benefits: [
      '공정 지연 최소화',
      '품질 이슈 조기 발견',
      '안전사고 예방',
      '투명한 현장 관리',
    ],
  },
  'mes-wms': {
    title: 'MES·WMS 연동',
    description: '생산·재고·출하 데이터를 실시간으로 통합합니다',
    details: [
      '생산·재고·출하 실시간 집계',
      '기존 ERP와 양방향 연동',
      '모바일 대시보드 제공',
      '데이터 기반 의사결정 지원',
    ],
    benefits: [
      '재고 정확도 향상',
      '생산 효율 모니터링',
      '데이터 수기 입력 제거',
      '실시간 현황 파악',
    ],
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const solution = solutions[params.slug];
  if (!solution) {
    return {
      title: '솔루션을 찾을 수 없습니다',
    };
  }

  return {
    title: `${solution.title} - 오프로`,
    description: solution.description,
  };
}

export default function SolutionDetailPage({ params }: { params: { slug: string } }) {
  const solution = solutions[params.slug];

  if (!solution) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-16">
      {/* 히어로 */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[900px] mx-auto px-5">
          <Link href="/solutions" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>솔루션 목록</span>
          </Link>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {solution.title}
          </h1>
          <p className="text-xl text-gray-600">
            {solution.description}
          </p>
        </div>
      </section>

      {/* 내용 */}
      <section className="pt-20 pb-20">
        <div className="max-w-[900px] mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-12">
            {/* 주요 기능 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">주요 기능</h2>
              <ul className="space-y-4">
                {solution.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 기대 효과 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">기대 효과</h2>
              <ul className="space-y-4">
                {solution.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 p-10 bg-gray-50 rounded-card text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              프로젝트에 적용해보세요
            </h3>
            <p className="text-gray-600 mb-6">
              전문가와 상담하고 맞춤형 제안을 받아보세요
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors duration-120"
            >
              상담 신청하기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

