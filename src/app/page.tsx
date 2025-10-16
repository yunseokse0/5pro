'use client';

import Link from 'next/link';
import { ArrowRight, Calculator, Zap, TrendingDown, CheckCircle2 } from 'lucide-react';

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
                식품공장 설립
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                  원스톱 솔루션
                </span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                견적·설계·시공·모니터링까지 한 번에 완성
                <br />
                데이터 기반 정확한 견적으로 <strong className="text-yellow-300">평균 30% 비용 절감</strong>
              </p>
              <div className="inline-block px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full text-sm border border-purple-300/30 mb-4">
                <span className="text-purple-200">HACCP 컨설팅 제공</span>
              </div>
              <p className="text-sm text-blue-200 mb-6">
                컨설팅(자문·교육·사전점검)을 통해 함께 준비합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/estimate">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#101828] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                    <Calculator className="inline-block w-5 h-5 mr-2" />
                    빠른 견적 보기
                  </button>
                </Link>
                <Link href="/consulting">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                    HACCP 컨설팅 상담
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
              오프로만의 차별점
            </h2>
            <p className="text-xl text-gray-600">
              20년 노하우와 데이터로 정확하고 빠르게
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#101828]">즉시 견적</h3>
              <p className="text-gray-600 leading-relaxed">
                지역·규모·업종 입력 시 AI 기반 데이터로 <strong>95% 정확도</strong>의 견적을 즉시 산출합니다.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <TrendingDown className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#101828]">비용 절감</h3>
              <p className="text-gray-600 leading-relaxed">
                불필요한 중간 마진 제거와 최적 설계로 <strong>평균 30% 비용 절감</strong>을 실현합니다.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl border border-orange-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#101828]">완공 보장</h3>
              <p className="text-gray-600 leading-relaxed">
                계약 기간 내 완공을 100% 보장하며, 전문가가 끝까지 함께 합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 스마트 견적 시뮬레이터 CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#101828] mb-6">
            정말 30% 절약되는지 직접 확인해보세요
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            지역, 규모, 용도를 입력하면 스마트 시스템이 즉시 정확한 견적을 생성합니다
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/estimate">
              <button className="px-10 py-5 bg-gradient-to-r from-[#007AFF] to-[#6A5AE0] text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <Calculator className="inline-block w-6 h-6 mr-2" />
                견적 시뮬레이션 시작
              </button>
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-sm text-gray-500 mb-2">기존 방식</div>
              <div className="text-3xl font-bold text-gray-800">10억원</div>
              <div className="text-xs text-red-600 mt-2">+ 추가 비용 발생 가능성 높음</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-500">
              <div className="text-sm text-blue-600 mb-2">오프로 방식</div>
              <div className="text-3xl font-bold text-blue-600">7억원</div>
              <div className="text-xs text-green-600 mt-2">✓ 완벽한 비용 보장</div>
              <div className="mt-4 text-xl font-bold text-green-600">💰 3억원 절약</div>
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

      {/* 서비스 프로세스 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#101828] mb-4">
              간단한 5단계로 완성
            </h2>
            <p className="text-xl text-gray-600">
              복잡한 식품공장 설립, 오프로와 함께라면 쉽습니다
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: '1', title: '견적 요청', desc: '지역·규모 입력' },
              { step: '2', title: '3D 설계', desc: '조감도 생성' },
              { step: '3', title: '계약 체결', desc: '전자계약 진행' },
              { step: '4', title: '시공 관리', desc: '실시간 모니터링' },
              { step: '5', title: '완공 인도', desc: '품질 보증' },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-500 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#007AFF] to-[#6A5AE0] rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 최종 CTA */}
      <section className="py-20 bg-gradient-to-r from-[#007AFF] to-[#6A5AE0] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            지금 시작하세요
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            스마트 견적 시스템으로 프로젝트 비용을 정확하게 계산하고, 전문가와 상담해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/estimate">
              <button className="px-8 py-4 bg-white text-[#007AFF] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl">
                무료 견적 받기
              </button>
            </Link>
            <Link href="/consultation">
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

