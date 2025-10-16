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
    <section className="px-6 md:px-12 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            무료 자료 받기
          </h2>
          <p className="text-lg text-gray-600">
            전문가가 작성한 실무 자료로 더 빠르게 준비하세요
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {leadMagnets.map((l) => {
            const Icon = iconMap[l.icon as keyof typeof iconMap];
            return (
              <div 
                key={l.id} 
                className="p-6 rounded-xl border border-gray-200 bg-white"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-indigo-600" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{l.title}</h3>
                    <p className="text-gray-600 mt-1">{l.desc}</p>
                  </div>
                </div>
                <form 
                  className="flex gap-2" 
                  onSubmit={(e) => handleSubmit(e, l.id)}
                >
                  <input
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="email"
                    required
                    placeholder="이메일 입력"
                    value={emails[l.id] || ''}
                    onChange={(e) => setEmails({ ...emails, [l.id]: e.target.value })}
                    aria-label={`${l.title} 이메일 입력`}
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors min-h-[44px]"
                    aria-label={`${l.title} 받기`}
                  >
                    {submitted[l.id] ? '전송완료!' : '받기'}
                  </button>
                </form>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

