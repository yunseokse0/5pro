'use client'

import React, { useState, useEffect } from 'react'
import { projectStorage, ProjectData } from '../../../lib/storage'
import { 
  Factory, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  DollarSign,
  MapPin,
  Shield,
  MoreVertical,
  Plus,
  Download
} from 'lucide-react'

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('updatedAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    filterAndSortProjects()
  }, [projects, searchTerm, statusFilter, sortBy, sortOrder])

  const loadProjects = () => {
    const allProjects = projectStorage.getAllProjects()
    setProjects(allProjects)
  }

  const filterAndSortProjects = () => {
    let filtered = [...projects]

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 상태 필터
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => {
        const status = getProjectStatus(project)
        return status === statusFilter
      })
    }

    // 정렬
    filtered.sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'budget':
          aValue = a.budget.total
          bValue = b.budget.total
          break
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        case 'updatedAt':
        default:
          aValue = new Date(a.updatedAt).getTime()
          bValue = new Date(b.updatedAt).getTime()
          break
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredProjects(filtered)
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

  const deleteProject = (id: string) => {
    if (confirm('정말로 이 프로젝트를 삭제하시겠습니까?')) {
      projectStorage.deleteProject(id)
      loadProjects()
    }
  }

  const exportProjects = () => {
    const csvContent = [
      ['프로젝트명', '위치', '규모', '예산', '상태', 'HACCP', '생성일', '마감일'].join(','),
      ...filteredProjects.map(project => [
        project.name,
        `${project.location.province} ${project.location.city}`,
        `${project.size}평`,
        project.budget.total.toString(),
        getProjectStatus(project),
        project.haccp.status,
        formatDate(project.createdAt),
        project.timeline.expectedEndDate ? formatDate(project.timeline.expectedEndDate) : '미정'
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `프로젝트_목록_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">프로젝트 관리</h1>
          <p className="mt-1 text-sm text-gray-500">
            모든 프로젝트를 관리하고 모니터링하세요
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportProjects}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            내보내기
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            새 프로젝트
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체</option>
              <option value="계획중">계획중</option>
              <option value="진행중">진행중</option>
              <option value="완료">완료</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">정렬 기준</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="updatedAt">최근 수정</option>
              <option value="createdAt">생성일</option>
              <option value="name">프로젝트명</option>
              <option value="budget">예산</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">정렬 순서</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="desc">내림차순</option>
              <option value="asc">오름차순</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Factory className="h-8 w-8 text-blue-600" />
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500">
                      {project.location.province} {project.location.city}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">규모</span>
                  <span className="text-sm font-medium">{project.size}평</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">예산</span>
                  <span className="text-sm font-medium">{formatCurrency(project.budget.total)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">상태</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(getProjectStatus(project))}`}>
                    {getProjectStatus(project)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">HACCP</span>
                  <span className="text-sm font-medium">
                    {project.haccp.status === 'approved' ? '승인' : 
                     project.haccp.status === 'review' ? '심사중' : '미시작'}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => {
                    setSelectedProject(project)
                    setShowModal(true)
                  }}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  상세보기
                </button>
                <button className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Edit className="h-4 w-4 mr-2" />
                  편집
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="inline-flex items-center justify-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Factory className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">프로젝트가 없습니다</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter !== 'all' 
              ? '검색 조건에 맞는 프로젝트가 없습니다.' 
              : '새로운 프로젝트를 생성해보세요.'}
          </p>
        </div>
      )}

      {/* Project Detail Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)} />
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">{selectedProject.name}</h3>
                      <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">위치</label>
                          <p className="text-sm text-gray-900">
                            {selectedProject.location.province} {selectedProject.location.city}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">규모</label>
                          <p className="text-sm text-gray-900">{selectedProject.size}평</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">용도</label>
                          <p className="text-sm text-gray-900">{selectedProject.purpose}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">예산</label>
                          <p className="text-sm text-gray-900">{formatCurrency(selectedProject.budget.total)}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-500">필요 시설</label>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {selectedProject.facilities.map((facility, index) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-500">HACCP 상태</label>
                        <p className="text-sm text-gray-900">
                          {selectedProject.haccp.status === 'approved' ? '승인' : 
                           selectedProject.haccp.status === 'review' ? '심사중' : 
                           selectedProject.haccp.status === 'preparation' ? '준비중' : '미시작'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
