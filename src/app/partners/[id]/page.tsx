import React from 'react'
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
  ArrowLeft,
  DollarSign,
  Diamond,
  Gem,
  Medal,
  Target,
  BarChart3,
  FileText,
  Clock3,
  Award as Certificate,
  UserCheck,
  Building,
  Wrench,
  Hammer,
  Settings
} from 'lucide-react'

// 정적 사이트 생성을 위한 매개변수 생성
export async function generateStaticParams() {
  // 실제로는 API에서 파트너 ID 목록을 가져와야 하지만, 
  // 현재는 하드코딩된 데이터를 기반으로 생성
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]
}

export default function PartnerDetailPage({ params }: { params: { id: string } }) {
  const partnerId = params.id

  // 파트너사 상세 데이터 (실제로는 API에서 가져올 데이터)
  const partnersData: {[key: string]: any} = {
    '1': {
      id: 1,
      name: '프리미엄건설',
      grade: 'diamond',
      category: '건설업',
      experience: '18년',
      completedProjects: 67,
      contractAmount: '150억원',
      creditRating: 'AAA',
      location: '서울특별시 강남구',
      address: '서울특별시 강남구 테헤란로 123 프리미엄빌딩 10층',
      rating: 4.9,
      reviewCount: 156,
      specialties: ['식품공장', 'HACCP인증', '청정실', '자동화시설'],
      contact: {
        phone: '02-1234-5678',
        email: 'contact@premium.co.kr',
        website: 'https://www.premium.co.kr'
      },
      achievements: [
        'HACCP 인증 100% 성공률',
        '식품공장 전문 건설업체',
        'ISO 9001 인증',
        'ISO 14001 인증',
        'OHSAS 18001 인증',
        '건설기술진흥법 우수업체 선정',
        '식품의약품안전처 표창'
      ],
      recentProjects: [
        {
          name: '맛있는식품 공장',
          location: '경기도 안양시',
          area: '2,500㎡',
          cost: '25억원',
          period: '2023.03 ~ 2023.12',
          status: '완공'
        },
        {
          name: '신선한유제품 공장',
          location: '충청남도 천안시',
          area: '3,200㎡',
          cost: '32억원',
          period: '2022.08 ~ 2023.05',
          status: '완공'
        },
        {
          name: '건강한베이커리 공장',
          location: '경기도 수원시',
          area: '1,800㎡',
          cost: '18억원',
          period: '2024.01 ~ 2024.08',
          status: '진행중'
        }
      ],
      team: [
        {
          name: '김현장',
          position: '현장 소장',
          experience: '15년',
          certifications: ['건설기술인', 'HACCP 관리자']
        },
        {
          name: '이안전',
          position: '안전 관리자',
          experience: '12년',
          certifications: ['산업안전지도사', 'HACCP 관리자']
        },
        {
          name: '박설계',
          position: '설계 책임자',
          experience: '10년',
          certifications: ['건축사', 'HACCP 설계 전문가']
        }
      ],
      equipment: [
        '3D BIM 설계 시스템',
        '실시간 현장 모니터링 시스템',
        '품질관리 시스템',
        '안전관리 시스템',
        '진동 측정기',
        '소음 측정기',
        '온습도 측정기'
      ],
      description: '프리미엄건설은 2006년 설립 이래 식품공장 건설 전문업체로서 HACCP 인증을 받은 식품공장 건설에 특화된 기술력을 보유하고 있습니다. 총 67건의 프로젝트를 성공적으로 완료하였으며, HACCP 인증 성공률 100%를 자랑합니다. 공개 입찰을 통한 투명한 사업 운영과 식품안전을 최우선으로 하는 설계와 시공을 통해 고객의 성공적인 사업 운영을 지원합니다.'
    },
    '2': {
      id: 2,
      name: '안전건설',
      grade: 'platinum',
      category: '건설업',
      experience: '12년',
      completedProjects: 45,
      contractAmount: '80억원',
      creditRating: 'A',
      location: '경기도 수원시',
      address: '경기도 수원시 영통구 월드컵로 456 안전빌딩 8층',
      rating: 4.8,
      reviewCount: 98,
      specialties: ['안전관리', '식품공장', '인증지원', '품질관리'],
      contact: {
        phone: '031-2345-6789',
        email: 'info@safety.co.kr',
        website: 'https://www.safety.co.kr'
      },
      achievements: [
        'HACCP 인증 98% 성공률',
        '안전관리 우수업체',
        '품질경영 인증',
        'ISO 9001 인증',
        '건설기술진흥법 인정업체'
      ],
      recentProjects: [
        {
          name: '자연식품 공장',
          location: '경기도 성남시',
          area: '1,800㎡',
          cost: '20억원',
          period: '2023.06 ~ 2024.02',
          status: '완공'
        },
        {
          name: '유기농식품 공장',
          location: '충청북도 청주시',
          area: '2,200㎡',
          cost: '24억원',
          period: '2022.09 ~ 2023.04',
          status: '완공'
        }
      ],
      team: [
        {
          name: '최안전',
          position: '안전 총괄',
          experience: '10년',
          certifications: ['산업안전지도사']
        },
        {
          name: '정품질',
          position: '품질 관리자',
          experience: '8년',
          certifications: ['품질관리기술사']
        }
      ],
      equipment: [
        '안전관리 시스템',
        '품질관리 시스템',
        '현장 모니터링 시스템'
      ],
      description: '안전건설은 2012년 설립되어 안전관리와 품질관리에 특화된 식품공장 건설업체입니다. 총 45건의 프로젝트를 완료했으며, HACCP 인증 성공률 98%를 달성했습니다. 공개 입찰을 통한 공정한 경쟁과 안전한 작업환경, 높은 품질의 시공을 통해 고객 만족도를 높이고 있습니다.'
    },
    '3': {
      id: 3,
      name: '스마트건설',
      grade: 'gold',
      category: '건설업',
      experience: '8년',
      completedProjects: 28,
      contractAmount: '35억원',
      creditRating: 'BB',
      location: '충청남도 천안시',
      address: '충청남도 천안시 동남구 신부동 789 스마트빌딩 6층',
      rating: 4.7,
      reviewCount: 67,
      specialties: ['스마트공장', '자동화', '식품공장', 'IoT 시스템'],
      contact: {
        phone: '041-3456-7890',
        email: 'hello@smart.co.kr',
        website: 'https://www.smart.co.kr'
      },
      achievements: [
        'HACCP 인증 95% 성공률',
        '스마트공장 구축 전문',
        '4차 산업혁명 선도업체',
        'IoT 기술 도입 우수업체'
      ],
      recentProjects: [
        {
          name: '스마트베이커리 공장',
          location: '대전광역시 유성구',
          area: '1,500㎡',
          cost: '18억원',
          period: '2023.08 ~ 2024.03',
          status: '완공'
        },
        {
          name: 'AI식품공장',
          location: '경기도 안산시',
          area: '2,000㎡',
          cost: '22억원',
          period: '2024.02 ~ 2024.09',
          status: '진행중'
        }
      ],
      team: [
        {
          name: '이스마트',
          position: '기술 총괄',
          experience: '8년',
          certifications: ['정보시스템 감리사']
        },
        {
          name: '김자동화',
          position: '자동화 전문가',
          experience: '6년',
          certifications: ['자동화 기술사']
        }
      ],
      equipment: [
        'IoT 모니터링 시스템',
        '자동화 설계 시스템',
        '스마트 공장 관리 시스템',
        'AI 품질 검사 시스템'
      ],
      description: '스마트건설은 2016년 설립되어 4차 산업혁명 기술을 식품공장 건설에 접목하는 혁신적인 업체입니다. 공개 입찰 시스템을 통한 투명한 사업 운영과 IoT, 자동화 기술을 활용한 스마트 공장 구축에 특화되어 있으며, 총 28건의 프로젝트를 완료했습니다.'
    }
  }

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
    }
  }

  const partner = partnersData[partnerId]
  
  if (!partner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">파트너사를 찾을 수 없습니다</h1>
          <Link href="/partners" className="text-blue-600 hover:text-blue-800">
            파트너사 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const grade = gradeSystem[partner.grade as keyof typeof gradeSystem]
  const GradeIcon = grade.icon

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - 모바일 최적화 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/partners"
              className="inline-flex items-center text-white hover:text-blue-200 transition-colors duration-300 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <span className="hidden sm:inline">파트너사 목록으로 돌아가기</span>
              <span className="sm:hidden">목록으로</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* 파트너사 기본 정보 */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* 기본 정보 */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-2">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{partner.name}</h1>
                      <div className={`inline-flex items-center px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium bg-gradient-to-r ${grade.color} text-white self-start`}>
                        <GradeIcon className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                        {grade.name}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        {partner.address}
                      </div>
                      <div className="flex items-center">
                        <Building2 className="w-5 h-5 mr-2" />
                        {partner.category} • {partner.experience} 경력
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 mr-2" />
                        연간 도급액 {partner.contractAmount} • 신용등급 {partner.creditRating}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center mb-2">
                      <Star className="w-6 h-6 text-yellow-400 mr-1" />
                      <span className="text-2xl font-bold text-gray-900">{partner.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600">리뷰 {partner.reviewCount}개</p>
                    <p className="text-sm text-gray-600 mt-1">완공 {partner.completedProjects}건</p>
                  </div>
                </div>

                {/* 전문분야 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">전문분야</h3>
                  <div className="flex flex-wrap gap-2">
                    {partner.specialties.map((specialty: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 회사 소개 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">회사 소개</h3>
                  <p className="text-gray-700 leading-relaxed">{partner.description}</p>
                </div>

                {/* 연락처 */}
                <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">연락처</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm md:text-base break-all">{partner.contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm md:text-base break-all">{partner.contact.email}</span>
                    </div>
                    <div className="flex items-center sm:col-span-2 md:col-span-1">
                      <Building className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mr-2 flex-shrink-0" />
                      <a href={partner.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm md:text-base break-all">
                        공식 웹사이트
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 주요 성과 */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">주요 성과</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {partner.achievements.map((achievement: string, index: number) => (
                <div key={index} className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-green-800 font-medium">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 최근 프로젝트 */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">최근 프로젝트</h2>
            <div className="space-y-6">
              {partner.recentProjects.map((project: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {project.location}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === '완공' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">면적</span>
                      <p className="font-medium text-gray-900">{project.area}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">공사비</span>
                      <p className="font-medium text-gray-900">{project.cost}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">공사기간</span>
                      <p className="font-medium text-gray-900">{project.period}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">상태</span>
                      <p className="font-medium text-gray-900">{project.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 팀 구성 */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">핵심 팀 구성</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partner.team.map((member: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <UserCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.position}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      경력 {member.experience}
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">자격증</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member.certifications.map((cert: string, certIndex: number) => (
                          <span key={certIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 보유 장비 및 시스템 */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">보유 장비 및 시스템</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {partner.equipment.map((equipment: string, index: number) => (
                <div key={index} className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Settings className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                  <span className="text-blue-800 font-medium">{equipment}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 등급 정보 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">오프로 등급 정보</h2>
            <div className={`${grade.bgColor} ${grade.borderColor} border-2 rounded-lg p-6`}>
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${grade.color} flex items-center justify-center mr-4`}>
                  <GradeIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{grade.name} 등급</h3>
                  <p className="text-gray-600">{grade.requirements}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-gray-900">도급액</div>
                  <div className="text-gray-600">{partner.contractAmount}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">신용등급</div>
                  <div className="text-gray-600">{partner.creditRating}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">완공 건수</div>
                  <div className="text-gray-600">{partner.completedProjects}건</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
