# 오프로 (Offro) - 식품공장 설립 플랫폼

식품공장 설립을 원스톱으로 지원하는 모바일 웹 플랫폼입니다.

## 🚀 주요 기능

### 1. 견적 시뮬레이션
- 지역, 규모, 용도, 필요 시설 옵션 입력
- 단순 수식 기반 예상 건설 비용 계산
- placeholder 조감도 이미지 표시

### 2. 계약 관리
- 전자계약 서명 mock (체크박스/버튼 기반)
- 계약서 미리보기 및 다운로드

### 3. 설계 관리
- 설계안 업로드 (파일 업로드 UI)
- 피드백 작성 및 관리 시스템

### 4. 건설 진행 모니터링
- 공정 단계별(착공 → 골조 → 설비 → 완공) 진행률 바
- 현장 사진 갤러리
- 일정 및 마일스톤 관리

### 5. HACCP 인증 관리
- 단계별 체크리스트 (준비 → 심사 → 승인)
- 예상 소요 기간/비용 표
- 진행률 추적

### 6. 통합 대시보드
- 프로젝트 전체 현황 요약
- 주요 지표 카드
- 최근 활동 내역

## 🛠 기술 스택

- **Frontend**: Next.js 14 (React 18)
- **Backend**: Express.js
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Icons**: Lucide React

## 📱 페이지 구성

1. `/` - 메인 랜딩 (오프로 소개 + "견적 시뮬레이션 시작" 버튼)
2. `/estimate` - 견적 입력 → 자동 계산 결과 표시
3. `/contract` - 계약 mock 서명 페이지
4. `/design` - 설계안 업로드 + 피드백 폼
5. `/monitor` - 진행률 바 + 공정 이미지
6. `/haccp` - HACCP 체크리스트
7. `/dashboard` - 프로젝트 요약 (mock 데이터로 카드 구성)

## 🚀 실행 방법

### 🚀 빠른 시작 (추천!)

#### 방법 1: 자동 실행 스크립트 사용
```bash
# Windows에서
start.bat

# 또는 수동으로
npm run setup
npm run dev:all
```

#### 방법 2: 개별 실행
```bash
# 1. 의존성 설치 및 초기 설정
npm run setup

# 2. Express.js API 서버 실행 (터미널 1)
npm run server

# 3. Next.js 앱 실행 (터미널 2)
npm run dev
```

### 🌐 정적 HTML 실행 (서버 없이)

#### 방법 1: Python 사용
```bash
# open_offro.bat 파일을 더블클릭하거나
open_offro.bat

# 또는 수동으로
cd out
python -m http.server 8080
```

#### 방법 2: Node.js 사용
```bash
# open_offro_node.bat 파일을 더블클릭하거나
open_offro_node.bat

# 또는 수동으로
cd out
npx serve -s . -l 8080
```

#### 방법 3: 직접 HTML 파일 열기
`out` 폴더의 `index.html` 파일을 브라우저에서 직접 열어서 사용할 수 있습니다.

**접속**: 
- 개발 모드: http://localhost:3000 (Next.js) + http://localhost:3001 (API)
- 정적 모드: http://localhost:8080

### 🔧 개발 환경 설정

#### 필수 요구사항
- Node.js 18.0.0 이상
- npm 8.0.0 이상

#### 초기 설정
```bash
# 프로젝트 클론 후
cd 5pro

# 의존성 설치 및 초기 설정
npm run setup

# 개발 서버 시작 (API + Next.js 동시 실행)
npm run dev:all
```

#### 개별 서버 실행
```bash
# API 서버만 실행
npm run server

# Next.js 앱만 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start

# 캐시 정리
npm run clean
```

## 📡 API 엔드포인트

### 견적 시뮬레이션
- `GET /api/estimate?size=100&region=서울&facilities=냉장시설,냉동시설`
  - 예상 건설 비용 계산

### 계약 관리
- `POST /api/contract`
  - 계약 체결 처리

### 설계 관리
- `POST /api/design`
  - 설계안 파일 업로드
- `POST /api/feedback`
  - 피드백 제출

### 진행 모니터링
- `GET /api/progress`
  - 건설 진행 상황 조회

### HACCP 관리
- `GET /api/haccp`
  - HACCP 인증 상태 조회

### 대시보드
- `GET /api/dashboard`
  - 프로젝트 전체 현황 조회

## 📁 프로젝트 구조

```
C:\5pro\
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # 전역 스타일
│   │   ├── layout.tsx      # 루트 레이아웃
│   │   ├── page.tsx        # 메인 페이지
│   │   ├── estimate/       # 견적 시뮬레이션
│   │   ├── contract/       # 계약 관리
│   │   ├── design/         # 설계 관리
│   │   ├── monitor/        # 진행 모니터링
│   │   ├── haccp/          # HACCP 인증
│   │   └── dashboard/      # 대시보드
│   └── components/
│       └── Navigation.tsx  # 하단 네비게이션
├── server.js               # Express.js API 서버
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 디자인 특징

- **모바일 우선**: 모바일 웹에 최적화된 반응형 디자인
- **관리자 대시보드 스타일**: 깔끔하고 직관적인 UI/UX
- **TailwindCSS**: 유틸리티 기반 스타일링
- **일관된 컬러 팔레트**: Primary Blue 계열 컬러 사용

## 🔧 개발 환경 설정

1. Node.js 18+ 설치
2. 프로젝트 클론 또는 다운로드
3. `npm install` 실행
4. 두 개의 터미널에서 각각 서버 실행

## 📝 주요 특징

- **Mock 데이터**: 실제 데이터베이스 없이 Mock API로 동작
- **파일 업로드**: Multer를 사용한 파일 업로드 처리
- **진행률 추적**: 실시간 진행률 바와 상태 표시
- **체크리스트**: HACCP 인증을 위한 단계별 체크리스트
- **반응형 디자인**: 모바일과 데스크톱 모두 지원

## 🚀 배포

프로덕션 배포를 위해서는:

1. `npm run build` - Next.js 앱 빌드
2. Express.js 서버를 프로덕션 환경에 배포
3. 환경 변수 설정 (데이터베이스 연결 등)

## 📞 지원

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.
