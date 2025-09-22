'use client'

import React, { useState, useEffect } from 'react'
import { projectStorage, ProjectData } from '../../lib/storage'
import { projectCalculator, CalculationResult } from '../../lib/calculator'
import { 
  Calculator, 
  MapPin, 
  Factory, 
  Settings, 
  DollarSign, 
  TrendingUp, 
  Save, 
  Download,
  BarChart3,
  Clock,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  ArrowRight,
  FileText,
  Shield
} from 'lucide-react'

export default function Estimate() {
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState<ProjectData | null>(null)
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [monthlyRevenue, setMonthlyRevenue] = useState('')
  const [showROI, setShowROI] = useState(false)

  // 폼 데이터
  const [formData, setFormData] = useState({
    name: '',
    province: '',
    city: '',
    size: '',
    purpose: '',
    facilities: [] as string[],
    startDate: '',
    expectedRevenue: ''
  })

  const provinces = {
    '서울특별시': ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
    '부산광역시': ['강서구', '금정구', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구', '기장군'],
    '대구광역시': ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'],
    '인천광역시': ['계양구', '남구', '남동구', '동구', '부평구', '서구', '연수구', '중구', '강화군', '옹진군'],
    '광주광역시': ['광산구', '남구', '동구', '북구', '서구'],
    '대전광역시': ['대덕구', '동구', '서구', '유성구', '중구'],
    '울산광역시': ['남구', '동구', '북구', '울주군', '중구'],
    '세종특별자치시': ['세종시'],
    '경기도': ['수원시', '성남시', '의정부시', '안양시', '부천시', '광명시', '평택시', '과천시', '오산시', '시흥시', '군포시', '의왕시', '하남시', '용인시', '파주시', '이천시', '안성시', '김포시', '화성시', '광주시', '여주시', '양평군', '고양시', '의정부시', '동두천시', '가평군', '연천군'],
    '강원도': ['춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시', '홍천군', '횡성군', '영월군', '평창군', '정선군', '철원군', '화천군', '양구군', '인제군', '고성군', '양양군'],
    '충청북도': ['청주시', '충주시', '제천시', '보은군', '옥천군', '영동군', '증평군', '진천군', '괴산군', '음성군', '단양군'],
    '충청남도': ['천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시', '금산군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군'],
    '전라북도': ['전주시', '군산시', '익산시', '정읍시', '남원시', '김제시', '완주군', '진안군', '무주군', '장수군', '임실군', '순창군', '고창군', '부안군'],
    '전라남도': ['목포시', '여수시', '순천시', '나주시', '광양시', '담양군', '곡성군', '구례군', '고흥군', '보성군', '화순군', '장흥군', '강진군', '해남군', '영암군', '무안군', '함평군', '영광군', '장성군', '완도군', '진도군', '신안군'],
    '경상북도': ['포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시', '군위군', '의성군', '청송군', '영양군', '영덕군', '청도군', '고령군', '성주군', '칠곡군', '예천군', '봉화군', '울진군', '울릉군'],
    '경상남도': ['창원시', '진주시', '통영시', '사천시', '김해시', '밀양시', '거제시', '양산시', '의령군', '함안군', '창녕군', '고성군', '남해군', '하동군', '산청군', '함양군', '거창군', '합천군'],
    '제주특별자치도': ['제주시', '서귀포시']
  }

  const facilityOptions = [
    '냉장시설', '냉동시설', 'HACCP 인증시설', '배수처리시설', 
    '소방시설', '전력시설', '공기조화시설', '환기시설'
  ]

  const purposeOptions = [
    '제과/제빵', '육류가공', '수산물가공', '농산물가공', 
    '유제품가공', '음료제조', '기타식품가공'
  ]

  // 컴포넌트 마운트 시 현재 프로젝트 로드
  useEffect(() => {
    const currentProject = projectStorage.getCurrentProject()
    if (currentProject) {
      setProjectData(currentProject)
      setFormData({
        name: currentProject.name,
        province: currentProject.location.province,
        city: currentProject.location.city,
        size: currentProject.size.toString(),
        purpose: currentProject.purpose,
        facilities: currentProject.facilities,
        startDate: currentProject.timeline.startDate,
        expectedRevenue: ''
      })
    }
  }, [])

  // 폼 데이터 변경 핸들러
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // 시설 선택 핸들러
  const handleFacilityChange = (facility: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        facilities: [...prev.facilities, facility]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        facilities: prev.facilities.filter(f => f !== facility)
      }))
    }
  }

  // 견적 계산
  const calculateEstimate = async () => {
    if (!formData.province || !formData.city || !formData.size || !formData.purpose) {
      alert('필수 정보를 모두 입력해주세요.')
      return
    }

    setIsCalculating(true)

    try {
      // 새 프로젝트 생성 또는 기존 프로젝트 업데이트
      const project: ProjectData = projectData || projectStorage.createNewProject({
        name: formData.name || '새 프로젝트',
        location: {
          province: formData.province,
          city: formData.city
        },
        size: parseInt(formData.size),
        purpose: formData.purpose,
        facilities: formData.facilities
      })

      // 프로젝트 데이터 업데이트
      const updatedProject = {
        ...project,
        name: formData.name || project.name,
        location: {
          province: formData.province,
          city: formData.city
        },
        size: parseInt(formData.size),
        purpose: formData.purpose,
        facilities: formData.facilities,
        timeline: {
          ...project.timeline,
          startDate: formData.startDate || project.timeline.startDate,
          phases: projectCalculator.calculateTimeline({
            ...project,
            size: parseInt(formData.size),
            purpose: formData.purpose,
            facilities: formData.facilities
          })
        }
      }

      // 비용 계산
      const calculation = projectCalculator.calculateTotalCost(updatedProject)
      setCalculationResult(calculation)

      // 예산 정보 업데이트
      updatedProject.budget = {
        total: calculation.totalCost,
        construction: calculation.baseCost,
        facilities: calculation.facilityCost,
        haccp: calculation.haccpCost,
        permits: calculation.permitCost,
        contingency: calculation.contingencyCost
      }

      // 프로젝트 저장
      projectStorage.saveProject(updatedProject)
      setProjectData(updatedProject)

      setCurrentStep(3)
    } catch (error) {
      console.error('견적 계산 오류:', error)
      alert('견적 계산 중 오류가 발생했습니다.')
    } finally {
      setIsCalculating(false)
    }
  }

  // 프로젝트 저장
  const saveProject = () => {
    if (projectData) {
      projectStorage.saveProject(projectData)
      alert('프로젝트가 저장되었습니다.')
    }
  }

  // 견적서 다운로드
  const downloadEstimate = () => {
    if (!calculationResult) return

    const content = `
오프로 식품공장 설립 견적서
===============================

프로젝트명: ${formData.name || '새 프로젝트'}
위치: ${formData.province} ${formData.city}
규모: ${formData.size}평
용도: ${formData.purpose}

견적 내역:
- 건설비: ${formatCurrency(calculationResult.baseCost)}
- 시설비: ${formatCurrency(calculationResult.facilityCost)}
- HACCP 인증비: ${formatCurrency(calculationResult.haccpCost)}
- 인허가비: ${formatCurrency(calculationResult.permitCost)}
- 예비비: ${formatCurrency(calculationResult.contingencyCost)}
- 총 비용: ${formatCurrency(calculationResult.totalCost)}

생성일: ${new Date().toLocaleDateString('ko-KR')}
    `

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `견적서_${formData.name || '프로젝트'}_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // 통화 포맷팅
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0
    }).format(amount)
  }

  // ROI 계산
  const calculateROI = () => {
    if (!projectData || !monthlyRevenue) return

    const revenue = parseFloat(monthlyRevenue)
    if (isNaN(revenue)) return

    return projectCalculator.calculateROI(projectData, revenue)
  }

  const roi = showROI && projectData && monthlyRevenue ? calculateROI() : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">스마트 견적 시뮬레이션</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI 기반 정확한 비용 계산과 실시간 데이터 저장으로 완벽한 식품공장 설립 계획을 세워보세요
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="relative">
            {/* 배경 연결선 */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-full max-w-md">
              <div className="h-0.5 bg-gray-200 rounded-full"></div>
              <div className={`absolute top-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-1000 ${
                currentStep >= 2 ? 'w-full' : currentStep >= 1 ? 'w-1/2' : 'w-0'
              }`}></div>
            </div>
            
            <div className="flex items-center justify-center space-x-4 md:space-x-8 relative z-10">
              {[
                { step: 1, title: '프로젝트 정보', icon: FileText, color: 'blue' },
                { step: 2, title: '견적 계산', icon: Calculator, color: 'emerald' },
                { step: 3, title: '결과 분석', icon: BarChart3, color: 'purple' }
              ].map(({ step, title, icon: Icon, color }) => (
                <div key={step} className="flex flex-col items-center">
                  {/* 단계 아이콘 */}
                  <div className={`relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
                    currentStep >= step 
                      ? `bg-gradient-to-r from-${color}-500 to-${color}-600 text-white transform scale-110` 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <Icon className="w-6 h-6" />
                    {/* 완료 체크 표시 */}
                    {currentStep > step && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* 단계 제목 */}
                  <div className="mt-3 text-center">
                    <div className={`text-xs md:text-sm font-medium transition-colors duration-300 ${
                      currentStep >= step ? `text-${color}-600` : 'text-gray-500'
                    }`}>
                      {title}
                    </div>
                    <div className={`text-xs text-gray-400 mt-1 ${
                      currentStep >= step ? 'opacity-100' : 'opacity-60'
                    }`}>
                      {step === 1 && 'Step 1'}
                      {step === 2 && 'Step 2'}
                      {step === 3 && 'Step 3'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 입력 폼 */}
          <div className="lg:col-span-2 space-y-6">
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FileText className="w-8 h-8 mr-3 text-blue-600" />
                  프로젝트 기본 정보
                </h2>
                
                <div className="space-y-6">
                  {/* 프로젝트명 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      프로젝트명
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="예: 서울 강남 제과공장"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* 지역 선택 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        광역시/도 <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.province}
                        onChange={(e) => {
                          handleInputChange('province', e.target.value)
                          handleInputChange('city', '')
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">선택하세요</option>
                        {Object.keys(provinces).map(province => (
                          <option key={province} value={province}>{province}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        시/구/군 <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={!formData.province}
                        required
                      >
                        <option value="">선택하세요</option>
                        {formData.province && provinces[formData.province as keyof typeof provinces]?.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 규모 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      공장 규모 (평수) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.size}
                      onChange={(e) => handleInputChange('size', e.target.value)}
                      placeholder="예: 100"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* 용도 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      제품 용도 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.purpose}
                      onChange={(e) => handleInputChange('purpose', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">선택하세요</option>
                      {purposeOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* 필요 시설 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      필요 시설 (선택사항)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {facilityOptions.map(facility => (
                        <label key={facility} className="flex items-center space-x-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.facilities.includes(facility)}
                            onChange={(e) => handleFacilityChange(facility, e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{facility}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 착공 예정일 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      착공 예정일
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    다음 단계로
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calculator className="w-8 h-8 mr-3 text-green-600" />
                  견적 계산 및 분석
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">입력된 정보 확인</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="font-medium">위치:</span> {formData.province} {formData.city}</div>
                      <div><span className="font-medium">규모:</span> {formData.size}평</div>
                      <div><span className="font-medium">용도:</span> {formData.purpose}</div>
                      <div><span className="font-medium">시설:</span> {formData.facilities.length}개</div>
                    </div>
                  </div>

                  <button
                    onClick={calculateEstimate}
                    disabled={isCalculating}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCalculating ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        계산 중...
                      </div>
                    ) : (
                      '견적 계산하기'
                    )}
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && calculationResult && (
              <div className="space-y-6">
                {/* 견적 결과 */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <BarChart3 className="w-8 h-8 mr-3 text-purple-600" />
                      견적 결과
                    </h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={saveProject}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        저장
                      </button>
                      <button
                        onClick={downloadEstimate}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        다운로드
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 총 비용 */}
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {formatCurrency(calculationResult.totalCost)}
                      </div>
                      <div className="text-sm text-gray-600">총 예상 건설비</div>
                    </div>

                    {/* 비용 분석 */}
                    <div className="space-y-3">
                      {calculationResult.breakdown.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600">{item.category}</span>
                          <div className="text-right">
                            <div className="font-semibold">{formatCurrency(item.amount)}</div>
                            <div className="text-xs text-gray-500">{item.percentage.toFixed(1)}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ROI 분석 */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="w-6 h-6 mr-3 text-green-600" />
                    수익성 분석
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        예상 월 매출 (원)
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={monthlyRevenue}
                          onChange={(e) => setMonthlyRevenue(e.target.value)}
                          placeholder="예: 50000000"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => setShowROI(!showROI)}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          분석
                        </button>
                      </div>
                    </div>

                    {showROI && roi && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">{roi.paybackPeriod}개월</div>
                          <div className="text-sm text-gray-600">투자 회수 기간</div>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600">{roi.annualROI}%</div>
                          <div className="text-sm text-gray-600">연간 ROI</div>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-purple-600">{roi.breakEvenPoint}개월</div>
                          <div className="text-sm text-gray-600">손익분기점</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 프로젝트 현황 */}
            {projectData && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Factory className="w-6 h-6 mr-3 text-blue-600" />
                  프로젝트 현황
                </h3>
                <div className="space-y-3 text-sm">
                  <div><span className="font-medium">이름:</span> {projectData.name}</div>
                  <div><span className="font-medium">위치:</span> {projectData.location.province} {projectData.location.city}</div>
                  <div><span className="font-medium">규모:</span> {projectData.size}평</div>
                  <div><span className="font-medium">용도:</span> {projectData.purpose}</div>
                  <div><span className="font-medium">시설:</span> {projectData.facilities.length}개</div>
                </div>
              </div>
            )}

            {/* 비용 절감 제안 */}
            {calculationResult && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-3 text-yellow-600" />
                  비용 절감 제안
                </h3>
                <div className="space-y-3">
                  {projectData && projectCalculator.getCostSavingSuggestions(projectData).map((suggestion, index) => (
                    <div key={index} className="p-3 bg-yellow-50 rounded-lg">
                      <div className="text-sm font-medium text-yellow-800">{suggestion.category}</div>
                      <div className="text-xs text-yellow-700 mt-1">{suggestion.suggestion}</div>
                      <div className="text-xs text-yellow-600 mt-1">
                        절감 가능: {formatCurrency(suggestion.potentialSaving)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 빠른 액션 */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">빠른 액션</h3>
              <div className="space-y-2">
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <BarChart3 className="w-4 h-4 mr-3" />
                  대시보드 보기
                </button>
                <button
                  onClick={() => window.location.href = '/contract'}
                  className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FileText className="w-4 h-4 mr-3" />
                  계약 문의
                </button>
                <button
                  onClick={() => window.location.href = '/haccp'}
                  className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Shield className="w-4 h-4 mr-3" />
                  HACCP 가이드
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}