'use client';

import Link from 'next/link';
import { Building, Calendar, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';

export default function ProjectShowcase() {
  const projects = [
    {
      id: 1,
      name: "한성식품 김치공장",
      type: "김치공장",
      area: "500평",
      duration: "6개월",
      savings: "2.3억원",
      haccp: true,
      image: "🥬",
      description: "HACCP 인증 완료, BIM 기반 설계로 공사비 25% 절감",
      features: ["HACCP 인증 완료", "BIM 기반 설계", "공사비 25% 절감", "운영비 18% 절감"]
    },
    {
      id: 2,
      name: "대한제빵 제빵공장",
      type: "제빵공장",
      area: "300평",
      duration: "4개월",
      savings: "1.8억원",
      haccp: true,
      image: "🍞",
      description: "스마트팩토리 구축으로 품질 오류 0% 달성",
      features: ["스마트팩토리 구축", "품질 오류 0%", "공사비 22% 절감", "MES 시스템 연동"]
    },
    {
      id: 3,
      name: "신선냉동 냉동식품공장",
      type: "냉동식품공장",
      area: "800평",
      duration: "8개월",
      savings: "3.2억원",
      haccp: true,
      image: "🧊",
      description: "3D 시뮬레이션으로 HACCP 동선 최적화",
      features: ["3D 시뮬레이션", "HACCP 동선 최적화", "공사비 28% 절감", "실시간 품질관리"]
    }
  ];

  return (
    <section className="px-6 md:px-12 py-20 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold mb-6">
            🏭 완공 사례
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            200+ 완공 사례의 BIM 캡처와<br />
            <span className="text-green-600 dark:text-green-400">HACCP 인증 데이터</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            각 프로젝트의 면적, 기간, 절감액을 상세 데이터로 공개합니다.<br />
            BIM 캡처와 HACCP 인증 과정을 투명하게 공유하여 고객의 신뢰를 확보합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{project.image}</div>
                  {project.haccp && (
                    <div className="flex items-center px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      HACCP 인증
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg">
                    <Building className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mx-auto mb-1" />
                    <div className="text-sm text-gray-600 dark:text-gray-300">면적</div>
                    <div className="font-bold text-gray-900 dark:text-white">{project.area}</div>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
                    <div className="text-sm text-gray-600 dark:text-gray-300">기간</div>
                    <div className="font-bold text-gray-900 dark:text-white">{project.duration}</div>
                  </div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg mb-4">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-600 dark:text-gray-300">절감액</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{project.savings}</div>
                </div>
                
                <div className="space-y-2 mb-6">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <a
                  href={`/projects/${project.id}`}
                  className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  상세 프로젝트 데이터 보기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              비슷한 규모의 프로젝트 견적 받기
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              200+ 프로젝트 데이터를 바탕으로 귀하의 공장 규모에 맞는<br />
              정확한 견적과 투자 회수 시뮬레이션을 제공합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/estimate"
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                맞춤형 견적 받기
              </a>
              <a
                href="/consulting"
                className="px-8 py-3 border border-indigo-300 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300 font-semibold rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
              >
                HACCP 인증 과정 상세 보기
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}