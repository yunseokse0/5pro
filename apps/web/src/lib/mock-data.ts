// Mock 데이터 for Vercel demo

export const mockUser = {
  id: '1',
  email: 'admin@5pro.local',
  name: '관리자',
  role: {
    id: '1',
    name: 'admin',
    permissions: [
      { permission: 'read', resource: 'projects' },
      { permission: 'create', resource: 'projects' },
      { permission: 'update', resource: 'projects' },
      { permission: 'delete', resource: 'projects' },
    ],
  },
};

export const mockUsers = [
  {
    id: '1',
    email: 'admin@offro.com',
    name: '김관리',
    phone: '010-1234-5678',
    status: 'active',
    role: { id: '1', name: 'admin' },
    createdAt: '2024-01-01',
    lastLoginAt: '2025-01-19T19:30:00Z',
    _count: { estimates: 15, projects: 15, contracts: 8 },
  },
  {
    id: '2',
    email: 'manager@offro.com',
    name: '이매니저',
    phone: '010-2345-6789',
    status: 'active',
    role: { id: '2', name: 'manager' },
    createdAt: '2024-01-15',
    lastLoginAt: '2025-01-19T00:20:00Z',
    _count: { estimates: 8, projects: 8, contracts: 5 },
  },
  {
    id: '3',
    email: 'user@offro.com',
    name: '박사용자',
    phone: '010-3456-7890',
    status: 'active',
    role: { id: '3', name: 'user' },
    createdAt: '2024-02-01',
    lastLoginAt: '2025-01-17T18:15:00Z',
    _count: { estimates: 3, projects: 3, contracts: 2 },
  },
  {
    id: '4',
    email: 'new@offro.com',
    name: '최신규',
    phone: '010-4567-8901',
    status: 'pending',
    role: { id: '3', name: 'user' },
    createdAt: '2025-01-16',
    lastLoginAt: '2025-01-16T23:45:00Z',
    _count: { estimates: 0, projects: 0, contracts: 0 },
  },
  {
    id: '5',
    email: 'inactive@offro.com',
    name: '정비활성',
    phone: '010-5678-9012',
    status: 'inactive',
    role: { id: '3', name: 'user' },
    createdAt: '2024-03-01',
    lastLoginAt: '2024-12-01T20:30:00Z',
    _count: { estimates: 1, projects: 1, contracts: 0 },
  },
];

export const mockUserStats = {
  totalUsers: 5,
  activeUsers: 3,
  pendingUsers: 1,
  adminUsers: 1,
};

export const mockProjects = [
  {
    id: '1',
    name: '서울 김치공장 신축',
    description: 'HACCP 인증 김치 제조 시설 건설 프로젝트',
    status: 'in_progress',
    progress: 40,
    budget: 800000000,
    actualCost: 320000000,
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    partner: { id: '1', companyName: '다이아몬드 건설' },
    region: { id: '1', name: '서울', costIndex: 1.2 },
    preset: { id: '1', name: '김치공장' },
    milestones: [
      { id: '1', title: '부지 매입 및 인허가', status: 'completed', order: 1, dueDate: '2024-02-28' },
      { id: '2', title: '기초 공사', status: 'completed', order: 2, dueDate: '2024-04-30' },
      { id: '3', title: '골조 공사', status: 'in_progress', order: 3, dueDate: '2024-07-31' },
      { id: '4', title: '설비 공사', status: 'pending', order: 4, dueDate: '2024-10-31' },
    ],
    envLogs: Array.from({ length: 30 }, (_, i) => ({
      id: String(i),
      temperature: 2 + Math.random() * 3,
      humidity: 65 + Math.random() * 10,
      co2Level: 400 + Math.random() * 100,
      recordedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    })),
    liveFeeds: [
      { id: '1', cameraName: '제조실 CCTV #1', streamUrl: 'rtsp://demo.example.com/stream1', isActive: true },
      { id: '2', cameraName: '저장고 CCTV #2', streamUrl: 'rtsp://demo.example.com/stream2', isActive: true },
    ],
    haccpStages: [
      { id: '1', stageName: '원료입고', status: 'completed', order: 1 },
      { id: '2', stageName: '세척', status: 'completed', order: 2 },
      { id: '3', stageName: '절임', status: 'in_progress', order: 3 },
      { id: '4', stageName: '양념', status: 'pending', order: 4 },
      { id: '5', stageName: '포장', status: 'pending', order: 5 },
    ],
  },
  {
    id: '2',
    name: '부산 제빵공장 확장',
    description: '생산라인 확장 프로젝트',
    status: 'planning',
    progress: 15,
    budget: 450000000,
    actualCost: 67500000,
    partner: { companyName: '플래티넘 엔지니어링' },
    region: { name: '부산' },
  },
];

export const mockEstimates = [
  {
    id: '1',
    projectName: '부산 제빵공장 확장',
    status: 'approved',
    createdAt: '2024-01-10',
    user: { name: '관리자' },
    versions: [
      { id: '1', versionNum: 1, inputData: { area: 500 }, resultData: { totalCost: 450000000 } },
      { id: '2', versionNum: 2, inputData: { area: 550 }, resultData: { totalCost: 520000000 } },
    ],
  },
  {
    id: '2',
    projectName: '대전 수산가공 공장',
    status: 'draft',
    createdAt: '2024-02-15',
    user: { name: '관리자' },
    versions: [{ versionNum: 1 }],
  },
];

export const mockVisual3D = [
  {
    id: '1',
    projectName: '서울 김치공장 3D 모델링',
    status: 'completed',
    createdAt: '2024-01-05',
    results: [
      { id: '1', fileType: 'glb', fileUrl: 's3://bucket/factory.glb' },
      { id: '2', fileType: 'png', fileUrl: 's3://bucket/preview.png' },
    ],
  },
  {
    id: '2',
    projectName: '부산 제빵공장 레이아웃',
    status: 'pending',
    createdAt: '2024-02-20',
    results: [],
  },
];

export const mockContracts = [
  {
    id: '1',
    title: '서울 김치공장 건설 계약서',
    status: 'pending',
    totalAmount: 800000000,
    project: { id: '1', name: '서울 김치공장 신축' },
    createdAt: '2024-01-20',
    signatures: [
      { id: '1', signerName: '김철수', signerRole: '발주자', signedAt: null },
      { id: '2', signerName: '이대표', signerRole: '수급인', signedAt: null },
    ],
  },
];

export const mockPartners = [
  {
    id: '1',
    companyName: '다이아몬드 건설',
    grade: 'DIAMOND',
    contactName: '김철수',
    email: 'kim@diamond.co.kr',
    phone: '02-1234-5678',
    totalRevenue: 5000000000,
    projectCount: 45,
    achievements: [
      { id: '1', title: 'ISO 9001 인증 획득', achievedAt: '2023-03-15' },
      { id: '2', title: '우수 시공사 선정', achievedAt: '2023-11-20' },
    ],
  },
  {
    id: '2',
    companyName: '플래티넘 엔지니어링',
    grade: 'PLATINUM',
    contactName: '이영희',
    totalRevenue: 3000000000,
    projectCount: 32,
  },
  {
    id: '3',
    companyName: '골드 시공',
    grade: 'GOLD',
    contactName: '박민수',
    totalRevenue: 1500000000,
    projectCount: 28,
  },
];

export const mockLeads = [
  {
    id: '1',
    companyName: '신선식품',
    contactName: '홍길동',
    email: 'hong@sinsun.co.kr',
    phone: '02-9876-5432',
    source: 'website',
    status: 'contacted',
    estimatedBudget: 500000000,
  },
  {
    id: '2',
    companyName: '해양수산',
    contactName: '김바다',
    email: 'kim@ocean.co.kr',
    phone: '051-8765-4321',
    source: 'referral',
    status: 'qualified',
    estimatedBudget: 1200000000,
  },
];

export const mockCatalog = [
  {
    id: '1',
    name: '냉장고 (업소용 대형)',
    category: '냉장설비',
    unitPrice: 3500000,
    unit: '대',
    supplier: '삼성전자',
    isActive: true,
  },
  {
    id: '2',
    name: '냉동고 (급속)',
    category: '냉동설비',
    unitPrice: 8500000,
    unit: '대',
    supplier: 'LG전자',
    isActive: true,
  },
  {
    id: '3',
    name: '공조기 (항온항습)',
    category: '공조설비',
    unitPrice: 12000000,
    unit: '대',
    supplier: '캐리어',
    isActive: true,
  },
];

export const mockRegions = [
  { id: '1', name: '서울', code: 'SEL', costIndex: 1.2 },
  { id: '2', name: '경기', code: 'GGD', costIndex: 1.1 },
  { id: '3', name: '인천', code: 'ICN', costIndex: 1.05 },
  { id: '4', name: '부산', code: 'PUS', costIndex: 0.95 },
];

export const mockPresets = [
  { id: '1', name: '김치공장', description: '김치 제조 공장 표준 설정' },
  { id: '2', name: '제빵공장', description: '제빵 공장 표준 설정' },
  { id: '3', name: '육가공공장', description: '육류 가공 공장 표준 설정' },
];

export const mockAuditLogs = [
  {
    id: '1',
    action: 'create',
    resource: 'projects',
    createdAt: new Date().toISOString(),
    user: { name: '관리자' },
    ipAddress: '127.0.0.1',
  },
  {
    id: '2',
    action: 'update',
    resource: 'projects',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    user: { name: '관리자' },
    ipAddress: '127.0.0.1',
  },
];

export const mockStats = {
  totalProjects: 12,
  activeProjects: 7,
  totalPartners: 5,
  totalContracts: 8,
};

