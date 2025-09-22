'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Calculator, 
  Building2, 
  CreditCard, 
  Shield, 
  TrendingUp, 
  CheckCircle, 
  Users, 
  Award,
  BarChart3,
  Target,
  Zap,
  Eye,
  DollarSign,
  Clock,
  Star,
  ArrowRight,
  FileText,
  PieChart,
  Building,
  Globe,
  Smartphone,
  Camera,
  Settings
} from 'lucide-react'

const BusinessPlanPage = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const serviceFeatures = [
    {
      icon: Calculator,
      title: '실시간 견적 시뮬레이션',
      description: '지역·규모 입력만으로 정확한 예상 공사비 확인',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Building2,
      title: '전문 설계 & 시공 관리',
      description: 'HACCP/GMP 기준에 맞춘 전문가 참여, BIM 설계 적용',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: CreditCard,
      title: '금융 연동 시스템',
      description: '건축주-금융사-시공사 간 대금 지급 투명 관리, 초기 PF 지원',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: '품질 평가 & 환불 보장',
      description: '공사 품질 등급제 + 최초 견적 5% 초과 시 환불 제도',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const marketData = [
    { label: '국내 식품 제조 공장', value: '138,000개소', color: 'text-blue-600' },
    { label: 'HACCP 인증 완료', value: '11,130개소 (8%)', color: 'text-green-600' },
    { label: '미인증 공장', value: '126,870개소 (92%)', color: 'text-red-600' },
    { label: '예상 시장 규모', value: '1.35조원', color: 'text-purple-600' }
  ]

  const revenueStreams = [
    { 
      category: '핵심 수익', 
      items: [
        { name: '서비스 수수료', detail: '공사금액의 1%~5%', amount: '800억' },
        { name: '자재·설비 유통', detail: '공급망 최적화', amount: '400억' }
      ]
    },
    { 
      category: '부가 서비스', 
      items: [
        { name: 'HACCP 구독 컨설팅', detail: '월 구독료', amount: '200억' },
        { name: '데이터·광고·물류', detail: '플랫폼 수익', amount: '200억' }
      ]
    }
  ]

  const competitiveAdvantages = [
    {
      icon: Eye,
      title: '투명한 원스톱 플랫폼',
      description: '건축주 입장에서 모든 과정이 투명하게 공개되는 플랫폼'
    },
    {
      icon: CreditCard,
      title: '금융사 연동 시스템',
      description: '안정적인 자금·대금 관리로 건설 리스크 최소화'
    },
    {
      icon: Award,
      title: '25년 노하우 + 최신 기술',
      description: 'BIM/AI 분석 기반 설계로 정확성과 효율성 극대화'
    },
    {
      icon: Smartphone,
      title: '실시간 모니터링',
      description: '언제 어디서나 공사 진행 상황을 실시간으로 확인'
    }
  ]

  const serviceProcess = [
    {
      step: 1,
      title: '견적 시뮬레이션',
      description: 'AI 기반 실시간 견적 계산',
      icon: Calculator,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      step: 2,
      title: '전문 설계',
      description: 'BIM 설계 + HACCP 기준 적용',
      icon: Building2,
      color: 'from-green-500 to-emerald-500'
    },
    {
      step: 3,
      title: '시공 관리',
      description: '품질등급제 파트너사 선정',
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: 4,
      title: '실시간 모니터링',
      description: 'CCTV + IoT 센서로 24시간 관리',
      icon: Camera,
      color: 'from-orange-500 to-red-500'
    },
    {
      step: 5,
      title: '품질 평가 & 환불',
      description: '견적 초과분 환불 보장',
      icon: Shield,
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  const financialProjections = [
    { year: '2024', revenue: '200억', profit: '40억', users: '1,000개사' },
    { year: '2025', revenue: '600억', profit: '120억', users: '3,000개사' },
    { year: '2026', revenue: '1,000억', profit: '200억', users: '5,000개사' },
    { year: '2027', revenue: '1,600억', profit: '290억', users: '8,000개사' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link 
              href="/" 
              className="flex items-center text-white hover:text-blue-200 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              메인으로 돌아가기
            </Link>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              왜 오프로인가?
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              식품공장 건축을 선택해야 하는 이유와 오프로의 차별화된 가치를 확인하세요
            </p>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: '서비스 개요' },
              { id: 'market', label: '시장 기회' },
              { id: 'process', label: '서비스 절차' },
              { id: 'finance', label: '금융 연동' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-semibold transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 서비스 개요 */}
      {activeTab === 'overview' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Hero 섹션 */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                식품공장 설립, 이제는 투명하고 스마트하게
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                견적부터 설계·시공·금융까지 원스톱으로
              </p>
              <Link
                href="/estimate"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Calculator className="w-5 h-5 mr-2" />
                견적 시뮬레이션 시작하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* 서비스 특징 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {serviceFeatures.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg mb-4`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                )
              })}
            </div>

            {/* 차별화 포인트 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Us - 차별화 포인트</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {competitiveAdvantages.map((advantage, index) => {
                  const IconComponent = advantage.icon
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-500 rounded-lg">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{advantage.title}</h4>
                        <p className="text-gray-600 text-sm">{advantage.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 시장 기회 */}
      {activeTab === 'market' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">시장 기회</h2>
              <p className="text-lg text-gray-600">거대한 성장 잠재력을 가진 식품공장 시장</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {marketData.map((data, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className={`text-3xl font-bold ${data.color} mb-2`}>{data.value}</div>
                  <div className="text-gray-600">{data.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">시장 분석</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">현재 상황</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span>국내 식품 제조 공장 138,000개소 운영 중</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span>HACCP 인증률은 여전히 8% 수준</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span>식품안전법 강화로 인증 필요성 증가</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">성장 기회</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Target className="w-5 h-5 text-blue-500 mr-2" />
                      <span>92% 미인증 공장의 인증 필요</span>
                    </li>
                    <li className="flex items-center">
                      <Target className="w-5 h-5 text-blue-500 mr-2" />
                      <span>연간 1,000개 이상 신규 공장 건설</span>
                    </li>
                    <li className="flex items-center">
                      <Target className="w-5 h-5 text-blue-500 mr-2" />
                      <span>디지털 전환 가속화로 플랫폼 수요 증가</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 서비스 절차 */}
      {activeTab === 'process' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5단계 서비스 절차</h2>
              <p className="text-lg text-gray-600">투명하고 체계적인 프로젝트 관리</p>
            </div>

            <div className="space-y-8">
              {serviceProcess.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex items-center space-x-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${step.color} rounded-full text-white font-bold text-xl`}>
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r ${step.color} rounded-lg`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                        </div>
                        <p className="text-gray-600 text-lg">{step.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* 품질등급제 */}
            <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">품질등급제 시스템</h3>
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  { grade: '다이아몬드', color: 'from-blue-500 to-cyan-500', criteria: '100억+ 도급액' },
                  { grade: '플래티넘', color: 'from-gray-400 to-gray-500', criteria: '50억+ 도급액' },
                  { grade: '골드', color: 'from-yellow-500 to-orange-500', criteria: '20억+ 도급액' },
                  { grade: '실버', color: 'from-gray-300 to-gray-400', criteria: '10억+ 도급액' },
                  { grade: '브론즈', color: 'from-orange-600 to-red-600', criteria: '10억 미만' }
                ].map((grade, index) => (
                  <div key={index} className="text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${grade.color} rounded-lg text-white font-bold mb-2`}>
                      {grade.grade.charAt(0)}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">{grade.grade}</div>
                    <div className="text-xs text-gray-600">{grade.criteria}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 금융 연동 */}
      {activeTab === 'finance' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">금융 연동 시스템</h2>
              <p className="text-lg text-gray-600">투명하고 안전한 자금 관리</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* 투명한 대금 지급 시스템 */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-lg mr-4">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">투명한 공사대금 지급</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">3자 간 투명한 거래</h4>
                      <p className="text-gray-600 text-sm">건축주-금융사-시공사 간 모든 대금 지급이 플랫폼에서 투명하게 관리됩니다.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">실시간 정산</h4>
                      <p className="text-gray-600 text-sm">공사 진행 단계별로 자동 정산되어 지연 없는 대금 지급을 보장합니다.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">블록체인 기록</h4>
                      <p className="text-gray-600 text-sm">모든 거래 내역이 블록체인에 기록되어 위변조가 불가능합니다.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PF 연계 시스템 */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-lg mr-4">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">PF 연계 지원</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">초기 자금 부담 완화</h4>
                      <p className="text-gray-600 text-sm">프로젝트 파이낸싱을 통해 건축주의 초기 자금 부담을 크게 줄입니다.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">최저 금리 보장</h4>
                      <p className="text-gray-600 text-sm">협력 금융기관과의 전략적 파트너십으로 시중보다 낮은 금리를 제공합니다.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">신속한 승인</h4>
                      <p className="text-gray-600 text-sm">플랫폼 데이터를 활용한 신속한 심사로 3일 내 승인을 보장합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 환불 보장 시스템 */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mr-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">환불 보장 시스템</h3>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-4">견적 초과분 5% 환불 보장</div>
                <p className="text-lg text-gray-600 mb-6">
                  최초 견적 대비 5% 초과 발생 시 자동으로 환불 처리됩니다.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="text-2xl font-bold text-blue-600 mb-2">투명성</div>
                    <p className="text-sm text-gray-600">모든 비용이 실시간으로 공개되어 신뢰성을 보장합니다.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="text-2xl font-bold text-green-600 mb-2">책임성</div>
                    <p className="text-sm text-gray-600">견적 오차에 대한 책임을 명확히 하여 고객 보호합니다.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="text-2xl font-bold text-purple-600 mb-2">신뢰성</div>
                    <p className="text-sm text-gray-600">환불 보장으로 건축주의 리스크를 최소화합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* CTA 섹션 */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            오프로와 함께 식품공장 건축을 시작하세요
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            투명하고 전문적인 서비스로 안전한 건축을 경험해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/estimate"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Calculator className="w-5 h-5 mr-2" />
              견적 시뮬레이션 시작
            </Link>
            <Link
              href="/partners"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <Users className="w-5 h-5 mr-2" />
              파트너사 참여
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BusinessPlanPage
