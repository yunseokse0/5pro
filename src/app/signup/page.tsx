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
    
    // 폼 유효성 검사
    if (!formData.name || !formData.email || !formData.phone || !formData.company) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    // 전화번호 형식 검사
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('올바른 전화번호 형식을 입력해주세요. (010-1234-5678)');
      return;
    }

    try {
      // 로컬 스토리지에 사용자 데이터 저장
      const userData = {
        ...formData,
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        isActive: true
      };

      // 기존 사용자 데이터 가져오기
      const existingUsers = JSON.parse(localStorage.getItem('offro_users') || '[]');
      existingUsers.push(userData);
      localStorage.setItem('offro_users', JSON.stringify(existingUsers));

      // 현재 사용자로 설정
      localStorage.setItem('offro_current_user', JSON.stringify(userData));

      alert('회원가입이 완료되었습니다!\nHACCP 가이드북과 ROI 리포트를 이메일로 발송해드리겠습니다.');
      
      // 메인 페이지로 리다이렉트
      window.location.href = '/';
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold mb-6">
            📊 데이터 기반 리드 확보
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            지금 가입하면, 나의 공장 설립 견적과 운영 효율 분석을 한 번에 저장할 수 있습니다.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            견적 결과, 투자 회수 시뮬레이터, 공정 관리 리포트를 모두 내 계정에서 관리하세요.
            <br className="hidden md:block" />
            오프로 회원은 맞춤형 HACCP 컨설팅 및 공장 운영 데이터를 무료로 조회할 수 있습니다.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="#signup"
              className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors min-h-[44px] flex items-center"
            >
              무료 가입하고 결과 저장하기
            </Link>
            <Link 
              href="#benefits"
              className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors min-h-[44px] flex items-center"
            >
              내 공장 설립 리포트 받아보기
            </Link>
            <Link 
              href="#demo"
              className="px-6 py-3 rounded-lg bg-indigo-50 text-indigo-700 font-semibold hover:bg-indigo-100 transition-colors min-h-[44px] flex items-center"
            >
              상담 예약과 데이터 저장 한 번에
            </Link>
          </div>
        </div>
      </section>

      {/* 혜택 섹션 */}
      <section id="benefits" className="px-6 md:px-12 py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">회원 전용 혜택</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">데이터 기반 리드 확보 + 프로젝트 지속 관리</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, index) => (
              <div key={index} className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg mr-4 ${benefit.color}`}>
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{benefit.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 리드마그넷 섹션 */}
      <section className="px-6 md:px-12 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">무료 자료 다운로드</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">회원가입 후 즉시 다운로드 가능한 전문 자료들</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {LEAD_MAGNETS.map((magnet, index) => (
              <div key={index} className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                    <magnet.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{magnet.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{magnet.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{magnet.downloadCount}</span>
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
      <section id="signup" className="px-6 md:px-12 py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                무료 회원가입
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                내 프로젝트 데이터를 저장하고 전문가와 연결되세요
              </p>
            </div>

            {/* SNS 간편 로그인 */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                <span className="px-4 text-sm text-gray-500 dark:text-gray-400">SNS 간편 가입</span>
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 구글 로그인 */}
                <button
                  type="button"
                  onClick={() => {
                    alert('구글 로그인은 준비 중입니다.');
                    // TODO: 구글 OAuth 연동
                  }}
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">구글로 시작</span>
                </button>

                {/* 카카오 로그인 */}
                <button
                  type="button"
                  onClick={() => {
                    alert('카카오 로그인은 준비 중입니다.');
                    // TODO: 카카오 OAuth 연동
                  }}
                  className="flex items-center justify-center px-6 py-3 rounded-lg transition-colors"
                  style={{ backgroundColor: '#FEE500' }}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#000000" d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.681l-1.126 1.09V7.472a.472.472 0 1 0-.944 0v2.993a.471.471 0 0 0 .15.337l1.276 1.236-1.276 1.236a.472.472 0 1 0 .656.681l1.47-1.424v1.87a.472.472 0 1 0 .944 0V11.06zm-2.063 2.868a.47.47 0 0 0 .472-.472v-6.47a.47.47 0 0 0-.472-.474h-1.278a.47.47 0 0 0-.472.473v.943h-.943a.472.472 0 1 0 0 .944h.943v4.584a.47.47 0 0 0 .472.472h1.278zm-4.644 0a.467.467 0 0 0 .382-.196l2.519-3.532a.473.473 0 0 0-.764-.555l-2.137 2.993-2.138-2.993a.473.473 0 1 0-.764.555l2.52 3.532a.467.467 0 0 0 .382.196zm-4.001 0h1.015c.47 0 .85-.382.85-.851v-.944c0-.47-.38-.85-.85-.85H7.199c-.47 0-.85.38-.85.85v2.644c0 .47.38.851.85.851zm.85-1.795h.472a.236.236 0 1 1 0 .472h-.472v-.472z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-900">카카오로 시작</span>
                </button>

                {/* 네이버 로그인 */}
                <button
                  type="button"
                  onClick={() => {
                    alert('네이버 로그인은 준비 중입니다.');
                    // TODO: 네이버 OAuth 연동
                  }}
                  className="flex items-center justify-center px-6 py-3 rounded-lg transition-colors"
                  style={{ backgroundColor: '#03C75A' }}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#FFFFFF" d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"/>
                  </svg>
                  <span className="text-sm font-medium text-white">네이버로 시작</span>
                </button>
              </div>

              <div className="flex items-center mt-8 mb-6">
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                <span className="px-4 text-sm text-gray-500 dark:text-gray-400">또는 이메일로 가입</span>
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">이름 *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">이메일 *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="example@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">연락처 *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="010-1234-5678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">회사명 *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="(주)회사명"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">직책</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="대표, 공장장, 팀장 등"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">공장 유형</label>
                  <select
                    value={formData.factoryType}
                    onChange={(e) => setFormData({...formData, factoryType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                    <label key={interest} className="flex items-center p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{interest}</span>
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
                <label htmlFor="newsletter" className="text-sm text-gray-700 dark:text-gray-300">
                  프로젝트 관련 소식과 업데이트를 이메일로 받아보겠습니다
                </label>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <Users className="inline-block w-5 h-5 mr-2" />
                  무료 가입하고 결과 저장하기
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
