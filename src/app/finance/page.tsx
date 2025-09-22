'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Building2, 
  ArrowLeft, 
  CheckCircle, 
  CreditCard, 
  Shield, 
  TrendingUp, 
  Clock, 
  Users, 
  Award,
  DollarSign,
  FileText,
  Phone,
  Mail,
  MapPin,
  Star,
  ArrowRight
} from 'lucide-react'

const FinancePage = () => {
  const [selectedLoan, setSelectedLoan] = useState<string>('')
  const [contactForm, setContactForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    projectType: '',
    loanAmount: ''
  })

  const loanProducts = [
    {
      id: 'construction',
      name: '건설자금 대출',
      rate: '연 3.2%',
      maxAmount: '50억원',
      period: '최대 10년',
      features: ['신속 승인', '낮은 금리', '유연한 상환'],
      description: '식품공장 건설에 특화된 건설자금 대출상품',
      icon: Building2,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'working',
      name: '운영자금 대출',
      rate: '연 2.8%',
      maxAmount: '30억원',
      period: '최대 7년',
      features: ['빠른 자금조달', '낮은 금리', '간편한 신청'],
      description: '공장 운영 및 설비 구입을 위한 운영자금',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'guarantee',
      name: '공급보증',
      rate: '보증료 0.8%',
      maxAmount: '100억원',
      period: '최대 2년',
      features: ['신속 처리', '낮은 보증료', '높은 승인율'],
      description: '공급업체와의 계약 이행을 보증하는 상품',
      icon: Shield,
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const partnerBanks = [
    {
      name: 'KB국민은행',
      logo: '🏦',
      specialties: ['건설자금', '보증서비스'],
      rating: 4.8,
      description: '대형 건설 프로젝트 전문'
    },
    {
      name: '신한은행',
      logo: '🏛️',
      specialties: ['운영자금', '외환거래'],
      rating: 4.7,
      description: '중소기업 특화 금융서비스'
    },
    {
      name: '하나은행',
      logo: '🏢',
      specialties: ['종합금융', '투자상담'],
      rating: 4.6,
      description: '원스톱 금융서비스'
    },
    {
      name: '우리은행',
      logo: '🏦',
      specialties: ['디지털금융', '빠른승인'],
      rating: 4.5,
      description: '디지털 플랫폼 특화'
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 폼 제출 로직
    console.log('Contact form submitted:', contactForm)
    alert('상담 신청이 완료되었습니다. 담당자가 연락드리겠습니다.')
  }

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
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              금융기관 연계 서비스
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              식품공장 건설에 최적화된 금융상품과 전문 금융기관을 연계해드립니다
            </p>
          </div>
        </div>
      </div>

      {/* 주요 혜택 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              오프로 금융 연계의 특별한 혜택
            </h2>
            <p className="text-lg text-gray-600">
              일반 금융상품 대비 더 유리한 조건으로 자금을 조달하세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full mb-4">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">최저 금리</h3>
              <p className="text-gray-600">
                시중 금리보다 0.3~0.5%p 낮은 특별 금리 적용
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">신속 승인</h3>
              <p className="text-gray-600">
                3일 내 신속한 심사 및 승인으로 빠른 자금 조달
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">전문 상담</h3>
              <p className="text-gray-600">
                식품공장 건설 전문 금융 상담사 1:1 맞춤 상담
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 대출 상품 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              추천 금융상품
            </h2>
            <p className="text-lg text-gray-600">
              식품공장 건설에 특화된 다양한 금융상품을 만나보세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loanProducts.map((product) => {
              const IconComponent = product.icon
              return (
                <div 
                  key={product.id}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                    selectedLoan === product.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedLoan(product.id)}
                >
                  <div className={`h-2 bg-gradient-to-r ${product.color} rounded-t-xl`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${product.color} rounded-lg mr-4`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">금리</span>
                        <span className="font-bold text-green-600">{product.rate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">최대 한도</span>
                        <span className="font-bold text-blue-600">{product.maxAmount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">대출기간</span>
                        <span className="font-bold text-purple-600">{product.period}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">주요 특징</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedLoan === product.id && (
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800 mb-2">
                          💡 이 상품이 선택되었습니다. 아래 상담 신청을 통해 자세한 내용을 확인하세요.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 협력 금융기관 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              협력 금융기관
            </h2>
            <p className="text-lg text-gray-600">
              신뢰할 수 있는 주요 금융기관과의 전략적 파트너십
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerBanks.map((bank, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-center">
                  <div className="text-4xl mb-4">{bank.logo}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{bank.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{bank.description}</p>
                  
                  <div className="flex items-center justify-center mb-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-semibold">{bank.rating}</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm">전문 분야</h4>
                    <div className="flex flex-wrap gap-1">
                      {bank.specialties.map((specialty, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 상담 신청 */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                금융 상담 신청
              </h2>
              <p className="text-lg text-gray-600">
                전문 금융 상담사가 최적의 금융상품을 추천해드립니다
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    성명 *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="홍길동"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    회사명 *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.company}
                    onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(주)예시식품"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="010-1234-5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    프로젝트 유형
                  </label>
                  <select
                    value={contactForm.projectType}
                    onChange={(e) => setContactForm({...contactForm, projectType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">선택해주세요</option>
                    <option value="new-construction">신규 건설</option>
                    <option value="renovation">리모델링</option>
                    <option value="expansion">확장 공사</option>
                    <option value="equipment">설비 구입</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    필요 자금 규모
                  </label>
                  <select
                    value={contactForm.loanAmount}
                    onChange={(e) => setContactForm({...contactForm, loanAmount: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">선택해주세요</option>
                    <option value="under-10">10억원 미만</option>
                    <option value="10-30">10억원 ~ 30억원</option>
                    <option value="30-50">30억원 ~ 50억원</option>
                    <option value="50-100">50억원 ~ 100억원</option>
                    <option value="over-100">100억원 이상</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                무료 금융 상담 신청하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span>무료 상담</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-blue-500 mr-1" />
                  <span>개인정보 보호</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-purple-500 mr-1" />
                  <span>24시간 내 연락</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 연락처 정보 */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">금융 상담 문의</h2>
            <p className="text-gray-300">
              언제든지 전문 상담사에게 문의하세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">전화 상담</h3>
              <p className="text-blue-300 font-semibold">1588-1234</p>
              <p className="text-sm text-gray-400">평일 09:00-18:00</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-full mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">이메일 문의</h3>
              <p className="text-green-300 font-semibold">finance@opro.com</p>
              <p className="text-sm text-gray-400">24시간 접수</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">방문 상담</h3>
              <p className="text-purple-300 font-semibold">서울 강남구</p>
              <p className="text-sm text-gray-400">예약 후 방문</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FinancePage
