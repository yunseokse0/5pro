'use client';

import { useState } from 'react';
import { ClipboardDocumentListIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import leadMagnets from '@/../../content/leadmagnets.json';

const iconMap = {
  clipboard: ClipboardDocumentListIcon,
  book: BookOpenIcon,
};

export default function LeadMagnets() {
  const [emails, setEmails] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState<{ [key: string]: boolean }>({});

  const handleSubmit = (e: React.FormEvent, key: string) => {
    e.preventDefault();
    // 실제로는 API 호출
    setSubmitted({ ...submitted, [key]: true });
    setTimeout(() => {
      setSubmitted({ ...submitted, [key]: false });
      setEmails({ ...emails, [key]: '' });
    }, 3000);
  };

  return (
    <section className="px-6 md:px-12 py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
            🎁 회원 전용 혜택
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            HACCP 체크리스트와<br />
            <span className="text-indigo-600">식품공장 설립 가이드북</span> 무료 제공
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            20년 경력 전문가가 직접 작성한 실무 중심의 자료로<br />
            HACCP 인증과 식품공장 설립을 더욱 쉽고 빠르게 준비하세요
          </p>
        </div>
        {/* 회원 혜택 카드들 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl border border-indigo-200 bg-white shadow-lg hover:shadow-xl transition-all">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">HACCP 체크리스트</h3>
              <p className="text-gray-600 text-sm mb-4">20년 경력 전문가가 작성한 실무 체크리스트</p>
              <div className="text-xs text-indigo-600 font-semibold">무료 제공</div>
            </div>
          </div>
          
          <div className="p-6 rounded-2xl border border-purple-200 bg-white shadow-lg hover:shadow-xl transition-all">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">식품공장 설립 가이드북</h3>
              <p className="text-gray-600 text-sm mb-4">200+ 프로젝트 경험을 바탕으로 한 단계별 가이드</p>
              <div className="text-xs text-purple-600 font-semibold">무료 제공</div>
            </div>
          </div>
          
          <div className="p-6 rounded-2xl border border-green-200 bg-white shadow-lg hover:shadow-xl transition-all">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">3D 시뮬레이션 활용법</h3>
              <p className="text-gray-600 text-sm mb-4">HACCP 동선 검증을 위한 3D 활용 가이드</p>
              <div className="text-xs text-green-600 font-semibold">무료 제공</div>
            </div>
          </div>
        </div>

        {/* 회원가입 CTA */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              HACCP 체크리스트 다운로드 신청
            </h3>
            <p className="text-gray-600 mb-6">
              이메일만 입력하면 즉시 다운로드 가능! 20년 경력 전문가의 실무 자료를 무료로 받아보세요.
            </p>
            
            <div className="max-w-md mx-auto">
              <form 
                className="flex gap-3" 
                onSubmit={(e) => {
                  e.preventDefault();
                  // 회원가입 페이지로 이동
                  window.location.href = '/signup';
                }}
              >
                <input
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                  type="email"
                  required
                  placeholder="이메일 주소 입력"
                  value={emails['signup'] || ''}
                  onChange={(e) => setEmails({ ...emails, signup: e.target.value })}
                />
                <button 
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg transition-all transform hover:-translate-y-1"
                >
                  HACCP 체크리스트 다운로드
                </button>
              </form>
              
              <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  즉시 가입 완료
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  모든 혜택 무료
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  언제든 해지 가능
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

