# 🔍 5PRO 프로젝트 기술 점검 리포트

**작성일**: 2025-10-16  
**프로젝트**: 5PRO - 공장 건설 관리 시스템  
**버전**: 1.0.0  
**리포지토리**: https://github.com/yunseokse0/5pro

---

## 📋 목차

1. [심각한 문제점 (즉시 수정 필요)](#심각한-문제점-즉시-수정-필요)
2. [중요한 문제점](#중요한-문제점)
3. [개선 권장사항](#개선-권장사항)
4. [우선순위별 작업 목록](#우선순위별-작업-목록)
5. [즉시 실행 가능한 명령어](#즉시-실행-가능한-명령어)
6. [결론](#결론)

---

## ⚠️ 심각한 문제점 (즉시 수정 필요)

### 1. 보안 취약점 (CRITICAL)

#### 📌 Next.js 버전 취약점

**현재 버전**: `14.0.4`  
**권장 버전**: `14.2.32` 이상

**발견된 취약점**:
- 🔴 **Critical (1개)**: Authorization Bypass in Next.js Middleware
  - [GHSA-f82v-jwr5-mffw](https://github.com/advisories/GHSA-f82v-jwr5-mffw)
- 🟠 **High (3개)**:
  - Next.js Server-Side Request Forgery (SSRF) - [GHSA-fr5h-rqp8-mj6g](https://github.com/advisories/GHSA-fr5h-rqp8-mj6g)
  - Next.js Cache Poisoning - [GHSA-gp8f-8m3g-qvj9](https://github.com/advisories/GHSA-gp8f-8m3g-qvj9)
  - Next.js Authorization Bypass - [GHSA-7gfc-8cq8-jh5f](https://github.com/advisories/GHSA-7gfc-8cq8-jh5f)
- 🟡 **Moderate (6개)**:
  - DoS in Image Optimization
  - DoS with Server Actions
  - Cache Key Confusion
  - SSRF in Middleware Redirect
  - Content Injection

**영향**:
- 인증 우회 가능 → 관리자 페이지 무단 접근
- SSRF 공격 가능 → 내부 네트워크 침투
- DoS 공격 가능 → 서비스 중단

**해결 방법**:
```bash
pnpm update next@latest
# 또는
pnpm add next@14.2.32
```

---

#### 📌 하드코딩된 API 키 (CRITICAL)

**위치**: `src/app/api/generate-3d-visualization/route.ts:533`

```typescript
// ❌ 심각한 보안 이슈
const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyBJTUfNHa-h8JRV83E7kKrKl_Z0eInLMrA'
```

**영향**:
- ✗ 공개 리포지토리에 API 키 노출
- ✗ 무단 사용으로 인한 요금 폭탄 위험
- ✗ Google API 약관 위반

**즉시 조치 필요**:
1. GitHub 리포지토리에서 해당 API 키 검색 및 삭제
2. Google Cloud Console에서 API 키 재발급
3. 코드 수정

**수정 코드**:
```typescript
// ✅ 올바른 방법
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  return NextResponse.json(
    { error: 'GEMINI_API_KEY 환경 변수가 설정되지 않았습니다.' },
    { status: 500 }
  );
}
```

**환경 변수 설정**:
```env
# .env 파일에 추가
GEMINI_API_KEY=새로운_API_키
```

---

#### 📌 환경 변수 검증 부재

**문제점**:
- 필수 환경 변수 없이도 서버가 실행됨
- 런타임 에러 발생 가능
- 디버깅 어려움

**현재 상태**:
```typescript
// apps/api/src/index.ts
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'development-secret-key';
const PORT = process.env.API_PORT || 4000;
```

**개선 방안**:
```typescript
// apps/api/src/config.ts (새로 생성)
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url('DATABASE_URL이 유효한 URL이어야 합니다'),
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET은 최소 32자 이상이어야 합니다'),
  API_PORT: z.string().default('4000').transform(Number),
  CORS_ORIGIN: z.string().url(),
  GEMINI_API_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);

// 사용
// apps/api/src/index.ts
import { env } from './config';

const app = express();
const PORT = env.API_PORT;
```

**장점**:
- ✓ 서버 시작 전 환경 변수 검증
- ✓ 명확한 에러 메시지
- ✓ 타입 안전성 확보

---

### 2. esbuild 취약점

**패키지**: `esbuild <= 0.24.2`  
**위치**: `apps/api/vitest` 의존성

**취약점**: 개발 서버가 임의 웹사이트의 요청을 허용하여 응답 읽기 가능

**영향**: 개발 환경에서만 영향 (프로덕션 무관)

**해결**:
```bash
pnpm update esbuild@latest
```

---

## 🔴 중요한 문제점

### 3. 타입 안전성 부족

**현황**:
- **101개의 `any` 타입 사용** (33개 파일)
- TypeScript의 타입 체킹 무력화
- 런타임 에러 위험 증가

**주요 발견 위치**:
```typescript
// ❌ apps/api/src/routes/rbac.ts:6
router.get('/me', authenticate, async (req: any, res, next) => {
  res.json({ user: req.user });
});

// ❌ apps/api/src/routes/projects.ts
router.get('/', authenticate, authorize('projects', 'read'), 
  async (req: any, res, next) => {
    // ...
  }
);
```

**수정 방법**:
```typescript
// ✅ 올바른 타입 사용
import { AuthRequest } from '../middleware/auth';

router.get('/me', authenticate, async (req: AuthRequest, res, next) => {
  res.json({ user: req.user });
});
```

**타입스크립트 설정 강화**:
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true
  }
}
```

---

### 4. 모노레포 구조 문제

#### 🔸 중복 설정 파일

**문제점**:
- `package.json` 중복: Root와 apps/web
- `next.config.js` 중복: Root와 apps/web
- `tsconfig.json` 중복: Root, apps/web, apps/api, packages/*

**영향**:
- 빌드 경로 혼란
- Vercel 배포 시 어느 설정을 사용할지 불명확
- 의존성 버전 불일치 가능성

**현재 구조**:
```
5pro/
├── package.json          ← 의존성 포함 (문제)
├── next.config.js        ← Next.js 설정 (문제)
├── apps/
│   └── web/
│       ├── package.json  ← 의존성 포함
│       └── next.config.js ← Next.js 설정
```

**권장 구조**:
```
5pro/
├── package.json          ← 워크스페이스 관리만
├── apps/
│   └── web/
│       ├── package.json  ← Next.js 의존성
│       └── next.config.js ← Next.js 설정
```

**정리 작업**:
```bash
# Root의 next.config.js 삭제
rm next.config.js

# Root의 package.json 정리
# dependencies를 devDependencies로 이동하거나 제거
```

---

#### 🔸 빌드 스크립트 불일치

**Root package.json**:
```json
{
  "scripts": {
    "dev": "next dev",           // ❌ Root에서 Next.js 실행
    "build": "next build",        // ❌ Root에서 빌드
    "build:all": "pnpm --filter @5pro/db build && ..."  // ✅ 올바름
  }
}
```

**문제점**:
- `pnpm dev` 실행 시 Root의 Next.js 실행 (apps/web가 아님)
- `pnpm build` 실행 시 Root에서 빌드 시도

**수정안**:
```json
{
  "scripts": {
    "dev": "pnpm --filter @5pro/web dev",
    "dev:all": "concurrently \"pnpm --filter @5pro/web dev\" \"pnpm --filter @5pro/api dev\"",
    "build": "pnpm build:all",
    "build:all": "pnpm --filter @5pro/db build && pnpm --filter @5pro/ui build && pnpm --filter @5pro/api build && pnpm --filter @5pro/web build"
  }
}
```

---

### 5. 성능 및 최적화 이슈

#### 🔸 이미지 최적화 비활성화

**위치**: `next.config.js:6`

```javascript
images: {
  unoptimized: true,  // ❌ 최적화 비활성화
  domains: ['images.unsplash.com', 'via.placeholder.com'],
}
```

**영향**:
- 이미지 파일 크기 큰 채로 전송
- 로딩 속도 느림 (특히 모바일)
- CDN 효과 없음
- 대역폭 낭비

**해결**:
```javascript
images: {
  unoptimized: false,  // ✅ 최적화 활성화
  domains: ['images.unsplash.com', 'via.placeholder.com'],
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

**추가 권장**:
```tsx
// ❌ 일반 img 태그
<img src="/imgs/project.jpg" alt="Project" />

// ✅ Next.js Image 컴포넌트
import Image from 'next/image';
<Image 
  src="/imgs/project.jpg" 
  alt="Project"
  width={800}
  height={600}
  priority
/>
```

---

#### 🔸 데이터베이스 쿼리 최적화

**긍정적**: 모든 API 엔드포인트에 페이지네이션 구현됨 ✅

**추가 개선 사항**:

1. **복합 인덱스 추가**:
```prisma
model AuditLog {
  // 현재
  @@index([userId])
  @@index([createdAt])
  
  // 추가 권장
  @@index([userId, createdAt])  // 사용자별 최근 로그 조회 시
  @@index([resource, action])   // 리소스별 액션 필터링 시
}

model Project {
  @@index([userId, status])     // 사용자별 상태 필터링
  @@index([partnerId, status])  // 파트너별 상태 필터링
}
```

2. **Select 필드 최적화**:
```typescript
// ❌ 모든 필드 가져오기
const user = await prisma.user.findUnique({ where: { id } });

// ✅ 필요한 필드만 선택
const user = await prisma.user.findUnique({
  where: { id },
  select: {
    id: true,
    email: true,
    name: true,
    role: { select: { name: true } }
  }
});
```

3. **Connection Pooling 설정**:
```env
# .env
DATABASE_URL="mysql://user:pass@host:3306/db?connection_limit=10&pool_timeout=30"
```

---

## 📋 개선 권장사항

### 6. 코드 품질

#### ✅ 잘 된 점

1. **Prisma ORM 사용**
   - 타입 안전한 데이터베이스 접근
   - 자동 마이그레이션
   - 관계 관리 용이

2. **RBAC 권한 시스템**
   - 체계적인 역할 기반 접근 제어
   - 세밀한 권한 관리 가능
   - Audit Log로 추적 가능

3. **API 설계**
   - RESTful 원칙 준수
   - 페이지네이션 구현
   - Zod로 요청 검증

4. **모노레포 구조**
   - 코드 재사용성 높음
   - 의존성 공유 효율적
   - 타입 공유 용이

#### 🔧 개선 사항

**A. 환경 변수 관리 중앙화**

현재: 여러 파일에 분산
```typescript
// apps/api/src/index.ts
const PORT = process.env.API_PORT || 4000;

// apps/api/src/middleware/auth.ts
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'development-secret-key';

// apps/api/src/routes/auth.ts
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'development-secret-key';
```

개선: 중앙화된 설정
```typescript
// packages/config/index.ts (새로 생성)
import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  
  // Auth
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  
  // API
  API_URL: z.string().url().default('http://localhost:4000'),
  API_PORT: z.string().transform(Number).default('4000'),
  
  // CORS
  CORS_ORIGIN: z.string().url().default('http://localhost:3000'),
  
  // External APIs
  GEMINI_API_KEY: z.string().optional(),
  S3_ENDPOINT: z.string().url().optional(),
  S3_BUCKET: z.string().optional(),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),
  S3_REGION: z.string().optional(),
});

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const config = envSchema.parse(process.env);
```

사용:
```typescript
// apps/api/src/index.ts
import { config } from '@5pro/config';

const app = express();
const PORT = config.API_PORT;
```

---

**B. 로깅 시스템 개선**

현재: console.log만 사용
```typescript
console.log('API 호출 시작...');
console.error('Auth error:', error);
```

개선: 구조화된 로깅
```typescript
// packages/logger/index.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
});

// 사용
import { logger } from '@5pro/logger';

logger.info('API 호출 시작', { userId, endpoint: '/api/projects' });
logger.error('인증 실패', { 
  userId, 
  error: error.message,
  stack: error.stack 
});
```

---

**C. Rate Limiting 추가**

현재: Rate Limiting 없음 → DoS 공격 취약

추가:
```typescript
// apps/api/src/middleware/rate-limit.ts
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { Redis } from 'ioredis';

// 일반 API용
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // IP당 100 요청
  message: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
  standardHeaders: true,
  legacyHeaders: false,
});

// 로그인/인증용 (더 엄격)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // IP당 5번 시도
  skipSuccessfulRequests: true,
  message: '로그인 시도 횟수를 초과했습니다. 15분 후 다시 시도해주세요.',
});

// apps/api/src/index.ts
import { apiLimiter, authLimiter } from './middleware/rate-limit';

app.use('/api', apiLimiter);
app.use('/auth/login', authLimiter);
```

---

**D. CORS 설정 강화**

현재:
```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
```

개선:
```typescript
// apps/api/src/middleware/cors.ts
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000',
  'https://5pronew.vercel.app',
  process.env.CORS_ORIGIN,
].filter(Boolean);

export const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    // origin이 없으면 같은 도메인 요청 (허용)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Total-Count'],
  maxAge: 86400, // 24시간
};

// apps/api/src/index.ts
import { corsOptions } from './middleware/cors';
app.use(cors(corsOptions));
```

---

**E. API 응답 표준화**

현재: 각 엔드포인트마다 다른 응답 형식

개선:
```typescript
// packages/types/api.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    version: string;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 사용
res.json({
  success: true,
  data: projects,
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  },
  meta: {
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  }
});
```

---

**F. 에러 처리 개선**

현재:
```typescript
try {
  // ...
} catch (error) {
  next(error);
}
```

개선:
```typescript
// apps/api/src/middleware/error.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '@5pro/logger';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('API Error', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    userId: (req as any).user?.id,
  });

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code || 'API_ERROR',
        message: err.message,
        details: err.details,
      },
      meta: {
        timestamp: new Date().toISOString(),
      }
    });
  }

  // Prisma 에러
  if (err.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'DATABASE_ERROR',
        message: '데이터베이스 오류가 발생했습니다.',
      }
    });
  }

  // Zod 검증 에러
  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: '입력값이 올바르지 않습니다.',
        details: (err as any).errors,
      }
    });
  }

  // 기본 에러
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: '서버 오류가 발생했습니다.',
    }
  });
};
```

---

### 7. 테스트 커버리지 향상

현재: 테스트 코드 최소한

추가 권장:
```typescript
// apps/api/src/routes/__tests__/auth.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../index';
import { prisma } from '@5pro/db';

describe('Auth Routes', () => {
  beforeAll(async () => {
    // 테스트 데이터 생성
  });

  afterAll(async () => {
    // 테스트 데이터 정리
  });

  describe('POST /auth/login', () => {
    it('유효한 자격 증명으로 로그인 성공', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'admin@5pro.local',
          password: 'Admin!234',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe('admin@5pro.local');
    });

    it('잘못된 비밀번호로 로그인 실패', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'admin@5pro.local',
          password: 'wrong-password',
        });

      expect(response.status).toBe(401);
      expect(response.body.error.code).toBe('INVALID_CREDENTIALS');
    });
  });
});
```

---

### 8. Vercel 배포 최적화

#### 현재 vercel.json
```json
{
  "buildCommand": "next build",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```

#### 개선된 vercel.json
```json
{
  "version": 2,
  "buildCommand": "pnpm install && pnpm --filter @5pro/web build",
  "outputDirectory": "apps/web/.next",
  "framework": "nextjs",
  "regions": ["icn1"],
  "env": {
    "NEXT_PUBLIC_DEMO_MODE": "true"
  },
  "build": {
    "env": {
      "NEXT_TELEMETRY_DISABLED": "1"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

#### 데이터베이스 옵션

**1. PlanetScale (MySQL)**
- ✓ 무료 티어: 5GB 스토리지
- ✓ Vercel 통합 지원
- ✓ 서버리스 드라이버
- ✓ 자동 스케일링

```env
DATABASE_URL="mysql://user:pass@host.us-east-3.psdb.cloud/5pro_db?sslaccept=strict"
```

**2. Neon (PostgreSQL)**
- ✓ 무료 티어: 0.5GB 스토리지
- ✓ 서버리스 Postgres
- ✓ Vercel 통합
- ✓ 브랜치 기능 (개발/프로덕션 분리)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**3. Supabase (PostgreSQL)**
- ✓ 무료 티어: 500MB 스토리지
- ✓ 실시간 기능
- ✓ Auth, Storage 포함
- ✓ REST API 자동 생성

#### 환경 변수 설정 (Vercel)

Vercel Dashboard → Project Settings → Environment Variables:

```
# Production
DATABASE_URL=<PlanetScale_Connection_String>
NEXTAUTH_SECRET=<강력한_랜덤_키_32자_이상>
NEXTAUTH_URL=https://5pronew.vercel.app
API_URL=https://5pronew.vercel.app/api
CORS_ORIGIN=https://5pronew.vercel.app
GEMINI_API_KEY=<Google_API_Key>

# Preview (선택사항)
DATABASE_URL=<Dev_Database_URL>
NEXTAUTH_SECRET=<Same_As_Production>
NEXTAUTH_URL=https://preview-url.vercel.app
```

---

### 9. 모니터링 및 분석

#### A. 에러 모니터링 - Sentry

```bash
pnpm add @sentry/nextjs @sentry/node
```

```typescript
// apps/web/sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

// apps/api/src/index.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

#### B. 성능 모니터링 - Vercel Analytics

```bash
pnpm add @vercel/analytics
```

```tsx
// apps/web/src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### C. 로그 집계 - Better Stack (Logtail)

```bash
pnpm add @logtail/node @logtail/winston
```

```typescript
// packages/logger/index.ts
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

const logtail = new Logtail(process.env.LOGTAIL_TOKEN);

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new LogtailTransport(logtail),
  ]
});
```

---

### 10. API 문서화

#### Swagger/OpenAPI 추가

```bash
pnpm add swagger-ui-express swagger-jsdoc
```

```typescript
// apps/api/src/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '5PRO API',
      version: '1.0.0',
      description: '공장 건설 관리 시스템 API',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development server',
      },
      {
        url: 'https://5pronew.vercel.app/api',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };

// apps/api/src/index.ts
import { specs, swaggerUi } from './swagger';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
```

라우트에 JSDoc 추가:
```typescript
/**
 * @swagger
 * /projects:
 *   get:
 *     summary: 프로젝트 목록 조회
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 페이지 번호
 *     responses:
 *       200:
 *         description: 프로젝트 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 */
router.get('/', authenticate, authorize('projects', 'read'), ...);
```

---

### 11. CI/CD 파이프라인

#### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: test_db
        ports:
          - 3306:3306
        options: >-
          --health-cmd="mysqladmin ping"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=3
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run linter
        run: pnpm lint
      
      - name: Type check
        run: pnpm tsc --noEmit
      
      - name: Run tests
        run: pnpm test
        env:
          DATABASE_URL: mysql://root:root@localhost:3306/test_db
      
      - name: Build
        run: pnpm build:all

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📊 우선순위별 작업 목록

### 🔥 긴급 (1-2일 내)

#### 1. Next.js 보안 업데이트
```bash
pnpm update next@latest
pnpm audit fix
```

**이유**: Critical 인증 우회 취약점

**예상 시간**: 30분

**체크리스트**:
- [ ] `next` 패키지 업데이트
- [ ] 빌드 테스트
- [ ] 미들웨어 동작 확인
- [ ] 배포 테스트

---

#### 2. 하드코딩된 API 키 제거
**파일**: `src/app/api/generate-3d-visualization/route.ts`

**작업**:
1. Google Cloud Console에서 기존 API 키 삭제
2. 새 API 키 발급
3. 코드 수정:
```typescript
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  return NextResponse.json(
    { error: 'GEMINI_API_KEY 환경 변수가 필요합니다.' },
    { status: 500 }
  );
}
```
4. `.env.example` 업데이트
5. Vercel 환경 변수 설정

**예상 시간**: 20분

**체크리스트**:
- [ ] 기존 API 키 삭제/재발급
- [ ] 코드에서 하드코딩 제거
- [ ] .env.example 업데이트
- [ ] Vercel 환경 변수 설정
- [ ] 기능 테스트

---

#### 3. 환경 변수 검증 로직 추가
**새 파일**: `apps/api/src/config.ts`

```typescript
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  API_PORT: z.string().default('4000').transform(Number),
  CORS_ORIGIN: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

**예상 시간**: 40분

**체크리스트**:
- [ ] config.ts 파일 생성
- [ ] 환경 변수 스키마 정의
- [ ] 모든 env 참조를 config로 변경
- [ ] 에러 케이스 테스트

---

#### 4. Root 디렉토리 정리
```bash
# 중복 파일 제거
rm next.config.js
rm tsconfig.node.json

# package.json 정리
# dependencies → devDependencies 이동
```

**수정**: Root `package.json`
```json
{
  "scripts": {
    "dev": "pnpm --filter @5pro/web dev",
    "dev:all": "concurrently \"pnpm --filter @5pro/web dev\" \"pnpm --filter @5pro/api dev\"",
    "build": "pnpm build:all"
  }
}
```

**예상 시간**: 30분

**체크리스트**:
- [ ] 중복 설정 파일 삭제
- [ ] package.json 스크립트 수정
- [ ] 빌드 테스트
- [ ] 개발 서버 실행 테스트

---

### 🟠 중요 (1주일 내)

#### 5. TypeScript 타입 안전성 강화
**목표**: `any` 타입 제거

**작업**:
1. `AuthRequest` 타입 적용 (33개 파일)
2. `tsconfig.json` 엄격 모드 활성화
3. 타입 에러 수정

```json
// tsconfig.json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

**예상 시간**: 4-5시간

**체크리스트**:
- [ ] API 라우트 타입 수정 (20개 파일)
- [ ] Web 페이지 타입 수정 (13개 파일)
- [ ] tsconfig 엄격 모드 활성화
- [ ] 타입 체크 통과 확인

---

#### 6. Rate Limiting 추가
**새 파일**: `apps/api/src/middleware/rate-limit.ts`

```bash
pnpm --filter @5pro/api add express-rate-limit
```

**예상 시간**: 1시간

**체크리스트**:
- [ ] 패키지 설치
- [ ] 미들웨어 생성
- [ ] 로그인 엔드포인트에 적용
- [ ] API 엔드포인트에 적용
- [ ] 테스트 (100회 요청)

---

#### 7. 구조화된 로깅 시스템
**새 패키지**: `packages/logger`

```bash
pnpm add winston
pnpm --filter @5pro/logger add winston
```

**예상 시간**: 2시간

**체크리스트**:
- [ ] logger 패키지 생성
- [ ] winston 설정
- [ ] console.log 대체
- [ ] 로그 파일 생성 확인

---

#### 8. CORS 설정 강화
**파일**: `apps/api/src/middleware/cors.ts`

**예상 시간**: 30분

**체크리스트**:
- [ ] cors.ts 파일 생성
- [ ] 허용 도메인 목록 설정
- [ ] index.ts에 적용
- [ ] 크로스 도메인 테스트

---

#### 9. 이미지 최적화 활성화
**파일**: `apps/web/next.config.js`

```javascript
images: {
  unoptimized: false,
  formats: ['image/avif', 'image/webp'],
}
```

**예상 시간**: 1시간

**체크리스트**:
- [ ] next.config.js 수정
- [ ] img 태그 → Image 컴포넌트 변경
- [ ] 빌드 테스트
- [ ] 이미지 로딩 속도 측정

---

### 🟡 권장 (2주일 내)

#### 10. Sentry 에러 모니터링
```bash
pnpm add @sentry/nextjs @sentry/node
```

**예상 시간**: 2시간

---

#### 11. Swagger API 문서화
```bash
pnpm --filter @5pro/api add swagger-ui-express swagger-jsdoc
```

**예상 시간**: 4시간

---

#### 12. E2E 테스트 확대
**목표**: 주요 플로우 커버리지 80%

**예상 시간**: 8시간

---

#### 13. CI/CD 파이프라인
**파일**: `.github/workflows/ci.yml`

**예상 시간**: 3시간

---

#### 14. 데이터베이스 인덱스 최적화
**파일**: `packages/db/prisma/schema.prisma`

**예상 시간**: 2시간

---

## 💻 즉시 실행 가능한 명령어

### 보안 업데이트
```bash
# Next.js 업데이트
pnpm update next@latest

# 보안 취약점 수정
pnpm audit fix

# esbuild 업데이트
pnpm update esbuild@latest
```

### 타입 체크 강화
```bash
# tsconfig.json 수정 후
pnpm tsc --noEmit

# 모든 워크스페이스 타입 체크
pnpm -r exec tsc --noEmit
```

### 환경 정리
```bash
# Root의 불필요한 파일 삭제
rm next.config.js
rm tsconfig.node.json

# 빌드 파일 정리
rm -rf .next dist node_modules/.cache

# 의존성 재설치
pnpm install
```

### .env.example 업데이트
```bash
cat > .env.example << 'EOF'
# Database (Required)
DATABASE_URL="mysql://user:password@host:3306/database"

# Auth (Required)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""  # 32자 이상 필수 (openssl rand -base64 32)

# API (Required)
API_URL="http://localhost:4000"
API_PORT=4000

# CORS (Required)
CORS_ORIGIN="http://localhost:3000"

# Google Gemini (Required for 3D Visualization)
GEMINI_API_KEY=""

# S3 Storage (Optional)
# S3_ENDPOINT="https://s3.amazonaws.com"
# S3_BUCKET="5pro-uploads"
# S3_ACCESS_KEY_ID=""
# S3_SECRET_ACCESS_KEY=""
# S3_REGION="us-east-1"

# Monitoring (Optional)
# SENTRY_DSN=""
# LOGTAIL_TOKEN=""
EOF
```

### 코드 품질 검사
```bash
# ESLint 실행
pnpm lint

# Prettier 포맷팅
pnpm prettier --write "**/*.{ts,tsx,js,jsx,json,md}"

# 타입 체크
pnpm tsc --noEmit
```

### 데이터베이스 작업
```bash
# Prisma 클라이언트 재생성
pnpm --filter @5pro/db generate

# 마이그레이션 생성
pnpm --filter @5pro/db migrate dev --name update_schema

# 데이터베이스 리셋 (개발 환경)
pnpm --filter @5pro/db migrate reset
```

### 테스트 실행
```bash
# 단위 테스트
pnpm test

# E2E 테스트
pnpm test:e2e

# 커버리지 포함
pnpm test --coverage
```

### Vercel 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

---

## 🎯 결론

### 전체 평가: ⭐⭐⭐☆☆ (3/5)

#### ✅ 강점

1. **체계적인 아키텍처**
   - Monorepo 구조로 코드 재사용성 높음
   - Prisma ORM으로 타입 안전성 확보
   - 모듈화된 패키지 구조

2. **보안 기능**
   - RBAC 권한 관리 체계
   - JWT 기반 인증
   - Audit Log로 추적 가능
   - Helmet.js로 HTTP 헤더 보호

3. **API 설계**
   - RESTful 원칙 준수
   - 모든 엔드포인트 페이지네이션
   - Zod로 입력 검증
   - 일관된 에러 처리

4. **개발자 경험**
   - TypeScript로 타입 안전성
   - Hot Reload 지원
   - 명확한 프로젝트 구조
   - 상세한 README

#### ❌ 약점

1. **보안 취약점**
   - Next.js 버전 낮음 (12개 취약점)
   - API 키 하드코딩
   - 환경 변수 검증 없음
   - Rate Limiting 없음

2. **코드 품질**
   - 101개 `any` 타입 사용
   - console.log만 사용
   - 타입스크립트 엄격 모드 미적용
   - 테스트 커버리지 낮음

3. **구조 문제**
   - Root 디렉토리 정리 필요
   - 설정 파일 중복
   - 의존성 관리 혼란
   - 빌드 스크립트 불일치

4. **성능**
   - 이미지 최적화 비활성화
   - 로깅 시스템 부재
   - 모니터링 없음
   - 캐싱 전략 없음

#### 🎯 현재 상태

| 항목 | 점수 | 상태 |
|------|------|------|
| 보안 | 2/5 | 🔴 취약 |
| 코드 품질 | 3/5 | 🟡 보통 |
| 성능 | 3/5 | 🟡 보통 |
| 아키텍처 | 4/5 | 🟢 양호 |
| 문서화 | 4/5 | 🟢 양호 |
| 테스트 | 2/5 | 🔴 부족 |

**종합 점수**: **3.0/5**

#### 📈 개선 후 예상 점수

위의 "긴급" 및 "중요" 항목 완료 시:

| 항목 | 현재 | 개선 후 |
|------|------|---------|
| 보안 | 2/5 | 4.5/5 |
| 코드 품질 | 3/5 | 4/5 |
| 성능 | 3/5 | 4/5 |
| 아키텍처 | 4/5 | 4.5/5 |
| 문서화 | 4/5 | 4.5/5 |
| 테스트 | 2/5 | 3.5/5 |

**예상 종합 점수**: **4.2/5** ⭐⭐⭐⭐☆

#### 🚀 다음 단계

1. **즉시 (오늘)**
   - Next.js 업데이트
   - API 키 재발급

2. **이번 주**
   - 환경 변수 검증
   - Root 디렉토리 정리
   - Rate Limiting 추가

3. **다음 주**
   - 타입 안전성 강화
   - 로깅 시스템 도입
   - 이미지 최적화

4. **이번 달**
   - 모니터링 시스템
   - API 문서화
   - CI/CD 파이프라인

#### 💡 핵심 메시지

**프로젝트는 좋은 기반을 가지고 있지만, 프로덕션 배포 전 보안 강화가 필수입니다.**

"긴급" 항목만 완료해도 배포 가능한 수준이 되며, "중요" 항목까지 완료하면 엔터프라이즈급 품질에 도달할 수 있습니다.

---

## 📞 추가 지원

- **GitHub Issues**: 버그 리포트 및 기능 제안
- **Pull Requests**: 코드 개선 기여
- **Documentation**: README 및 SETUP 가이드 참조

---

**작성자**: AI Code Auditor  
**최종 업데이트**: 2025-10-16  
**다음 점검 권장일**: 2025-11-16


