'use client';

import { User, Award, Calendar, CheckCircle } from 'lucide-react';

export default function ExpertInterview() {
  const experts = [
    {
      name: "김철수",
      title: "HACCP 컨설턴트",
      experience: "20년",
      projects: "150+",
      image: "👨‍💼",
      quote: "HACCP 인증은 설계 단계에서부터 시작됩니다. 3D 시뮬레이션으로 동선을 미리 검증하고, 실시간 품질관리로 인증 성공률을 95%까지 끌어올렸습니다.",
      achievements: ["HACCP 인증 성공률 95%", "150+ 프로젝트 완료", "식품안전 전문가"]
    },
    {
      name: "이영희",
      title: "스마트팩토리 설계사",
      experience: "18년",
      projects: "120+",
      image: "👩‍🔬",
      quote: "MES 시스템과 HACCP 데이터를 연동하여 운영 효율을 극대화합니다. 인건비 15% 절감과 품질 오류 0% 목표를 달성할 수 있습니다.",
      achievements: ["스마트팩토리 구축 전문", "120+ 프로젝트 완료", "운영 효율 최적화"]
    }
  ];

  return (
    <section className="px-6 md:px-12 py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
            👨‍💼 전문가 인터뷰
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            20년 경력 전문가가 직접 검증하는<br />
            <span className="text-indigo-600">HACCP 검증과 스마트팩토리 구축</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            200+ 프로젝트 경험을 바탕으로 HACCP 인증 성공률 95%를 달성한 전문가들이<br />
            직접 설계부터 검증까지 책임집니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {experts.map((expert, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-2xl">
                  {expert.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{expert.name}</h3>
                  <p className="text-indigo-600 font-semibold">{expert.title}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {expert.experience} 경력
                    </span>
                    <span className="flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      {expert.projects} 프로젝트
                    </span>
                  </div>
                </div>
              </div>

              <blockquote className="text-gray-700 italic mb-6 leading-relaxed">
                "{expert.quote}"
              </blockquote>

              <div className="space-y-2">
                {expert.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {achievement}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              전문가와 1:1 상담하기
            </h3>
            <p className="text-gray-600 mb-6">
              20년 경력의 HACCP 전문가가 직접 귀하의 프로젝트를 검토하고<br />
              맞춤형 솔루션을 제안해드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/consulting"
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                HACCP 전문가 상담 신청하기
              </a>
              <a
                href="/estimate"
                className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
              >
                무료 견적 상담받기
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
