'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@5pro/ui';
import { Button } from '@5pro/ui';
import { Badge } from '@5pro/ui';
import { Input } from '@5pro/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@5pro/ui';
import { ShieldCheck, Clock, CheckCircle, XCircle, Eye, Edit, FileText, Calendar } from 'lucide-react';

interface HACCPProject {
  id: string;
  name: string;
  company: string;
  industry: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  submittedDate: string;
  reviewDate?: string;
  inspector: string;
  priority: 'high' | 'medium' | 'low';
  documents: number;
  progress: number;
}

export default function HACCPPage() {
  const [projects, setProjects] = useState<HACCPProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<HACCPProject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    // 샘플 데이터 로드
    const sampleProjects: HACCPProject[] = [
      {
        id: '1',
        name: '서울 김치공장 HACCP 인증',
        company: '(주)한국김치',
        industry: '김치공장',
        status: 'pending',
        submittedDate: '2024-01-15',
        inspector: '김인증',
        priority: 'high',
        documents: 15,
        progress: 75,
      },
      {
        id: '2',
        name: '부산 제빵공장 HACCP 인증',
        company: '(주)부산베이커리',
        industry: '제빵공장',
        status: 'in_progress',
        submittedDate: '2024-01-10',
        reviewDate: '2024-01-20',
        inspector: '이인증',
        priority: 'medium',
        documents: 12,
        progress: 90,
      },
      {
        id: '3',
        name: '대구 육가공공장 HACCP 인증',
        company: '(주)대구육류',
        industry: '육가공공장',
        status: 'completed',
        submittedDate: '2023-12-01',
        reviewDate: '2024-01-05',
        inspector: '박인증',
        priority: 'low',
        documents: 18,
        progress: 100,
      },
      {
        id: '4',
        name: '인천 음료공장 HACCP 인증',
        company: '(주)인천음료',
        industry: '음료공장',
        status: 'rejected',
        submittedDate: '2023-11-20',
        reviewDate: '2023-12-15',
        inspector: '최인증',
        priority: 'high',
        documents: 10,
        progress: 60,
      },
    ];

    setProjects(sampleProjects);
    setFilteredProjects(sampleProjects);
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(project => project.priority === priorityFilter);
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, statusFilter, priorityFilter]);

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: { label: '대기중', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      in_progress: { label: '진행중', color: 'bg-blue-100 text-blue-800', icon: Clock },
      completed: { label: '완료', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rejected: { label: '반려', color: 'bg-red-100 text-red-800', icon: XCircle },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const getPriorityConfig = (priority: string) => {
    const configs = {
      high: { label: '높음', color: 'bg-red-100 text-red-800' },
      medium: { label: '보통', color: 'bg-yellow-100 text-yellow-800' },
      low: { label: '낮음', color: 'bg-green-100 text-green-800' },
    };
    return configs[priority as keyof typeof configs] || configs.medium;
  };

  const handleStatusChange = (projectId: string, newStatus: string) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, status: newStatus as any, reviewDate: new Date().toISOString().split('T')[0] }
        : project
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">HACCP 관리</h1>
        <p className="text-gray-600">HACCP 인증 프로젝트를 관리하고 승인하세요</p>
      </div>

      {/* 필터 및 검색 */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="프로젝트명 또는 회사명 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="상태별 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="pending">대기중</SelectItem>
                  <SelectItem value="in_progress">진행중</SelectItem>
                  <SelectItem value="completed">완료</SelectItem>
                  <SelectItem value="rejected">반려</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="우선순위별 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="high">높음</SelectItem>
                  <SelectItem value="medium">보통</SelectItem>
                  <SelectItem value="low">낮음</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                보고서
              </Button>
              <Button size="sm">
                <ShieldCheck className="w-4 h-4 mr-2" />
                일괄 승인
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">대기중</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">진행중</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === 'in_progress').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">완료</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === 'completed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">반려</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === 'rejected').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 프로젝트 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>HACCP 프로젝트 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProjects.map((project) => {
              const statusConfig = getStatusConfig(project.status);
              const priorityConfig = getPriorityConfig(project.priority);
              const StatusIcon = statusConfig.icon;

              return (
                <div key={project.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <Badge className={statusConfig.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                        <Badge className={priorityConfig.color}>
                          {priorityConfig.label}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">회사:</span> {project.company}
                        </div>
                        <div>
                          <span className="font-medium">업종:</span> {project.industry}
                        </div>
                        <div>
                          <span className="font-medium">담당자:</span> {project.inspector}
                        </div>
                        <div>
                          <span className="font-medium">문서:</span> {project.documents}개
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>진행률</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-6">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        보기
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        편집
                      </Button>
                      {project.status === 'pending' && (
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleStatusChange(project.id, 'in_progress')}
                          >
                            승인
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleStatusChange(project.id, 'rejected')}
                          >
                            반려
                          </Button>
                        </div>
                      )}
                      {project.status === 'in_progress' && (
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleStatusChange(project.id, 'completed')}
                        >
                          완료
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>제출일: {project.submittedDate}</span>
                      </div>
                      {project.reviewDate && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>검토일: {project.reviewDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
