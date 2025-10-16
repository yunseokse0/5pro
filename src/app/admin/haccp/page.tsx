'use client';

import { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Users,
  Building2,
  Award
} from 'lucide-react';

// Mock 데이터
const mockHaccpProjects = [
  {
    id: 'HACCP-2024-001',
    client: '김치마을식품(주)',
    project: '김치공장 HACCP 인증',
    type: '신규 인증',
    status: 'in_progress',
    progress: 75,
    consultant: '김하캡',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    documents: 12,
    completedDocs: 9
  },
  {
    id: 'HACCP-2024-002',
    client: '빵집나라',
    project: '제빵공장 HACCP 갱신',
    type: '갱신 인증',
    status: 'completed',
    progress: 100,
    consultant: '이품질',
    startDate: '2024-01-01',
    endDate: '2024-02-28',
    documents: 15,
    completedDocs: 15
  },
  {
    id: 'HACCP-2024-003',
    client: '냉동식품코리아',
    project: '냉동식품 HACCP 인증',
    type: '신규 인증',
    status: 'pending',
    progress: 25,
    consultant: '박안전',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    documents: 18,
    completedDocs: 4
  },
  {
    id: 'HACCP-2024-004',
    client: '유제품프로',
    project: '유제품 HACCP 인증',
    type: '신규 인증',
    status: 'draft',
    progress: 10,
    consultant: '최위생',
    startDate: '2024-02-15',
    endDate: '2024-05-15',
    documents: 20,
    completedDocs: 2
  }
];

const statusConfig = {
  completed: { label: '완료', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  in_progress: { label: '진행중', color: 'bg-blue-100 text-blue-800', icon: Clock },
  pending: { label: '대기', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  draft: { label: '초안', color: 'bg-gray-100 text-gray-800', icon: Edit }
};

export default function AdminHaccpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const filteredProjects = mockHaccpProjects.filter(project => {
    const matchesSearch = project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedProjects.length === filteredProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(filteredProjects.map(p => p.id));
    }
  };

  const handleSelectProject = (id: string) => {
    setSelectedProjects(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const getStatusIcon = (status: keyof typeof statusConfig) => {
    const Icon = statusConfig[status].icon;
    return <Icon className="w-4 h-4" strokeWidth={2} />;
  };

  const getStatusConfig = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">HACCP 관리</h1>
          <p className="text-gray-600 mt-1">HACCP 인증 프로젝트를 관리하고 추적하세요</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" strokeWidth={2} />
          새 프로젝트
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-blue-600" strokeWidth={2} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">총 프로젝트</p>
              <p className="text-2xl font-bold text-gray-900">{mockHaccpProjects.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" strokeWidth={2} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">완료된 프로젝트</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockHaccpProjects.filter(p => p.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" strokeWidth={2} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">진행중</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockHaccpProjects.filter(p => p.status === 'in_progress').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" strokeWidth={2} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">평균 진행률</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(mockHaccpProjects.reduce((sum, p) => sum + p.progress, 0) / mockHaccpProjects.length)}%
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" strokeWidth={2} />
              <input
                type="text"
                placeholder="고객명, 프로젝트명, 프로젝트번호로 검색..."
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
              <Filter className="w-4 h-4 mr-2" strokeWidth={2} />
              필터
            </button>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedProjects.length === filteredProjects.length && filteredProjects.length > 0}
                onChange={handleSelectAll}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                {selectedProjects.length > 0 ? `${selectedProjects.length}개 선택됨` : '전체 선택'}
              </span>
            </div>
            {selectedProjects.length > 0 && (
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
                  프로젝트 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객/프로젝트
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  컨설턴트
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  진행률
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  문서 현황
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedProjects.includes(project.id)}
                        onChange={() => handleSelectProject(project.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{project.id}</div>
                        <div className="text-sm text-gray-500">{project.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{project.client}</div>
                      <div className="text-sm text-gray-500">{project.project}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-2" strokeWidth={2} />
                      <div className="text-sm text-gray-900">{project.consultant}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-gray-400 mr-2" strokeWidth={2} />
                      <div>
                        <div className="text-sm text-gray-900">{project.completedDocs}/{project.documents}</div>
                        <div className="text-xs text-gray-500">문서 완료</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusConfig(project.status).color}`}>
                      {getStatusIcon(project.status as keyof typeof statusConfig)}
                      <span className="ml-1">{getStatusConfig(project.status).label}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1">
                        <Eye className="w-4 h-4" strokeWidth={2} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1">
                        <Edit className="w-4 h-4" strokeWidth={2} />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1">
                        <Trash2 className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <ShieldCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">HACCP 프로젝트가 없습니다</h3>
            <p className="text-gray-500">새로운 HACCP 프로젝트를 생성하거나 검색 조건을 변경해보세요.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          총 <span className="font-medium">{filteredProjects.length}</span>개의 HACCP 프로젝트가 있습니다.
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
