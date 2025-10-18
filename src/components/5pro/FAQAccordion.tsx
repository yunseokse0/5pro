'use client';

import { useState, useEffect } from 'react';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export default function FAQAccordion() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/faq.json')
      .then((res) => res.json())
      .then((data) => setFaqs(data.faqs || []))
      .catch(console.error);
  }, []);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFAQ(id);
    }
  };

  return (
    <section className="pt-20 pb-20 bg-gray-50">
      <div className="max-w-[800px] mx-auto px-5">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            자주 묻는 질문
          </h2>
          <p className="text-lg text-gray-600">
            궁금한 점이 있으신가요? 여기서 답을 찾아보세요
          </p>
        </div>

        {/* FAQ 아코디언 */}
        <div className="space-y-4">
          {faqs.map((faq) => (
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
          ))}
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

