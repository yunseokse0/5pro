'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@5pro/ui';
import { Button } from '@5pro/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@5pro/ui';
import { Input } from '@5pro/ui';
import { Label } from '@5pro/ui';
import { FileText, Download, Calendar, BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      // 실제 API 호출 대신 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('보고서가 성공적으로 생성되었습니다!');
    } catch (error) {
      console.error('보고서 생성 오류:', error);
      alert('보고서 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadReport = () => {
    // 실제 다운로드 로직
    alert('보고서 다운로드가 시작됩니다.');
  };

  // 샘플 데이터
  const monthlyData = [
    { name: '1월', projects: 4, revenue: 120000000 },
    { name: '2월', projects: 6, revenue: 180000000 },
    { name: '3월', projects: 8, revenue: 240000000 },
    { name: '4월', projects: 5, revenue: 150000000 },
    { name: '5월', projects: 9, revenue: 270000000 },
    { name: '6월', projects: 12, revenue: 360000000 },
  ];

  const projectStatusData = [
    { name: '진행중', value: 8, color: '#3b82f6' },
    { name: '완료', value: 15, color: '#10b981' },
    { name: '대기', value: 3, color: '#f59e0b' },
    { name: '중단', value: 1, color: '#ef4444' },
  ];

  const industryData = [
    { name: '김치공장', count: 8, percentage: 32 },
    { name: '제빵공장', count: 5, percentage: 20 },
    { name: '육가공공장', count: 4, percentage: 16 },
    { name: '음료공장', count: 3, percentage: 12 },
    { name: '유제품공장', count: 2, percentage: 8 },
    { name: '기타', count: 3, percentage: 12 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">보고서 생성</h1>
        <p className="text-gray-600">월간/분기 보고서를 생성하고 다운로드하세요</p>
      </div>

      {/* 보고서 설정 */}
      <Card>
        <CardHeader>
          <CardTitle>보고서 설정</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="reportType">보고서 유형</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="보고서 유형을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">월간 보고서</SelectItem>
                  <SelectItem value="quarterly">분기 보고서</SelectItem>
                  <SelectItem value="yearly">연간 보고서</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="selectedMonth">기간 선택</Label>
              <Input
                id="selectedMonth"
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              />
            </div>

            <div className="flex items-end space-x-2">
              <Button onClick={handleGenerateReport} disabled={isGenerating} className="flex-1">
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    생성 중...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    보고서 생성
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleDownloadReport}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 요약 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">총 프로젝트</p>
                <p className="text-2xl font-bold">27</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">완료된 프로젝트</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">총 매출</p>
                <p className="text-2xl font-bold">₩1.32B</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">활성 고객</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 월별 프로젝트 현황 */}
        <Card>
          <CardHeader>
            <CardTitle>월별 프로젝트 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `₩${value.toLocaleString()}` : value,
                  name === 'revenue' ? '매출' : '프로젝트 수'
                ]} />
                <Bar dataKey="projects" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 프로젝트 상태 분포 */}
        <Card>
          <CardHeader>
            <CardTitle>프로젝트 상태 분포</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {projectStatusData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 업종별 분석 */}
      <Card>
        <CardHeader>
          <CardTitle>업종별 프로젝트 분석</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {industryData.map((industry, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>
                  <span className="font-medium">{industry.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${industry.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {industry.count}개 ({industry.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 최근 활동 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: '새 프로젝트 생성', project: '서울 김치공장 신축', time: '2시간 전', user: '김관리자' },
              { action: 'HACCP 승인 완료', project: '부산 제빵공장', time: '4시간 전', user: '이관리자' },
              { action: '프로젝트 완료', project: '대구 육가공공장', time: '1일 전', user: '박관리자' },
              { action: '계약 체결', project: '인천 음료공장', time: '2일 전', user: '최관리자' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span className="font-medium">{activity.action}</span>
                  <span className="text-gray-600">- {activity.project}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {activity.user} • {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
