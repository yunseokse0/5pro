'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent, Button, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@5pro/ui';
import { Plus, Eye, Award } from 'lucide-react';
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
const apiClient = isDemoMode 
  ? require('@/lib/mock-api').apiClient 
  : require('@/lib/api').apiClient;

const gradeColors: Record<string, string> = {
  DIAMOND: 'bg-purple-100 text-purple-800',
  PLATINUM: 'bg-gray-100 text-gray-800',
  GOLD: 'bg-yellow-100 text-yellow-800',
  SILVER: 'bg-slate-100 text-slate-800',
  BRONZE: 'bg-orange-100 text-orange-800',
};

export default function PartnersPage() {
  const { data: session } = useSession();
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.accessToken) {
      apiClient.setToken(session.accessToken);
      loadPartners();
    }
  }, [session]);

  const loadPartners = async () => {
    try {
      const response = await apiClient.get<any>('/partners');
      setPartners(response.data || []);
    } catch (error) {
      console.error('Failed to load partners:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">파트너</h1>
          <p className="text-gray-600">협력 파트너사를 관리하세요</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          새 파트너
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>파트너 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {partners.length === 0 ? (
            <div className="text-center py-8 text-gray-500">파트너가 없습니다</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>회사명</TableHead>
                  <TableHead>등급</TableHead>
                  <TableHead>담당자</TableHead>
                  <TableHead>프로젝트 수</TableHead>
                  <TableHead>총 매출</TableHead>
                  <TableHead>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell className="font-medium">{partner.companyName}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${gradeColors[partner.grade]}`}>
                        {partner.grade}
                      </span>
                    </TableCell>
                    <TableCell>{partner.contactName || '-'}</TableCell>
                    <TableCell>{partner.projectCount}</TableCell>
                    <TableCell>
                      {partner.totalRevenue?.toLocaleString()}원
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Award className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

