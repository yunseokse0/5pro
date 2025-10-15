'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent, Tabs, TabsList, TabsTrigger, TabsContent, Button, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@5pro/ui';
import { Plus } from 'lucide-react';
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
const apiClient = isDemoMode 
  ? require('@/lib/mock-api').apiClient 
  : require('@/lib/api').apiClient;

export default function SettingsPage() {
  const { data: session } = useSession();
  const [regions, setRegions] = useState<any[]>([]);
  const [presets, setPresets] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.accessToken) {
      apiClient.setToken(session.accessToken);
      loadData();
    }
  }, [session]);

  const loadData = async () => {
    try {
      const [regionsData, presetsData, logsData] = await Promise.all([
        apiClient.get<any[]>('/regions'),
        apiClient.get<any[]>('/presets'),
        apiClient.get<any>('/audit-logs?limit=20'),
      ]);

      setRegions(regionsData);
      setPresets(presetsData);
      setAuditLogs(logsData.data || []);
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">설정</h1>
        <p className="text-gray-600">시스템 설정을 관리하세요</p>
      </div>

      <Tabs defaultValue="regions">
        <TabsList>
          <TabsTrigger value="regions">지역</TabsTrigger>
          <TabsTrigger value="presets">업종 프리셋</TabsTrigger>
          <TabsTrigger value="audit">감사 로그</TabsTrigger>
        </TabsList>

        <TabsContent value="regions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>지역 관리</CardTitle>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                추가
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>지역명</TableHead>
                    <TableHead>코드</TableHead>
                    <TableHead>비용 지수</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regions.map((region) => (
                    <TableRow key={region.id}>
                      <TableCell className="font-medium">{region.name}</TableCell>
                      <TableCell>{region.code}</TableCell>
                      <TableCell>{region.costIndex}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="presets">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>업종 프리셋</CardTitle>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                추가
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>프리셋명</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {presets.map((preset) => (
                    <TableRow key={preset.id}>
                      <TableCell className="font-medium">{preset.name}</TableCell>
                      <TableCell>{preset.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>감사 로그</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>시간</TableHead>
                    <TableHead>사용자</TableHead>
                    <TableHead>작업</TableHead>
                    <TableHead>리소스</TableHead>
                    <TableHead>IP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        {new Date(log.createdAt).toLocaleString('ko-KR')}
                      </TableCell>
                      <TableCell>{log.user?.name || '-'}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs">
                          {log.action}
                        </span>
                      </TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell className="text-gray-500 text-sm">
                        {log.ipAddress || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

