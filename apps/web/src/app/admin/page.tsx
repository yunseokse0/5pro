'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent } from '@5pro/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FolderKanban, Users, FileSignature, TrendingUp } from 'lucide-react';
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
    </div>
  );
}

