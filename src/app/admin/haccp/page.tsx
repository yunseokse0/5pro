'use client'

import React, { useState, useEffect } from 'react'
import { projectStorage, ProjectData } from '../../../lib/storage'
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileText,
  Download,
  Eye,
  Edit,
  Search,
  Filter
} from 'lucide-react'

export default function HACCPManagement() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [projects, searchTerm, statusFilter])

  const loadProjects = () => {
    const allProjects = projectStorage.getAllProjects()
    setProjects(allProjects)
  }

  const filterProjects = () => {
    let filtered = [...projects]

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.haccp.status === statusFilter)
    }

    setFilteredProjects(filtered)
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'not-started':
        return { text: '미시작', color: 'text-gray-600 bg-gray-100', icon: AlertCircle }
      case 'preparation':
        return { text: '준비중', color: 'text-yellow-600 bg-yellow-100', icon: Clock }
      case 'review':
        return { text: '심사중', color: 'text-blue-600 bg-blue-100', icon: Clock }
      case 'approved':
        return { text: '승인', color: 'text-green-600 bg-green-100', icon: CheckCircle }
      default:
        return { text: '미시작', color: 'text-gray-600 bg-gray-100', icon: AlertCircle }
    }
  }

  const getProgressPercentage = (project: ProjectData) => {
    const completed = project.haccp.requirements.filter(r => r.completed).length
    const total = project.haccp.requirements.length
    return Math.round((completed / total) * 100)
  }

  const updateHACCPStatus = (projectId: string, status: string) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          haccp: {
            ...project.haccp,
            status: status as any
          },
          updatedAt: new Date().toISOString()
        }
      }
      return project
    })
    
    setProjects(updatedProjects)
    updatedProjects.forEach(project => projectStorage.saveProject(project))
  }

  const toggleRequirement = (projectId: string, requirementIndex: number) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const updatedRequirements = [...project.haccp.requirements]
        updatedRequirements[requirementIndex] = {
          ...updatedRequirements[requirementIndex],
          completed: !updatedRequirements[requirementIndex].completed
        }
        
        return {
          ...project,
          haccp: {
            ...project.haccp,
            requirements: updatedRequirements
          },
          updatedAt: new Date().toISOString()
        }
      }
      return project
    })
    
    setProjects(updatedProjects)
    updatedProjects.forEach(project => projectStorage.saveProject(project))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR')
  }

  const exportHACCPReport = () => {
    const csvContent = [
      ['프로젝트명', '위치', 'HACCP 상태', '진행률', '완료 요구사항', '총 요구사항', '마지막 업데이트'].join(','),
      ...filteredProjects.map(project => {
        const statusInfo = getStatusInfo(project.haccp.status)
        const completed = project.haccp.requirements.filter(r => r.completed).length
        const total = project.haccp.requirements.length
        
        return [
          project.name,
          `${project.location.province} ${project.location.city}`,
          statusInfo.text,
          `${getProgressPercentage(project)}%`,
          completed.toString(),
          total.toString(),
          formatDate(project.updatedAt)
        ].join(',')
      })
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `HACCP_보고서_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HACCP 관리</h1>
          <p className="mt-1 text-sm text-gray-500">
            HACCP 인증 진행 상황을 관리하고 모니터링하세요
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportHACCPReport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            보고서 내보내기
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">검색</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="프로젝트명, 위치로 검색..."
                className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">HACCP 상태</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체</option>
              <option value="not-started">미시작</option>
              <option value="preparation">준비중</option>
              <option value="review">심사중</option>
              <option value="approved">승인</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              필터 적용
            </button>
          </div>
        </div>
      </div>

      {/* HACCP Status Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        {[
          { status: 'not-started', label: '미시작', count: projects.filter(p => p.haccp.status === 'not-started').length },
          { status: 'preparation', label: '준비중', count: projects.filter(p => p.haccp.status === 'preparation').length },
          { status: 'review', label: '심사중', count: projects.filter(p => p.haccp.status === 'review').length },
          { status: 'approved', label: '승인', count: projects.filter(p => p.haccp.status === 'approved').length }
        ].map(({ status, label, count }) => {
          const statusInfo = getStatusInfo(status)
          const Icon = statusInfo.icon
          
          return (
            <div key={status} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
                      <dd className="text-lg font-medium text-gray-900">{count}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Projects List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">HACCP 진행 현황</h3>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">프로젝트</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">위치</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HACCP 상태</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">진행률</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">완료 요구사항</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => {
                  const statusInfo = getStatusInfo(project.haccp.status)
                  const Icon = statusInfo.icon
                  const progress = getProgressPercentage(project)
                  const completed = project.haccp.requirements.filter(r => r.completed).length
                  const total = project.haccp.requirements.length
                  
                  return (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Shield className="h-8 w-8 text-gray-400" />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{project.name}</div>
                            <div className="text-sm text-gray-500">{project.purpose}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.location.province} {project.location.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          <Icon className="h-3 w-3 mr-1" />
                          {statusInfo.text}
                        </span>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {completed}/{total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedProject(project)
                              setShowModal(true)
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              const nextStatus = project.haccp.status === 'not-started' ? 'preparation' :
                                               project.haccp.status === 'preparation' ? 'review' :
                                               project.haccp.status === 'review' ? 'approved' : 'approved'
                              updateHACCPStatus(project.id, nextStatus)
                            }}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* HACCP Detail Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)} />
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-medium text-gray-900">{selectedProject.name} - HACCP 관리</h3>
                      <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Current Status */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">현재 상태</h4>
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(selectedProject.haccp.status).color}`}>
                            {getStatusInfo(selectedProject.haccp.status).text}
                          </span>
                          <span className="text-sm text-gray-500">
                            진행률: {getProgressPercentage(selectedProject)}%
                          </span>
                        </div>
                      </div>

                      {/* Requirements Checklist */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">HACCP 요구사항 체크리스트</h4>
                        <div className="space-y-2">
                          {selectedProject.haccp.requirements.map((requirement, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={requirement.completed}
                                  onChange={() => toggleRequirement(selectedProject.id, index)}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className={`ml-3 text-sm ${requirement.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                  {requirement.name}
                                </span>
                                {requirement.required && (
                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                    필수
                                  </span>
                                )}
                              </div>
                              {requirement.completed && (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Status Actions */}
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            const nextStatus = selectedProject.haccp.status === 'not-started' ? 'preparation' :
                                             selectedProject.haccp.status === 'preparation' ? 'review' :
                                             selectedProject.haccp.status === 'review' ? 'approved' : 'approved'
                            updateHACCPStatus(selectedProject.id, nextStatus)
                            setShowModal(false)
                          }}
                          className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          다음 단계로
                        </button>
                        <button
                          onClick={() => setShowModal(false)}
                          className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          닫기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
