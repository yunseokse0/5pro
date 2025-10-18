import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '솔루션 - 오프로',
  description: '견적 비교, 파트너 매칭, 공정 관리, 투명한 계약까지',
};

const solutions = [
  {
    id: 'line-sim',
    title: '원가·라인 시뮬레이션',
    slug: 'line-sim',
    description: 'CAPEX 가시화, 병목 제거',
    icon: '📊',
  },
  {
    id: 'haccp',
    title: 'HACCP·동선 검토',
    slug: 'haccp',
    description: '교차오염 리스크, 사전에 차단',
    icon: '🛡️',
  },
  {
    id: 'cm',
    title: 'CM·현장관리',
    slug: 'cm',
    description: '공정·품질·안전, 한 화면에서',
    icon: '✓',
  },
  {
    id: 'mes-wms',
    title: 'MES·WMS 연동',
    slug: 'mes-wms',
    description: '운영 데이터와 연결',
    icon: '🔗',
  },
];

export default function SolutionsPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* 히어로 */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-container mx-auto px-5">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            문제를 정확히 풉니다
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            4가지 핵심 솔루션으로 식품공장 프로젝트의 리스크를 줄이고 성과를 냅니다
          </p>
        </div>
      </section>

      {/* 솔루션 그리드 */}
      <section className="pt-20 pb-20">
        <div className="max-w-container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution) => (
              <Link
                key={solution.id}
                href={`/solutions/${solution.slug}`}
                className="group bg-white p-10 rounded-card hover:shadow-soft-hover transition-all duration-120 border-2 border-gray-100"
              >
                <div className="text-5xl mb-6">{solution.icon}</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {solution.title}
                </h2>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <div className="flex items-center gap-2 text-primary font-medium">
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
    </main>
  );
}

