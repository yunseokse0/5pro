'use client'

import React, { useState, useEffect } from 'react'
import { projectStorage, ProjectData } from '../../lib/storage'
import { projectCalculator } from '../../lib/calculator'
import { BarChart3, Factory, Shield, Calendar, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock, Users, FileText, Award, Plus, Edit, Trash2 } from 'lucide-react'

export default function Dashboard() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [currentProject, setCurrentProject] = useState<ProjectData | null>(null)
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    inProgressProjects: 0,
    totalBudget: 0,
    averageBudget: 0
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0
    }).format(amount)
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = () => {
    const allProjects = projectStorage.getAllProjects()
    const current = projectStorage.getCurrentProject()
    const projectStats = projectStorage.getProjectStats()
    
    setProjects(allProjects)
    setCurrentProject(current)
    setStats(projectStats)
  }

  const deleteProject = (id: string) => {
    if (confirm('정말로 이 프로젝트를 삭제하시겠습니까?')) {
      projectStorage.deleteProject(id)
      loadProjects()
    }
  }

  const setAsCurrentProject = (project: ProjectData) => {
    projectStorage.setCurrentProject(project.id)
    setCurrentProject(project)
  }

  // 현재 프로젝트가 없으면 첫 번째 프로젝트를 표시
  const displayProject = currentProject || projects[0]

  if (!displayProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Factory className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">프로젝트가 없습니다</h2>
          <p className="text-gray-600 mb-6">새로운 프로젝트를 생성하여 시작해보세요</p>
          <a
            href="/estimate"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            새 프로젝트 생성
          </a>
        </div>
      </div>
    )
  }

  const projectOverview = {
    name: displayProject.name,
    status: displayProject.timeline.phases.some(p => p.status === 'in-progress') ? "건설 중" : 
            displayProject.timeline.phases.every(p => p.status === 'completed') ? "완료" : "계획 중",
    startDate: displayProject.timeline.startDate,
    expectedEndDate: displayProject.timeline.expectedEndDate,
    progress: displayProject.timeline.phases.length > 0 ? 
      Math.round((displayProject.timeline.phases.filter(p => p.status === 'completed').length / displayProject.timeline.phases.length) * 100) : 0,
    budget: displayProject.budget.total,
    spent: displayProject.budget.total * 0.52, // 임시로 52% 사용
    remaining: displayProject.budget.total * 0.48
  }

  const kpiCards = [
    {
      title: "전체 진행률",
      value: `${projectOverview.progress}%`,
      change: "+8%",
      changeType: "positive",
      icon: BarChart3,
      color: "blue",
      description: "지난 주 대비 8% 증가"
    },
    {
      title: "예상 비용",
      value: formatCurrency(projectOverview.budget),
      change: "예산 내",
      changeType: "neutral",
      icon: DollarSign,
      color: "green",
      description: "예산 범위 내 진행"
    },
    {
      title: "HACCP 상태",
      value: displayProject.haccp.status === 'not-started' ? '미시작' : 
             displayProject.haccp.status === 'preparation' ? '준비 중' :
             displayProject.haccp.status === 'review' ? '심사 중' : '승인',
      change: "진행 중",
      changeType: "warning",
      icon: Shield,
      color: "yellow",
      description: "서류 심사 단계"
    },
    {
      title: "완공 예정일",
      value: displayProject.timeline.expectedEndDate || "미정",
      change: "정상",
      changeType: "positive",
      icon: Calendar,
      color: "purple",
      description: "일정대로 진행 중"
    }
  ]

  const constructionStages = displayProject.timeline.phases.map(phase => ({
    name: phase.name,
    status: phase.status,
    progress: phase.status === 'completed' ? 100 : phase.status === 'in-progress' ? 50 : 0,
    startDate: displayProject.timeline.startDate,
    endDate: displayProject.timeline.expectedEndDate
  }))

  const haccpProgress = [
    { 
      step: "준비", 
      completed: displayProject.haccp.requirements.filter(r => r.completed).length, 
      total: displayProject.haccp.requirements.length, 
      percentage: Math.round((displayProject.haccp.requirements.filter(r => r.completed).length / displayProject.haccp.requirements.length) * 100)
    },
    { step: "심사", completed: 0, total: 4, percentage: 0 },
    { step: "승인", completed: 0, total: 4, percentage: 0 }
  ]

  const recentActivities = [
    { type: "construction", message: "골조공사 75% 완료", time: "2시간 전", status: "success" },
    { type: "haccp", message: "HACCP 서류 심사 시작", time: "1일 전", status: "info" },
    { type: "quality", message: "콘크리트 강도 테스트 통과", time: "2일 전", status: "success" },
    { type: "schedule", message: "설비공사 일정 조정", time: "3일 전", status: "warning" },
    { type: "document", message: "계약서 갱신 완료", time: "1주 전", status: "success" }
  ]

  const qualityMetrics = [
    { name: "콘크리트 강도", value: "28.5 MPa", status: "pass", standard: "≥25 MPa" },
    { name: "철골 용접 품질", value: "98.5%", status: "pass", standard: "≥95%" },
    { name: "전기 절연저항", value: "대기 중", status: "pending", standard: "≥1MΩ" },
    { name: "냉장시설 온도", value: "대기 중", status: "pending", standard: "≤4°C" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'pending': return 'text-gray-600 bg-gray-100'
      case 'success': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'info': return 'text-blue-600 bg-blue-100'
      case 'pass': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '완료'
      case 'in-progress': return '진행 중'
      case 'pending': return '대기'
      case 'success': return '성공'
      case 'warning': return '주의'
      case 'info': return '정보'
      case 'pass': return '통과'
      default: return '알 수 없음'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">프로젝트 대시보드</h1>
              <p className="text-lg text-gray-600">{projectOverview.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">프로젝트 상태</div>
                <div className="text-lg font-semibold text-blue-600">{projectOverview.status}</div>
              </div>
              <a
                href="/estimate"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                새 프로젝트
              </a>
            </div>
          </div>
        </div>

        {/* 프로젝트 목록 */}
        {projects.length > 1 && (
          <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">프로젝트 목록</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map(project => (
                <div
                  key={project.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    currentProject?.id === project.id
                      ? 'border-blue-200 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => setAsCurrentProject(project)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <div className="flex space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // 편집 기능 (추후 구현)
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteProject(project.id)
                        }}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {project.location.province} {project.location.city} • {project.size}평
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {formatCurrency(project.budget.total)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 전체 통계 */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">전체 통계</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">{stats.totalProjects}</div>
              <div className="text-sm text-gray-600">총 프로젝트</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{stats.completedProjects}</div>
              <div className="text-sm text-gray-600">완료된 프로젝트</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <div className="text-2xl font-bold text-yellow-600">{stats.inProgressProjects}</div>
              <div className="text-sm text-gray-600">진행 중인 프로젝트</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">{formatCurrency(stats.averageBudget)}</div>
              <div className="text-sm text-gray-600">평균 예산</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* KPI 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiCards.map((card, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-${card.color}-100`}>
                    <card.icon className={`w-6 h-6 text-${card.color}-600`} />
                  </div>
                  <span className={`text-sm font-medium ${
                    card.changeType === 'positive' ? 'text-green-600' :
                    card.changeType === 'negative' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {card.change}
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{card.value}</div>
                  <div className="text-sm text-gray-600 mb-2">{card.title}</div>
                  <div className="text-xs text-gray-500">{card.description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 프로젝트 진행률 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
              프로젝트 진행률
            </h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-gray-700">전체 진행률</span>
                <span className="text-2xl font-bold text-blue-600">{projectOverview.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${projectOverview.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {constructionStages.map((stage, index) => (
                <div key={index} className={`p-4 rounded-xl border-2 ${
                  stage.status === 'completed' ? 'border-green-200 bg-green-50' :
                  stage.status === 'in-progress' ? 'border-blue-200 bg-blue-50' :
                  'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(stage.status)}`}>
                      {getStatusText(stage.status)}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stage.progress}%</div>
                  <div className="text-xs text-gray-500">
                    {stage.startDate} ~ {stage.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* HACCP 진행률 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-8 h-8 mr-3 text-green-600" />
                HACCP 인증 진행률
              </h2>
              
              <div className="space-y-4">
                {haccpProgress.map((step, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{step.step} 단계</span>
                      <span className="text-sm text-gray-600">
                        {step.completed}/{step.total} 완료
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${step.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">{step.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 품질 지표 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-8 h-8 mr-3 text-purple-600" />
                품질 지표
              </h2>
              
              <div className="space-y-4">
                {qualityMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900">{metric.name}</div>
                      <div className="text-sm text-gray-500">기준: {metric.standard}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{metric.value}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                        {getStatusText(metric.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 최근 활동 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="w-8 h-8 mr-3 text-orange-600" />
              최근 활동
            </h2>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.status === 'success' ? 'bg-green-100' :
                    activity.status === 'warning' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    {activity.type === 'construction' && <Factory className="w-5 h-5 text-gray-600" />}
                    {activity.type === 'haccp' && <Shield className="w-5 h-5 text-gray-600" />}
                    {activity.type === 'quality' && <Award className="w-5 h-5 text-gray-600" />}
                    {activity.type === 'schedule' && <Calendar className="w-5 h-5 text-gray-600" />}
                    {activity.type === 'document' && <FileText className="w-5 h-5 text-gray-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {getStatusText(activity.status)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 예산 현황 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <DollarSign className="w-8 h-8 mr-3 text-green-600" />
              예산 현황
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-600 mb-2">
                  {formatCurrency(projectOverview.budget)}
                </div>
                <div className="text-sm text-gray-600">총 예산</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 mb-2">
                  {formatCurrency(projectOverview.spent)}
                </div>
                <div className="text-sm text-gray-600">사용된 금액</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-purple-600 mb-2">
                  {formatCurrency(projectOverview.remaining)}
                </div>
                <div className="text-sm text-gray-600">잔여 예산</div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">예산 사용률</span>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round((projectOverview.spent / projectOverview.budget) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(projectOverview.spent / projectOverview.budget) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
