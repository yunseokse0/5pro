'use client';

import { 
  CalculatorIcon, 
  CubeIcon, 
  DocumentTextIcon, 
  CogIcon, 
  AcademicCapIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import steps from '@/../../content/process.json';

const iconMap = {
  calculator: CalculatorIcon,
  cube: CubeIcon,
  document: DocumentTextIcon,
  cog: CogIcon,
  'academic-cap': AcademicCapIcon,
};

export default function Process() {
  return (
    <main className="px-6 md:px-12 py-16">
      <section className="max-w-6xl mx-auto text-center">
        <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
          ⚙️ 오프로 프로세스
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          한 번의 설립, 10년의 운영 효율을 설계하다
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
          오프로의 5단계는 공장 설립에서 운영 자동화까지<br className="hidden md:block" />
          모두 고려한 스마트팩토리 여정입니다.
        </p>
        
        <div className="grid md:grid-cols-5 gap-6 mt-10">
          {steps.map((s, i) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap];
            return (
              <div 
                key={s.step} 
                className="relative p-6 rounded-xl border-2 border-gray-200 bg-white hover:border-indigo-500 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                  <Icon className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <div className="text-sm text-gray-500 font-semibold mb-2">STEP {s.step}</div>
                <div className="font-bold text-lg text-gray-900 mb-2">{s.title}</div>
                <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {s.desc}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRightIcon className="w-6 h-6 text-gray-300" strokeWidth={2} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl max-w-4xl mx-auto">
          <blockquote className="text-xl text-gray-800 italic mb-4">
            "오프로는 짓는 공장이 아니라,<br />
            운영 가능한 시스템을 함께 만드는 파트너입니다."
          </blockquote>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link 
            href="/estimate" 
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors min-h-[44px] flex items-center"
          >
            즉시 견적 보기
          </Link>
          <Link 
            href="/smart-factory" 
            className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors min-h-[44px] flex items-center"
          >
            스마트팩토리 자세히 보기
          </Link>
        </div>
      </section>
    </main>
  );
}

