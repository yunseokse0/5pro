'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent, Button, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@5pro/ui';
import { Plus, Eye, Edit } from 'lucide-react';
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
const apiClient = isDemoMode 
  ? require('@/lib/mock-api').apiClient 
  : require('@/lib/api').apiClient;

export default function CatalogPage() {
  const { data: session } = useSession();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.accessToken) {
      apiClient.setToken(session.accessToken);
      loadItems();
    }
  }, [session]);

  const loadItems = async () => {
    try {
      const response = await apiClient.get<any>('/catalog');
      setItems(response.data || []);
    } catch (error) {
      console.error('Failed to load catalog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">카탈로그</h1>
          <p className="text-gray-600">제품 및 자재 카탈로그를 관리하세요</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          새 품목
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>카탈로그 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">품목이 없습니다</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>품명</TableHead>
                  <TableHead>카테고리</TableHead>
                  <TableHead>단가</TableHead>
                  <TableHead>단위</TableHead>
                  <TableHead>공급사</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      {item.unitPrice?.toLocaleString()}원
                    </TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.supplier || '-'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.isActive 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.isActive ? '활성' : '비활성'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
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

