'use client';

import { Calculator, Shield, Cpu, TrendingUp } from 'lucide-react';
import values from '@/../../content/values.json';

const iconMap = {
  calculator: Calculator,
  shield: Shield,
  cpu: Cpu,
  trending: TrendingUp,
};

export default function ValueCards() {
  return (
    <section className="px-6 md:px-12 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            오프로의 핵심 가치
          </h2>
          <p className="text-lg text-gray-600">
            미래형 식품공장 플랫폼으로 설립부터 운영까지 통합 지원합니다
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => {
            const Icon = iconMap[v.icon as keyof typeof iconMap];
            return (
              <div 
                key={v.title} 
                className="p-6 rounded-xl border border-gray-200 bg-gray-50 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

