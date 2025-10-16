'use client';

import { CheckCircleIcon, ShieldCheckIcon, AcademicCapIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function About() {
  const expertise = [
    {
      icon: ShieldCheckIcon,
      title: 'HACCP 컨설팅 전문',
      desc: '20년 이상의 식품 안전 및 HACCP 컨설팅 경험'
    },
    {
      icon: AcademicCapIcon,
      title: '실무 중심 교육',
      desc: '현장에서 바로 적용 가능한 실전형 교육 프로그램'
    },
    {
      icon: ChartBarIcon,
      title: '데이터 기반 분석',
      desc: 'AI와 빅데이터를 활용한 정확한 견적 시스템'
    }
  ];

  const achievements = [
    '식품 안전 관리 인증 기준(HACCP) 전문 컨설턴트',
    '200개 이상의 식품 제조 시설 설계 및 시공 경험',
    '스마트팩토리 통합 시스템 구축 전문가',
    '대한민국 식품산업 발전에 기여'
  ];

  return (
    <main className="px-6 md:px-12 py-16">
      <section className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
            👨‍💼 About 5PRO
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            HACCP 컨설팅 전문,<br />
            실무 중심의 솔루션으로 답하다
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            현장 진단부터 문서 코칭·모의심사까지,<br className="hidden md:block" />
            실행 중심 컨설팅으로 스스로 준비할 수 있도록 지원합니다.
          </p>
        </div>

        {/* Video Section */}
        <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl mb-16 bg-gradient-to-br from-indigo-100 to-purple-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">대표 소개 영상 (준비 중)</p>
            </div>
          </div>
          {/* 실제 유튜브 영상이 있을 경우:
          <iframe 
            className="w-full h-full" 
            src="https://www.youtube.com/embed/유튜브ID" 
            title="대표 소개" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
          />
          */}
        </div>

        {/* Expertise */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {expertise.map((item, i) => (
            <div key={i} className="p-6 rounded-xl border border-gray-200 bg-white">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-indigo-600" strokeWidth={2} />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Philosophy */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 md:p-12 rounded-2xl mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            5PRO의 철학
          </h2>
          <blockquote className="text-lg text-gray-700 text-center italic mb-6">
            "복잡한 절차를 단순하게 만드는 것,<br />
            그것이 진짜 컨설팅입니다."
          </blockquote>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto text-center">
            5PRO는 단순한 대행 서비스가 아닌, 고객사의 역량 강화를 목표로 합니다.
            전문가의 체계적인 가이드와 교육을 통해 HACCP 시스템을 완벽하게 이해하고
            스스로 운영할 수 있도록 함께 준비합니다.
          </p>
        </div>

        {/* Achievements */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">주요 경력 및 성과</h2>
          <ul className="space-y-3">
            {achievements.map((achievement, i) => (
              <li key={i} className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" strokeWidth={2} />
                <span className="text-gray-700">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            5PRO와 함께 시작하세요
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/estimate" 
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors min-h-[44px] flex items-center"
            >
              즉시 견적 보기
            </Link>
            <Link 
              href="/consulting" 
              className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors min-h-[44px] flex items-center"
            >
              전문가 상담 신청
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

