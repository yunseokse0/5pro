'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle, 
  Download, 
  FileText, 
  BarChart3, 
  Shield, 
  Users, 
  Calendar,
  ArrowRight,
  Database,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';

const BENEFITS = [
  {
    icon: FileText,
    title: "HACCP 가이드북 + 효율 분석 리포트 제공",
    desc: "회원 전용으로 비용 분석 리포트와 운영 효율 대시보드를 제공합니다",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: Database,
    title: "내 프로젝트 데이터를 안전하게 저장",
    desc: "가입 후 내 프로젝트의 데이터를 안전하게 저장하고 이어서 진행할 수 있습니다",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: BarChart3,
    title: "내 데이터 기반 효율 분석 받기",
    desc: "견적, HACCP, 스마트팩토리 진행 상황을 한 계정에서 관리합니다",
    color: "bg-purple-50 text-purple-600"
  }
];

const LEAD_MAGNETS = [
  {
    title: "HACCP 체크리스트",
    desc: "현장에서 바로 쓰는 점검표",
    icon: Shield,
    downloadCount: "2,847명이 다운로드"
  },
  {
    title: "식품공장 설립 가이드북",
    desc: "단계별 준비 로드맵",
    icon: FileText,
    downloadCount: "1,523명이 다운로드"
  },
  {
    title: "ROI 효율 분석 리포트",
    desc: "내 공장의 예상 절감율과 ROI 분석",
    icon: TrendingUp,
    downloadCount: "회원 전용"
  }
];

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    factoryType: '',
    projectStage: '',
    interests: [] as string[],
    newsletter: false
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('회원가입이 완료되었습니다!\nHACCP 가이드북과 ROI 리포트를 이메일로 발송해드리겠습니다.');
    console.log('Signup data:', formData);
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
            📊 데이터 기반 리드 확보
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            지금 가입하고 내 공장 설계 데이터를 저장하세요
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            회원가입 시 HACCP 가이드북 + 효율 분석 리포트 제공
            <br className="hidden md:block" />
            내 프로젝트 ROI 보고서를 자동으로 받아보세요
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="#signup"
              className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors min-h-[44px] flex items-center"
            >
              무료 회원가입하고 내 프로젝트 관리 시작하기
            </Link>
            <Link 
              href="#benefits"
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors min-h-[44px] flex items-center"
            >
              가이드북 + ROI 리포트 받기 (회원 전용)
            </Link>
            <Link 
              href="#demo"
              className="px-6 py-3 rounded-lg bg-indigo-50 text-indigo-700 font-semibold hover:bg-indigo-100 transition-colors min-h-[44px] flex items-center"
            >
              내 데이터 기반 효율 분석 받기 (로그인 필요)
            </Link>
          </div>
        </div>
      </section>

      {/* 혜택 섹션 */}
      <section id="benefits" className="px-6 md:px-12 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">회원 전용 혜택</h2>
            <p className="text-xl text-gray-600">데이터 기반 리드 확보 + 프로젝트 지속 관리</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, index) => (
              <div key={index} className="p-6 rounded-xl border bg-gray-50 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg mr-4 ${benefit.color}`}>
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                </div>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 리드마그넷 섹션 */}
      <section className="px-6 md:px-12 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">무료 자료 다운로드</h2>
            <p className="text-xl text-gray-600">회원가입 후 즉시 다운로드 가능한 전문 자료들</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {LEAD_MAGNETS.map((magnet, index) => (
              <div key={index} className="p-6 rounded-xl border bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                    <magnet.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{magnet.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{magnet.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{magnet.downloadCount}</span>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                    다운로드
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 회원가입 폼 */}
      <section id="signup" className="px-6 md:px-12 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                무료 회원가입
              </h2>
              <p className="text-gray-600">
                내 프로젝트 데이터를 저장하고 전문가와 연결되세요
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="example@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">연락처 *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="010-1234-5678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">회사명 *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="(주)회사명"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">직책</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="대표, 공장장, 팀장 등"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">공장 유형</label>
                  <select
                    value={formData.factoryType}
                    onChange={(e) => setFormData({...formData, factoryType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">선택하세요</option>
                    <option value="김치공장">김치공장</option>
                    <option value="제빵공장">제빵공장</option>
                    <option value="냉동식품">냉동식품</option>
                    <option value="유제품">유제품</option>
                    <option value="육류가공">육류가공</option>
                    <option value="음료제조">음료제조</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">프로젝트 진행 단계</label>
                <select
                  value={formData.projectStage}
                  onChange={(e) => setFormData({...formData, projectStage: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">선택하세요</option>
                  <option value="계획단계">계획 단계</option>
                  <option value="설계단계">설계 단계</option>
                  <option value="시공단계">시공 단계</option>
                  <option value="완공단계">완공 단계</option>
                  <option value="운영단계">운영 단계</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">관심 분야 (복수 선택 가능)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'HACCP 인증',
                    '스마트팩토리 구축',
                    '공장 설계',
                    '견적 상담',
                    '운영 효율 개선',
                    '품질 관리'
                  ].map((interest) => (
                    <label key={interest} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={formData.newsletter}
                  onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
                  className="mr-3"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-700">
                  프로젝트 관련 소식과 업데이트를 이메일로 받아보겠습니다
                </label>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <Users className="inline-block w-5 h-5 mr-2" />
                  무료 회원가입하고 혜택 받기
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="px-6 md:px-12 py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            내 프로젝트 데이터를 저장하고 전문가와 연결되세요
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            HACCP 인증 성공률 95% 이상의 전문가 팀이 직접 지원합니다
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/estimate"
              className="px-6 py-3 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition-colors min-h-[44px] flex items-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              즉시 견적 보기
            </Link>
            <Link 
              href="/consulting"
              className="px-6 py-3 rounded-lg border border-white text-white font-semibold hover:bg-white hover:text-indigo-600 transition-colors min-h-[44px] flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              HACCP 컨설팅 신청
            </Link>
            <Link 
              href="/smart-factory"
              className="px-6 py-3 rounded-lg bg-indigo-500/20 backdrop-blur-sm text-white border border-indigo-300/30 font-semibold hover:bg-indigo-500/30 transition-colors min-h-[44px] flex items-center"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              스마트팩토리 데모 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
