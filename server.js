const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE) || 10485760; // 10MB

// uploads 디렉토리 생성
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log(`📁 ${UPLOAD_DIR} 디렉토리가 생성되었습니다.`);
}

// 미들웨어
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));

// 파일 업로드를 위한 multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // 허용되는 파일 타입
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('지원되지 않는 파일 형식입니다.'));
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: MAX_FILE_SIZE
  },
  fileFilter: fileFilter
});

// Mock 데이터
const mockData = {
  estimate: {
    regions: {
      '서울': 1500000,
      '경기': 1200000,
      '인천': 1000000,
      '부산': 900000,
      '대구': 800000,
      '광주': 700000,
      '대전': 750000,
      '울산': 850000
    },
    facilities: {
      '냉장시설': 5000000,
      '냉동시설': 8000000,
      'HACCP 인증시설': 3000000,
      '배수처리시설': 2000000,
      '소방시설': 1500000,
      '전력시설': 1000000
    }
  },
  progress: {
    stage: '골조',
    percent: 40,
    stages: [
      { name: '착공', percent: 100, completed: true },
      { name: '골조', percent: 40, completed: false },
      { name: '설비', percent: 0, completed: false },
      { name: '완공', percent: 0, completed: false }
    ]
  },
  haccp: {
    step: '심사 중',
    due: '2025-12-31',
    steps: [
      { name: '준비', completed: true, due: '2025-10-15' },
      { name: '심사 중', completed: false, due: '2025-12-31' },
      { name: '승인', completed: false, due: '2026-01-15' }
    ]
  }
};

// API 라우트들

// 견적 시뮬레이션 API
app.get('/api/estimate', (req, res) => {
  const { size, region, facilities } = req.query;
  
  if (!size || !region) {
    return res.status(400).json({ error: 'size와 region이 필요합니다.' });
  }

  const sizeNum = parseInt(size);
  const regionPrice = mockData.estimate.regions[region] || 1000000;
  const baseCost = sizeNum * regionPrice;
  
  let facilityCost = 0;
  if (facilities) {
    const facilityList = facilities.split(',');
    facilityList.forEach(facility => {
      facilityCost += mockData.estimate.facilities[facility] || 0;
    });
  }

  const totalCost = baseCost + facilityCost;
  
  res.json({
    estimatedCost: totalCost,
    baseCost,
    facilityCost,
    breakdown: {
      size: sizeNum,
      region: region,
      regionPrice: regionPrice,
      facilities: facilities ? facilities.split(',') : []
    }
  });
});

// 계약 API
app.post('/api/contract', (req, res) => {
  const { signed } = req.body;
  
  if (signed) {
    res.json({ 
      success: true, 
      message: '계약이 성공적으로 체결되었습니다.',
      contractId: 'CONTRACT-' + Date.now()
    });
  } else {
    res.status(400).json({ 
      success: false, 
      message: '계약서에 서명해주세요.' 
    });
  }
});

// 설계 업로드 API
app.post('/api/design', upload.single('designFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ 
      success: false, 
      message: '파일을 업로드해주세요.' 
    });
  }

  res.json({
    success: true,
    message: '설계안이 성공적으로 업로드되었습니다.',
    file: {
      name: req.file.originalname,
      size: req.file.size,
      path: req.file.path
    }
  });
});

// 피드백 API
app.post('/api/feedback', (req, res) => {
  const { feedback } = req.body;
  
  res.json({
    success: true,
    message: '피드백이 성공적으로 제출되었습니다.',
    feedbackId: 'FEEDBACK-' + Date.now()
  });
});

// 진행률 조회 API
app.get('/api/progress', (req, res) => {
  res.json(mockData.progress);
});

// HACCP 상태 조회 API
app.get('/api/haccp', (req, res) => {
  res.json(mockData.haccp);
});

// 대시보드 데이터 API
app.get('/api/dashboard', (req, res) => {
  res.json({
    project: {
      name: '서울 식품공장 프로젝트',
      status: '진행 중',
      startDate: '2025-01-15',
      expectedEndDate: '2025-06-15'
    },
    estimate: {
      totalCost: 1500000000,
      paid: 450000000,
      remaining: 1050000000
    },
    progress: mockData.progress,
    haccp: mockData.haccp,
    recentActivities: [
      { action: '견적서 승인', date: '2025-01-10', status: '완료' },
      { action: '계약 체결', date: '2025-01-15', status: '완료' },
      { action: '설계안 검토', date: '2025-01-20', status: '진행 중' },
      { action: '착공', date: '2025-02-01', status: '예정' }
    ]
  });
});

// 로그인 API (Mock)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email && password) {
    res.json({
      success: true,
      message: '로그인 성공',
      user: {
        id: 1,
        email: email,
        name: '관리자'
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: '이메일과 비밀번호를 입력해주세요.'
    });
  }
});

// 에러 핸들링 미들웨어
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: '파일 크기가 너무 큽니다. 최대 10MB까지 업로드 가능합니다.'
      });
    }
  }
  
  console.error('서버 에러:', error);
  res.status(500).json({
    success: false,
    message: '서버 내부 오류가 발생했습니다.'
  });
});

// 404 핸들러
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: '요청한 API 엔드포인트를 찾을 수 없습니다.'
  });
});

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 오프로 식품공장 설립 플랫폼 서버 시작');
  console.log('='.repeat(50));
  console.log(`🔧 API 서버: http://localhost:${PORT}`);
  console.log(`📱 Next.js 앱: http://localhost:3000`);
  console.log(`📁 업로드 디렉토리: ${UPLOAD_DIR}`);
  console.log(`📏 최대 파일 크기: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  console.log('='.repeat(50));
  console.log('✅ 서버가 정상적으로 시작되었습니다!');
});
