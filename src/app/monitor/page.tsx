'use client'

import React, { useState } from 'react'
import { BarChart3, Calendar, Camera, CheckCircle, Clock, AlertCircle, Shield, Factory, Wrench, Zap, Thermometer, Droplets } from 'lucide-react'

export default function Monitor() {
  const [selectedStage, setSelectedStage] = useState(1)

  const constructionStages = [
    { 
      id: 1,
      name: "착공 및 기초공사", 
      percent: 100, 
      status: "completed",
      description: "현장 준비 및 기초공사 완료",
      startDate: "2025-01-15",
      endDate: "2025-02-15",
      icon: Factory,
      color: "green",
      details: [
        "현장 정리 및 임시시설 설치",
        "기초 굴착 및 철근 배근",
        "기초 콘크리트 타설",
        "배수시설 설치"
      ]
    },
    { 
      id: 2,
      name: "골조공사", 
      percent: 75, 
      status: "in-progress",
      description: "철골 구조물 설치 및 콘크리트 타설",
      startDate: "2025-02-16",
      endDate: "2025-04-15",
      icon: Wrench,
      color: "blue",
      details: [
        "철골 구조물 설치",
        "슬래브 타설",
        "벽체 시공",
        "지붕 구조물 설치"
      ]
    },
    { 
      id: 3,
      name: "설비공사", 
      percent: 30, 
      status: "in-progress",
      description: "HACCP 인증 설비 및 위생시설 설치",
      startDate: "2025-04-01",
      endDate: "2025-05-31",
      icon: Zap,
      color: "purple",
      details: [
        "냉장/냉동시설 설치",
        "공기조화시설 설치",
        "전기설비 설치",
        "배수처리시설 설치"
      ]
    },
    { 
      id: 4,
      name: "마감공사", 
      percent: 0, 
      status: "pending",
      description: "내부 마감 및 HACCP 인증 준비",
      startDate: "2025-05-16",
      endDate: "2025-06-30",
      icon: Shield,
      color: "orange",
      details: [
        "내부 마감재 시공",
        "위생시설 마감",
        "HACCP 인증 준비",
        "최종 점검 및 테스트"
      ]
    }
  ]

  const qualityChecks = [
    { title: "콘크리트 강도 테스트", status: "passed", date: "2025-02-20" },
    { title: "철골 용접 품질 검사", status: "passed", date: "2025-03-15" },
    { title: "전기설비 절연저항 측정", status: "pending", date: "2025-04-20" },
    { title: "냉장시설 온도 테스트", status: "pending", date: "2025-05-10" },
    { title: "HACCP 위생시설 점검", status: "pending", date: "2025-05-25" }
  ]

  const safetyAlerts = [
    { type: "warning", message: "기상 악화로 인한 2월 5일 공사 중단", date: "2025-02-05" },
    { type: "info", message: "HACCP 인증기관 현장 점검 예정", date: "2025-04-15" },
    { type: "success", message: "기초공사 품질검사 통과", date: "2025-02-20" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'pending': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '완료'
      case 'in-progress': return '진행 중'
      case 'pending': return '대기'
      default: return '알 수 없음'
    }
  }

  const getCheckStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-600 bg-green-100'
      case 'failed': return 'text-red-600 bg-red-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'info': return 'text-blue-600 bg-blue-100 border-blue-200'
      case 'success': return 'text-green-600 bg-green-100 border-green-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            식품공장 건설 진행 모니터링
          </h1>
          <p className="text-lg text-gray-600">
            HACCP 기준 식품공장 건설 현황을 실시간으로 확인하고 관리하세요
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* 전체 진행률 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="w-8 h-8 mr-3 text-blue-600" />
              전체 진행률
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-gray-700">전체 진행률</span>
                    <span className="text-2xl font-bold text-blue-600">52%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-6 rounded-full transition-all duration-500" style={{ width: '52%' }}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-sm text-gray-600">착공</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">75%</div>
                    <div className="text-sm text-gray-600">골조</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">30%</div>
                    <div className="text-sm text-gray-600">설비</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-600">0%</div>
                    <div className="text-sm text-gray-600">마감</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">프로젝트 정보</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">프로젝트명:</span>
                    <span className="font-medium">서울 강남구 제과제빵 공장</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">착공일:</span>
                    <span className="font-medium">2025-01-15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">예상 완공:</span>
                    <span className="font-medium">2025-06-30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">현재 단계:</span>
                    <span className="font-medium text-blue-600">골조공사</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 공정 단계별 상세 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Factory className="w-8 h-8 mr-3 text-green-600" />
              공정 단계별 상세 현황
            </h2>
            
            <div className="space-y-6">
              {constructionStages.map((stage, index) => (
                <div key={stage.id} className={`p-6 rounded-xl border-2 ${
                  stage.status === 'completed' ? 'border-green-200 bg-green-50' :
                  stage.status === 'in-progress' ? 'border-blue-200 bg-blue-50' :
                  'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <stage.icon className={`w-8 h-8 text-${stage.color}-600`} />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{stage.name}</h3>
                        <p className="text-gray-600">{stage.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(stage.status)}`}>
                        {getStatusText(stage.status)}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{stage.percent}%</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`bg-gradient-to-r from-${stage.color}-500 to-${stage.color}-600 h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${stage.percent}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-600">시작일: </span>
                      <span className="font-medium">{stage.startDate}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">완료예정: </span>
                      <span className="font-medium">{stage.endDate}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {stage.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <img
                      src={`https://placehold.co/800x400/4f46e5/ffffff?text=${stage.name}+현장+사진`}
                      alt={stage.name}
                      className="w-full rounded-lg shadow-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 품질관리 체크리스트 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-8 h-8 mr-3 text-green-600" />
                품질관리 체크리스트
              </h2>
              
              <div className="space-y-4">
                {qualityChecks.map((check, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      {check.status === 'passed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                      {check.status === 'failed' && <AlertCircle className="w-5 h-5 text-red-600" />}
                      {check.status === 'pending' && <Clock className="w-5 h-5 text-yellow-600" />}
                      <div>
                        <div className="font-medium text-gray-900">{check.title}</div>
                        <div className="text-sm text-gray-500">{check.date}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCheckStatusColor(check.status)}`}>
                      {check.status === 'passed' ? '통과' : check.status === 'failed' ? '실패' : '대기'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 안전 알림 및 이슈 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertCircle className="w-8 h-8 mr-3 text-orange-600" />
                안전 알림 및 이슈
              </h2>
              
              <div className="space-y-4">
                {safetyAlerts.map((alert, index) => (
                  <div key={index} className={`p-4 rounded-xl border ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start gap-3">
                      {alert.type === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />}
                      {alert.type === 'info' && <Clock className="w-5 h-5 text-blue-600 mt-0.5" />}
                      {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{alert.message}</p>
                        <p className="text-sm text-gray-500 mt-1">{alert.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 현장 사진 갤러리 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Camera className="w-8 h-8 mr-3 text-purple-600" />
                현장 사진 갤러리
              </h2>
              <button className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                <Camera className="w-4 h-4 mr-2" />
                사진 업로드
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {constructionStages.map((stage, index) => (
                <div key={index} className="bg-gray-50 rounded-xl overflow-hidden">
                  <img
                    src={`https://placehold.co/400x250/4f46e5/ffffff?text=${stage.name}+현장`}
                    alt={stage.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{stage.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{stage.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{stage.startDate}</span>
                      <span className={`px-2 py-1 rounded-full ${getStatusColor(stage.status)}`}>
                        {getStatusText(stage.status)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
