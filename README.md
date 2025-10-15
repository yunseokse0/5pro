# 5PRO - 공장 건설 관리 시스템

HACCP 인증 공장 건설 및 관리를 위한 통합 플랫폼 모노레포

## 🏗 기술 스택

### 모노레포 구조
- **pnpm workspaces**: 효율적인 패키지 관리
- **apps/web**: Next.js 14 (App Router, TypeScript)
- **apps/api**: Express + TypeScript REST API
- **packages/db**: Prisma ORM + MySQL
- **packages/ui**: shadcn/ui 컴포넌트 래퍼

### 주요 기능
- **인증**: NextAuth (Credentials Provider, OAuth 확장 가능)
- **권한 관리**: 역할 기반 접근 제어(RBAC)
- **테스트**: Vitest (단위), Playwright (E2E)
- **국제화**: next-intl (한국어 기본)
- **파일 업로드**: S3 호환 스토리지 (Signed URL)

## 📦 프로젝트 구조

```
5pro_new/
├── apps/
│   ├── api/          # Express API 서버
│   └── web/          # Next.js 웹 애플리케이션
├── packages/
│   ├── db/           # Prisma 스키마 및 클라이언트
│   └── ui/           # 공유 UI 컴포넌트
├── package.json      # 루트 설정
├── pnpm-workspace.yaml
└── .env.example
```

## 🚀 빠른 시작

### 1. 환경 설정

```bash
# .env 파일 생성
cp .env.example .env

# 환경 변수 수정
# DATABASE_URL, NEXTAUTH_SECRET, S3 설정 등
```

### 2. 설치 및 초기화

```bash
# 의존성 설치
pnpm install

# 데이터베이스 마이그레이션 및 시드
pnpm db:migrate
pnpm db:seed
```

### 3. 개발 서버 실행

```bash
# API + Web 동시 실행
pnpm dev

# 또는 개별 실행
pnpm --filter @5pro/api dev
pnpm --filter @5pro/web dev
```

### 4. 접속

- **웹**: http://localhost:3000
- **API**: http://localhost:4000
- **Prisma Studio**: `pnpm db:studio`

## 🔐 기본 계정

```
이메일: admin@5pro.local
비밀번호: Admin!234
```

## 📊 데이터베이스 스키마

주요 테이블:
- `users`: 사용자
- `roles`, `role_permissions`: 역할 및 권한
- `partners`, `partner_achievements`: 파트너 관리
- `estimates`, `estimate_versions`: 견적
- `visual3d_requests`, `visual3d_results`: 3D 시각화
- `projects`, `project_milestones`: 프로젝트
- `project_env_logs`: 환경 모니터링
- `project_live_feeds`: CCTV 스트림
- `haccp_stages`: HACCP 단계
- `contracts`, `contract_clauses`, `signatures`: 계약 및 전자서명
- `leads`: 리드 관리
- `catalog_items`: 자재 카탈로그
- `regions`, `industry_presets`: 설정
- `audit_logs`: 감사 로그

## 🎯 API 엔드포인트

### 인증
- `POST /auth/login` - 로그인

### RBAC
- `GET /rbac/me` - 현재 사용자 정보

### 리소스 CRUD
- `/estimates` - 견적 관리
- `/visual3d` - 3D 시각화
- `/projects` - 프로젝트
  - `/:id/milestones` - 마일스톤
  - `/:id/env` - 환경 로그
  - `/:id/live` - CCTV 피드
  - `/:id/haccp` - HACCP 단계
- `/contracts` - 계약
  - `/:id/clauses` - 조항
  - `/:id/sign` - 전자서명
- `/partners` - 파트너
- `/leads` - 리드
- `/catalog` - 카탈로그
- `/regions` - 지역
- `/presets` - 업종 프리셋
- `/files/sign` - 파일 업로드 URL 생성
- `/audit-logs` - 감사 로그

모든 엔드포인트는 페이지네이션, 필터링, 정렬 지원

## 🧪 테스트

```bash
# 단위 테스트
pnpm test

# E2E 테스트
pnpm test:e2e

# API 테스트만
pnpm --filter @5pro/api test
```

## 📱 웹 페이지

- `/admin` - 대시보드
- `/admin/estimates` - 견적 관리
- `/admin/visual3d` - 3D 시각화
- `/admin/projects` - 프로젝트 목록
  - `/admin/projects/[id]` - 프로젝트 상세 (탭: 개요, 마일스톤, 환경, LIVE, HACCP)
- `/admin/contracts` - 계약 관리
- `/admin/partners` - 파트너사
- `/admin/leads` - 리드
- `/admin/catalog` - 카탈로그
- `/admin/settings` - 설정 (지역, 프리셋, 감사 로그)

## 🔒 보안

- NextAuth 미들웨어로 `/admin` 경로 보호
- JWT 토큰 기반 인증
- 역할별 권한 확인 (API 및 프론트엔드)
- Helmet.js로 HTTP 헤더 보안
- 모든 CRUD 작업 감사 로그 기록

## 🛠 개발 스크립트

```bash
pnpm dev           # 개발 서버 실행 (API + Web)
pnpm build         # 전체 빌드
pnpm setup         # 초기 설정 (install + migrate + seed)
pnpm db:migrate    # 데이터베이스 마이그레이션
pnpm db:seed       # 시드 데이터 삽입
pnpm db:studio     # Prisma Studio 실행
pnpm lint          # 린트 실행
```

## 📦 시드 데이터

시드 스크립트는 다음을 생성합니다:
- 관리자 계정 (admin@5pro.local)
- 역할 및 권한 (admin, manager, user)
- 지역 9개 (서울, 경기, 부산 등)
- 업종 프리셋 4개 (김치공장, 제빵공장 등)
- 파트너 5개 (DIAMOND~BRONZE 등급)
- 파트너 성과 이력
- 데모 프로젝트 (마일스톤, 환경 로그, HACCP 단계 포함)
- 견적 및 버전
- 3D 요청 및 결과
- 계약 및 조항
- 리드 3개
- 카탈로그 품목 5개
- 감사 로그 샘플

## 🌐 국제화

현재 한국어(ko-KR)만 지원. 추가 언어는 `apps/web/messages/` 디렉토리에 JSON 파일 추가.

## 📄 라이선스

Private - 5PRO Internal Use Only
