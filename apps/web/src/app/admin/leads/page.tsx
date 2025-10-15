'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent, Button, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@5pro/ui';
import { Plus, Eye } from 'lucide-react';
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
const apiClient = isDemoMode 
  ? require('@/lib/mock-api').apiClient 
  : require('@/lib/api').apiClient;

export default function LeadsPage() {
  const { data: session } = useSession();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.accessToken) {
      apiClient.setToken(session.accessToken);
      loadLeads();
    }
  }, [session]);

  const loadLeads = async () => {
    try {
      const response = await apiClient.get<any>('/leads');
      setLeads(response.data || []);
    } catch (error) {
      console.error('Failed to load leads:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">리드</h1>
          <p className="text-gray-600">잠재 고객을 관리하세요</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          새 리드
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>리드 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <div className="text-center py-8 text-gray-500">리드가 없습니다</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>회사명</TableHead>
                  <TableHead>담당자</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>출처</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>예상 예산</TableHead>
                  <TableHead>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.companyName}</TableCell>
                    <TableCell>{lead.contactName}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{lead.email}</div>
                        <div className="text-gray-500">{lead.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{lead.source || '-'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        lead.status === 'qualified' 
                          ? 'bg-green-100 text-green-800'
                          : lead.status === 'contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {lead.estimatedBudget?.toLocaleString()}원
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
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

