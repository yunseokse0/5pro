'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Shield, FileText, ClipboardList, Users, Clock, ArrowRight, Download, Calendar } from 'lucide-react';

const HACCP_SERVICES = [
  {
    title: "HACCP 전담 전문가의 현장 진단 및 문서 코칭",
    desc: "20년 경력 전문가가 직접 현장을 방문하여 HACCP 준비 상태를 진단하고, 필요한 문서 작성을 단계별로 코칭합니다.",
    icon: Users,
    features: ["현장 방문 진단", "문서 작성 가이드", "1:1 맞춤 코칭"]
  },
  {
    title: "인증 기준에 맞춘 설비·동선 설계",
    desc: "HACCP 인증 기준을 완벽히 반영한 공장 설계로 심사 통과율을 극대화하고, 운영 효율까지 고려합니다.",
    icon: Shield,
    features: ["HACCP 기준 설계", "동선 최적화", "설비 배치 검증"]
  },
  {
    title: "HACCP 기록 자동화 시스템 세팅",
    desc: "수기 기록의 번거로움을 해결하는 자동화 시스템을 구축하여 심사 부담을 0%로 만듭니다.",
    icon: FileText,
    features: ["자동 기록 생성", "클라우드 저장", "실시간 모니터링"]
  }
];

const EFFICIENCY_SERVICES = [
  {
    title: "품질·생산 데이터 자동 수집",
    desc: "IoT 센서를 통한 실시간 데이터 수집으로 정확한 HACCP 기록을 자동 생성합니다.",
    icon: ClipboardList,
    features: ["IoT 센서 연동", "실시간 데이터 수집", "자동 기록 생성"]
  },
  {
    title: "모의심사(Pre-Audit) + 개선 리포트 제공",
    desc: "실제 심사 전 모의심사를 통해 부족한 부분을 미리 파악하고 개선 방안을 제시합니다.",
    icon: CheckCircle,
    features: ["모의심사 실시", "개선사항 리포트", "심사 대비 완료"]
  },
  {
    title: "인증 이후 운영 매뉴얼까지 관리",
    desc: "인증 획득 후에도 지속적인 운영 관리를 위한 매뉴얼과 시스템을 제공합니다.",
    icon: Clock,
    features: ["운영 매뉴얼 제공", "지속 관리 지원", "갱신 심사 대비"]
  }
];

const DATA_SERVICES = [
  {
    title: "업종별 규정 데이터베이스 자동 반영",
    desc: "식품 제조업 업종별 HACCP 규정을 데이터베이스화하여 자동으로 적용합니다.",
    icon: FileText,
    features: ["업종별 규정 DB", "자동 업데이트", "맞춤형 가이드"]
  },
  {
    title: "HACCP 운영 리포트 자동 생성",
    desc: "수집된 데이터를 바탕으로 심사관이 요구하는 모든 리포트를 자동 생성합니다.",
    icon: ClipboardList,
    features: ["자동 리포트 생성", "심사 기준 맞춤", "정확도 100%"]
  },
  {
    title: "클라우드 기반 기록 보관",
    desc: "모든 HACCP 관련 기록을 안전하게 클라우드에 보관하여 언제든지 접근 가능합니다.",
    icon: Shield,
    features: ["클라우드 저장", "무제한 용량", "보안 강화"]
  }
];

export default function ConsultingPage() {
  const [selectedService, setSelectedService] = useState<string>('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
            🧾 HACCP 전문 컨설팅
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            HACCP 인증은 문서가 아니라 설계에서 시작됩니다.
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            설계 단계에서부터 HACCP 전담 전문가가 직접 검증합니다.
            <br className="hidden md:block" />
            수기로 기록하던 HACCP 관리, 이제 자동화된 데이터로 안전하게 관리하세요.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="#contact"
              className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors min-h-[44px] flex items-center"
            >
              HACCP 통합 설계 상담 신청
            </Link>
            <Link 
              href="#diagnosis"
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors min-h-[44px] flex items-center"
            >
              인증 성공을 위한 맞춤 컨설팅 문의
            </Link>
            <Link 
              href="#demo"
              className="px-6 py-3 rounded-lg bg-purple-50 text-purple-700 font-semibold hover:bg-purple-100 transition-colors min-h-[44px] flex items-center"
            >
              HACCP 자동 기록 시스템 확인
            </Link>
          </div>
        </div>
      </section>

      {/* 전문성 강화 섹션 */}
      <section className="px-6 md:px-12 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">전문성 강화</h2>
            <p className="text-xl text-gray-600">20년 경력 전문가의 체계적인 HACCP 지원</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {HACCP_SERVICES.map((service, index) => (
              <div key={index} className="p-6 rounded-xl border bg-gray-50 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg mr-4">
                    <service.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 효율성 중심 섹션 */}
      <section className="px-6 md:px-12 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">효율성 중심</h2>
            <p className="text-xl text-gray-600">자동화를 통한 HACCP 관리 혁신</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {EFFICIENCY_SERVICES.map((service, index) => (
              <div key={index} className="p-6 rounded-xl border bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg mr-4">
                    <service.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 데이터 기반 관리 섹션 */}
      <section className="px-6 md:px-12 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">데이터 기반 관리</h2>
            <p className="text-xl text-gray-600">스마트 시스템으로 완성하는 HACCP 운영</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {DATA_SERVICES.map((service, index) => (
              <div key={index} className="p-6 rounded-xl border bg-gray-50 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-100 rounded-lg mr-4">
                    <service.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section id="contact" className="px-6 md:px-12 py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            내 프로젝트 데이터를 저장하고 전문가와 연결되세요
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            HACCP 인증 성공률 95% 이상의 전문가 팀이 직접 지원합니다
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/estimate"
              className="px-6 py-3 rounded-lg bg-white text-purple-600 font-semibold hover:bg-gray-100 transition-colors min-h-[44px] flex items-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              무료 상담 신청하기
            </Link>
            <Link 
              href="#demo"
              className="px-6 py-3 rounded-lg border border-white text-white font-semibold hover:bg-white hover:text-purple-600 transition-colors min-h-[44px] flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              HACCP 가이드북 다운로드
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}