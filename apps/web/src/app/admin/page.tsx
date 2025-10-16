'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent } from '@5pro/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FolderKanban, Users, FileSignature, TrendingUp, Plus, ShieldCheck, BarChart3, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { mockStats } from '@/lib/mock-data';

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
const apiClient = isDemoMode 
  ? require('@/lib/mock-api').apiClient 
  : require('@/lib/api').apiClient;

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalPartners: 0,
    totalContracts: 0,
  });

  useEffect(() => {
    if (session?.accessToken) {
      apiClient.setToken(session.accessToken);
      loadStats();
    }
  }, [session]);

  const loadStats = async () => {
    try {
      if (isDemoMode) {
        setStats(mockStats);
        return;
      }

      const [projects, partners, contracts] = await Promise.all([
        apiClient.get<any>('/projects?limit=1'),
        apiClient.get<any>('/partners?limit=1'),
        apiClient.get<any>('/contracts?limit=1'),
      ]);

      setStats({
        totalProjects: projects.pagination?.total || 0,
        activeProjects: Math.floor((projects.pagination?.total || 0) * 0.6),
        totalPartners: partners.pagination?.total || 0,
        totalContracts: contracts.pagination?.total || 0,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const chartData = [
    { name: '1월', value: 4 },
    { name: '2월', value: 6 },
    { name: '3월', value: 8 },
    { name: '4월', value: 5 },
    { name: '5월', value: 9 },
    { name: '6월', value: 12 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">대시보드</h1>
        <p className="text-gray-600">시스템 현황을 한눈에 확인하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              전체 프로젝트
            </CardTitle>
            <FolderKanban className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-gray-500">
              진행 중: {stats.activeProjects}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              파트너사
            </CardTitle>
            <Users className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPartners}</div>
            <p className="text-xs text-gray-500">등록된 파트너</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              계약
            </CardTitle>
            <FileSignature className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContracts}</div>
            <p className="text-xs text-gray-500">전체 계약</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              월간 성장률
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-gray-500">전월 대비</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>월별 프로젝트 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 빠른 작업 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/projects/new" className="group">
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    새 프로젝트 생성
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    새로운 식품공장 프로젝트를 시작하세요
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/haccp" className="group">
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-green-500">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                    HACCP 승인
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    대기중인 HACCP 인증을 검토하세요
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/analytics" className="group">
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    상세 분석
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    프로젝트 상세 통계를 확인하세요
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/reports" className="group">
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                    보고서 생성
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    월간/분기 보고서를 생성하세요
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

