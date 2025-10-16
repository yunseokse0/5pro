'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, Calendar, Send } from 'lucide-react';
import { HACCP_CONSULTING, HACCP_PACKAGES, HACCP_PROCESS, HACCP_FAQ } from '@/lib/policies';

export default function ConsultingPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    package: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('상담 신청이 접수되었습니다!\n24시간 내 연락드리겠습니다.');
    console.log('Consulting request:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#101828] to-[#6A5AE0] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-2 bg-purple-500/30 rounded-full text-sm font-bold mb-6">
            HACCP 컨설팅
          </div>
          <h1 className="text-5xl font-bold mb-6">
            전문가와 함께하는 HACCP 준비
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            함께 준비하고, 스스로 성공하는 인증 준비 과정
          </p>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 inline-block">
            <p className="text-lg font-medium">
              💡 컨설팅(자문·교육·사전점검)을 통해 함께 준비합니다
            </p>
          </div>
        </div>
      </section>

      {/* 컨설팅 서비스 */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#101828] mb-4">
              우리가 제공하는 컨설팅 서비스
            </h2>
            <p className="text-xl text-gray-600">
              전문가와 함께 체계적으로 준비하는 HACCP 인증 과정
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-green-800 mb-8 text-center">
              ✅ 전문 컨설팅 서비스
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {HACCP_CONSULTING.weOffer.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {HACCP_CONSULTING.weOffer.slice(3).map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                      </div>
                    </div>
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
        </div>
      </section>

      {/* 컨설팅 프로세스 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#101828] mb-4">
              HACCP 준비 절차
            </h2>
            <p className="text-xl text-gray-600">
              5단계 컨설팅 코스로 체계적으로 준비하세요
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {HACCP_PROCESS.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-500 transition-all h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#007AFF] to-[#6A5AE0] rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    step.role === '컨설턴트' ? 'bg-blue-100 text-blue-700' :
                    step.role === '고객' ? 'bg-gray-100 text-gray-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {step.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 패키지 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#101828] mb-4">
              컨설팅 패키지
            </h2>
            <p className="text-xl text-gray-600">
              프로젝트 단계에 맞는 패키지를 선택하세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {HACCP_PACKAGES.map((pkg) => (
              <div key={pkg.id} className={`bg-white rounded-2xl border-2 p-8 hover:shadow-xl transition-all ${
                pkg.id === 'standard' ? 'border-blue-500 transform scale-105' : 'border-gray-200'
              }`}>
                {pkg.id === 'standard' && (
                  <div className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full mb-4">
                    추천
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold text-blue-600 mb-6">{pkg.price}</div>
                
                <div className="space-y-3 mb-6">
                  <div className="text-sm font-semibold text-gray-700 mb-2">포함 사항:</div>
                  {pkg.includes.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="text-sm font-semibold text-red-700 mb-2">미포함 (대행):</div>
                  {pkg.excludes.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-3 rounded-lg mb-6">
                  <div className="text-xs text-gray-600">추천 대상</div>
                  <div className="font-medium text-gray-900">{pkg.recommended}</div>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-[#007AFF] to-[#6A5AE0] text-white rounded-xl font-bold hover:shadow-lg transition-all">
                  선택하기
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-block px-6 py-3 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
              <p className="text-sm font-bold text-yellow-800">
                ⚠️ 모든 패키지는 대행 업무를 포함하지 않습니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#101828] mb-4">
              자주 묻는 질문
            </h2>
          </div>

          <div className="space-y-4">
            {HACCP_FAQ.map((faq, idx) => (
              <details key={idx} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                  <span>Q. {faq.question}</span>
                  <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-4 text-gray-700 leading-relaxed pl-4 border-l-4 border-blue-500">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 상담 신청 폼 */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#101828] mb-4">
              HACCP 컨설팅 상담 신청
            </h2>
            <p className="text-xl text-gray-600">
              전문가가 24시간 내 연락드립니다
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-lg space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  담당자명 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  회사명 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="input-field"
                  placeholder="식품공장(주)"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  전화번호 *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-field"
                  placeholder="010-1234-5678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  placeholder="contact@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                희망 패키지
              </label>
              <select
                value={formData.package}
                onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                className="input-field"
              >
                <option value="">선택하세요</option>
                <option value="lite">Lite - 초기 진단 (300만원)</option>
                <option value="standard">Standard - 문서 코칭 (800만원)</option>
                <option value="pro">Pro - 모의심사 포함 (1500만원)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                문의 내용
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-field"
                rows={4}
                placeholder="프로젝트 현황, 궁금한 점 등을 자유롭게 작성해주세요"
              />
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>안내:</strong> 컨설팅만 제공하며, 대행(대리 신청·심사 대응·운영 책임)은 제공하지 않습니다.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#007AFF] to-[#6A5AE0] text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
            >
              <Send className="inline-block w-5 h-5 mr-2" />
              상담 신청하기
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#101828] mb-4">
              자주 묻는 질문
            </h2>
          </div>

          <div className="space-y-4">
            {HACCP_FAQ.map((faq, idx) => (
              <details key={idx} className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all group">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                  <span>Q. {faq.question}</span>
                  <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-4 text-gray-700 leading-relaxed pl-4 border-l-4 border-blue-500">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#007AFF] to-[#6A5AE0] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            준비되셨나요?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            컨설팅을 통해 스스로 HACCP 인증을 준비하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#services">
              <button className="px-8 py-4 bg-white text-[#007AFF] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all">
                패키지 선택하기
              </button>
            </a>
            <Link href="/estimate">
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                공장 견적 먼저 보기
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

