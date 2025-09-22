'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Building2, 
  Star, 
  Award, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle,
  Upload,
  FileText,
  Shield,
  Target,
  TrendingUp,
  ArrowLeft,
  Save,
  AlertCircle,
  Crown,
  Gem,
  Medal
} from 'lucide-react'

export default function PartnerRegisterPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    businessNumber: '',
    ceoName: '',
    phone: '',
    email: '',
    address: '',
    category: '',
    experience: '',
    completedProjects: '',
    contractAmount: '',
    creditRating: '',
    specialties: '',
    certifications: '',
    description: '',
    website: ''
  })

  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    '건설업',
    '설계업', 
    '감리업',
    '인증업',
    '자재공급업',
    '기타'
  ]

  const creditRatings = [
    'AAA',
    'AA',
    'A',
    'BBB',
    'BB',
    'B',
    'CCC',
    'CC',
    'C',
    'D'
  ]

  const specialties = [
    '식품공장',
    'HACCP인증',
    '청정실',
    '안전관리',
    '자동화',
    '스마트공장',
    '창고건설',
    '소규모공장'
  ]

  const certifications = [
    'ISO 9001',
    'ISO 14001',
    'OHSAS 18001',
    'HACCP 인증',
    '건설업 면허',
    '설계업 면허',
    '감리업 면허'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // 에러 메시지 제거
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSpecialtyChange = (specialty: string) => {
    const currentSpecialties = formData.specialties.split(',').filter(s => s.trim())
    let newSpecialties
    
    if (currentSpecialties.includes(specialty)) {
      newSpecialties = currentSpecialties.filter(s => s !== specialty)
    } else {
      newSpecialties = [...currentSpecialties, specialty]
    }
    
    setFormData(prev => ({
      ...prev,
      specialties: newSpecialties.join(', ')
    }))
  }

  const handleCertificationChange = (certification: string) => {
    const currentCertifications = formData.certifications.split(',').filter(c => c.trim())
    let newCertifications
    
    if (currentCertifications.includes(certification)) {
      newCertifications = currentCertifications.filter(c => c !== certification)
    } else {
      newCertifications = [...currentCertifications, certification]
    }
    
    setFormData(prev => ({
      ...prev,
      certifications: newCertifications.join(', ')
    }))
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.companyName.trim()) {
      newErrors.companyName = '회사명을 입력해주세요'
    }
    if (!formData.businessNumber.trim()) {
      newErrors.businessNumber = '사업자등록번호를 입력해주세요'
    }
    if (!formData.ceoName.trim()) {
      newErrors.ceoName = '대표자명을 입력해주세요'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요'
    }
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요'
    }
    if (!formData.address.trim()) {
      newErrors.address = '주소를 입력해주세요'
    }
    if (!formData.category) {
      newErrors.category = '업종을 선택해주세요'
    }
    if (!formData.experience.trim()) {
      newErrors.experience = '경력을 입력해주세요'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('파트너사 등록이 완료되었습니다. 검토 후 등급이 부여됩니다.')
      
      // 폼 초기화
      setFormData({
        companyName: '',
        businessNumber: '',
        ceoName: '',
        phone: '',
        email: '',
        address: '',
        category: '',
        experience: '',
        completedProjects: '',
        contractAmount: '',
        creditRating: '',
        specialties: '',
        certifications: '',
        description: '',
        website: ''
      })
    } catch (error) {
      alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getGradeEstimate = () => {
    const contractAmount = parseInt(formData.contractAmount.replace('억', '')) || 0
    const creditRating = formData.creditRating
    
    // 신용등급을 숫자로 변환 (AAA=10, AA=9, A=8, BBB=7, BB=6, B=5, CCC=4, CC=3, C=2, D=1)
    const getCreditScore = (rating: string) => {
      const ratingMap: {[key: string]: number} = {
        'AAA': 10, 'AA': 9, 'A': 8, 'BBB': 7, 'BB': 6, 'B': 5, 
        'CCC': 4, 'CC': 3, 'C': 2, 'D': 1
      }
      return ratingMap[rating] || 0
    }
    
    const creditScore = getCreditScore(creditRating)
    
    // 도급액 100억 이상 + 신용등급 AAA~AA
    if (contractAmount >= 100 && creditScore >= 9) return { grade: '다이아몬드', color: 'text-blue-600' }
    // 도급액 50억~100억 + 신용등급 A~BBB
    if (contractAmount >= 50 && creditScore >= 7) return { grade: '플래티넘', color: 'text-gray-600' }
    // 도급액 20억~50억 + 신용등급 BB~B
    if (contractAmount >= 20 && creditScore >= 5) return { grade: '골드', color: 'text-yellow-600' }
    // 도급액 10억~20억 + 신용등급 CCC~CC
    if (contractAmount >= 10 && creditScore >= 3) return { grade: '실버', color: 'text-gray-500' }
    // 도급액 5억~10억 + 신용등급 C~D
    if (contractAmount >= 5 && creditScore >= 1) return { grade: '브론즈', color: 'text-orange-600' }
    
    return { grade: '등급 미달', color: 'text-red-600' }
  }

  const estimatedGrade = getGradeEstimate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">파트너사 등록</h1>
            <p className="text-xl opacity-90">오프로와 함께 식품공장 건설의 전문가가 되어보세요</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 뒤로가기 */}
          <Link 
            href="/partners"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            파트너사 목록으로 돌아가기
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 등급 예상 정보 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Award className="w-6 h-6 text-blue-600 mr-2" />
                  예상 등급
                </h3>
                
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg mb-4">
                  <div className={`text-3xl font-bold ${estimatedGrade.color} mb-2`}>
                    {estimatedGrade.grade}
                  </div>
                  <p className="text-sm text-gray-600">입력 정보 기준</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">도급액</span>
                    <span className="font-medium">{formData.contractAmount ? `${formData.contractAmount}억원` : '미입력'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">신용등급</span>
                    <span className="font-medium">{formData.creditRating || '미선택'}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">등급 기준</h4>
                      <ul className="text-xs text-yellow-700 space-y-1">
                        <li>• 다이아몬드: 100억+, AAA~AA</li>
                        <li>• 플래티넘: 50억~100억, A~BBB</li>
                        <li>• 골드: 20억~50억, BB~B</li>
                        <li>• 실버: 10억~20억, CCC~CC</li>
                        <li>• 브론즈: 5억~10억, C~D</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 등록 폼 */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 기본 정보 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Building2 className="w-6 h-6 text-blue-600 mr-2" />
                    기본 정보
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        회사명 *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.companyName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="회사명을 입력하세요"
                      />
                      {errors.companyName && (
                        <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        사업자등록번호 *
                      </label>
                      <input
                        type="text"
                        name="businessNumber"
                        value={formData.businessNumber}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.businessNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="000-00-00000"
                      />
                      {errors.businessNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.businessNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        대표자명 *
                      </label>
                      <input
                        type="text"
                        name="ceoName"
                        value={formData.ceoName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.ceoName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="대표자명을 입력하세요"
                      />
                      {errors.ceoName && (
                        <p className="text-red-500 text-sm mt-1">{errors.ceoName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        연락처 *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="02-1234-5678"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        이메일 *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="contact@company.co.kr"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        웹사이트
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://www.company.co.kr"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      주소 *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="서울특별시 강남구 테헤란로 123"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>
                </div>

                {/* 업종 및 경력 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Target className="w-6 h-6 text-blue-600 mr-2" />
                    업종 및 경력
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        업종 *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">업종을 선택하세요</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        경력 (년) *
                      </label>
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.experience ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="10"
                        min="0"
                      />
                      {errors.experience && (
                        <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        완공 건수
                      </label>
                      <input
                        type="number"
                        name="completedProjects"
                        value={formData.completedProjects}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="25"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        연간 도급액 (억원)
                      </label>
                      <input
                        type="number"
                        name="contractAmount"
                        value={formData.contractAmount}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="100"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        신용등급
                      </label>
                      <select
                        name="creditRating"
                        value={formData.creditRating}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">신용등급을 선택하세요</option>
                        {creditRatings.map(rating => (
                          <option key={rating} value={rating}>{rating}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 전문분야 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Shield className="w-6 h-6 text-blue-600 mr-2" />
                    전문분야
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {specialties.map(specialty => (
                      <label key={specialty} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.specialties.includes(specialty)}
                          onChange={() => handleSpecialtyChange(specialty)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{specialty}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 인증서 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Award className="w-6 h-6 text-blue-600 mr-2" />
                    보유 인증서
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {certifications.map(certification => (
                      <label key={certification} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.certifications.includes(certification)}
                          onChange={() => handleCertificationChange(certification)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{certification}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 회사 소개 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <FileText className="w-6 h-6 text-blue-600 mr-2" />
                    회사 소개
                  </h3>
                  
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="회사 소개, 주요 사업 분야, 강점 등을 자유롭게 작성해주세요..."
                  />
                </div>

                {/* 제출 버튼 */}
                <div className="flex justify-end space-x-4">
                  <Link
                    href="/partners"
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                  >
                    취소
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        등록 중...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        등록하기
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
