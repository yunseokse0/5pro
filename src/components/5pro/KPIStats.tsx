'use client';

import { useEffect, useState, useRef } from 'react';

interface Stat {
  id: string;
  label: string;
  value: number;
  unit: string;
  suffix: string;
  description: string;
}

export default function KPIStats() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/data/kpi.json')
      .then((res) => res.json())
      .then((data) => setStats(data.stats || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const AnimatedNumber = ({ value, unit }: { value: number; unit: string }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 1500;
      const steps = 60;
      const increment = value / steps;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        if (step >= steps) {
          setCurrent(value);
          clearInterval(timer);
        } else {
          setCurrent(Math.floor(increment * step));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }, [isVisible, value]);

    return (
      <span className="text-5xl font-bold text-gray-900">
        {current.toLocaleString()}
        <span className="text-3xl text-gray-700 ml-1">{unit}</span>
      </span>
    );
  };

  return (
    <section ref={sectionRef} className="pt-20 pb-20 bg-primary text-white relative overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-container mx-auto px-5 relative z-10">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            건축의 모든 과정, 실시간으로 투명하게 공개됩니다.
          </h2>
          <p className="text-lg text-primary-100">
            오프로만의 프로젝트 관리 대시보드를 통해 현장 사진, 공정률, 대금 지급 현황까지 모바일로 실시간 확인하세요.
          </p>
        </div>

        {/* 통계 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="mb-4">
                <AnimatedNumber value={stat.value} unit={stat.unit} />
              </div>
              <div className="text-xl font-medium mb-2">{stat.label}</div>
              <div className="text-sm text-primary-100">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* 프로젝트 관리 대시보드 목업 */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-soft-hover p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">프로젝트 관리 대시보드</h3>
              <p className="text-gray-600">실시간 투명 관리 시스템</p>
            </div>

            {/* 대시보드 목업 내용 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 왼쪽: 공정률 및 마일스톤 */}
              <div className="space-y-6">
                {/* 공정률 그래프 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">공정률</h4>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-24 h-24 relative">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-gray-200"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.65)}`}
                          className="text-green-500"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900">65%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">전체 공정률</p>
                      <p className="text-lg font-semibold text-gray-900">65% 완료</p>
                    </div>
                  </div>
                </div>

                {/* 주요 마일스톤 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">다음 마일스톤</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">골조 완료</span>
                      <span className="text-sm font-medium text-gray-900">2024.03.15</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">마감 시작</span>
                      <span className="text-sm font-medium text-gray-900">2024.04.01</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-600">준공 예정</span>
                      <span className="text-sm font-medium text-gray-900">2024.06.30</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 오른쪽: 현장 사진 및 대금 현황 */}
              <div className="space-y-6">
                {/* 현장 사진 갤러리 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">최근 현장 사진</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">숨길 것이 없습니다</p>
                </div>

                {/* 대금 지급 현황 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">대금 지급 현황</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">총 공사비</span>
                      <span className="font-semibold text-gray-900">3억 5천만원</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">지급 완료</span>
                      <span className="font-semibold text-green-600">2억 2천만원</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">잔여 금액</span>
                      <span className="font-semibold text-orange-600">1억 3천만원</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '63%'}}></div>
                    </div>
                    <p className="text-xs text-gray-500 text-center">63% 지급 완료</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA 버튼 */}
            <div className="text-center mt-8">
              <button className="px-8 py-3 bg-white hover:bg-gray-50 text-primary font-semibold rounded-lg transition-colors duration-120 border-2 border-white">
                내 프로젝트 투명 관리 기능 미리보기
              </button>
            </div>
          </div>
        </div>

        {/* 핵심 시스템 블록 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-card p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">실명 확인된 파트너</h3>
            <p className="text-primary-100 text-sm leading-relaxed">
              까다로운 검증을 통과한 실력파 건설사만 매칭됩니다.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-card p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">공정별 대금 지급 시스템</h3>
            <p className="text-primary-100 text-sm leading-relaxed">
              공사 진척도에 따라 안전하게 대금이 지급됩니다.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-card p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">객관적인 견적 비교 리포트</h3>
            <p className="text-primary-100 text-sm leading-relaxed">
              상세하고 객관적인 분석으로 숨은 비용을 확인합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

