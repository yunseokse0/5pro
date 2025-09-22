'use client'

import React, { useState, useRef } from 'react'
import { Upload, FileText, MessageSquare, CheckCircle, AlertCircle, Download, Eye, Shield, Building, Zap, Droplets, Thermometer, Wrench } from 'lucide-react'

interface UploadedFile {
  name: string
  size: number
  path: string
  type: 'architectural' | 'haccp' | 'mechanical' | 'electrical'
}

interface Feedback {
  id: string
  content: string
  date: string
  status: 'pending' | 'reviewed' | 'approved'
  category: 'haccp' | 'safety' | 'design' | 'general'
}

export default function DesignPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [newFeedback, setNewFeedback] = useState('')
  const [feedbackCategory, setFeedbackCategory] = useState<'haccp' | 'safety' | 'design' | 'general'>('general')
  const [uploading, setUploading] = useState(false)
  const [submittingFeedback, setSubmittingFeedback] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const designCategories = [
    { id: 'architectural', name: '건축 설계도', icon: Building, color: 'blue' },
    { id: 'haccp', name: 'HACCP 설계도', icon: Shield, color: 'green' },
    { id: 'mechanical', name: '기계 설비도', icon: Wrench, color: 'purple' },
    { id: 'electrical', name: '전기 설비도', icon: Zap, color: 'yellow' }
  ]

  const haccpRequirements = [
    { title: '위생구역 분리', description: '생산구역과 비생산구역의 명확한 분리', status: 'completed' },
    { title: '공기조화시설', description: '온도, 습도, 공기질 관리 시스템', status: 'in-progress' },
    { title: '배수시설', description: '위생적 배수처리 및 폐수관리', status: 'pending' },
    { title: '냉장/냉동시설', description: '식품보관을 위한 온도관리 시설', status: 'completed' },
    { title: '소방시설', description: '식품공장 특화 소방시설 설치', status: 'pending' },
    { title: '환기시설', description: '적절한 환기 및 공기순환 시스템', status: 'in-progress' }
  ]

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('designFile', files[0])

      const response = await fetch('http://localhost:3001/api/design', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.success) {
        const newFile: UploadedFile = {
          ...data.file,
          type: 'architectural' // 기본값
        }
        setUploadedFiles(prev => [...prev, newFile])
      }
    } catch (error) {
      console.error('파일 업로드 실패:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFeedback.trim()) return

    setSubmittingFeedback(true)
    try {
      const response = await fetch('http://localhost:3001/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback: newFeedback }),
      })

      const data = await response.json()
      if (data.success) {
        const newFeedbackItem: Feedback = {
          id: data.feedbackId,
          content: newFeedback,
          date: new Date().toLocaleDateString('ko-KR'),
          status: 'pending',
          category: feedbackCategory
        }
        setFeedback(prev => [newFeedbackItem, ...prev])
        setNewFeedback('')
      }
    } catch (error) {
      console.error('피드백 제출 실패:', error)
    } finally {
      setSubmittingFeedback(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'reviewed': return 'text-blue-600 bg-blue-100'
      case 'approved': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '검토 대기'
      case 'reviewed': return '검토 완료'
      case 'approved': return '승인 완료'
      default: return '알 수 없음'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'haccp': return 'text-green-600 bg-green-100'
      case 'safety': return 'text-red-600 bg-red-100'
      case 'design': return 'text-blue-600 bg-blue-100'
      case 'general': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'haccp': return 'HACCP 관련'
      case 'safety': return '안전 관련'
      case 'design': return '설계 관련'
      case 'general': return '일반'
      default: return '일반'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            식품공장 설계 관리
          </h1>
          <p className="text-lg text-gray-600">
            HACCP 기준에 맞는 식품공장 설계안을 관리하고 전문가 피드백을 받으세요
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* HACCP 요구사항 체크리스트 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="w-8 h-8 mr-3 text-green-600" />
              HACCP 설계 요구사항 체크리스트
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {haccpRequirements.map((requirement, index) => (
                <div key={index} className={`p-4 rounded-xl border-2 ${
                  requirement.status === 'completed' ? 'border-green-200 bg-green-50' :
                  requirement.status === 'in-progress' ? 'border-blue-200 bg-blue-50' :
                  'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{requirement.title}</h3>
                    {requirement.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {requirement.status === 'in-progress' && <div className="w-5 h-5 border-2 border-blue-600 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-blue-600 rounded-full"></div></div>}
                    {requirement.status === 'pending' && <AlertCircle className="w-5 h-5 text-gray-400" />}
                  </div>
                  <p className="text-sm text-gray-600">{requirement.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 설계 파일 업로드 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Building className="w-8 h-8 mr-3 text-blue-600" />
              설계 파일 업로드
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {designCategories.map((category) => (
                <div key={category.id} className={`p-4 rounded-xl border-2 border-${category.color}-200 bg-${category.color}-50 cursor-pointer hover:shadow-md transition-all`}>
                  <category.icon className={`w-8 h-8 text-${category.color}-600 mb-2`} />
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                </div>
              ))}
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <Upload className="mx-auto text-gray-400 mb-4" size={48} />
              <div className="text-gray-600 mb-4">
                <p className="font-medium mb-2">설계 파일을 업로드하세요</p>
                <p className="text-sm">PDF, DWG, 이미지 파일을 지원합니다 (최대 50MB)</p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.dwg,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50"
              >
                {uploading ? '업로드 중...' : '파일 선택'}
              </button>
            </div>

            {/* 업로드된 파일 목록 */}
            {uploadedFiles.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">업로드된 파일</h3>
                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <FileText className="text-gray-500" size={24} />
                        <div>
                          <div className="font-medium text-gray-900">{file.name}</div>
                          <div className="text-sm text-gray-500">{formatFileSize(file.size)}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                          <Eye size={16} className="inline mr-1" />
                          보기
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                          <Download size={16} className="inline mr-1" />
                          다운로드
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 피드백 작성 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MessageSquare className="w-8 h-8 mr-3 text-purple-600" />
              전문가 피드백 작성
            </h2>
            
            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    피드백 카테고리
                  </label>
                  <select
                    value={feedbackCategory}
                    onChange={(e) => setFeedbackCategory(e.target.value as any)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">일반</option>
                    <option value="haccp">HACCP 관련</option>
                    <option value="safety">안전 관련</option>
                    <option value="design">설계 관련</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    우선순위
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="low">낮음</option>
                    <option value="medium">보통</option>
                    <option value="high">높음</option>
                    <option value="urgent">긴급</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  피드백 내용
                </label>
                <textarea
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  placeholder="설계안에 대한 의견이나 수정사항을 작성해주세요. HACCP 기준 준수 여부, 안전성, 기능성 등을 포함해주세요..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={submittingFeedback || !newFeedback.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingFeedback ? '제출 중...' : '피드백 제출'}
              </button>
            </form>
          </div>

          {/* 피드백 목록 */}
          {feedback.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">피드백 목록</h2>
              
              <div className="space-y-4">
                {feedback.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="text-gray-500" size={20} />
                        <span className="font-medium text-gray-900">피드백 #{item.id}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                          {getCategoryText(item.category)}
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4 leading-relaxed">{item.content}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>작성일: {item.date}</span>
                      <div className="flex gap-3">
                        {item.status === 'pending' && (
                          <button className="text-blue-600 hover:text-blue-800 font-medium">
                            검토 완료
                          </button>
                        )}
                        <button className="text-gray-600 hover:text-gray-800 font-medium">
                          답변하기
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 설계 진행 상황 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">설계 진행 상황</h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                <CheckCircle className="text-green-600" size={24} />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">초기 설계안 제출</div>
                  <div className="text-sm text-gray-600">HACCP 기준 기본 설계안 완료</div>
                </div>
                <span className="text-sm text-green-600 font-medium">완료</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                <CheckCircle className="text-green-600" size={24} />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">1차 검토</div>
                  <div className="text-sm text-gray-600">식품안전 전문가 검토 완료</div>
                </div>
                <span className="text-sm text-green-600 font-medium">완료</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                <div className="w-6 h-6 border-2 border-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">2차 수정</div>
                  <div className="text-sm text-gray-600">HACCP 요구사항 반영 및 설계 개선</div>
                </div>
                <span className="text-sm text-blue-600 font-medium">진행 중</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">최종 승인</div>
                  <div className="text-sm text-gray-600">HACCP 인증기관 최종 승인</div>
                </div>
                <span className="text-sm text-gray-500">대기</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
