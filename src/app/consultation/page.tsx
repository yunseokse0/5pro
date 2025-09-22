'use client'

import React, { useState } from 'react'
import { 
  MessageSquare, 
  Clock, 
  User, 
  Building, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle,
  Star,
  Award,
  Shield,
  Calculator,
  FileText,
  Zap,
  Users,
  TrendingUp
} from 'lucide-react'

export default function ConsultationPage() {
  const [selectedConsultation, setSelectedConsultation] = useState('general')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const consultationTypes = [
    {
      id: 'general',
      title: '일반 상담',
      description: '식품공장 설립에 대한 기본적인 문의',
      icon: MessageSquare,
      color: 'bg-blue-500',
      duration: '30분',
      price: '무료'
    },
    {
      id: 'estimate',
      title: '견적 상담',
      description: '정확한 비용 견적을 위한 상세 상담',
      icon: Calculator,
      color: 'bg-green-500',
      duration: '1시간',
      price: '무료'
    },
    {
      id: 'haccp',
      title: 'HACCP 인증 상담',
      description: 'HACCP 인증 과정 및 요구사항 상담',
      icon: Shield,
      color: 'bg-purple-500',
      duration: '1.5시간',
      price: '무료'
    },
    {
      id: 'design',
      title: '설계 상담',
      description: '공장 설계 및 레이아웃 최적화 상담',
      icon: Building,
      color: 'bg-orange-500',
      duration: '2시간',
      price: '무료'
    },
    {
      id: 'construction',
      title: '시공 상담',
      description: '시공 과정 및 일정 관리 상담',
      icon: FileText,
      color: 'bg-red-500',
      duration: '1.5시간',
      price: '무료'
    },
    {
      id: 'premium',
      title: '프리미엄 상담',
      description: '종합적인 원스톱 상담 서비스',
      icon: Star,
      color: 'bg-yellow-500',
      duration: '3시간',
      price: '무료'
    }
  ]

  const experts = [
    {
      name: '전영로 대표',
      title: 'CEO & 설립 전문가',
      experience: '15년',
      specialty: '식품공장 설립 전반',
      avatar: '전',
      color: 'bg-blue-600'
    },
    {
      name: '김하쿠 전문가',
      title: 'HACCP 컨설턴트',
      experience: '10년',
      specialty: 'HACCP 인증',
      avatar: '김',
      color: 'bg-green-600'
    },
    {
      name: '이설계 전문가',
      title: '건축 설계사',
      experience: '12년',
      specialty: '공장 설계',
      avatar: '이',
      color: 'bg-purple-600'
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">전문가 상담</h1>
            <p className="text-xl opacity-90">15년 경력의 전문가들이 직접 상담해드립니다</p>
          </div>
        </div>
      </div>

      {/* 상담 유형 선택 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">상담 유형을 선택해주세요</h2>
            <p className="text-lg text-gray-600">모든 상담은 무료로 제공됩니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultationTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setSelectedConsultation(type.id)}
                className={`cursor-pointer rounded-xl p-6 border-2 transition-all duration-300 ${
                  selectedConsultation === type.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${type.color} rounded-full flex items-center justify-center mr-4`}>
                    <type.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{type.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {type.duration}
                      </span>
                      <span className="flex items-center text-green-600 font-medium">
                        <Star className="w-4 h-4 mr-1" />
                        {type.price}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 전문가 소개 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">전문가 팀</h2>
            <p className="text-lg text-gray-600">식품공장 설립 분야의 최고 전문가들</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experts.map((expert, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className={`w-20 h-20 ${expert.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white text-2xl font-bold">{expert.avatar}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{expert.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{expert.title}</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>경력: {expert.experience}</p>
                  <p>전문분야: {expert.specialty}</p>
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 상담 신청 폼 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">상담 신청</h2>
              <p className="text-lg text-gray-600">
                {consultationTypes.find(t => t.id === selectedConsultation)?.title} 상담을 신청하세요
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">상담 신청이 완료되었습니다!</h3>
                <p className="text-gray-600 mb-6">
                  전문가가 24시간 내에 연락드려 상담 일정을 조율해드리겠습니다.
                </p>
                <div className="inline-flex items-center bg-yellow-50 border border-yellow-200 rounded-full px-6 py-3">
                  <Star className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="text-yellow-800 font-semibold">첫 상담 고객 특별 혜택 제공</span>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-1" />
                        이름 *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="이름을 입력해주세요"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Building className="w-4 h-4 inline mr-1" />
                        회사명
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="회사명을 입력해주세요"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        연락처 *
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="연락처를 입력해주세요"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        이메일 *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="이메일을 입력해주세요"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      희망 상담 시간
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">시간을 선택해주세요</option>
                      <option value="morning">오전 (09:00 - 12:00)</option>
                      <option value="afternoon">오후 (13:00 - 18:00)</option>
                      <option value="evening">저녁 (18:00 - 20:00)</option>
                      <option value="weekend">주말</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      상담 내용
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="상담하고 싶은 내용을 자세히 입력해주세요"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      상담 신청하기
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 상담 혜택 */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">상담 혜택</h2>
            <p className="text-lg text-gray-600">전문가 상담을 받으시면 다양한 혜택을 드립니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">무료 상담</h3>
              <p className="text-gray-600 text-sm">모든 상담이 완전 무료</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">전문가 매칭</h3>
              <p className="text-gray-600 text-sm">분야별 최고 전문가 상담</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">맞춤형 솔루션</h3>
              <p className="text-gray-600 text-sm">개별 상황에 맞는 해결책</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">빠른 응답</h3>
              <p className="text-gray-600 text-sm">24시간 내 연락드림</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
