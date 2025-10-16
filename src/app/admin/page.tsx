'use client'

import { useState, useEffect } from 'react'
import { projectStorage, ProjectData } from '../../lib/storage'
import { projectCalculator } from '../../lib/calculator'
import { 
  Factory, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  FileText,
  Shield
} from 'lucide-react'

export default function AdminDashboard() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    haccpApproved: 0,
    pendingApprovals: 0
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const allProjects = projectStorage.getAllProjects()
    setProjects(allProjects)
    
    const projectStats = projectStorage.getProjectStats()
    const activeProjects = allProjects.filter(p => 
      p.timeline.phases.some(phase => phase.status === 'in-progress')
    ).length
    const completedProjects = allProjects.filter(p => 
      p.timeline.phases.every(phase => phase.status === 'completed')
    ).length
    const haccpApproved = allProjects.filter(p => p.haccp.status === 'approved').length
    const pendingApprovals = allProjects.filter(p => p.haccp.status === 'review').length

    setStats({
      totalProjects: projectStats.totalProjects,
      activeProjects,
      completedProjects,
      totalRevenue: projectStats.totalBudget,
      monthlyRevenue: projectStats.totalBudget * 0.1, // 임시 계산
      haccpApproved,
      pendingApprovals
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR')
  }

  const getProjectStatus = (project: ProjectData) => {
    if (project.timeline.phases.every(p => p.status === 'completed')) return '완료'
    if (project.timeline.phases.some(p => p.status === 'in-progress')) return '진행중'
    return '계획중'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '완료': return 'text-green-600 bg-green-100'
      case '진행중': return 'text-blue-600 bg-blue-100'
      case '계획중': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const recentProjects = projects
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  const upcomingDeadlines = projects
    .filter(p => p.timeline.expectedEndDate)
    .sort((a, b) => new Date(a.timeline.expectedEndDate).getTime() - new Date(b.timeline.expectedEndDate).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
        <p className="mt-1 text-sm text-gray-500">
          오프로 플랫폼 전체 현황을 한눈에 확인하세요
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Factory className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">총 프로젝트</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalProjects}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">진행중인 프로젝트</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.activeProjects}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">총 매출</dt>
                  <dd className="text-lg font-medium text-gray-900">{formatCurrency(stats.totalRevenue)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">HACCP 승인</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.haccpApproved}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent Projects */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">최근 프로젝트</h3>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentProjects.map((project) => (
                  <li key={project.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Factory className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {project.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {project.location.province} {project.location.city} • {project.size}평
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(getProjectStatus(project))}`}>
                          {getProjectStatus(project)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">다가오는 마감일</h3>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {upcomingDeadlines.map((project) => (
                  <li key={project.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Calendar className="h-8 w-8 text-red-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {project.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(project.timeline.expectedEndDate)}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-sm text-gray-500">
                          {formatCurrency(project.budget.total)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Project Status Overview */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">프로젝트 현황</h3>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    프로젝트명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    위치
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    규모
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    예산
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    HACCP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    마감일
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {project.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.location.province} {project.location.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.size}평
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(project.budget.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(getProjectStatus(project))}`}>
                        {getProjectStatus(project)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.haccp.status === 'approved' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : project.haccp.status === 'review' ? (
                        <Clock className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-gray-400" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.timeline.expectedEndDate ? formatDate(project.timeline.expectedEndDate) : '미정'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">빠른 작업</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a href="/estimate" className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-300 hover:border-gray-400 hover:shadow-md transition-all">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                  <Factory className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  새 프로젝트 생성
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  새로운 식품공장 프로젝트를 시작하세요
                </p>
              </div>
            </a>

            <a href="/admin/haccp" className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500 rounded-lg border border-gray-300 hover:border-gray-400 hover:shadow-md transition-all">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
                  <Shield className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  HACCP 승인
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  대기중인 HACCP 인증을 검토하세요
                </p>
              </div>
            </a>

            <a href="/admin/analytics" className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-500 rounded-lg border border-gray-300 hover:border-gray-400 hover:shadow-md transition-all">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white">
                  <BarChart3 className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  상세 분석
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  프로젝트 상세 통계를 확인하세요
                </p>
              </div>
            </a>

            <button 
              onClick={() => {
                // 간단한 보고서 생성 기능
                const reportData = {
                  totalProjects: stats.totalProjects,
                  activeProjects: stats.activeProjects,
                  completedProjects: stats.completedProjects,
                  totalRevenue: stats.totalRevenue,
                  haccpApproved: stats.haccpApproved,
                  generatedAt: new Date().toLocaleString('ko-KR')
                };
                
                const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `오프로_보고서_${new Date().toISOString().split('T')[0]}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 rounded-lg border border-gray-300 hover:border-gray-400 hover:shadow-md transition-all"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-orange-50 text-orange-700 ring-4 ring-white">
                  <FileText className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  보고서 생성
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  월간/분기 보고서를 생성하세요
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
