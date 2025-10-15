'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent, Button, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@5pro/ui';
import { Plus, Eye, Download } from 'lucide-react';
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
const apiClient = isDemoMode 
  ? require('@/lib/mock-api').apiClient 
  : require('@/lib/api').apiClient;

export default function Visual3DPage() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.accessToken) {
      apiClient.setToken(session.accessToken);
      loadRequests();
    }
  }, [session]);

  const loadRequests = async () => {
    try {
      const response = await apiClient.get<any>('/visual3d');
      setRequests(response.data || []);
    } catch (error) {
      console.error('Failed to load 3D requests:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">3D 시각화</h1>
          <p className="text-gray-600">프로젝트 3D 모델을 관리하세요</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          새 요청
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>3D 요청 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">3D 요청이 없습니다</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>프로젝트명</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>결과 파일</TableHead>
                  <TableHead>생성일</TableHead>
                  <TableHead>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.projectName}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        request.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : request.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {request.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {request.results?.length || 0} 파일
                    </TableCell>
                    <TableCell>
                      {new Date(request.createdAt).toLocaleDateString('ko-KR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {request.results?.length > 0 && (
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
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

