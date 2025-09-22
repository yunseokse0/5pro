'use client'

import React, { useState, useEffect } from 'react'
import { projectStorage, ProjectData } from '../../../lib/storage'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Factory,
  Calendar,
  MapPin,
  Shield,
  PieChart,
  Activity
} from 'lucide-react'

export default function AnalyticsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [timeRange, setTimeRange] = useState('6months')
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    projectCount: 0,
    averageProjectValue: 0,
    completionRate: 0,
    haccpApprovalRate: 0
  })

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    calculateAnalytics()
  }, [projects, timeRange])

  const loadData = () => {
    const allProjects = projectStorage.getAllProjects()
    setProjects(allProjects)
  }

  const calculateAnalytics = () => {
    const now = new Date()
    const sixMonthsAgo = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000)
    
    let filteredProjects = projects
    if (timeRange === '6months') {
      filteredProjects = projects.filter(p => new Date(p.createdAt) >= sixMonthsAgo)
    } else if (timeRange === '1year') {
      const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
      filteredProjects = projects.filter(p => new Date(p.createdAt) >= oneYearAgo)
    }

    const totalRevenue = filteredProjects.reduce((sum, p) => sum + p.budget.total, 0)
    const completedProjects = filteredProjects.filter(p => 
      p.timeline.phases.every(phase => phase.status === 'completed')
    ).length
    const haccpApproved = filteredProjects.filter(p => p.haccp.status === 'approved').length

    setAnalytics({
      totalRevenue,
      monthlyRevenue: totalRevenue / 6,
      projectCount: filteredProjects.length,
      averageProjectValue: filteredProjects.length > 0 ? totalRevenue / filteredProjects.length : 0,
      completionRate: filteredProjects.length > 0 ? (completedProjects / filteredProjects.length) * 100 : 0,
      haccpApprovalRate: filteredProjects.length > 0 ? (haccpApproved / filteredProjects.length) * 100 : 0
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getRevenueByMonth = () => {
    const months = []
    const now = new Date()
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthName = date.toLocaleDateString('ko-KR', { month: 'short' })
      const monthProjects = projects.filter(p => {
        const projectDate = new Date(p.createdAt)
        return projectDate.getFullYear() === date.getFullYear() && 
               projectDate.getMonth() === date.getMonth()
      })
      const revenue = monthProjects.reduce((sum, p) => sum + p.budget.total, 0)
      
      months.push({
        month: monthName,
        revenue,
        projects: monthProjects.length
      })
    }
    
    return months
  }

  const getRevenueByRegion = () => {
    const regionMap = new Map()
    
    projects.forEach(project => {
      const region = project.location.province
      if (regionMap.has(region)) {
        const existing = regionMap.get(region)
        regionMap.set(region, {
          revenue: existing.revenue + project.budget.total,
          projects: existing.projects + 1
        })
      } else {
        regionMap.set(region, {
          revenue: project.budget.total,
          projects: 1
        })
      }
    })
    
    return Array.from(regionMap.entries()).map(([region, data]) => ({
      region,
      revenue: data.revenue,
      projects: data.projects
    })).sort((a, b) => b.revenue - a.revenue)
  }

  const getRevenueByPurpose = () => {
    const purposeMap = new Map()
    
    projects.forEach(project => {
      const purpose = project.purpose
      if (purposeMap.has(purpose)) {
        const existing = purposeMap.get(purpose)
        purposeMap.set(purpose, {
          revenue: existing.revenue + project.budget.total,
          projects: existing.projects + 1
        })
      } else {
        purposeMap.set(purpose, {
          revenue: project.budget.total,
          projects: 1
        })
      }
    })
    
    return Array.from(purposeMap.entries()).map(([purpose, data]) => ({
      purpose,
      revenue: data.revenue,
      projects: data.projects
    })).sort((a, b) => b.revenue - a.revenue)
  }

  const monthlyData = getRevenueByMonth()
  const regionData = getRevenueByRegion()
  const purposeData = getRevenueByPurpose()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">통계 및 분석</h1>
          <p className="mt-1 text-sm text-gray-500">
            프로젝트 성과와 비즈니스 지표를 분석하세요
          </p>
        </div>
        <div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="6months">최근 6개월</option>
            <option value="1year">최근 1년</option>
            <option value="all">전체</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">총 매출</dt>
                  <dd className="text-lg font-medium text-gray-900">{formatCurrency(analytics.totalRevenue)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">월평균 매출</dt>
                  <dd className="text-lg font-medium text-gray-900">{formatCurrency(analytics.monthlyRevenue)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Factory className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">프로젝트 수</dt>
                  <dd className="text-lg font-medium text-gray-900">{analytics.projectCount}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-6 w-6 text-orange-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">평균 프로젝트 가치</dt>
                  <dd className="text-lg font-medium text-gray-900">{formatCurrency(analytics.averageProjectValue)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Monthly Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">월별 매출 추이</h3>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-900">{data.month}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{formatCurrency(data.revenue)}</div>
                  <div className="text-xs text-gray-500">{data.projects}개 프로젝트</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Rate */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">성과 지표</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">프로젝트 완료율</span>
                <span className="text-sm font-medium text-gray-900">{analytics.completionRate.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${analytics.completionRate}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">HACCP 승인율</span>
                <span className="text-sm font-medium text-gray-900">{analytics.haccpApprovalRate.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${analytics.haccpApprovalRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regional and Purpose Analysis */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue by Region */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">지역별 매출</h3>
          <div className="space-y-3">
            {regionData.slice(0, 5).map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900">{data.region}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{formatCurrency(data.revenue)}</div>
                  <div className="text-xs text-gray-500">{data.projects}개</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Purpose */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">용도별 매출</h3>
          <div className="space-y-3">
            {purposeData.slice(0, 5).map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Factory className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900">{data.purpose}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{formatCurrency(data.revenue)}</div>
                  <div className="text-xs text-gray-500">{data.projects}개</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Timeline */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">프로젝트 타임라인</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">프로젝트</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시작일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">예상 완료일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">진행률</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.slice(0, 10).map((project) => {
                const progress = project.timeline.phases.length > 0 ? 
                  Math.round((project.timeline.phases.filter(p => p.status === 'completed').length / project.timeline.phases.length) * 100) : 0
                const status = project.timeline.phases.every(p => p.status === 'completed') ? '완료' : 
                              project.timeline.phases.some(p => p.status === 'in-progress') ? '진행중' : '계획중'
                
                return (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {project.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.timeline.startDate ? new Date(project.timeline.startDate).toLocaleDateString('ko-KR') : '미정'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.timeline.expectedEndDate ? new Date(project.timeline.expectedEndDate).toLocaleDateString('ko-KR') : '미정'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        status === '완료' ? 'text-green-600 bg-green-100' :
                        status === '진행중' ? 'text-blue-600 bg-blue-100' :
                        'text-gray-600 bg-gray-100'
                      }`}>
                        {status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
