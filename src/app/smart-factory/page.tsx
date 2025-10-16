'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Cpu, 
  BarChart3, 
  Wifi, 
  Shield, 
  Zap, 
  Eye, 
  Settings, 
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Database,
  Cloud,
  AlertTriangle,
  TrendingUp,
  Users2,
  Clock,
  Building2,
  FileSignature,
  Gauge
} from 'lucide-react';

export default function SmartFactoryPage() {
  const [selectedSolution, setSelectedSolution] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    factorySize: '',
    currentIssues: '',
    budget: '',
    timeline: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('스마트 팩토리 상담 신청이 접수되었습니다!\n24시간 내 연락드리겠습니다.');
    console.log('Smart Factory inquiry:', formData);
  };

  const solutions = [
    {
      id: 'iot-sensors',
      title: 'IoT 센서 시스템',
      description: '실시간 데이터 수집 및 모니터링',
      icon: Cpu,
      features: ['온도/습도 모니터링', '진동 센서', '압력 센서', '유량 센서'],
      price: '500만원~'
    },
    {
      id: 'data-analytics',
      title: '데이터 분석 플랫폼',
      description: 'AI 기반 생산성 분석 및 예측',
      icon: BarChart3,
      features: ['실시간 대시보드', '예측 분석', '품질 관리', '설비 효율성'],
      price: '800만원~'
    },
    {
      id: 'wireless-network',
      title: '무선 통신 네트워크',
      description: '안정적인 산업용 무선 인프라',
      icon: Wifi,
      features: ['Wi-Fi 6', '5G 연결', 'LoRaWAN', '산업용 이더넷'],
      price: '300만원~'
    },
    {
      id: 'security-system',
      title: '보안 시스템',
      description: '사이버 보안 및 물리적 보안',
      icon: Shield,
      features: ['접근 제어', 'CCTV 통합', '화재 감지', '침입 방지'],
      price: '400만원~'
    },
    {
      id: 'energy-management',
      title: '에너지 관리 시스템',
      description: '전력 사용량 최적화 및 절약',
      icon: Zap,
      features: ['전력 모니터링', '피크 시간 관리', '재생 에너지', '비용 분석'],
      price: '600만원~'
    },
    {
      id: 'predictive-maintenance',
      title: '예측 정비 시스템',
      description: '설비 고장 예측 및 정비 최적화',
      icon: Settings,
      features: ['고장 예측', '정비 스케줄링', '부품 관리', '수명 예측'],
      price: '700만원~'
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: '생산성 30% 향상',
      description: '실시간 모니터링으로 효율성 극대화'
    },
    {
      icon: AlertTriangle,
      title: '고장률 50% 감소',
      description: '예측 정비로 설비 가동률 향상'
    },
    {
      icon: Zap,
      title: '에너지 비용 25% 절약',
      description: '스마트 에너지 관리로 비용 최적화'
    },
    {
      icon: Shield,
      title: '안전사고 90% 감소',
      description: '실시간 안전 모니터링 시스템'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#101828] to-[#6A5AE0] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold mb-6">
              🏭 스마트 팩토리 솔루션
            </div>
            <h1 className="text-5xl font-bold mb-6">
              미래를 준비하는
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                스마트 팩토리
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              IoT, AI, 빅데이터를 활용한 4차 산업혁명 시대의 지능형 공장 구축
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#solutions">
                <button className="px-8 py-4 bg-white text-[#101828] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                  <Eye className="inline-block w-5 h-5 mr-2" />
                  솔루션 둘러보기
                </button>
              </Link>
              <Link href="#consultation">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                  무료 상담 신청
                  <ArrowRight className="inline-block w-5 h-5 ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#101828] mb-4">
              스마트 팩토리의 효과
            </h2>
            <p className="text-xl text-gray-600">
              데이터 기반 의사결정으로 경쟁력을 확보하세요
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#007AFF] to-[#6A5AE0] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#101828] mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#101828] mb-4">
              맞춤형 솔루션
            </h2>
            <p className="text-xl text-gray-600">
              공장 규모와 업종에 최적화된 스마트 팩토리 솔루션
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <div key={solution.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#007AFF] to-[#6A5AE0] rounded-xl flex items-center justify-center mb-6">
                  <solution.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#101828] mb-2">{solution.title}</h3>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <div className="space-y-2 mb-6">
                  {solution.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-[#007AFF]">{solution.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#101828] mb-4">
              최신 기술 스택
            </h2>
            <p className="text-xl text-gray-600">
              검증된 기술로 안정적인 스마트 팩토리 구축
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'IoT 센서', icon: Cpu, desc: '실시간 데이터 수집' },
              { name: 'AI/ML', icon: BarChart3, desc: '지능형 분석' },
              { name: '클라우드', icon: Cloud, desc: '확장 가능한 인프라' },
              { name: '모바일', icon: Smartphone, desc: '언제 어디서나 접근' }
            ].map((tech, idx) => (
              <div key={idx} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-[#007AFF] to-[#6A5AE0] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <tech.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{tech.name}</h3>
                <p className="text-sm text-gray-600">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="consultation" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#101828] mb-4">
                무료 상담 신청
              </h2>
              <p className="text-gray-600">
                스마트 팩토리 구축에 대한 전문가 상담을 받아보세요
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">회사명 *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(주)오프로"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="010-1234-5678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">공장 규모</label>
                  <select
                    value={formData.factorySize}
                    onChange={(e) => setFormData({...formData, factorySize: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">선택하세요</option>
                    <option value="소규모">소규모 (100평 미만)</option>
                    <option value="중규모">중규모 (100-500평)</option>
                    <option value="대규모">대규모 (500평 이상)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">예산</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">선택하세요</option>
                    <option value="1000만원 이하">1000만원 이하</option>
                    <option value="1000-3000만원">1000-3000만원</option>
                    <option value="3000-5000만원">3000-5000만원</option>
                    <option value="5000만원 이상">5000만원 이상</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">현재 겪고 있는 문제점</label>
                <textarea
                  value={formData.currentIssues}
                  onChange={(e) => setFormData({...formData, currentIssues: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="생산성 저하, 품질 관리 어려움, 에너지 비용 증가 등 구체적으로 작성해주세요"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-12 py-4 bg-gradient-to-r from-[#007AFF] to-[#6A5AE0] text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <Users2 className="inline-block w-5 h-5 mr-2" />
                  무료 상담 신청하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#007AFF] to-[#6A5AE0] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            지금 시작하세요
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            스마트 팩토리로 미래를 준비하고 경쟁력을 확보하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#consultation">
              <button className="px-8 py-4 bg-white text-[#007AFF] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl">
                무료 상담 신청
              </button>
            </Link>
            <Link href="/estimate">
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                견적 요청하기
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
