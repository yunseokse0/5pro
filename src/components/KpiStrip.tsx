'use client';

export default function KpiStrip() {
  const items = [
    { k: '95%', v: '견적 정확도', color: 'text-indigo-700' },
    { k: '30%', v: '평균 비용 절감', color: 'text-indigo-700' },
    { k: '200+', v: '완공 프로젝트', color: 'text-indigo-700' },
  ];

  return (
    <section className="px-6 md:px-12 py-12 bg-indigo-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            "지금 짓는 공장, 10년 뒤에도 경쟁력이 있을까요?"
          </h2>
          <p className="text-gray-700 mt-3">
            5PRO는 단순한 시공을 넘어<br className="sm:hidden" />
            설계–컨설팅–스마트 운영까지 모두 연결된 데이터 기반 솔루션으로<br className="hidden sm:block" />
            미래까지 준비하는 공장을 완성합니다.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6 text-center">
          {items.map((i) => (
            <div key={i.v} className="bg-white rounded-xl p-6 shadow-sm">
              <div className={`text-4xl md:text-5xl font-bold ${i.color}`}>{i.k}</div>
              <div className="text-gray-700 mt-2 font-medium">{i.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

