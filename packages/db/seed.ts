import { PrismaClient, PartnerGrade } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data (in reverse order of dependencies)
  await prisma.auditLog.deleteMany();
  await prisma.signature.deleteMany();
  await prisma.contractClause.deleteMany();
  await prisma.contract.deleteMany();
  await prisma.haccpStage.deleteMany();
  await prisma.projectLiveFeed.deleteMany();
  await prisma.projectEnvLog.deleteMany();
  await prisma.projectMilestone.deleteMany();
  await prisma.project.deleteMany();
  await prisma.visual3DResult.deleteMany();
  await prisma.visual3DRequest.deleteMany();
  await prisma.estimateVersion.deleteMany();
  await prisma.estimate.deleteMany();
  await prisma.partnerAchievement.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.catalogItem.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.industryPreset.deleteMany();
  await prisma.region.deleteMany();
  await prisma.user.deleteMany();
  await prisma.rolePermission.deleteMany();
  await prisma.role.deleteMany();

  // Create Roles
  const adminRole = await prisma.role.create({
    data: {
      name: 'admin',
      description: '관리자',
    },
  });

  const managerRole = await prisma.role.create({
    data: {
      name: 'manager',
      description: '매니저',
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: 'user',
      description: '일반 사용자',
    },
  });

  // Create Admin Permissions (full access)
  const resources = [
    'estimates',
    'visual3d',
    'projects',
    'contracts',
    'partners',
    'leads',
    'catalog',
    'regions',
    'presets',
    'users',
    'roles',
    'audit_logs',
  ];

  const permissions = ['create', 'read', 'update', 'delete'];

  for (const resource of resources) {
    for (const permission of permissions) {
      await prisma.rolePermission.create({
        data: {
          roleId: adminRole.id,
          permission,
          resource,
        },
      });
    }
  }

  // Manager Permissions (read/update most, no delete users/roles)
  for (const resource of resources) {
    if (resource === 'users' || resource === 'roles') {
      await prisma.rolePermission.create({
        data: {
          roleId: managerRole.id,
          permission: 'read',
          resource,
        },
      });
    } else {
      for (const permission of ['create', 'read', 'update']) {
        await prisma.rolePermission.create({
          data: {
            roleId: managerRole.id,
            permission,
            resource,
          },
        });
      }
    }
  }

  // User Permissions (read only most things)
  for (const resource of resources) {
    await prisma.rolePermission.create({
      data: {
        roleId: userRole.id,
        permission: 'read',
        resource,
      },
    });
  }

  // Create Admin User
  const hashedPassword = await bcrypt.hash('Admin!234', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@5pro.local',
      password: hashedPassword,
      name: '관리자',
      roleId: adminRole.id,
    },
  });

  console.log('✅ Created admin user:', adminUser.email);

  // Create Regions
  const regions = [
    { name: '서울', code: 'SEL', costIndex: 1.2 },
    { name: '경기', code: 'GGD', costIndex: 1.1 },
    { name: '인천', code: 'ICN', costIndex: 1.05 },
    { name: '부산', code: 'PUS', costIndex: 0.95 },
    { name: '대구', code: 'DAE', costIndex: 0.9 },
    { name: '광주', code: 'GWJ', costIndex: 0.88 },
    { name: '대전', code: 'DJN', costIndex: 0.92 },
    { name: '울산', code: 'ULS', costIndex: 0.93 },
    { name: '세종', code: 'SJG', costIndex: 0.95 },
  ];

  const createdRegions = await Promise.all(
    regions.map((r) => prisma.region.create({ data: r }))
  );

  console.log(`✅ Created ${createdRegions.length} regions`);

  // Create Industry Presets
  const presets = [
    {
      name: '김치공장',
      description: '김치 제조 공장 표준 설정',
      config: {
        requiredTemp: { min: 0, max: 5 },
        humidity: { min: 60, max: 80 },
        haccpStages: ['원료입고', '세척', '절임', '양념', '포장', '저장'],
      },
    },
    {
      name: '제빵공장',
      description: '제빵 공장 표준 설정',
      config: {
        requiredTemp: { min: 18, max: 25 },
        humidity: { min: 55, max: 70 },
        haccpStages: ['원료입고', '반죽', '발효', '성형', '굽기', '냉각', '포장'],
      },
    },
    {
      name: '육가공공장',
      description: '육류 가공 공장 표준 설정',
      config: {
        requiredTemp: { min: -2, max: 4 },
        humidity: { min: 70, max: 85 },
        haccpStages: ['원료입고', '해동', '정형', '조미', '포장', '급속냉동'],
      },
    },
    {
      name: '수산가공공장',
      description: '수산물 가공 공장 표준 설정',
      config: {
        requiredTemp: { min: -5, max: 2 },
        humidity: { min: 75, max: 90 },
        haccpStages: ['원료입고', '선별', '세척', '가공', '포장', '냉동보관'],
      },
    },
  ];

  const createdPresets = await Promise.all(
    presets.map((p) => prisma.industryPreset.create({ data: p }))
  );

  console.log(`✅ Created ${createdPresets.length} industry presets`);

  // Create Partners
  const partners = [
    {
      companyName: '다이아몬드 건설',
      contactName: '김철수',
      email: 'kim@diamond.co.kr',
      phone: '02-1234-5678',
      address: '서울시 강남구',
      grade: PartnerGrade.DIAMOND,
      totalRevenue: 5000000000,
      projectCount: 45,
    },
    {
      companyName: '플래티넘 엔지니어링',
      contactName: '이영희',
      email: 'lee@platinum.co.kr',
      phone: '031-2345-6789',
      address: '경기도 성남시',
      grade: PartnerGrade.PLATINUM,
      totalRevenue: 3000000000,
      projectCount: 32,
    },
    {
      companyName: '골드 시공',
      contactName: '박민수',
      email: 'park@gold.co.kr',
      phone: '051-3456-7890',
      address: '부산시 해운대구',
      grade: PartnerGrade.GOLD,
      totalRevenue: 1500000000,
      projectCount: 28,
    },
    {
      companyName: '실버 건축',
      contactName: '최은정',
      email: 'choi@silver.co.kr',
      phone: '053-4567-8901',
      address: '대구시 수성구',
      grade: PartnerGrade.SILVER,
      totalRevenue: 800000000,
      projectCount: 15,
    },
    {
      companyName: '브론즈 설계',
      contactName: '정현우',
      email: 'jung@bronze.co.kr',
      phone: '062-5678-9012',
      address: '광주시 서구',
      grade: PartnerGrade.BRONZE,
      totalRevenue: 300000000,
      projectCount: 8,
    },
  ];

  const createdPartners = await Promise.all(
    partners.map((p) => prisma.partner.create({ data: p }))
  );

  console.log(`✅ Created ${createdPartners.length} partners`);

  // Create Partner Achievements
  const achievements = [
    {
      partnerId: createdPartners[0].id,
      title: 'ISO 9001 인증 획득',
      description: '품질경영시스템 국제 표준 인증',
      achievedAt: new Date('2023-03-15'),
    },
    {
      partnerId: createdPartners[0].id,
      title: '우수 시공사 선정',
      description: '식품안전처 우수 시공사 2년 연속 선정',
      achievedAt: new Date('2023-11-20'),
    },
    {
      partnerId: createdPartners[1].id,
      title: 'HACCP 컨설팅 전문기업 인증',
      description: 'HACCP 시스템 구축 전문 인증',
      achievedAt: new Date('2023-06-10'),
    },
    {
      partnerId: createdPartners[2].id,
      title: '친환경 건축 대상 수상',
      description: '녹색건축 부문 대상',
      achievedAt: new Date('2023-09-05'),
    },
  ];

  await Promise.all(
    achievements.map((a) => prisma.partnerAchievement.create({ data: a }))
  );

  console.log('✅ Created partner achievements');

  // Create Demo Project
  const demoProject = await prisma.project.create({
    data: {
      name: '서울 김치공장 신축',
      description: 'HACCP 인증 김치 제조 시설 건설 프로젝트',
      userId: adminUser.id,
      partnerId: createdPartners[0].id,
      regionId: createdRegions[0].id,
      presetId: createdPresets[0].id,
      status: 'in_progress',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-12-31'),
      budget: 800000000,
      actualCost: 320000000,
      progress: 40,
    },
  });

  console.log('✅ Created demo project');

  // Create Project Milestones
  const milestones = [
    {
      projectId: demoProject.id,
      title: '부지 매입 및 인허가',
      description: '공장 부지 매입 및 건축 허가 취득',
      dueDate: new Date('2024-02-28'),
      completedAt: new Date('2024-02-20'),
      status: 'completed',
      order: 1,
    },
    {
      projectId: demoProject.id,
      title: '기초 공사',
      description: '건물 기초 및 지하 구조물 시공',
      dueDate: new Date('2024-04-30'),
      completedAt: new Date('2024-04-25'),
      status: 'completed',
      order: 2,
    },
    {
      projectId: demoProject.id,
      title: '골조 공사',
      description: '건물 골조 및 외벽 시공',
      dueDate: new Date('2024-07-31'),
      status: 'in_progress',
      order: 3,
    },
    {
      projectId: demoProject.id,
      title: '설비 공사',
      description: '냉장·냉동 설비 및 공조 시스템 설치',
      dueDate: new Date('2024-10-31'),
      status: 'pending',
      order: 4,
    },
    {
      projectId: demoProject.id,
      title: 'HACCP 인증',
      description: 'HACCP 인증 심사 및 취득',
      dueDate: new Date('2024-12-15'),
      status: 'pending',
      order: 5,
    },
  ];

  await Promise.all(
    milestones.map((m) => prisma.projectMilestone.create({ data: m }))
  );

  console.log('✅ Created project milestones');

  // Create Project Environment Logs
  const envLogs = [];
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    envLogs.push({
      projectId: demoProject.id,
      temperature: 2 + Math.random() * 3,
      humidity: 65 + Math.random() * 10,
      co2Level: 400 + Math.random() * 100,
      recordedBy: adminUser.id,
      recordedAt: date,
    });
  }

  await Promise.all(
    envLogs.map((log) => prisma.projectEnvLog.create({ data: log }))
  );

  console.log('✅ Created environment logs');

  // Create HACCP Stages
  const haccpStages = [
    {
      projectId: demoProject.id,
      stageName: '원료입고',
      description: '김치 제조 원료 입고 및 검수',
      criteria: { temp: '0-5°C', docs: ['입고증', '성적서'] },
      status: 'completed',
      completedAt: new Date('2024-05-10'),
      order: 1,
    },
    {
      projectId: demoProject.id,
      stageName: '세척',
      description: '배추 및 채소류 세척 공정',
      criteria: { water: '정수', time: '10분 이상' },
      status: 'completed',
      completedAt: new Date('2024-05-15'),
      order: 2,
    },
    {
      projectId: demoProject.id,
      stageName: '절임',
      description: '배추 절임 공정',
      criteria: { salt: '12-15%', time: '12시간' },
      status: 'in_progress',
      order: 3,
    },
    {
      projectId: demoProject.id,
      stageName: '양념',
      description: '양념 혼합 및 버무리기',
      criteria: { temp: '10°C 이하' },
      status: 'pending',
      order: 4,
    },
    {
      projectId: demoProject.id,
      stageName: '포장',
      description: '완제품 포장',
      criteria: { seal: 'vacuum', label: 'required' },
      status: 'pending',
      order: 5,
    },
    {
      projectId: demoProject.id,
      stageName: '저장',
      description: '냉장 보관',
      criteria: { temp: '0-5°C', humidity: '85%' },
      status: 'pending',
      order: 6,
    },
  ];

  await Promise.all(
    haccpStages.map((stage) => prisma.haccpStage.create({ data: stage }))
  );

  console.log('✅ Created HACCP stages');

  // Create Live Feed
  await prisma.projectLiveFeed.create({
    data: {
      projectId: demoProject.id,
      cameraName: '제조실 CCTV #1',
      streamUrl: 'rtsp://demo.example.com/stream1',
      isActive: true,
      createdBy: adminUser.id,
    },
  });

  await prisma.projectLiveFeed.create({
    data: {
      projectId: demoProject.id,
      cameraName: '저장고 CCTV #2',
      streamUrl: 'rtsp://demo.example.com/stream2',
      isActive: true,
      createdBy: adminUser.id,
    },
  });

  console.log('✅ Created live feeds');

  // Create Demo Estimate
  const demoEstimate = await prisma.estimate.create({
    data: {
      userId: adminUser.id,
      projectName: '부산 제빵공장 확장',
      description: '기존 제빵 공장 생산라인 확장 견적',
      status: 'approved',
    },
  });

  // Create Estimate Versions
  await prisma.estimateVersion.create({
    data: {
      estimateId: demoEstimate.id,
      versionNum: 1,
      inputData: {
        area: 500,
        equipmentCount: 5,
        laborCost: 50000000,
      },
      resultData: {
        totalCost: 450000000,
        breakdown: {
          construction: 200000000,
          equipment: 150000000,
          labor: 50000000,
          misc: 50000000,
        },
      },
    },
  });

  await prisma.estimateVersion.create({
    data: {
      estimateId: demoEstimate.id,
      versionNum: 2,
      inputData: {
        area: 550,
        equipmentCount: 6,
        laborCost: 55000000,
      },
      resultData: {
        totalCost: 520000000,
        breakdown: {
          construction: 230000000,
          equipment: 180000000,
          labor: 55000000,
          misc: 55000000,
        },
      },
    },
  });

  console.log('✅ Created estimate with versions');

  // Create 3D Request & Result
  const visual3dRequest = await prisma.visual3DRequest.create({
    data: {
      userId: adminUser.id,
      projectName: '서울 김치공장 3D 모델링',
      description: '공장 레이아웃 3D 시각화',
      inputParams: {
        dimensions: { width: 50, length: 80, height: 8 },
        layout: 'manufacturing',
      },
      status: 'completed',
    },
  });

  await prisma.visual3DResult.create({
    data: {
      requestId: visual3dRequest.id,
      fileType: 'glb',
      fileUrl: 's3://bucket/models/factory_layout.glb',
      fileSize: 2048000,
    },
  });

  await prisma.visual3DResult.create({
    data: {
      requestId: visual3dRequest.id,
      fileType: 'png',
      fileUrl: 's3://bucket/previews/factory_layout.png',
      fileSize: 512000,
    },
  });

  console.log('✅ Created 3D request and results');

  // Create Demo Contract
  const demoContract = await prisma.contract.create({
    data: {
      projectId: demoProject.id,
      userId: adminUser.id,
      title: '서울 김치공장 건설 계약서',
      description: '공사 계약 및 HACCP 인증 컨설팅 포함',
      totalAmount: 800000000,
      status: 'pending',
    },
  });

  // Create Contract Clauses
  const clauses = [
    {
      contractId: demoContract.id,
      title: '제1조 (목적)',
      content:
        '본 계약은 발주자와 수급인 간의 공장 건설 공사에 관한 권리와 의무를 명확히 함을 목적으로 한다.',
      order: 1,
    },
    {
      contractId: demoContract.id,
      title: '제2조 (공사 범위)',
      content:
        '공사 범위는 다음과 같다:\n1. 공장 건물 신축 (연면적 1,200㎡)\n2. 냉장·냉동 설비 설치\n3. HACCP 인증 시설 구축\n4. 제조 설비 설치',
      order: 2,
    },
    {
      contractId: demoContract.id,
      title: '제3조 (계약 금액)',
      content:
        '계약 금액은 팔억원정(₩800,000,000)으로 한다. 부가가치세는 별도이다.',
      order: 3,
    },
    {
      contractId: demoContract.id,
      title: '제4조 (대금 지급)',
      content:
        '대금은 다음과 같이 지급한다:\n- 계약금: 20% (착공 시)\n- 중도금: 50% (골조 완료 시)\n- 잔금: 30% (준공 후)',
      order: 4,
    },
    {
      contractId: demoContract.id,
      title: '제5조 (공사 기간)',
      content: '공사 기간은 2024년 1월 15일부터 2024년 12월 31일까지로 한다.',
      order: 5,
    },
  ];

  await Promise.all(
    clauses.map((clause) => prisma.contractClause.create({ data: clause }))
  );

  console.log('✅ Created contract clauses');

  // Create Unsigned Signatures
  await prisma.signature.create({
    data: {
      contractId: demoContract.id,
      userId: adminUser.id,
      signerName: '김철수',
      signerRole: '발주자',
    },
  });

  await prisma.signature.create({
    data: {
      contractId: demoContract.id,
      userId: adminUser.id,
      signerName: '이대표',
      signerRole: '수급인 대표',
    },
  });

  console.log('✅ Created unsigned signatures');

  // Create Leads
  const leads = [
    {
      companyName: '신선식품',
      contactName: '홍길동',
      email: 'hong@sinsun.co.kr',
      phone: '02-9876-5432',
      source: 'website',
      status: 'contacted',
      notes: '냉동창고 건설 문의',
      estimatedBudget: 500000000,
    },
    {
      companyName: '해양수산',
      contactName: '김바다',
      email: 'kim@ocean.co.kr',
      phone: '051-8765-4321',
      source: 'referral',
      status: 'qualified',
      notes: '수산물 가공공장 신축',
      estimatedBudget: 1200000000,
    },
    {
      companyName: '전통식품',
      contactName: '박전통',
      email: 'park@tradition.co.kr',
      phone: '031-7654-3210',
      source: 'exhibition',
      status: 'new',
      notes: '한과 제조 시설 현대화',
      estimatedBudget: 300000000,
    },
  ];

  await Promise.all(leads.map((lead) => prisma.lead.create({ data: lead })));

  console.log('✅ Created leads');

  // Create Catalog Items
  const catalogItems = [
    {
      name: '냉장고 (업소용 대형)',
      category: '냉장설비',
      description: '업소용 대형 냉장고, 1500L',
      unitPrice: 3500000,
      unit: '대',
      supplier: '삼성전자',
      specs: { capacity: 1500, power: 220, warranty: 3 },
      isActive: true,
    },
    {
      name: '냉동고 (급속)',
      category: '냉동설비',
      description: '급속 냉동고, -40°C',
      unitPrice: 8500000,
      unit: '대',
      supplier: 'LG전자',
      specs: { temp: -40, capacity: 2000, power: 380 },
      isActive: true,
    },
    {
      name: '공조기 (항온항습)',
      category: '공조설비',
      description: '항온항습 공조기, 50평형',
      unitPrice: 12000000,
      unit: '대',
      supplier: '캐리어',
      specs: { area: 165, humidity: '40-80%' },
      isActive: true,
    },
    {
      name: '스테인리스 작업대',
      category: '작업설비',
      description: 'SUS304 작업대, 1800x750',
      unitPrice: 450000,
      unit: '대',
      supplier: '한국주방',
      specs: { material: 'SUS304', size: '1800x750x850' },
      isActive: true,
    },
    {
      name: 'HACCP 모니터링 시스템',
      category: '관리시스템',
      description: '온습도 자동 모니터링 및 기록 시스템',
      unitPrice: 5500000,
      unit: '세트',
      supplier: '식품안전시스템',
      specs: { sensors: 20, software: 'included' },
      isActive: true,
    },
  ];

  await Promise.all(
    catalogItems.map((item) => prisma.catalogItem.create({ data: item }))
  );

  console.log('✅ Created catalog items');

  // Create Audit Logs
  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: 'create',
      resource: 'projects',
      resourceId: demoProject.id,
      metadata: { projectName: demoProject.name },
      ipAddress: '127.0.0.1',
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: 'update',
      resource: 'projects',
      resourceId: demoProject.id,
      metadata: { field: 'progress', oldValue: 35, newValue: 40 },
      ipAddress: '127.0.0.1',
    },
  });

  console.log('✅ Created audit logs');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

