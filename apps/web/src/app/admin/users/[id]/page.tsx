'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, Button, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Tabs, TabsList, TabsTrigger, TabsContent } from '@5pro/ui';
import { ArrowLeft, Edit, Trash2, Mail, Phone, Calendar, Shield } from 'lucide-react';
import Link from 'next/link';
import { mockUsers } from '@/lib/mock-data';

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
const apiClient = isDemoMode 
  ? require('@/lib/mock-api').apiClient 
  : require('@/lib/api').apiClient;

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  inactive: 'bg-gray-100 text-gray-800',
};

const roleColors: Record<string, string> = {
  admin: 'bg-red-100 text-red-800',
  manager: 'bg-blue-100 text-blue-800',
  user: 'bg-gray-100 text-gray-800',
};

export default function UserDetailPage() {
  const { data: session } = useSession();
  const params = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.accessToken && params.id) {
      apiClient.setToken(session.accessToken);
      loadUser();
    }
  }, [session, params.id]);

  const loadUser = async () => {
    try {
      if (isDemoMode) {
        const foundUser = mockUsers.find(u => u.id === params.id);
        setUser(foundUser || null);
        return;
      }

      const data = await apiClient.get<any>(`/users/${params.id}`);
      setUser(data);
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (name: string) => {
    return name.charAt(0);
  };

  if (loading) return <div>로딩 중...</div>;
  if (!user) return <div>사용자를 찾을 수 없습니다</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/users">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로가기
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-600">사용자 상세 정보</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 사용자 정보 */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>사용자 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-medium">
                  {getInitials(user.name)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">
                    가입일: {formatDate(user.createdAt)}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">
                    역할: {user.role.name === 'admin' ? '관리자' : 
                           user.role.name === 'manager' ? '매니저' : '사용자'}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  수정
                </Button>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 상세 정보 */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">개요</TabsTrigger>
              <TabsTrigger value="projects">프로젝트</TabsTrigger>
              <TabsTrigger value="estimates">견적</TabsTrigger>
              <TabsTrigger value="contracts">계약</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>상태 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">상태</label>
                      <div className="mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[user.status]}`}>
                          {user.status === 'active' ? '활성' :
                           user.status === 'pending' ? '대기중' : '비활성'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">역할</label>
                      <div className="mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${roleColors[user.role.name]}`}>
                          {user.role.name === 'admin' ? '관리자' : 
                           user.role.name === 'manager' ? '매니저' : '사용자'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">마지막 로그인</label>
                      <div className="mt-1 text-sm">
                        {user.lastLoginAt ? formatDate(user.lastLoginAt) : '없음'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">가입일</label>
                      <div className="mt-1 text-sm">
                        {formatDate(user.createdAt)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>프로젝트 ({user._count?.projects || 0}개)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>프로젝트명</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>시작일</TableHead>
                        <TableHead>작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>데모 프로젝트</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            진행중
                          </span>
                        </TableCell>
                        <TableCell>2024-01-15</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">보기</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="estimates">
              <Card>
                <CardHeader>
                  <CardTitle>견적 ({user._count?.estimates || 0}개)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>견적명</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>생성일</TableHead>
                        <TableHead>작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>김치공장 견적</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            승인됨
                          </span>
                        </TableCell>
                        <TableCell>2024-01-10</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">보기</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contracts">
              <Card>
                <CardHeader>
                  <CardTitle>계약 ({user._count?.contracts || 0}개)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>계약명</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>금액</TableHead>
                        <TableHead>작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>김치공장 건설 계약</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                            대기중
                          </span>
                        </TableCell>
                        <TableCell>8억원</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">보기</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
