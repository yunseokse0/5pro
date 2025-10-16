'use client';

import { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Users, 
  Award,
  ArrowRight,
  Download,
  Calendar,
  Building2,
  Target
} from 'lucide-react';

export default function HaccpPage() {
  const [selectedStep, setSelectedStep] = useState(1);

  const haccpSteps = [
    {
      id: 1,
      title: 'HACCP 계획서 작성',
      description: '식품안전관리계획서 작성 및 위해요소 분석',
      duration: '2-3주',
      status: 'completed',
      icon: FileText
    },
    {
      id: 2,
      title: '위해요소 분석',
      description: '생산공정별 위해요소 식별 및 분석',
      duration: '1-2주',
      status: 'completed',
      icon: Target
    },
    {
      id: 3,
      title: '중요관리점 설정',
      description: 'CCP 설정 및 관리기준 수립',
      duration: '1주',
      status: 'in_progress',
      icon: CheckCircle
    },
    {
      id: 4,
      title: '모니터링 절차',
      description: 'CCP 모니터링 절차 및 방법 수립',
      duration: '1주',
      status: 'pending',
      icon: Clock
    },
    {
      id: 5,
      title: '시정조치 절차',
      description: '편차 발생 시 시정조치 절차 수립',
      duration: '1주',
      status: 'pending',
      icon: AlertTriangle
    },
    {
      id: 6,
      title: '검증 절차',
      description: 'HACCP 시스템 검증 절차 수립',
      duration: '1주',
      status: 'pending',
      icon: ShieldCheck
    },
    {
      id: 7,
      title: '기록유지 절차',
      description: '문서화 및 기록유지 절차 수립',
      duration: '1주',
      status: 'pending',
      icon: FileText
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-gray-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
              🛡️ HACCP 인증 전문
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              20년 경력 전문가가 함께하는<br />
              <span className="text-yellow-300">HACCP 인증 프로세스</span>
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              식품안전관리인증(HACCP) 인증을 위한 체계적인 7단계 프로세스와<br />
              전문가 컨설팅으로 95% 인증 성공률을 달성합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-lg">
                무료 HACCP 상담 신청
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-green-600 transition-all">
                HACCP 체크리스트 다운로드
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-gray-600">인증 성공률</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">200+</div>
              <div className="text-gray-600">완료 프로젝트</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">20년</div>
              <div className="text-gray-600">전문가 경력</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">7단계</div>
              <div className="text-gray-600">체계적 프로세스</div>
            </div>
          </div>
        </div>
      </section>

      {/* HACCP Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              HACCP 인증 7단계 프로세스
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              체계적이고 전문적인 HACCP 인증 프로세스로<br />
              식품안전관리인증을 성공적으로 완료하세요.
            </p>
          </div>

          <div className="space-y-6">
            {haccpSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                    selectedStep === step.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedStep(step.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${getStatusColor(step.status)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {step.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(step.status)}
                          <span className="text-sm text-gray-500">{step.duration}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      {selectedStep === step.id && (
                        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-2">상세 내용</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 해당 단계별 구체적인 작업 내용</li>
                            <li>• 필요한 서류 및 문서 준비</li>
                            <li>• 예상 소요 시간 및 비용</li>
                            <li>• 전문가 컨설팅 포함</li>
                          </ul>
                          <div className="mt-4 flex gap-3">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                              상세 안내 받기
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                              관련 자료 다운로드
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            지금 시작하세요!
          </h2>
          <p className="text-xl text-green-100 mb-8">
            HACCP 인증 전문가와 함께 체계적으로 준비하여<br />
            성공적인 인증을 완료하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-lg">
              무료 HACCP 상담 신청하기
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-green-600 transition-all">
              HACCP 체크리스트 다운로드
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
