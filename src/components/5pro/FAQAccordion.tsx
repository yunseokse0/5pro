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
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/data/faq.json')
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data.faqs || []);
        setFilteredFaqs(data.faqs || []);
      })
      .catch(console.error);
  }, []);

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

