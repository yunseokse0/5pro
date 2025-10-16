'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BuildingOfficeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  EyeIcon,
  ArrowRightIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

// Mock 프로젝트 데이터
const mockProjects = [
  {
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
    features: ['HACCP 인증 완료', 'BIM 기반 설계', '공사비 25% 절감', '운영비 18% 절감']
  },
  {
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
    features: ['스마트팩토리 구축', '품질 오류 0%', '공사비 22% 절감', 'MES 시스템 연동']
  },
  {
    id: 3,
    name: '신선냉동 냉동식품공장',
    type: '냉동식품공장',
    location: '인천광역시 남동구',
    area: '800평',
    budget: '25억원',
    status: 'planning',
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    haccpStatus: 'preparation',
    image: '/imgs/project-frozen.jpg',
    description: '3D 시뮬레이션으로 HACCP 동선 최적화',
    savings: '5.2억원',
    features: ['3D 시뮬레이션', 'HACCP 동선 최적화', '공사비 28% 절감', '실시간 품질관리']
  },
  {
    id: 4,
    name: '유제품프로 유제품공장',
    type: '유제품공장',
    location: '경기도 수원시',
    area: '600평',
    budget: '18억원',
    status: 'completed',
    startDate: '2023-06-01',
    endDate: '2023-12-31',
    haccpStatus: 'approved',
    image: '/imgs/project-dairy.jpg',
    description: '냉장시설 최적화로 에너지 효율 30% 향상',
    savings: '4.5억원',
    features: ['냉장시설 최적화', '에너지 효율 30% 향상', '공사비 20% 절감', '자동화 시스템']
  },
  {
    id: 5,
    name: '건강식품코리아 건강기능식품공장',
    type: '건강기능식품공장',
    location: '충청남도 천안시',
    area: '400평',
    budget: '14억원',
    status: 'in_progress',
    startDate: '2024-02-01',
    endDate: '2024-08-31',
    haccpStatus: 'review',
    image: '/imgs/project-health.jpg',
    description: 'GMP 인증과 HACCP 통합 관리 시스템 구축',
    savings: '2.8억원',
    features: ['GMP 인증', 'HACCP 통합 관리', '공사비 18% 절감', '품질관리 자동화']
  }
];

const statusConfig = {
  completed: { label: '완료', color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
  in_progress: { label: '진행중', color: 'bg-blue-100 text-blue-800', icon: ClockIcon },
  planning: { label: '계획중', color: 'bg-yellow-100 text-yellow-800', icon: ExclamationTriangleIcon }
};

const haccpStatusConfig = {
  approved: { label: '인증완료', color: 'bg-green-100 text-green-800' },
  review: { label: '검토중', color: 'bg-yellow-100 text-yellow-800' },
  preparation: { label: '준비중', color: 'bg-gray-100 text-gray-800' }
};

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesType = typeFilter === 'all' || project.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusConfig = (status: keyof typeof statusConfig) => {
    return statusConfig[status] || statusConfig.planning;
  };

  const getHaccpStatusConfig = (status: keyof typeof haccpStatusConfig) => {
    return haccpStatusConfig[status] || haccpStatusConfig.preparation;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
            🏭 완공 사례
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            200+ 완공 사례의 <span className="text-indigo-600">BIM 캡처</span>와<br />
            <span className="text-green-600">HACCP 인증 데이터</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            각 프로젝트의 면적, 기간, 절감액을 상세 데이터로 공개합니다.<br />
            BIM 캡처와 HACCP 인증 과정을 투명하게 공유하여 고객의 신뢰를 확보합니다.
          </p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BuildingOfficeIcon className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">200+</div>
            <div className="text-gray-600">완공 프로젝트</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
            <div className="text-gray-600">HACCP 인증 성공률</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CurrencyDollarIcon className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">25%</div>
            <div className="text-gray-600">평균 비용 절감</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">20년</div>
            <div className="text-gray-600">전문가 경력</div>
          </div>
        </div>

        {/* 필터 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="프로젝트명, 업종, 지역으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">모든 상태</option>
                <option value="completed">완료</option>
                <option value="in_progress">진행중</option>
                <option value="planning">계획중</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">모든 업종</option>
                <option value="김치공장">김치공장</option>
                <option value="제빵공장">제빵공장</option>
                <option value="냉동식품공장">냉동식품공장</option>
                <option value="유제품공장">유제품공장</option>
                <option value="건강기능식품공장">건강기능식품공장</option>
              </select>
            </div>
          </div>
        </div>

        {/* 프로젝트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const StatusIcon = getStatusConfig(project.status as keyof typeof statusConfig).icon;
            return (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/imgs/placeholder-factory.jpg';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      getStatusConfig(project.status as keyof typeof statusConfig).color
                    }`}>
                      <StatusIcon className="w-4 h-4 mr-1" />
                      {getStatusConfig(project.status as keyof typeof statusConfig).label}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{project.name}</h3>
                      <p className="text-indigo-600 font-semibold">{project.type}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      getHaccpStatusConfig(project.haccpStatus as keyof typeof haccpStatusConfig).color
                    }`}>
                      HACCP {getHaccpStatusConfig(project.haccpStatus as keyof typeof haccpStatusConfig).label}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <MapPinIcon className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                      <div className="text-sm text-gray-600">위치</div>
                      <div className="font-semibold text-gray-900">{project.location}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <BuildingOfficeIcon className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <div className="text-sm text-gray-600">면적</div>
                      <div className="font-semibold text-gray-900">{project.area}</div>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg mb-4">
                    <CurrencyDollarIcon className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">절감액</div>
                    <div className="text-2xl font-bold text-green-600">{project.savings}</div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/projects/${project.id}`}
                    className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    상세 프로젝트 데이터 보기
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <BuildingOfficeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-500">다른 검색 조건을 시도해보세요.</p>
          </div>
        )}

        {/* CTA 섹션 */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            비슷한 규모의 프로젝트 견적 받기
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            200+ 프로젝트 데이터를 바탕으로 귀하의 공장 규모에 맞는<br />
            정확한 견적과 투자 회수 시뮬레이터를 제공합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/estimate"
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-lg"
            >
              맞춤형 견적 받기
            </Link>
            <Link
              href="/consulting"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-indigo-600 transition-all"
            >
              HACCP 인증 과정 상세 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
