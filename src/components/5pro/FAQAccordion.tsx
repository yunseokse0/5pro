'use client';

import { useState, useEffect } from 'react';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export default function FAQAccordion() {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "faq1",
      category: "비용 절감",
      question: "오프로를 이용하면 정말 공사비가 절감되나요?",
      answer: "네, BIM 기반의 정확한 물량 산출과 공개 경쟁 입찰 시스템을 통해 불필요한 비용을 제거하여, 평균 18% 이상의 공사비 절감 효과를 보실 수 있습니다."
    },
    {
      id: "faq2",
      category: "대금 안전 관리",
      question: "공사 중 대금 유용의 위험은 없나요?",
      answer: "오프로는 공사 대금 안전 관리 시스템(에스크로)을 운영합니다. 대금은 안전 계좌에 예치되며, 시공 진척도 검사 후, 시공한 만큼만 지급되므로 유용 위험을 원천 차단합니다."
    },
    {
      id: "faq3",
      category: "이용 편의성",
      question: "건축을 처음 시작하는 초보자도 이용할 수 있나요?",
      answer: "네, 건축 비전문가도 쉽게 이용하도록 전담 매니저가 모든 단계를 지원합니다. 사업성 분석부터 전문가 매칭, 공정 관리까지 오프로 전문가가 함께합니다."
    },
    {
      id: "faq4",
      category: "파트너 검증",
      question: "등록된 파트너 건설사는 믿을 수 있나요?",
      answer: "오프로에 등록된 모든 파트너는 재무 상태, 시공 실적, 현장 대리인의 경력 등을 엄격하게 검증한 실명 인증 전문가 그룹입니다. 까다로운 기준을 통과한 파트너만 건축주님을 만날 수 있습니다. 다이아몬드부터 브론즈까지 5단계 품질등급시스템으로 파트너의 실력을 객관적으로 평가하고 공개합니다."
    },
    {
      id: "faq5",
      category: "수수료",
      question: "서비스 이용 수수료는 어떻게 되나요?",
      answer: "건축주님은 무료로 견적 요청, 비교 분석, 파트너 매칭 서비스를 이용할 수 있습니다. 수수료는 건설사가 플랫폼 이용 대가로 지불하며, 이는 건축주에게 전가되지 않습니다. 투명한 수수료 구조로 숨은 비용 없이 서비스를 이용하실 수 있습니다."
    }
  ]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredFaqs(faqs);
  }, [faqs]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFaqs(faqs);
    } else {
      const filtered = faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFaqs(filtered);
    }
  }, [searchTerm, faqs]);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFAQ(id);
    }
  };

  // 대표 질문 3가지
  const featuredFaqs = faqs.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[800px] mx-auto px-5">
        {/* 검색 기능 */}
        <div className="text-center mb-12">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="질문을 검색해보세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white shadow-sm"
            />
          </div>
        </div>

        {/* 대표 질문 3가지 */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">대표 질문</h3>
          <div className="grid gap-6">
            {featuredFaqs.map((faq, index) => (
              <div key={faq.id} className="bg-gradient-to-r from-primary/5 to-blue-50 rounded-card border border-primary/20 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-primary mb-2">
                        {faq.category}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">
                        {faq.question}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 전체 질문 목록 */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">전체 질문 목록</h3>
        </div>

        {/* FAQ 아코디언 */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">🔍</div>
              <p className="text-gray-600">
                검색 결과가 없습니다. 다른 키워드로 검색해보세요.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-card border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                onKeyDown={(e) => handleKeyDown(e, faq.id)}
                className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors duration-120"
                aria-expanded={openId === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <div className="flex-1">
                  {/* 카테고리 */}
                  <div className="text-xs font-medium text-primary mb-2">
                    {faq.category}
                  </div>
                  {/* 질문 */}
                  <div className="text-lg font-bold text-gray-900">
                    {faq.question}
                  </div>
                </div>

                {/* 아이콘 */}
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className={`w-6 h-6 text-gray-400 transition-transform duration-120 ${
                      openId === faq.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* 답변 */}
              {openId === faq.id && (
                <div
                  id={`faq-answer-${faq.id}`}
                  className="px-6 pb-5 text-gray-700 leading-relaxed animate-fadeIn"
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                >
                  {faq.answer}
                </div>
              )}
            </div>
            ))
          )}
        </div>

        {/* 추가 문의 링크 */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            답변을 찾지 못하셨나요?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors duration-120"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>직접 문의하기</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 120ms ease-smooth;
        }
      `}</style>
    </section>
  );
}

