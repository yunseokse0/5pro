'use client';

import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import testimonials from '@/../../content/testimonials.json';

export default function Testimonials() {
  return (
    <section className="px-6 md:px-12 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            고객의 목소리
          </h2>
          <p className="text-lg text-gray-600">
            오프로와 함께한 고객사들의 실제 경험
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div 
              key={t.id} 
              className="p-6 rounded-xl border border-gray-200 bg-gray-50 relative"
            >
              <ChatBubbleLeftIcon className="w-8 h-8 text-indigo-200 absolute top-4 right-4" strokeWidth={1.5} />
              <blockquote className="text-gray-700 leading-relaxed mb-4 relative z-10">
                "{t.quote}"
              </blockquote>
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{t.name}</div>
                <div className="text-sm text-gray-600">{t.company} · {t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

