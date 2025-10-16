'use client';

import Link from 'next/link';
import { ArrowRight, Calculator, Zap, TrendingDown, CheckCircle2, Cpu, BarChart3, Wifi, Shield, Building2, FileSignature, Gauge, Users2, ShieldCheck, Box, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#101828] via-[#1e3a8a] to-[#6A5AE0] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                💡 스마트 견적 시스템
              </div>
                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                    짓는 것에서 멈추지 않습니다.
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                      '운영까지 설계하는' 식품공장 솔루션
                    </span>
                  </h1>
                  <p className="text-xl text-gray-200 leading-relaxed">
                    설계, HACCP 컨설팅, 시공, 그리고 스마트팩토리 시스템까지.
                    <br />
                    5PRO는 공장의 시작부터 미래 운영 효율까지 함께 설계합니다.
                    <br />
                    데이터 기반 견적과 20년 현장 노하우로, 더 정확하고 효율적인 공장을 만들어 드립니다.
                  </p>
              <div className="inline-block px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full text-sm border border-purple-300/30 mb-4">
                <span className="text-purple-200">HACCP 컨설팅 제공</span>
              </div>
              <p className="text-sm text-blue-200 mb-6">
                컨설팅(자문·교육·사전점검)을 통해 함께 준비합니다.
              </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/estimate">
                      <button className="w-full px-8 py-4 bg-white text-[#101828] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                        <Calculator className="inline-block w-5 h-5 mr-2" />
                        즉시 견적 보기
                        <ArrowRight className="inline-block w-5 h-5 ml-2" />
                      </button>
                    </Link>
                    <Link href="/consulting">
                      <button className="w-full px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                        전문가 상담 신청
                        <ArrowRight className="inline-block w-5 h-5 ml-2" />
                      </button>
                    </Link>
                    <Link href="/smart-factory">
                      <button className="w-full px-8 py-4 bg-purple-500/20 backdrop-blur-sm text-white border-2 border-purple-300/30 rounded-xl font-bold text-lg hover:bg-purple-500/30 transition-all">
                        스마트팩토리 데모 보기
                        <ArrowRight className="inline-block w-5 h-5 ml-2" />
                      </button>
                    </Link>
                    <Link href="/estimate">
                      <button className="w-full px-8 py-4 bg-orange-500/20 backdrop-blur-sm text-white border-2 border-orange-300/30 rounded-xl font-bold text-lg hover:bg-orange-500/30 transition-all">
                        운영 효율 시뮬레이션 받기
                        <ArrowRight className="inline-block w-5 h-5 ml-2" />
                      </button>
                    </Link>
                  </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-30"></div>
                <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 p-6 rounded-2xl">
                      <div className="text-4xl font-bold">200+</div>
                      <div className="text-sm text-gray-200 mt-2">완공 프로젝트</div>
                    </div>
                    <div className="bg-white/10 p-6 rounded-2xl">
                      <div className="text-4xl font-bold">95%</div>
                      <div className="text-sm text-gray-200 mt-2">견적 정확도</div>
                    </div>
                    <div className="bg-white/10 p-6 rounded-2xl">
                      <div className="text-4xl font-bold">30%</div>
                      <div className="text-sm text-gray-200 mt-2">비용 절감</div>
                    </div>
                    <div className="bg-white/10 p-6 rounded-2xl">
                      <div className="text-4xl font-bold">24/7</div>
                      <div className="text-sm text-gray-200 mt-2">실시간 모니터링</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 강점 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#101828] mb-4">
              5PRO의 핵심 가치
            </h2>
            <p className="text-xl text-gray-600">
              미래형 식품공장 플랫폼으로 설립부터 운영까지 통합 지원합니다
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#101828]">데이터 기반 견적</h3>
              <p className="text-gray-600 leading-relaxed">
                AI 분석을 통한 95% 정확도의 비용 예측으로 불확실성을 줄입니다
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#101828]">HACCP 컨설팅 전문성</h3>
              <p className="text-gray-600 leading-relaxed">
                현장 진단부터 문서 코칭, 모의심사까지 체계적인 준비를 지원합니다
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl border border-orange-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-6">
                <Cpu className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#101828]">스마트팩토리 통합 시스템</h3>
              <p className="text-gray-600 leading-relaxed">
                생산·품질·재고를 실시간으로 연결해 운영 효율을 극대화합니다
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl border border-purple-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#101828]">지속 가능한 효율성</h3>
              <p className="text-gray-600 leading-relaxed">
                설립 이후 10년 이상 안정적으로 유지되는 데이터 기반 운영 구조를 제공합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 문구 예시 */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-12 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#101828] mb-8">
              "지금 짓는 공장, 10년 뒤에도 경쟁력이 있을까요?"
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                5PRO는 단순한 시공을 넘어<br />
                설계–컨설팅–스마트 운영까지 모두 연결된 데이터 기반 솔루션으로<br />
                미래까지 준비하는 공장을 완성합니다.
              </p>
            </div>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-700">AI 견적 정확도</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">20년</div>
                <div className="text-gray-700">현장 노하우</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">10년+</div>
                <div className="text-gray-700">지속 운영 효율</div>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/estimate">
                <button className="px-8 py-4 bg-gradient-to-r from-[#007AFF] to-[#6A5AE0] text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                  <Calculator className="inline-block w-5 h-5 mr-2" />
                  AI 기반 입력으로 1분 만에 맞춤 견적 확인
                  <ArrowRight className="inline-block w-5 h-5 ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HACCP 컨설팅 섹션 */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-bold mb-4">
              HACCP 컨설팅
            </div>
            <h2 className="text-4xl font-bold text-[#101828] mb-4">
              전문가와 함께하는 HACCP 준비
            </h2>
            <p className="text-xl text-gray-600 mb-2">
              체계적인 컨설팅으로 성공적인 인증을 달성하세요
            </p>
            <p className="text-sm text-gray-500">
              함께 준비하고, 스스로 성공하는 인증 준비 과정
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center justify-center">
              <span className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">
                ✅
              </span>
              우리가 제공하는 컨설팅 서비스
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {[
                  '초기 진단 & 갭 분석 (현장/프로세스/문서 수준)',
                  'HACCP 플로우차트/공정 FMEA/PRP 체크리스트 코칭',
                  '문서 템플릿 제공 & 작성 코칭 (표준서·절차서·기록지)',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {[
                  '사전 모의심사(Pre-Audit) 및 개선안 제시',
                  '내부교육·정기 점검 방법론 제공',
                  '설계/동선/자재·인원 흐름 컨설팅 (시뮬레이터 연동)',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 p-6 bg-white/70 rounded-xl text-center">
              <p className="text-lg text-gray-800 font-medium mb-2">
                💡 함께 준비하는 컨설팅
              </p>
              <p className="text-sm text-gray-600">
                전문가가 옆에서 가이드하며, 귀하의 팀이 직접 실행할 수 있도록 돕습니다
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/consulting">
              <span className="text-blue-600 hover:text-blue-700 font-medium underline">
                HACCP 컨설팅 자세히 보기 →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 스마트 팩토리 솔루션 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-bold text-blue-800 mb-4">
              🏭 스마트 팩토리 솔루션
            </div>
            <h2 className="text-4xl font-bold text-[#101828] mb-4">
              4차 산업혁명 시대의
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                지능형 공장 구축
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              IoT, AI, 빅데이터를 활용한 스마트 팩토리로 생산성과 품질을 동시에 향상시키세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                icon: Cpu,
                title: 'IoT 센서 시스템',
                desc: '실시간 데이터 수집 및 모니터링',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: BarChart3,
                title: 'AI 데이터 분석',
                desc: '지능형 생산성 분석 및 예측',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: Wifi,
                title: '무선 통신 네트워크',
                desc: '안정적인 산업용 무선 인프라',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: Shield,
                title: '보안 시스템',
                desc: '사이버 보안 및 물리적 보안',
                color: 'from-orange-500 to-orange-600'
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#101828] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">30%</div>
                <div className="text-gray-700">생산성 향상</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">50%</div>
                <div className="text-gray-700">고장률 감소</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">25%</div>
                <div className="text-gray-700">에너지 비용 절약</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/smart-factory">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <Cpu className="inline-block w-5 h-5 mr-2" />
                스마트 팩토리 자세히 보기
                <ArrowRight className="inline-block w-5 h-5 ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 서비스 프로세스 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#101828] mb-4">
              한 번의 설립, 10년의 운영 효율을 설계하다
            </h2>
            <p className="text-xl text-gray-600">
              5PRO의 5단계 프로세스는 공장 설립에서 운영 자동화까지<br />
              모두 고려한 "스마트팩토리 구축 여정"입니다.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: '1', title: 'AI 견적 요청', desc: '입력값만으로 95% 정확도의 자동 견적 생성\n불필요한 추가 비용 없이 명확한 초기 예산 수립', icon: Calculator },
              { step: '2', title: '3D 설계 & 스마트 시스템 구상', desc: '단순 도면이 아닌 운영 효율을 포함한 공정 설계\nHACCP 기준의 구역화, 동선, 재료 흐름까지 시각화', icon: Box },
              { step: '3', title: '계약 체결 & 프로젝트 관리', desc: '일정·비용·ROI를 명확히 제시\n프로젝트 대시보드로 진행 상황을 실시간 공유', icon: FileSignature },
              { step: '4', title: '시공 & 스마트 인프라 구축', desc: '설비, 제어, IoT 센서까지 통합 구축\n시공 중에도 데이터 수집 구조를 함께 세팅', icon: Gauge },
              { step: '5', title: '완공 인도 & 운영 교육', desc: '단순 인도가 아닌 운영 시스템 활용 교육 포함\n유지보수, 데이터 분석, 리포트 활용법까지 지원', icon: ShieldCheck },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-500 transition-all shadow-sm hover:shadow-md">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#007AFF] to-[#6A5AE0] rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                    <item.icon className="w-6 h-6" strokeWidth={2.2} />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{item.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-300" strokeWidth={2} />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl max-w-4xl mx-auto">
              <blockquote className="text-xl text-gray-800 italic mb-4">
                "5PRO는 짓는 공장이 아니라,<br />
                운영 가능한 시스템을 함께 만드는 파트너입니다."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 최종 CTA */}
      <section className="py-20 bg-gradient-to-r from-[#007AFF] to-[#6A5AE0] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold mb-6">
                공장을 짓는 일은 시작일 뿐입니다.
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                5PRO는 운영, 효율, 그리고 미래까지 함께 설계합니다.
              </p>
              <p className="text-lg mb-8 text-blue-200">
                5PRO — 미래형 식품공장 통합 플랫폼
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/estimate">
                  <button className="px-8 py-4 bg-white text-[#007AFF] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl">
                    즉시 견적 보기
                  </button>
                </Link>
                <Link href="/smart-factory">
                  <button className="px-8 py-4 bg-purple-500/20 backdrop-blur-sm text-white border-2 border-purple-300/30 rounded-xl font-bold text-lg hover:bg-purple-500/30 transition-all">
                    스마트팩토리 데모 요청하기
                  </button>
                </Link>
                <Link href="/consulting">
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                    전문가 상담 신청
                  </button>
                </Link>
              </div>
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm text-blue-200 mt-1">년간 경험</div>
            </div>
            <div>
              <div className="text-3xl font-bold">200+</div>
              <div className="text-sm text-blue-200 mt-1">완공 프로젝트</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm text-blue-200 mt-1">실시간 지원</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

