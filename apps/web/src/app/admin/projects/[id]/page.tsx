'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, Tabs, TabsList, TabsTrigger, TabsContent } from '@5pro/ui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
const apiClient = isDemoMode 
  ? require('@/lib/mock-api').apiClient 
  : require('@/lib/api').apiClient;

export default function ProjectDetailPage() {
  const { data: session } = useSession();
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.accessToken && params.id) {
      apiClient.setToken(session.accessToken);
      loadProject();
    }
  }, [session, params.id]);

  const loadProject = async () => {
    try {
      const data = await apiClient.get<any>(`/projects/${params.id}`);
      setProject(data);
    } catch (error) {
      console.error('Failed to load project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (!project) return <div>프로젝트를 찾을 수 없습니다</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <p className="text-gray-600">{project.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">진행률</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.progress}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">예산</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {project.budget?.toLocaleString()}원
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">실제 비용</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {project.actualCost?.toLocaleString()}원
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="milestones">마일스톤</TabsTrigger>
          <TabsTrigger value="environment">환경</TabsTrigger>
          <TabsTrigger value="live">LIVE</TabsTrigger>
          <TabsTrigger value="haccp">HACCP</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>프로젝트 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-gray-600">파트너</div>
                <div className="font-medium">{project.partner?.companyName || '-'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">지역</div>
                <div className="font-medium">{project.region?.name || '-'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">업종</div>
                <div className="font-medium">{project.preset?.name || '-'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">상태</div>
                <div className="font-medium">{project.status}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones">
          <Card>
            <CardHeader>
              <CardTitle>마일스톤</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.milestones?.map((milestone: any) => (
                  <div key={milestone.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="font-medium">{milestone.title}</div>
                    <div className="text-sm text-gray-600">{milestone.description}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      상태: {milestone.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environment">
          <Card>
            <CardHeader>
              <CardTitle>환경 모니터링</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={project.envLogs || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="recordedAt" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temperature" stroke="#ef4444" name="온도" />
                  <Line type="monotone" dataKey="humidity" stroke="#3b82f6" name="습도" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="live">
          <Card>
            <CardHeader>
              <CardTitle>실시간 CCTV</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.liveFeeds?.map((feed: any) => (
                  <div key={feed.id} className="border rounded p-4">
                    <div className="font-medium">{feed.cameraName}</div>
                    <div className="text-sm text-gray-600">{feed.streamUrl}</div>
                    <div className={`text-xs mt-2 ${feed.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                      {feed.isActive ? '활성' : '비활성'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="haccp">
          <Card>
            <CardHeader>
              <CardTitle>HACCP 단계</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.haccpStages?.map((stage: any) => (
                  <div key={stage.id} className="border rounded p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{stage.stageName}</div>
                        <div className="text-sm text-gray-600">{stage.description}</div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        stage.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : stage.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {stage.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

