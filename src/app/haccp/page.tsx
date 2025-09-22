'use client'

import React, { useState, useEffect } from 'react'
import { CheckSquare, Calendar, FileText, AlertCircle, CheckCircle, Clock, Award, Shield, Users, BookOpen, Target, BarChart3, Download } from 'lucide-react'

interface HaccpData {
  step: string
  due: string
  steps: Array<{
    name: string
    completed: boolean
    due: string
  }>
}

interface ChecklistItem {
  id: string
  category: string
  title: string
  description: string
  completed: boolean
  required: boolean
  documents?: string[]
}

export default function HaccpPage() {
  const [haccpData, setHaccpData] = useState<HaccpData | null>(null)
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHaccpData()
    loadChecklist()
  }, [])

  const fetchHaccpData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/haccp')
      const data = await response.json()
      setHaccpData(data)
    } catch (error) {
      console.error('HACCP 데이터 조회 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadChecklist = () => {
    const mockChecklist: ChecklistItem[] = [
      // 준비 단계
      {
        id: 'prep-1',
        category: '준비',
        title: 'HACCP 팀 구성',
        description: 'HACCP 팀을 구성하고 역할을 명확히 정의합니다.',
        completed: true,
        required: true,
        documents: ['팀 구성도', '역할 분담표', '교육 이수증']
      },
      {
        id: 'prep-2',
        category: '준비',
        title: '제품 설명서 작성',
        description: '제품의 특성, 원료, 포장재 등을 상세히 기술합니다.',
        completed: true,
        required: true,
        documents: ['제품 사양서', '원료 명세서', '포장재 명세서']
      },
      {
        id: 'prep-3',
        category: '준비',
        title: '용도 확인서 작성',
        description: '제품의 용도와 대상 소비자군을 명확히 정의합니다.',
        completed: true,
        required: true,
        documents: ['용도 확인서', '소비자군 분석서']
      },
      {
        id: 'prep-4',
        category: '준비',
        title: '공정 흐름도 작성',
        description: '제품 제조 공정을 단계별로 도식화합니다.',
        completed: false,
        required: true,
        documents: ['공정 흐름도', '공정 설명서']
      },
      // 심사 단계
      {
        id: 'review-1',
        category: '심사',
        title: '위해요소 분석',
        description: '각 공정에서 발생 가능한 위해요소를 분석합니다.',
        completed: false,
        required: true,
        documents: ['위해요소 분석표', '위해요소 평가표']
      },
      {
        id: 'review-2',
        category: '심사',
        title: 'CCP 결정',
        description: '중요관리점(CCP)을 결정하고 관리 기준을 설정합니다.',
        completed: false,
        required: true,
        documents: ['CCP 결정 트리', 'CCP 관리 기준표']
      },
      {
        id: 'review-3',
        category: '심사',
        title: '모니터링 절차 수립',
        description: 'CCP 모니터링을 위한 절차와 주기를 설정합니다.',
        completed: false,
        required: true,
        documents: ['모니터링 절차서', '모니터링 기록표']
      },
      {
        id: 'review-4',
        category: '심사',
        title: '시정조치 절차 수립',
        description: '편차 발생 시 취할 시정조치 절차를 수립합니다.',
        completed: false,
        required: true,
        documents: ['시정조치 절차서', '시정조치 기록표']
      },
      // 승인 단계
      {
        id: 'approval-1',
        category: '승인',
        title: 'HACCP 계획서 작성',
        description: '모든 절차를 포함한 HACCP 계획서를 작성합니다.',
        completed: false,
        required: true,
        documents: ['HACCP 계획서', '검토 의견서']
      },
      {
        id: 'approval-2',
        category: '승인',
        title: '검증 절차 수립',
        description: 'HACCP 시스템의 효과성을 검증할 절차를 수립합니다.',
        completed: false,
        required: true,
        documents: ['검증 절차서', '검증 계획서']
      },
      {
        id: 'approval-3',
        category: '승인',
        title: '기록 유지 절차 수립',
        description: '모든 절차와 모니터링 결과를 기록할 절차를 수립합니다.',
        completed: false,
        required: true,
        documents: ['기록 유지 절차서', '기록 보관 계획서']
      },
      {
        id: 'approval-4',
        category: '승인',
        title: '인증 신청서 제출',
        description: '완성된 HACCP 계획서와 함께 인증 신청서를 제출합니다.',
        completed: false,
        required: true,
        documents: ['인증 신청서', '제출 서류 목록']
      }
    ]
    setChecklist(mockChecklist)
  }

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const getStepStatus = (step: string) => {
    switch (step) {
      case '준비': return { color: 'text-green-600 bg-green-100', icon: CheckCircle }
      case '심사 중': return { color: 'text-blue-600 bg-blue-100', icon: Clock }
      case '승인': return { color: 'text-purple-600 bg-purple-100', icon: Award }
      default: return { color: 'text-gray-600 bg-gray-100', icon: AlertCircle }
    }
  }

  const getCategoryProgress = (category: string) => {
    const categoryItems = checklist.filter(item => item.category === category)
    const completedItems = categoryItems.filter(item => item.completed)
    return {
      completed: completedItems.length,
      total: categoryItems.length,
      percentage: Math.round((completedItems.length / categoryItems.length) * 100)
    }
  }

  const getOverallProgress = () => {
    const completedItems = checklist.filter(item => item.completed)
    return {
      completed: completedItems.length,
      total: checklist.length,
      percentage: Math.round((completedItems.length / checklist.length) * 100)
    }
  }

  const haccpPrinciples = [
    { number: 1, title: '위해요소 분석', description: '생물학적, 화학적, 물리적 위해요소 식별', completed: false },
    { number: 2, title: 'CCP 결정', description: '중요관리점(CCP) 결정', completed: false },
    { number: 3, title: '관리기준 설정', description: 'CCP별 관리기준 설정', completed: false },
    { number: 4, title: '모니터링 절차', description: 'CCP 모니터링 절차 수립', completed: false },
    { number: 5, title: '시정조치', description: '편차 발생 시 시정조치 절차', completed: false },
    { number: 6, title: '검증 절차', description: 'HACCP 시스템 검증 절차', completed: false },
    { number: 7, title: '기록 유지', description: '모든 절차와 결과 기록 유지', completed: false }
  ]

  const certificationSteps = [
    { step: 1, title: '신청서 제출', period: '1주', status: 'completed' },
    { step: 2, title: '서류 심사', period: '2-3주', status: 'in-progress' },
    { step: 3, title: '현장 심사', period: '1주', status: 'pending' },
    { step: 4, title: '심사 결과 통보', period: '1주', status: 'pending' },
    { step: 5, title: '인증서 발급', period: '1주', status: 'pending' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">HACCP 데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  const overallProgress = getOverallProgress()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            HACCP 인증 관리
          </h1>
          <p className="text-lg text-gray-600">
            식품안전관리인증기준(HACCP) 인증 과정을 체계적으로 관리하세요
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* 현재 상태 및 진행률 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
                현재 상태
              </h2>
              {haccpData && (() => {
                const status = getStepStatus(haccpData.step)
                const Icon = status.icon
                return (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${status.color}`}>
                    <Icon size={20} />
                    <span className="font-semibold">{haccpData.step}</span>
                  </div>
                )
              })()}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {overallProgress.percentage}%
                </div>
                <div className="text-sm text-gray-600">전체 진행률</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {overallProgress.completed}
                </div>
                <div className="text-sm text-gray-600">완료된 항목</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {haccpData?.due ? new Date(haccpData.due).toLocaleDateString('ko-KR') : '-'}
                </div>
                <div className="text-sm text-gray-600">예상 완료일</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl">
                <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
                <div className="text-sm text-gray-600">남은 단계</div>
              </div>
            </div>
          </div>

          {/* HACCP 7원칙 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-green-600" />
              HACCP 7원칙
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {haccpPrinciples.map((principle, index) => (
                <div key={index} className={`p-6 rounded-xl border-2 ${
                  principle.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                      principle.completed ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {principle.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{principle.title}</h3>
                    </div>
                    {principle.completed && <CheckCircle className="w-6 h-6 text-green-600" />}
                  </div>
                  <p className="text-sm text-gray-600">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 인증 단계별 진행 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="w-8 h-8 mr-3 text-purple-600" />
              인증 단계별 진행
            </h2>
            
            <div className="space-y-6">
              {certificationSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    step.status === 'completed' ? 'bg-green-600 text-white' :
                    step.status === 'in-progress' ? 'bg-blue-600 text-white' :
                    'bg-gray-300 text-gray-600'
                  }`}>
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{step.period}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          step.status === 'completed' ? 'text-green-600 bg-green-100' :
                          step.status === 'in-progress' ? 'text-blue-600 bg-blue-100' :
                          'text-gray-600 bg-gray-100'
                        }`}>
                          {step.status === 'completed' ? '완료' :
                           step.status === 'in-progress' ? '진행 중' : '대기'}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          step.status === 'completed' ? 'bg-green-600' :
                          step.status === 'in-progress' ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        style={{ 
                          width: step.status === 'completed' ? '100%' : 
                                 step.status === 'in-progress' ? '60%' : '0%' 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 체크리스트 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckSquare className="w-8 h-8 mr-3 text-orange-600" />
              HACCP 체크리스트
            </h2>
            
            <div className="space-y-8">
              {['준비', '심사', '승인'].map(category => {
                const categoryItems = checklist.filter(item => item.category === category)
                const progress = getCategoryProgress(category)
                
                return (
                  <div key={category} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900">{category} 단계</h3>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-600">
                          {progress.completed}/{progress.total} 완료
                        </div>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progress.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-blue-600">
                          {progress.percentage}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {categoryItems.map(item => (
                        <div key={item.id} className={`p-6 rounded-xl border-2 ${
                          item.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
                        }`}>
                          <div className="flex items-start gap-4">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() => toggleChecklistItem(item.id)}
                              className="w-6 h-6 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-semibold text-gray-900">{item.title}</span>
                                {item.required && (
                                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                    필수
                                  </span>
                                )}
                                {item.completed && <CheckCircle className="w-5 h-5 text-green-600" />}
                              </div>
                              <p className="text-gray-600 mb-3">{item.description}</p>
                              
                              {item.documents && item.documents.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-sm font-medium text-gray-700 mb-2">관련 서류:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {item.documents.map((doc, idx) => (
                                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                        {doc}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 인증 비용 및 기간 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Award className="w-8 h-8 mr-3 text-purple-600" />
              인증 비용 및 기간
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">예상 비용</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-700">인증 신청비</span>
                    <span className="font-semibold text-lg">500,000원</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-700">심사비</span>
                    <span className="font-semibold text-lg">1,000,000원</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-700">인증서 발급비</span>
                    <span className="font-semibold text-lg">200,000원</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                      <span className="text-lg font-semibold text-gray-900">총 비용</span>
                      <span className="text-2xl font-bold text-blue-600">1,700,000원</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">예상 기간</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-700">준비 기간</span>
                    <span className="font-semibold text-lg">2-3개월</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-700">심사 기간</span>
                    <span className="font-semibold text-lg">1-2개월</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-700">인증서 발급</span>
                    <span className="font-semibold text-lg">2-3주</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <span className="text-lg font-semibold text-gray-900">총 기간</span>
                      <span className="text-2xl font-bold text-green-600">3-6개월</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                <FileText size={20} />
                HACCP 계획서 다운로드
              </button>
              <button className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                <Calendar size={20} />
                일정 관리
              </button>
              <button className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                <Download size={20} />
                서류 템플릿
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
