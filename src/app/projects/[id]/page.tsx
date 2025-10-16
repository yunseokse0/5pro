'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  BuildingOfficeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  PhotoIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  ShareIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

// Mock 프로젝트 상세 데이터
const mockProjectDetails = {
  1: {
    id: 1,
    name: '한성식품 김치공장',
    type: '김치공장',
    location: '경기도 안양시',
    area: '500평',
    budget: '15억원',
    status: 'completed',
    startDate: '2023-01-15',
    endDate: '2023-07-15',
    haccpStatus: 'approved',
    image: '/imgs/project-kimchi.jpg',
    description: 'HACCP 인증 완료, BIM 기반 설계로 공사비 25% 절감',
    savings: '3.8억원',
    features: ['HACCP 인증 완료', 'BIM 기반 설계', '공사비 25% 절감', '운영비 18% 절감'],
    gallery: [
      '/imgs/projects/kimchi/project-kimchi-1.jpg',
      '/imgs/projects/kimchi/project-kimchi-2.jpg',
      '/imgs/projects/kimchi/project-kimchi-3.jpg',
      '/imgs/projects/kimchi/project-kimchi-4.jpg'
    ],
    timeline: [
      { phase: '기획 및 설계', duration: '2개월', status: 'completed', startDate: '2023-01-15', endDate: '2023-03-15' },
      { phase: 'HACCP 계획 수립', duration: '1개월', status: 'completed', startDate: '2023-03-01', endDate: '2023-03-31' },
      { phase: '건설 및 시공', duration: '3개월', status: 'completed', startDate: '2023-04-01', endDate: '2023-06-30' },
      { phase: 'HACCP 인증', duration: '1개월', status: 'completed', startDate: '2023-07-01', endDate: '2023-07-31' }
    ],
    haccpDetails: {
      certificationDate: '2023-07-31',
      certificationNumber: 'HACCP-2023-001',
      inspector: '김하캡 (HACCP 전문가)',
      requirements: [
        { name: 'HACCP 계획서 작성', status: 'completed' },
        { name: '위해요소 분석', status: 'completed' },
        { name: '중요관리점 설정', status: 'completed' },
        { name: '모니터링 절차 수립', status: 'completed' },
        { name: '시정조치 절차 수립', status: 'completed' },
        { name: '검증 절차 수립', status: 'completed' },
        { name: '기록유지 절차 수립', status: 'completed' }
      ]
    },
    costBreakdown: {
      construction: 8.5,
      equipment: 4.2,
      haccp: 1.8,
      permits: 0.5
    },
    performanceMetrics: {
      costSavings: 25,
      timeReduction: 30,
      qualityImprovement: 40,
      energyEfficiency: 35
    }
  },
  2: {
    id: 2,
    name: '대한제빵 제빵공장',
    type: '제빵공장',
    location: '서울특별시 강서구',
    area: '300평',
    budget: '12억원',
    status: 'in_progress',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    haccpStatus: 'review',
    image: '/imgs/project-bakery.jpg',
    description: '스마트팩토리 구축으로 품질 오류 0% 달성',
    savings: '2.4억원',
    features: ['스마트팩토리 구축', '품질 오류 0%', '공사비 22% 절감', 'MES 시스템 연동'],
    gallery: [
      '/imgs/projects/bakery/project-bakery-1.jpg',
      '/imgs/projects/bakery/project-bakery-2.jpg',
      '/imgs/projects/bakery/project-bakery-3.jpg'
    ],
    timeline: [
      { phase: '기획 및 설계', duration: '2개월', status: 'completed', startDate: '2024-01-01', endDate: '2024-02-28' },
      { phase: 'HACCP 계획 수립', duration: '1개월', status: 'completed', startDate: '2024-02-15', endDate: '2024-03-15' },
      { phase: '건설 및 시공', duration: '3개월', status: 'in_progress', startDate: '2024-03-01', endDate: '2024-05-31' },
      { phase: 'HACCP 인증', duration: '1개월', status: 'pending', startDate: '2024-06-01', endDate: '2024-06-30' }
    ],
    haccpDetails: {
      certificationDate: null,
      certificationNumber: null,
      inspector: '이품질 (HACCP 전문가)',
      requirements: [
        { name: 'HACCP 계획서 작성', status: 'completed' },
        { name: '위해요소 분석', status: 'completed' },
        { name: '중요관리점 설정', status: 'in_progress' },
        { name: '모니터링 절차 수립', status: 'pending' },
        { name: '시정조치 절차 수립', status: 'pending' },
        { name: '검증 절차 수립', status: 'pending' },
        { name: '기록유지 절차 수립', status: 'pending' }
      ]
    },
    costBreakdown: {
      construction: 6.8,
      equipment: 3.5,
      haccp: 1.2,
      permits: 0.5
    },
    performanceMetrics: {
      costSavings: 22,
      timeReduction: 25,
      qualityImprovement: 45,
      energyEfficiency: 30
    }
  }
};

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const [project, setProject] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (projectId) {
      const projectData = mockProjectDetails[projectId as '1' | '2'];
      setProject(projectData || null);
    }
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">프로젝트를 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-6">요청하신 프로젝트가 존재하지 않습니다.</p>
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            프로젝트 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <ClockIcon className="w-5 h-5 text-blue-600" />;
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-gray-400" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/projects"
                className="flex items-center text-gray-600 hover:text-gray-900 mr-6"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                프로젝트 목록
              </Link>
              <div className="h-6 w-px bg-gray-300 mr-6"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                <p className="text-gray-600">{project.type} • {project.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-lg transition-colors ${
                  isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <HeartIcon className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <ShareIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 프로젝트 이미지 갤러리 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                <img
                  src={project.gallery[selectedImage] || project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/imgs/placeholder-factory.jpg';
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    getStatusColor(project.status)
                  }`}>
                    {getStatusIcon(project.status)}
                    <span className="ml-1">
                      {project.status === 'completed' ? '완료' : 
                       project.status === 'in_progress' ? '진행중' : '계획중'}
                    </span>
                  </span>
                </div>
              </div>
              
              {project.gallery.length > 1 && (
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {project.gallery.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? 'border-indigo-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${project.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/imgs/placeholder-factory.jpg';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 프로젝트 개요 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">프로젝트 개요</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{project.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <MapPinIcon className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">위치</div>
                  <div className="font-semibold text-gray-900">{project.location}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <BuildingOfficeIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">면적</div>
                  <div className="font-semibold text-gray-900">{project.area}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <CurrencyDollarIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">예산</div>
                  <div className="font-semibold text-gray-900">{project.budget}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <CalendarIcon className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">기간</div>
                  <div className="font-semibold text-gray-900">
                    {new Date(project.startDate).toLocaleDateString('ko-KR')} - {new Date(project.endDate).toLocaleDateString('ko-KR')}
                  </div>
                </div>
              </div>
            </div>

            {/* 프로젝트 타임라인 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">프로젝트 타임라인</h2>
              <div className="space-y-4">
                {project.timeline.map((phase: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      phase.status === 'completed' ? 'bg-green-100' :
                      phase.status === 'in_progress' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {getStatusIcon(phase.status)}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                        <span className="text-sm text-gray-500">{phase.duration}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(phase.startDate).toLocaleDateString('ko-KR')} - {new Date(phase.endDate).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HACCP 인증 상세 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ShieldCheckIcon className="w-6 h-6 text-green-600 mr-3" />
                HACCP 인증 상세
              </h2>
              
              {project.haccpDetails.certificationDate ? (
                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">인증 완료</h3>
                  <p className="text-green-700">
                    인증번호: {project.haccpDetails.certificationNumber}<br />
                    인증일: {new Date(project.haccpDetails.certificationDate).toLocaleDateString('ko-KR')}<br />
                    검사관: {project.haccpDetails.inspector}
                  </p>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">인증 진행중</h3>
                  <p className="text-yellow-700">검사관: {project.haccpDetails.inspector}</p>
                </div>
              )}

              <div className="space-y-3">
                {project.haccpDetails.requirements.map((req: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-900">{req.name}</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      req.status === 'completed' ? 'bg-green-100 text-green-800' :
                      req.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {req.status === 'completed' ? '완료' :
                       req.status === 'in_progress' ? '진행중' : '대기중'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 비용 절감 요약 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">비용 절감 요약</h3>
              <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <CurrencyDollarIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-green-600 mb-2">{project.savings}</div>
                <div className="text-gray-600">총 절감액</div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">공사비 절감</span>
                  <span className="font-semibold">{project.performanceMetrics.costSavings}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">기간 단축</span>
                  <span className="font-semibold">{project.performanceMetrics.timeReduction}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">품질 개선</span>
                  <span className="font-semibold">{project.performanceMetrics.qualityImprovement}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">에너지 효율</span>
                  <span className="font-semibold">{project.performanceMetrics.energyEfficiency}%</span>
                </div>
              </div>
            </div>

            {/* 비용 구성 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">비용 구성</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">건설비</span>
                  <span className="font-semibold">{project.costBreakdown.construction}억원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">설비비</span>
                  <span className="font-semibold">{project.costBreakdown.equipment}억원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">HACCP 인증비</span>
                  <span className="font-semibold">{project.costBreakdown.haccp}억원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">인허가비</span>
                  <span className="font-semibold">{project.costBreakdown.permits}억원</span>
                </div>
              </div>
            </div>

            {/* 주요 특징 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">주요 특징</h3>
              <div className="space-y-2">
                {project.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA 버튼 */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                비슷한 프로젝트 견적 받기
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                이 프로젝트와 유사한 규모의 견적을 받아보세요
              </p>
              <div className="space-y-3">
                <Link
                  href="/estimate"
                  className="w-full inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  맞춤형 견적 받기
                </Link>
                <Link
                  href="/consulting"
                  className="w-full inline-block px-6 py-3 border border-indigo-300 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  HACCP 상담 신청
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
