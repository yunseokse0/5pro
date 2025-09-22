'use client'

import React, { useState } from 'react'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send,
  User,
  Building,
  Calendar,
  CheckCircle,
  Star
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consultation: 'general'
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 실제로는 API 호출
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: Phone,
      title: '전화 상담',
      content: '02-1234-5678',
      description: '평일 09:00 - 18:00',
      color: 'bg-blue-500'
    },
    {
      icon: Mail,
      title: '이메일 문의',
      content: 'info@offro.co.kr',
      description: '24시간 접수 가능',
      color: 'bg-green-500'
    },
    {
      icon: MessageSquare,
      title: '카카오톡 상담',
      content: '@offro_factory',
      description: '실시간 상담 가능',
      color: 'bg-yellow-500'
    },
    {
      icon: MapPin,
      title: '오프라인 상담',
      content: '서울시 강남구 테헤란로 123',
      description: '예약 후 방문 상담',
      color: 'bg-purple-500'
    }
  ]

  const consultationTypes = [
    { value: 'general', label: '일반 문의' },
    { value: 'estimate', label: '견적 요청' },
    { value: 'haccp', label: 'HACCP 인증' },
    { value: 'design', label: '설계 상담' },
    { value: 'construction', label: '시공 문의' },
    { value: 'consultation', label: '전문가 상담' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">연락처 및 상담</h1>
            <p className="text-xl opacity-90">식품공장 설립에 대한 모든 문의를 환영합니다</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">다양한 상담 방법</h2>
            <p className="text-lg text-gray-600">편리한 방법으로 언제든지 연락주세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-lg font-medium text-gray-700 mb-1">{info.content}</p>
                <p className="text-sm text-gray-500">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">상담 신청</h2>
              <p className="text-lg text-gray-600">상세한 정보를 남겨주시면 전문가가 직접 연락드립니다</p>
            </div>

            {isSubmitted ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">상담 신청이 완료되었습니다!</h3>
                <p className="text-gray-600 mb-6">전문가가 24시간 내에 연락드리겠습니다.</p>
                <div className="inline-flex items-center bg-yellow-50 border border-yellow-200 rounded-full px-6 py-3">
                  <Star className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="text-yellow-800 font-semibold">우선 상담 고객에게 특별 혜택 제공</span>
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
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="회사명을 입력해주세요"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        이메일 *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="이메일을 입력해주세요"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        연락처 *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="연락처를 입력해주세요"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        상담 유형
                      </label>
                      <select
                        name="consultation"
                        value={formData.consultation}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {consultationTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        제목
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="문의 제목을 입력해주세요"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      상세 내용 *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="문의 내용을 자세히 입력해주세요"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      상담 신청하기
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">운영 시간</h2>
              <p className="text-lg text-gray-600">언제든지 편리하게 연락주세요</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">평일 운영</h3>
                <p className="text-gray-600">월요일 ~ 금요일</p>
                <p className="text-lg font-medium text-blue-600">09:00 - 18:00</p>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-xl">
                <MessageSquare className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">온라인 상담</h3>
                <p className="text-gray-600">카카오톡, 이메일</p>
                <p className="text-lg font-medium text-green-600">24시간 접수</p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">예약 상담</h3>
                <p className="text-gray-600">오프라인 방문</p>
                <p className="text-lg font-medium text-purple-600">예약 후 가능</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
              <p className="text-lg text-gray-600">궁금한 점을 빠르게 확인해보세요</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. 상담 비용이 있나요?</h3>
                <p className="text-gray-600">A. 초기 상담은 무료입니다. 상세한 견적 및 설계 상담은 별도 비용이 발생할 수 있습니다.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. 어느 지역까지 시공이 가능한가요?</h3>
                <p className="text-gray-600">A. 전국 어디든 시공이 가능합니다. 원거리 지역의 경우 추가 비용이 발생할 수 있습니다.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. HACCP 인증까지 얼마나 걸리나요?</h3>
                <p className="text-gray-600">A. 일반적으로 설계부터 인증까지 6-12개월 정도 소요됩니다. 공장 규모와 복잡도에 따라 차이가 있습니다.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. 기존 공장 리모델링도 가능한가요?</h3>
                <p className="text-gray-600">A. 네, 가능합니다. 기존 공장의 HACCP 인증을 위한 리모델링과 현대화 작업을 진행합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
