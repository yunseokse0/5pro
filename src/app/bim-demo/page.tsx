'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BimDemoPage() {
  const [selectedMaterial, setSelectedMaterial] = useState('standard');

  const materials = {
    standard: { name: '일반 자재', cost: 0, savings: 0 },
    premium: { name: '프리미엄 자재', cost: 850, savings: 0 },
    economy: { name: '경제형 자재', cost: -1250, savings: 1250 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-container mx-auto px-5">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            3D BIM으로, 내 건물을 미리 보고
            <br />
            공사비 절감 효과를 확인하세요
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            BIM 시뮬레이션은 설계 오류를 최소화하고,
            <br />
            나사 하나까지 정확한 수량을 산출하여 투명하고 합리적인 공사를 가능하게 합니다.
          </p>
        </div>

        {/* 메인 콘텐츠 - 2단 레이아웃 */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* 좌측: 3D 시뮬레이션 영역 */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-soft-hover p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3D 건물 시뮬레이션
              </h2>
              <p className="text-gray-600 mb-6">
                마우스로 건물을 360° 회전하며 확인하고, 각 부분을 클릭하여 상세 정보를 확인하세요.
              </p>

              {/* 3D 뷰어 목업 */}
              <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-64 h-64 text-gray-400 group-hover:text-primary transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* 3D 큐브 */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M12 2l-8 4v8l8 4 8-4V6l-8-4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M12 6v8" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M4 6l8 4 8-4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M4 10l8 4M20 10l-8 4" />
                  </svg>
                </div>

                {/* 인터랙티브 포인트들 */}
                <div className="absolute top-1/4 left-1/3 group/point">
                  <div className="relative">
                    <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/point:opacity-100 transition-opacity bg-white px-3 py-2 rounded-lg shadow-soft text-xs whitespace-nowrap">
                      외벽 자재: 드라이비트
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 right-1/4 group/point">
                  <div className="relative">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/point:opacity-100 transition-opacity bg-white px-3 py-2 rounded-lg shadow-soft text-xs whitespace-nowrap">
                      창호: 3중 유리창
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-1/4 left-1/2 group/point">
                  <div className="relative">
                    <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/point:opacity-100 transition-opacity bg-white px-3 py-2 rounded-lg shadow-soft text-xs whitespace-nowrap">
                      구조: 철근콘크리트
                    </div>
                  </div>
                </div>
              </div>

              {/* 컨트롤 버튼 */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors duration-120">
                  <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  전체화면
                </button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors duration-120">
                  <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  확대/축소
                </button>
              </div>
            </div>
          </div>

          {/* 우측: 데이터 및 결과 영역 */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-soft-hover p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                BIM이 예측하는 당신의 건축 리포트
              </h2>
              <p className="text-gray-600 mb-8">
                정확한 데이터 기반의 투명한 공사비 산출
              </p>

              {/* 지표 1: 정확한 물량 산출 */}
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">정확한 물량 산출</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                    <p className="text-sm text-gray-600">
                      수량산출서를 통한 공사비 예측의 정확도
                    </p>
                  </div>
                </div>
              </div>

              {/* 지표 2: 예상 공사비 변화 시뮬레이션 */}
              <div className="bg-green-50 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">공사비 변화 시뮬레이션</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {materials[selectedMaterial as keyof typeof materials].savings > 0 ? '-' : ''}
                      {Math.abs(materials[selectedMaterial as keyof typeof materials].cost).toLocaleString()}만원
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      자재 변경 시 예상 공사비 절감액
                    </p>

                    {/* 자재 선택 */}
                    <div className="space-y-2">
                      {Object.entries(materials).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedMaterial(key)}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-120 ${
                            selectedMaterial === key
                              ? 'bg-green-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {value.name}
                          {value.savings > 0 && <span className="float-right">-{value.savings.toLocaleString()}만원</span>}
                          {value.cost > 0 && <span className="float-right">+{value.cost.toLocaleString()}만원</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 지표 3: 설계 오류 사전 검토 */}
              <div className="bg-orange-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">설계 오류 사전 검토</h3>
                    <div className="text-3xl font-bold text-orange-600 mb-2">27건</div>
                    <p className="text-sm text-gray-600">
                      공사 전 설계 오류 사전 검출 건수
                      <br />
                      <span className="text-orange-600 font-medium">평균 공사비 증가 방지: 3,800만원</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 추가 이점 섹션 */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-100 rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            BIM이 제공하는 추가 이점
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">공사 기간 단축</h3>
              <p className="text-gray-600">
                설계 변경 최소화로
                <br />
                평균 <span className="font-bold text-primary">15% 공기 단축</span>
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">협업 효율 증대</h3>
              <p className="text-gray-600">
                건축주-설계사-시공사 간
                <br />
                <span className="font-bold text-primary">실시간 정보 공유</span>
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">하자 위험 감소</h3>
              <p className="text-gray-600">
                시공 전 간섭 체크로
                <br />
                <span className="font-bold text-primary">하자율 80% 감소</span>
              </p>
            </div>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-block px-12 py-5 bg-primary hover:bg-primary-hover text-white text-lg font-semibold rounded-lg transition-colors duration-120 shadow-soft hover:shadow-soft-hover"
          >
            나의 건축 계획에 BIM 적용하기
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            무료 상담을 통해 BIM 적용 가능 여부와 예상 효과를 확인하세요
          </p>
        </div>
      </div>
    </div>
  );
}

