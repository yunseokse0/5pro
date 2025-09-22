'use client'

import React, { useState } from 'react'
import { 
  BarChart3, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Building, 
  Shield,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Activity,
  Eye,
  Layers,
  Play,
  RotateCcw,
  Camera,
  Video,
  Monitor,
  Settings,
  Wrench,
  HardHat,
  ClipboardCheck,
  AlertTriangle,
  Thermometer,
  Droplets,
  Wind
} from 'lucide-react'

export default function ProgressPage() {
  const [selectedProject, setSelectedProject] = useState('project1')
  const [show3DModel, setShow3DModel] = useState(false)
  const [showSimulation, setShowSimulation] = useState(false)

  const projects = [
    {
      id: 'project1',
      name: '맛있는식품 공장',
      company: '(주)맛있는식품',
      status: 'in-progress',
      progress: 75,
      startDate: '2024-01-15',
      expectedEndDate: '2024-06-15',
      budget: '15억원',
      location: '경기도 안양시'
    },
    {
      id: 'project2',
      name: '신선한유제품 공장',
      company: '(주)신선한유제품',
      status: 'completed',
      progress: 100,
      startDate: '2023-08-01',
      expectedEndDate: '2024-02-01',
      budget: '12억원',
      location: '충청남도 천안시'
    },
    {
      id: 'project3',
      name: '건강한베이커리 공장',
      company: '(주)건강한베이커리',
      status: 'planning',
      progress: 25,
      startDate: '2024-03-01',
      expectedEndDate: '2024-09-01',
      budget: '8억원',
      location: '경기도 수원시'
    }
  ]

  const phases = [
    {
      id: 1,
      name: '기본 설계',
      status: 'completed',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      description: '건물 기본 구조 및 HACCP 설계 완료'
    },
    {
      id: 2,
      name: '인허가 신청',
      status: 'completed',
      startDate: '2024-02-01',
      endDate: '2024-03-01',
      description: '식품제조업 신고 및 건축물 사용승인 완료'
    },
    {
      id: 3,
      name: '시공 시작',
      status: 'in-progress',
      startDate: '2024-03-01',
      endDate: '2024-05-15',
      description: '현재 진행 중 - 공정 75% 완료'
    },
    {
      id: 4,
      name: 'HACCP 인증',
      status: 'pending',
      startDate: '2024-05-01',
      endDate: '2024-06-01',
      description: '식품안전관리인증원 인증 신청 예정'
    },
    {
      id: 5,
      name: '완공 및 인수인계',
      status: 'pending',
      startDate: '2024-06-01',
      endDate: '2024-06-15',
      description: '최종 점검 및 고객 인수인계'
    }
  ]

  const milestones = [
    {
      title: '설계 완료',
      date: '2024-02-15',
      status: 'completed',
      description: 'HACCP 기준 설계 완료'
    },
    {
      title: '인허가 승인',
      date: '2024-03-01',
      status: 'completed',
      description: '모든 인허가 승인 완료'
    },
    {
      title: '시공 50% 완료',
      date: '2024-04-15',
      status: 'completed',
      description: '시공 진행률 50% 달성'
    },
    {
      title: '시공 완료',
      date: '2024-05-15',
      status: 'in-progress',
      description: '현재 진행 중'
    },
    {
      title: 'HACCP 인증',
      date: '2024-06-01',
      status: 'pending',
      description: '예정'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'pending': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle
      case 'in-progress': return Activity
      case 'pending': return Clock
      default: return Clock
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">진행상황</h1>
            <p className="text-xl opacity-90">프로젝트 진행 현황을 실시간으로 확인하세요</p>
          </div>
        </div>
      </div>

      {/* 프로젝트 선택 */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedProject === project.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {project.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 프로젝트 정보 */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          {projects.map((project) => (
            selectedProject === project.id && (
              <div key={project.id} className="max-w-6xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h2>
                      <p className="text-gray-600">{project.company} • {project.location}</p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                        {React.createElement(getStatusIcon(project.status), { className: "w-4 h-4 mr-1" })}
                        {project.status === 'in-progress' ? '진행 중' : project.status === 'completed' ? '완료' : '계획'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">시작일</p>
                      <p className="font-semibold text-gray-900">{project.startDate}</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">완료 예정일</p>
                      <p className="font-semibold text-gray-900">{project.expectedEndDate}</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">예산</p>
                      <p className="font-semibold text-gray-900">{project.budget}</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">진행률</p>
                      <p className="font-semibold text-gray-900">{project.progress}%</p>
                    </div>
                  </div>

                  {/* 진행률 바 */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">전체 진행률</span>
                      <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 3D 모델 및 시뮬레이션 섹션 */}
                  <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Layers className="w-6 h-6 text-purple-600 mr-2" />
                      3D 모델 및 시뮬레이션
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* 3D 모델 미리보기 */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-gray-900">3D 모델 미리보기</h4>
                          <button
                            onClick={() => setShow3DModel(!show3DModel)}
                            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            {show3DModel ? '닫기' : '미리보기'}
                          </button>
                        </div>
                        
                        {show3DModel ? (
                          <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-purple-200">
                            <div className="text-center">
                              <Layers className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                              <p className="text-purple-800 font-semibold text-lg">3D 모델 로딩 중...</p>
                              <p className="text-purple-600 text-sm">현재 진행 상태를 3D로 시각화</p>
                              <div className="mt-4 text-xs text-purple-500">
                                진행률: {project.progress}% 반영됨
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                            <div className="text-center text-gray-500">
                              <Eye className="w-12 h-12 mx-auto mb-2" />
                              <p>3D 모델 미리보기를 확인하세요</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 실시간 3D 시뮬레이션 */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-gray-900">실시간 3D 시뮬레이션</h4>
                          <button
                            onClick={() => setShowSimulation(!showSimulation)}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            {showSimulation ? '정지' : '시작'}
                          </button>
                        </div>
                        
                        {showSimulation ? (
                          <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center border-2 border-blue-200">
                            <div className="text-center">
                              <Activity className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
                              <p className="text-blue-800 font-semibold text-lg">시뮬레이션 실행 중</p>
                              <p className="text-blue-600 text-sm">공사 진행 상황을 실시간으로 확인</p>
                              <div className="mt-4 flex justify-center space-x-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                            <div className="text-center text-gray-500">
                              <Play className="w-12 h-12 mx-auto mb-2" />
                              <p>실시간 시뮬레이션을 시작하세요</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 3D 기능 설명 */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-2">3D 기술 활용</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 text-purple-600 mr-2" />
                          <span>실시간 3D 시각화로 진행 상태 확인</span>
                        </div>
                        <div className="flex items-center">
                          <Activity className="w-4 h-4 text-blue-600 mr-2" />
                          <span>공사 진행 상황을 3D 모델로 시뮬레이션</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 단계별 진행상황 */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">단계별 진행상황</h3>
                  <div className="space-y-4">
                    {phases.map((phase, index) => (
                      <div key={phase.id}>
                        <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${getStatusColor(phase.status)}`}>
                            {React.createElement(getStatusIcon(phase.status), { className: "w-6 h-6" })}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-gray-900">{phase.name}</h4>
                              <span className="text-sm text-gray-500">{phase.startDate} ~ {phase.endDate}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{phase.description}</p>
                          </div>
                        </div>

                        {/* 시공 시작 단계에만 특별한 현장 모니터링 섹션 추가 */}
                        {phase.id === 3 && phase.status === 'in-progress' && (
                          <div className="mt-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                            <div className="flex items-center mb-4">
                              <Camera className="w-6 h-6 text-blue-600 mr-2" />
                              <h4 className="text-lg font-bold text-blue-900">현장 실시간 모니터링</h4>
                            </div>
                            
                            {/* CCTV 화면들 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                              <div className="bg-gray-900 rounded-lg aspect-video relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                  <div className="text-center text-white">
                                    <Camera className="w-8 h-8 mx-auto mb-2 opacity-60" />
                                    <p className="text-xs opacity-60">현장 입구</p>
                                    <div className="mt-2 text-xs text-green-400 flex items-center justify-center">
                                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                                      LIVE
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-gray-900 rounded-lg aspect-video relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                  <div className="text-center text-white">
                                    <Camera className="w-8 h-8 mx-auto mb-2 opacity-60" />
                                    <p className="text-xs opacity-60">건축 현장</p>
                                    <div className="mt-2 text-xs text-green-400 flex items-center justify-center">
                                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                                      LIVE
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-gray-900 rounded-lg aspect-video relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                  <div className="text-center text-white">
                                    <Camera className="w-8 h-8 mx-auto mb-2 opacity-60" />
                                    <p className="text-xs opacity-60">안전 구역</p>
                                    <div className="mt-2 text-xs text-green-400 flex items-center justify-center">
                                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                                      LIVE
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-gray-900 rounded-lg aspect-video relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                  <div className="text-center text-white">
                                    <Camera className="w-8 h-8 mx-auto mb-2 opacity-60" />
                                    <p className="text-xs opacity-60">자재 창고</p>
                                    <div className="mt-2 text-xs text-green-400 flex items-center justify-center">
                                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                                      LIVE
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* 현장 관리 정보 */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <HardHat className="w-5 h-5 text-orange-600 mr-2" />
                                    <span className="text-sm font-medium text-gray-700">현장 인원</span>
                                  </div>
                                  <span className="text-lg font-bold text-gray-900">23명</span>
                                </div>
                                <div className="mt-2 text-xs text-green-600">안전 교육 완료</div>
                              </div>
                              
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <Wrench className="w-5 h-5 text-blue-600 mr-2" />
                                    <span className="text-sm font-medium text-gray-700">작업 현황</span>
                                  </div>
                                  <span className="text-lg font-bold text-gray-900">정상</span>
                                </div>
                                <div className="mt-2 text-xs text-blue-600">콘크리트 타설 중</div>
                              </div>
                              
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <ClipboardCheck className="w-5 h-5 text-green-600 mr-2" />
                                    <span className="text-sm font-medium text-gray-700">품질 검사</span>
                                  </div>
                                  <span className="text-lg font-bold text-gray-900">합격</span>
                                </div>
                                <div className="mt-2 text-xs text-green-600">최근 검사: 오늘</div>
                              </div>
                            </div>

                            {/* 환경 모니터링 */}
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                              <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <Monitor className="w-4 h-4 mr-2 text-purple-600" />
                                환경 모니터링
                              </h5>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                  <Thermometer className="w-6 h-6 text-red-500 mx-auto mb-1" />
                                  <p className="text-xs text-gray-600">온도</p>
                                  <p className="text-sm font-bold text-gray-900">18°C</p>
                                </div>
                                <div className="text-center">
                                  <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                                  <p className="text-xs text-gray-600">습도</p>
                                  <p className="text-sm font-bold text-gray-900">65%</p>
                                </div>
                                <div className="text-center">
                                  <Wind className="w-6 h-6 text-gray-500 mx-auto mb-1" />
                                  <p className="text-xs text-gray-600">풍속</p>
                                  <p className="text-sm font-bold text-gray-900">2.1m/s</p>
                                </div>
                                <div className="text-center">
                                  <AlertTriangle className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                                  <p className="text-xs text-gray-600">안전지수</p>
                                  <p className="text-sm font-bold text-gray-900">양호</p>
                                </div>
                              </div>
                            </div>

                            {/* 현장 관리자 정보 */}
                            <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
                              <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <Users className="w-4 h-4 mr-2 text-indigo-600" />
                                현장 관리팀
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                    <Users className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">김현장</p>
                                    <p className="text-sm text-gray-600">현장 소장</p>
                                    <p className="text-xs text-green-600">● 근무 중</p>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                    <Shield className="w-5 h-5 text-green-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">이안전</p>
                                    <p className="text-sm text-gray-600">안전 관리자</p>
                                    <p className="text-xs text-green-600">● 근무 중</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 주요 마일스톤 */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">주요 마일스톤</h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    {milestones.map((milestone, index) => (
                      <div key={index} className="relative flex items-start pb-8">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${getStatusColor(milestone.status)} relative z-10`}>
                          {React.createElement(getStatusIcon(milestone.status), { className: "w-4 h-4" })}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                            <span className="text-sm text-gray-500">{milestone.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">프로젝트 통계</h2>
            <p className="text-lg text-gray-600">전체 프로젝트 진행 현황</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">12</h3>
              <p className="text-gray-600">진행 중인 프로젝트</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">45</h3>
              <p className="text-gray-600">완료된 프로젝트</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-gray-600">HACCP 인증 성공률</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">4.9</h3>
              <p className="text-gray-600">고객 만족도</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
