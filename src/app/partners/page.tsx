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
  TrendingUp,
  Shield,
  Clock,
  Eye,
  Filter,
  Search,
  Plus,
  Crown,
  Gem,
  Medal,
  Target,
  BarChart3,
  Diamond,
  DollarSign
} from 'lucide-react'

export default function PartnersPage() {
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // 오프로 품질등급시스템 (도급액 + 신용평가 기준)
  const gradeSystem = {
    'diamond': {
      name: '다이아몬드',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-r from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      icon: Diamond,
      requirements: '도급액 100억 이상, 신용등급 AAA~AA, HACCP 인증 100%'
    },
    'platinum': {
      name: '플래티넘',
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gradient-to-r from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
      icon: Gem,
      requirements: '도급액 50억~100억, 신용등급 A~BBB, HACCP 인증 95%'
    },
    'gold': {
      name: '골드',
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-gradient-to-r from-yellow-50 to-yellow-100',
      borderColor: 'border-yellow-200',
      icon: Medal,
      requirements: '도급액 20억~50억, 신용등급 BB~B, HACCP 인증 90%'
    },
    'silver': {
      name: '실버',
      color: 'from-gray-300 to-gray-500',
      bgColor: 'bg-gradient-to-r from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
      icon: Award,
      requirements: '도급액 10억~20억, 신용등급 CCC~CC, HACCP 인증 85%'
    },
    'bronze': {
      name: '브론즈',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-gradient-to-r from-orange-50 to-orange-100',
      borderColor: 'border-orange-200',
      icon: Star,
      requirements: '도급액 5억~10억, 신용등급 C~D, HACCP 인증 80%'
    }
  }

  const partners = [
    {
      id: 1,
      name: '프리미엄건설',
      grade: 'diamond',
      category: '건설업',
      experience: '18년',
      completedProjects: 67,
      contractAmount: '150억원',
      creditRating: 'AAA',
      location: '서울특별시 강남구',
      rating: 4.9,
      specialties: ['식품공장', 'HACCP인증', '청정실'],
      contact: {
        phone: '02-1234-5678',
        email: 'contact@premium.co.kr'
      },
      achievements: [
        'HACCP 인증 100% 성공률',
        '식품공장 전문 건설업체',
        'ISO 9001 인증'
      ],
      recentProjects: [
        '맛있는식품 공장 (완공)',
        '신선한유제품 공장 (완공)',
        '건강한베이커리 공장 (진행중)'
      ]
    },
    {
      id: 2,
      name: '안전건설',
      grade: 'platinum',
      category: '건설업',
      experience: '12년',
      completedProjects: 45,
      contractAmount: '80억원',
      creditRating: 'A',
      location: '경기도 수원시',
      rating: 4.8,
      specialties: ['안전관리', '식품공장', '인증지원'],
      contact: {
        phone: '031-2345-6789',
        email: 'info@safety.co.kr'
      },
      achievements: [
        'HACCP 인증 98% 성공률',
        '안전관리 우수업체',
        '품질경영 인증'
      ],
      recentProjects: [
        '자연식품 공장 (완공)',
        '유기농식품 공장 (완공)'
      ]
    },
    {
      id: 3,
      name: '스마트건설',
      grade: 'gold',
      category: '건설업',
      experience: '8년',
      completedProjects: 28,
      contractAmount: '35억원',
      creditRating: 'BB',
      location: '충청남도 천안시',
      rating: 4.7,
      specialties: ['스마트공장', '자동화', '식품공장'],
      contact: {
        phone: '041-3456-7890',
        email: 'hello@smart.co.kr'
      },
      achievements: [
        'HACCP 인증 95% 성공률',
        '스마트공장 구축 전문',
        '4차 산업혁명 선도업체'
      ],
      recentProjects: [
        '스마트베이커리 공장 (완공)',
        'AI식품공장 (진행중)'
      ]
    },
    {
      id: 4,
      name: '신뢰건설',
      grade: 'silver',
      category: '건설업',
      experience: '6년',
      completedProjects: 18,
      contractAmount: '15억원',
      creditRating: 'CCC',
      location: '부산광역시 해운대구',
      rating: 4.6,
      specialties: ['식품공장', '창고건설'],
      contact: {
        phone: '051-4567-8901',
        email: 'trust@reliable.co.kr'
      },
      achievements: [
        'HACCP 인증 90% 성공률',
        '창고건설 전문',
        '비용 효율성 우수'
      ],
      recentProjects: [
        '냉동창고 공장 (완공)',
        '식품보관창고 (완공)'
      ]
    },
    {
      id: 5,
      name: '신규건설',
      grade: 'bronze',
      category: '건설업',
      experience: '4년',
      completedProjects: 8,
      contractAmount: '7억원',
      creditRating: 'C',
      location: '대전광역시 유성구',
      rating: 4.5,
      specialties: ['소규모공장', '식품공장'],
      contact: {
        phone: '042-5678-9012',
        email: 'new@startup.co.kr'
      },
      achievements: [
        'HACCP 인증 85% 성공률',
        '소규모 공장 전문',
        '빠른 시공 가능'
      ],
      recentProjects: [
        '소규모베이커리 공장 (완공)',
        '가정식품공장 (진행중)'
      ]
    }
  ]

  const categories = ['all', '건설업', '설계업', '감리업', '인증업']

  const filteredPartners = partners.filter(partner => {
    const matchesGrade = selectedGrade === 'all' || partner.grade === selectedGrade
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.location.includes(searchTerm) ||
                         partner.specialties.some(s => s.includes(searchTerm))
    const matchesCategory = selectedCategory === 'all' || partner.category === selectedCategory
    
    return matchesGrade && matchesSearch && matchesCategory
  })

  const getGradeIcon = (grade: string) => {
    const IconComponent = gradeSystem[grade as keyof typeof gradeSystem].icon
    return <IconComponent className="w-5 h-5" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">파트너사</h1>
            <p className="text-xl opacity-90">검증된 전문 파트너사와 함께 식품공장을 건설하세요</p>
          </div>
        </div>
      </div>

      {/* 등급 시스템 설명 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">오프로 품질등급시스템</h2>
            <p className="text-lg text-gray-600">엄격한 기준으로 검증된 파트너사만을 인증합니다</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {Object.entries(gradeSystem).map(([key, grade]) => (
              <div key={key} className={`${grade.bgColor} ${grade.borderColor} border-2 rounded-lg p-4 text-center`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${grade.color} text-white mb-3`}>
                  <grade.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{grade.name}</h3>
                <p className="text-xs text-gray-600">{grade.requirements}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 검색 및 필터 */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* 검색 */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="파트너사명, 지역, 전문분야로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* 등급 필터 */}
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">모든 등급</option>
                {Object.entries(gradeSystem).map(([key, grade]) => (
                  <option key={key} value={key}>{grade.name}</option>
                ))}
              </select>
              
              {/* 카테고리 필터 */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? '모든 카테고리' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 파트너사 목록 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                파트너사 목록 ({filteredPartners.length}개)
              </h3>
              <Link
                href="/partners/register"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                파트너사 등록
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredPartners.map((partner) => {
                const grade = gradeSystem[partner.grade as keyof typeof gradeSystem]
                return (
                  <div key={partner.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* 파트너사 기본 정보 */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center mb-2">
                              <h4 className="text-xl font-bold text-gray-900 mr-3">{partner.name}</h4>
                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${grade.color} text-white`}>
                                {getGradeIcon(partner.grade)}
                                <span className="ml-1">{grade.name}</span>
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <MapPin className="w-4 h-4 mr-1" />
                              {partner.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <Building2 className="w-4 h-4 mr-1" />
                              {partner.category} • {partner.experience} 경력
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <DollarSign className="w-4 h-4 mr-1" />
                              도급액 {partner.contractAmount} • 신용등급 {partner.creditRating}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center mb-1">
                              <Star className="w-5 h-5 text-yellow-400 mr-1" />
                              <span className="font-bold text-gray-900">{partner.rating}</span>
                            </div>
                            <p className="text-sm text-gray-600">완공 {partner.completedProjects}건</p>
                          </div>
                        </div>

                        {/* 전문분야 */}
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2">전문분야</h5>
                          <div className="flex flex-wrap gap-2">
                            {partner.specialties.map((specialty, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* 주요 성과 */}
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2">주요 성과</h5>
                          <div className="space-y-1">
                            {partner.achievements.map((achievement, index) => (
                              <div key={index} className="flex items-center text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                {achievement}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 연락처 및 액션 */}
                      <div className="lg:w-80">
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h5 className="font-semibold text-gray-900 mb-3">연락처</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 text-gray-500 mr-2" />
                              {partner.contact.phone}
                            </div>
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 text-gray-500 mr-2" />
                              {partner.contact.email}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Link
                            href={`/partners/${partner.id}`}
                            className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-center"
                          >
                            상세보기
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
