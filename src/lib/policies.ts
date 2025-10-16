// HACCP 정책 - 컨설팅만 제공, 대행 제외

export const HACCP_POLICY = {
  consultingOnly: true,
  disclaimers: [
    '우리는 컨설팅(자문·교육·사전점검)만 제공합니다.',
    '대행(대리 신청·대리 작성·대응·운영 책임)은 제공하지 않습니다.',
  ],
  shortDisclaimer: '컨설팅(자문·교육·사전점검)은 지원, 대행은 제공하지 않습니다.',
};

export const HACCP_CONSULTING = {
  weOffer: [
    {
      icon: '✅',
      title: '초기 진단 & 갭 분석',
      description: '현장/프로세스/문서 수준 평가',
    },
    {
      icon: '✅',
      title: 'HACCP 플로우차트 코칭',
      description: '공정 FMEA, PRP 체크리스트 작성 지원',
    },
    {
      icon: '✅',
      title: '문서 템플릿 제공',
      description: '표준서·절차서·기록지 템플릿 및 작성 코칭',
    },
    {
      icon: '✅',
      title: '사전 모의심사 (Pre-Audit)',
      description: '심사 전 점검 및 개선안 제시',
    },
    {
      icon: '✅',
      title: '내부교육 지원',
      description: '정기 점검 방법론 및 교육 자료 제공',
    },
    {
      icon: '✅',
      title: '설계/동선 컨설팅',
      description: '자재·인원 흐름 최적화 (시뮬레이터 연동)',
    },
  ],
  weDoNot: [
    {
      icon: '❌',
      title: '대리 신청/서류 대리 작성',
      description: '신청서 작성 및 제출 대행',
    },
    {
      icon: '❌',
      title: '심사 대응 대리 출석',
      description: '심사 당일 대신 대응하는 서비스',
    },
    {
      icon: '❌',
      title: '운영 책임 대행',
      description: '시정조치 이행 책임 전가',
    },
    {
      icon: '❌',
      title: '대행 기반 결과 보장',
      description: '대리 제출을 전제로 한 인증 보장',
    },
  ],
};

export const HACCP_PACKAGES = [
  {
    id: 'lite',
    name: 'Lite',
    price: '300만원',
    includes: ['초기 진단', '갭 분석 리포트'],
    excludes: ['대리 제출/대응'],
    recommended: '첫 도입 점검',
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '800만원',
    includes: ['문서 템플릿 + 작성 코칭', '교육 1회'],
    excludes: ['대리 제출/대응'],
    recommended: '준비 기간 단축',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '1500만원',
    includes: ['모의심사', '시정개선 코칭', '교육 2회'],
    excludes: ['대리 제출/대응'],
    recommended: '바로 심사 앞둔 팀',
  },
];

export const HACCP_PROCESS = [
  {
    step: 1,
    title: '진단/갭분석',
    description: '현장 및 문서 수준 평가',
    role: '컨설턴트',
  },
  {
    step: 2,
    title: '문서 템플릿 & 코칭',
    description: '표준서·절차서·기록지 작성 지원',
    role: '공동',
  },
  {
    step: 3,
    title: '모의심사 (Pre-Audit)',
    description: '심사 전 점검 및 개선안 제시',
    role: '컨설턴트',
  },
  {
    step: 4,
    title: '시정개선',
    description: '모의심사 결과 개선사항 이행',
    role: '고객',
  },
  {
    step: 5,
    title: '유지관리 가이드',
    description: '정기 점검 방법론 제공',
    role: '컨설턴트',
  },
];

export const HACCP_FAQ = [
  {
    question: 'HACCP 대행도 해주나요?',
    answer: '컨설팅만 제공하며, 신청·심사 대응·운영 책임 대행은 하지 않습니다. 대신 체크리스트, 문서 템플릿, 모의심사를 통해 스스로 할 수 있도록 돕습니다.',
  },
  {
    question: '심사 당일 동행은 가능한가요?',
    answer: '자문 자격의 참관/사전 리허설은 가능하지만, 공식 \'대행\' 역할은 아닙니다. 기관과의 커뮤니케이션은 귀사의 책임입니다.',
  },
  {
    question: '문서는 다 작성해주시나요?',
    answer: '아니요. 문서 템플릿과 작성 가이드를 제공하고, 작성 과정을 코칭합니다. 최종 작성은 귀사에서 진행하셔야 합니다.',
  },
  {
    question: '인증 실패 시 책임은 어떻게 되나요?',
    answer: '우리는 방법론과 사전 점검을 제공하며, 최종 인증 성공 여부는 사업장의 실제 실행 수준에 좌우됩니다. 대행이 아닌 컨설팅 서비스이므로 결과를 보장하지 않습니다.',
  },
  {
    question: '컨설팅 기간은 얼마나 걸리나요?',
    answer: '패키지에 따라 다르지만, 일반적으로 2-4개월입니다. Lite는 1개월, Standard는 2-3개월, Pro는 3-4개월 소요됩니다.',
  },
];

