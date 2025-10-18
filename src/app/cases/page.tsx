import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '건축사례 - 오프로',
  description: '5,420건 견적 요청이 증명합니다. 다양한 건축 프로젝트 사례를 확인하세요',
};

// 임시로 서버 사이드에서 데이터 로드 (실제로는 API나 DB에서)
async function getCases() {
  // 임시 데이터 반환
  return [
    {
      id: 'case1',
      title: '김치 제조장 HACCP 신규 인증',
      category: '김치·반찬',
      location: '경기 이천',
      description: '교차오염 제로, 5개월 만에 인증 완료',
      tags: ['HACCP', '신축', '동선최적화'],
      savings: '1.2억원 절감',
      duration: '5개월',
      client: '맛있는김치'
    },
    {
      id: 'case2',
      title: '냉동만두 라인 증설 프로젝트',
      category: '냉동식품',
      location: '충남 천안',
      description: '병목 제거로 생산량 2.3배 증가',
      tags: ['증설', '라인시뮬', '원가절감'],
      savings: '0.8억원 절감',
      duration: '3개월',
      client: '스마트식품'
    },
    {
      id: 'case3',
      title: '베이커리 공장 신축 프로젝트',
      category: '베이커리',
      location: '서울 강남',
      description: 'BIM 설계로 공사비 15% 절감, 4개월 완공',
      tags: ['신축', 'BIM', '원가절감'],
      savings: '2.1억원 절감',
      duration: '4개월',
      client: '프리미엄베이커리'
    },
    {
      id: 'case4',
      title: '유제품 공장 리모델링',
      category: '유제품',
      location: '경기 수원',
      description: '설비 교체와 동선 개선으로 효율성 40% 향상',
      tags: ['리모델링', '설비교체', '효율개선'],
      savings: '1.5억원 절감',
      duration: '6개월',
      client: '신선우유'
    },
    {
      id: 'case5',
      title: '건강식품 제조 공장',
      category: '건강식품',
      location: '대전 유성',
      description: 'GMP 인증과 함께 완벽한 청정실 구축',
      tags: ['GMP', '청정실', '신축'],
      savings: '1.8억원 절감',
      duration: '7개월',
      client: '헬시푸드'
    },
    {
      id: 'case6',
      title: '냉동식품 창고 증설',
      category: '냉동식품',
      location: '부산 해운대',
      description: '냉동설비 최적화로 운영비 25% 절감',
      tags: ['창고증설', '냉동설비', '운영비절감'],
      savings: '0.9억원 절감',
      duration: '3개월',
      client: '프리즈푸드'
    }
  ];
}

export default async function CasesPage() {
  const cases = await getCases();

  return (
    <main className="min-h-screen pt-16">
      {/* 히어로 */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-container mx-auto px-5">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            해보시죠
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            5,420건 견적 요청이 증명합니다. 다양한 건축 프로젝트 사례를 확인하세요.
          </p>
        </div>
      </section>

      {/* 사례 그리드 */}
      <section className="pt-12 pb-20">
        <div className="max-w-container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((caseItem) => (
              <Link
                key={caseItem.id}
                href={`/cases/${caseItem.id}`}
                className="group bg-white rounded-card overflow-hidden border border-gray-100 hover:shadow-soft-hover transition-all duration-120"
              >
                <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">이미지 준비 중</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-xs font-medium text-primary">
                      {caseItem.category}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600">{caseItem.savings}</div>
                      <div className="text-xs text-gray-500">{caseItem.duration}</div>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {caseItem.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">{caseItem.description}</p>
                  <div className="text-xs text-gray-500 mb-4">고객: {caseItem.client}</div>
                  <div className="flex flex-wrap gap-2">
                    {caseItem.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

