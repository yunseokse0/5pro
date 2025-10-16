'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@5pro/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@5pro/ui';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, TrendingDown, DollarSign, Users, Building, 
  Calendar, Target, Award, Activity, BarChart3 
} from 'lucide-react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // 샘플 데이터
  const monthlyData = [
    { month: '1월', revenue: 120000000, projects: 4, customers: 3, haccp: 2 },
    { month: '2월', revenue: 180000000, projects: 6, customers: 5, haccp: 4 },
    { month: '3월', revenue: 240000000, projects: 8, customers: 7, haccp: 6 },
    { month: '4월', revenue: 150000000, projects: 5, customers: 4, haccp: 3 },
    { month: '5월', revenue: 270000000, projects: 9, customers: 8, haccp: 7 },
    { month: '6월', revenue: 360000000, projects: 12, customers: 10, haccp: 9 },
  ];

  const industryData = [
    { name: '김치공장', value: 8, color: '#3b82f6' },
    { name: '제빵공장', value: 5, color: '#10b981' },
    { name: '육가공공장', value: 4, color: '#f59e0b' },
    { name: '음료공장', value: 3, color: '#ef4444' },
    { name: '유제품공장', value: 2, color: '#8b5cf6' },
    { name: '기타', value: 3, color: '#06b6d4' },
  ];

  const projectStatusData = [
    { name: '진행중', value: 8, color: '#3b82f6' },
    { name: '완료', value: 15, color: '#10b981' },
    { name: '대기', value: 3, color: '#f59e0b' },
    { name: '중단', value: 1, color: '#ef4444' },
  ];

  const performanceData = [
    { name: 'Q1', target: 1000000000, actual: 1200000000, efficiency: 120 },
    { name: 'Q2', target: 1200000000, actual: 1500000000, efficiency: 125 },
    { name: 'Q3', target: 1500000000, actual: 1800000000, efficiency: 120 },
    { name: 'Q4', target: 1800000000, actual: 2000000000, efficiency: 111 },
  ];

  const kpiData = [
    { title: '총 매출', value: '₩1.32B', change: '+25.3%', trend: 'up', icon: DollarSign, color: 'text-green-600' },
    { title: '완료 프로젝트', value: '15개', change: '+12.5%', trend: 'up', icon: Building, color: 'text-blue-600' },
    { title: '신규 고객', value: '23명', change: '+8.7%', trend: 'up', icon: Users, color: 'text-purple-600' },
    { title: 'HACCP 승인률', value: '94.2%', change: '+2.1%', trend: 'up', icon: Award, color: 'text-orange-600' },
    { title: '평균 프로젝트 기간', value: '45일', change: '-5.2%', trend: 'down', icon: Calendar, color: 'text-green-600' },
    { title: '고객 만족도', value: '4.8/5', change: '+0.3', trend: 'up', icon: Target, color: 'text-indigo-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">통계 분석</h1>
          <p className="text-gray-600">프로젝트 상세 통계를 확인하세요</p>
        </div>
        <div className="flex space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="기간 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">최근 3개월</SelectItem>
              <SelectItem value="6months">최근 6개월</SelectItem>
              <SelectItem value="1year">최근 1년</SelectItem>
              <SelectItem value="all">전체</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="지표 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">매출</SelectItem>
              <SelectItem value="projects">프로젝트</SelectItem>
              <SelectItem value="customers">고객</SelectItem>
              <SelectItem value="haccp">HACCP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          const trendColor = kpi.trend === 'up' ? 'text-green-600' : 'text-red-600';
          
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendIcon className={`w-4 h-4 ${trendColor}`} />
                      <span className={`text-sm ${trendColor}`}>{kpi.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${kpi.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 월별 트렌드 */}
        <Card>
          <CardHeader>
            <CardTitle>월별 트렌드</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `₩${value.toLocaleString()}` : value,
                  name === 'revenue' ? '매출' : 
                  name === 'projects' ? '프로젝트' :
                  name === 'customers' ? '고객' : 'HACCP'
                ]} />
                <Area 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 업종별 분포 */}
        <Card>
          <CardHeader>
            <CardTitle>업종별 프로젝트 분포</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {industryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {industryData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}: {item.value}개</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 성과 분석 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 목표 대비 성과 */}
        <Card>
          <CardHeader>
            <CardTitle>목표 대비 성과</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  `₩${value.toLocaleString()}`,
                  name === 'target' ? '목표' : '실제'
                ]} />
                <Bar dataKey="target" fill="#e5e7eb" />
                <Bar dataKey="actual" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 프로젝트 상태 */}
        <Card>
          <CardHeader>
            <CardTitle>프로젝트 상태 분포</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectStatusData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 상세 분석 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>상세 분석</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">지표</th>
                  <th className="text-right py-3 px-4">현재값</th>
                  <th className="text-right py-3 px-4">목표값</th>
                  <th className="text-right py-3 px-4">달성률</th>
                  <th className="text-right py-3 px-4">전년 대비</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: '총 매출', current: '₩1.32B', target: '₩1.2B', achievement: '110%', yoy: '+25.3%' },
                  { metric: '완료 프로젝트', current: '15개', target: '12개', achievement: '125%', yoy: '+12.5%' },
                  { metric: '신규 고객', current: '23명', target: '20명', achievement: '115%', yoy: '+8.7%' },
                  { metric: 'HACCP 승인', current: '9건', target: '8건', achievement: '112.5%', yoy: '+15.2%' },
                  { metric: '평균 프로젝트 기간', current: '45일', target: '50일', achievement: '110%', yoy: '-5.2%' },
                ].map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{row.metric}</td>
                    <td className="py-3 px-4 text-right">{row.current}</td>
                    <td className="py-3 px-4 text-right text-gray-600">{row.target}</td>
                    <td className="py-3 px-4 text-right text-green-600 font-semibold">{row.achievement}</td>
                    <td className="py-3 px-4 text-right text-blue-600">{row.yoy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
