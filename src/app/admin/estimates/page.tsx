'use client';

import { useState } from 'react';
import { 
  CalculatorIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  DocumentTextIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

// Mock 데이터
const mockEstimates = [
  {
    id: 'EST-2024-001',
    client: '김치마을식품(주)',
    project: '김치공장 신축',
    region: '경기도',
    area: '300평',
    factoryType: '김치공장',
    totalCost: 1560000000,
    status: 'completed',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    version: 3
  },
  {
    id: 'EST-2024-002',
    client: '빵집나라',
    project: '제빵공장 리뉴얼',
    region: '서울특별시',
    area: '150평',
    factoryType: '제빵공장',
    totalCost: 890000000,
    status: 'pending',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
    version: 1
  },
  {
    id: 'EST-2024-003',
    client: '냉동식품코리아',
    project: '냉동식품 공장 신축',
    region: '인천광역시',
    area: '500평',
    factoryType: '냉동식품',
    totalCost: 2340000000,
    status: 'in_progress',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-22',
    version: 2
  },
  {
    id: 'EST-2024-004',
    client: '유제품프로',
    project: '유제품 공장 설계',
    region: '부산광역시',
    area: '200평',
    factoryType: '유제품',
    totalCost: 1200000000,
    status: 'draft',
    createdAt: '2024-01-22',
    updatedAt: '2024-01-22',
    version: 1
  }
];

const statusConfig = {
  completed: { label: '완료', color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
  pending: { label: '대기', color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon },
  in_progress: { label: '진행중', color: 'bg-blue-100 text-blue-800', icon: ClockIcon },
  draft: { label: '초안', color: 'bg-gray-100 text-gray-800', icon: PencilIcon }
};

export default function AdminEstimatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEstimates, setSelectedEstimates] = useState<string[]>([]);

  const filteredEstimates = mockEstimates.filter(estimate => {
    const matchesSearch = estimate.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         estimate.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         estimate.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || estimate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedEstimates.length === filteredEstimates.length) {
      setSelectedEstimates([]);
    } else {
      setSelectedEstimates(filteredEstimates.map(e => e.id));
    }
  };

  const handleSelectEstimate = (id: string) => {
    setSelectedEstimates(prev => 
      prev.includes(id) 
        ? prev.filter(e => e !== id)
        : [...prev, id]
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusIcon = (status: keyof typeof statusConfig) => {
    const Icon = statusConfig[status].icon;
    return <Icon className="w-4 h-4" strokeWidth={2} />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">견적 관리</h1>
          <p className="text-gray-600 mt-1">프로젝트 견적서를 관리하고 추적하세요</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
          <PlusIcon className="w-4 h-4 mr-2" />
          새 견적 생성
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <CalculatorIcon className="w-6 h-6 text-indigo-600" />
              </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">총 견적</p>
              <p className="text-2xl font-bold text-gray-900">{mockEstimates.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">완료된 견적</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockEstimates.filter(e => e.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">진행중</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockEstimates.filter(e => e.status === 'in_progress').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CurrencyDollarIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">총 견적 금액</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(mockEstimates.reduce((sum, e) => sum + e.totalCost, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="고객명, 프로젝트명, 견적번호로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">모든 상태</option>
              <option value="draft">초안</option>
              <option value="pending">대기</option>
              <option value="in_progress">진행중</option>
              <option value="completed">완료</option>
            </select>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
              <FunnelIcon className="w-4 h-4 mr-2" />
              필터
            </button>
          </div>
        </div>
      </div>

      {/* Estimates Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedEstimates.length === filteredEstimates.length && filteredEstimates.length > 0}
                onChange={handleSelectAll}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                {selectedEstimates.length > 0 ? `${selectedEstimates.length}개 선택됨` : '전체 선택'}
              </span>
            </div>
            {selectedEstimates.length > 0 && (
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors">
                  일괄 처리
                </button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors">
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  견적 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객/프로젝트
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  공장 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  견적 금액
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  생성일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEstimates.map((estimate) => (
                <tr key={estimate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedEstimates.includes(estimate.id)}
                        onChange={() => handleSelectEstimate(estimate.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{estimate.id}</div>
                        <div className="text-sm text-gray-500">v{estimate.version}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{estimate.client}</div>
                      <div className="text-sm text-gray-500">{estimate.project}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <BuildingOfficeIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-gray-900">{estimate.region}</div>
                        <div className="text-sm text-gray-500">{estimate.area} · {estimate.factoryType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(estimate.totalCost)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[estimate.status].color}`}>
                      {getStatusIcon(estimate.status)}
                      <span className="ml-1">{statusConfig[estimate.status].label}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {estimate.createdAt}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900 p-1">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEstimates.length === 0 && (
          <div className="text-center py-12">
            <CalculatorIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">견적이 없습니다</h3>
            <p className="text-gray-500">새로운 견적을 생성하거나 검색 조건을 변경해보세요.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          총 <span className="font-medium">{filteredEstimates.length}</span>개의 견적이 있습니다.
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            이전
          </button>
          <button className="px-3 py-2 text-sm text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700">
            1
          </button>
          <button className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
