# 5PRO 웹사이트 설정 가이드

## 🎯 프로젝트 개요

howbuild.com 스타일을 5PRO 콘셉트로 완전히 재구성한 Next.js 14 웹사이트입니다.

### 핵심 특징
- ✅ howbuild 스타일 정보구조 1:1 매핑
- ✅ "AI 티 제거" 자연스러운 카피/디자인
- ✅ 성능 최적화 (Lighthouse 90+ 목표)
- ✅ 접근성 준수 (WCAG 2.1 AA)
- ✅ Schema.org 구조화 데이터

---

## 📁 프로젝트 구조

```
5pro/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 루트 레이아웃 (헤더/푸터 포함)
│   │   ├── page.tsx             # 홈페이지 (섹션 시퀀스)
│   │   ├── solutions/           # 솔루션 페이지
│   │   ├── cases/               # 건축사례
│   │   ├── contact/             # 상담 신청
│   │   └── support/faq/         # FAQ
│   └── components/
│       └── 5pro/                # 5PRO 전용 컴포넌트
│           ├── SiteHeader.tsx   # 헤더 (스크롤 효과, 모바일 드로어)
│           ├── SiteFooter.tsx   # 푸터
│           ├── HeroPrimary.tsx  # 히어로 섹션
│           ├── ProcessSteps.tsx # 6단계 프로세스
│           ├── StakeholderTiles.tsx # 발주사/설계사/시공사
│           ├── PartnerLogoStrip.tsx # 파트너 로고
│           ├── SolutionCards.tsx    # 솔루션 카드
│           ├── CaseGrid.tsx         # 사례 그리드
│           ├── KPIStats.tsx         # KPI 통계 (숫자 애니메이션)
│           ├── EnterpriseCTA.tsx    # 기업 제휴 CTA
│           └── FAQAccordion.tsx     # FAQ 아코디언
├── data/
│   ├── kpi.json                 # KPI 데이터
│   ├── partners.json            # 파트너 데이터
│   ├── cases.json               # 사례 데이터
│   └── faq.json                 # FAQ 데이터
├── public/
│   └── images/
│       ├── hero/                # 히어로 이미지
│       ├── cases/               # 사례 이미지
│       └── partners/            # 파트너 로고
└── tailwind.config.js           # 디자인 토큰
```

---

## 🚀 시작하기

### 1. 개발 서버 실행

```bash
# 패키지 설치
pnpm install

# 개발 서버 시작
pnpm dev
```

브라우저에서 http://localhost:3000 접속

### 2. 프로덕션 빌드

```bash
pnpm build
pnpm start
```

---

## 🎨 디자인 토큰

### 컬러
- **Primary**: `#1A2DFF` (브랜드 블루)
- **Primary Hover**: `#0A0AC2`
- **무채색**: gray-50 ~ gray-900 (80% 비중)

### 타이포그래피
- **폰트**: Inter (Google Fonts)
- **제목**: 4xl ~ 6xl, font-bold
- **본문**: base ~ xl, leading-relaxed

### 간격
- **컨테이너**: max-w-[1200px]
- **섹션 Y**: pt-20 pb-20
- **카드 radius**: 16px

### 그림자
- **soft**: `0 12px 36px rgba(0,0,0,0.06)`
- **soft-hover**: `0 16px 48px rgba(0,0,0,0.12)`

### 애니메이션
- **duration**: 120ms
- **easing**: cubic-bezier(0.2,0,0,1)
- **원칙**: 1가지 패턴만 (fade + translateY)

---

## 📄 홈 섹션 순서

1. **HeroPrimary** - 메인 히어로
2. **ProcessSteps** - 6단계 프로세스
3. **StakeholderTiles** - 발주사/설계사/시공사
4. **PartnerLogoStrip** - 파트너 로고
5. **SolutionCards** - 솔루션 4개
6. **CaseGrid** - 사례 그리드
7. **KPIStats** - KPI 통계 (배경: 브랜드 블루)
8. **EnterpriseCTA** - 기업 제휴 CTA
9. **FAQAccordion** - FAQ

---

## 🔧 커스터마이징 가이드

### 1. KPI 수치 변경

`data/kpi.json` 수정:
```json
{
  "stats": [
    {
      "id": "projects",
      "label": "프로젝트",
      "value": 47,  // 여기를 수정
      "unit": "건",
      ...
    }
  ]
}
```

### 2. 파트너 추가

`data/partners.json`에 항목 추가:
```json
{
  "id": "p11",
  "name": "새 파트너",
  "logo": "/images/partners/new-logo.png",
  "category": "construction",
  "description": "전문 분야"
}
```

### 3. FAQ 추가/수정

`data/faq.json` 수정

### 4. 사례 추가

`data/cases.json`에 항목 추가

---

## 🖼️ 이미지 교체 가이드

### 필수 교체 이미지

1. **히어로 이미지**
   - 경로: `public/images/hero/factory-hero.jpg`
   - 권장 크기: 1200x900px
   - 포맷: JPG (최적화 필수)

2. **사례 썸네일**
   - 경로: `public/images/cases/`
   - 권장 크기: 800x600px
   - 파일명: `data/cases.json`의 thumbnail 값과 일치

3. **파트너 로고**
   - 경로: `public/images/partners/`
   - 권장 크기: 200x80px (SVG 권장)
   - 흑백 처리 권장

4. **OG 이미지**
   - 경로: `public/images/og-image.jpg`
   - 크기: 1200x630px (필수)

### 이미지 최적화 팁
- JPG: 품질 80-85%, 압축 사용
- PNG: TinyPNG로 압축
- next/image가 자동 최적화하지만 원본도 최적화 필수

---

## ⚙️ 메타데이터 수정

### 1. 기본 메타데이터

`src/app/layout.tsx` 수정:
```typescript
export const metadata: Metadata = {
  title: {
    default: '5PRO - 식품공장 계획부터 가동까지',
    template: '%s | 5PRO',
  },
  description: '...',
  // ...
}
```

### 2. Schema.org 데이터

`src/app/layout.tsx`의 jsonLd 객체 수정:
```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '5PRO',
  // 실제 정보로 교체
  address: { ... },
  contactPoint: { ... },
}
```

### 3. 페이지별 메타데이터

각 페이지 파일에서 `metadata` export 수정

---

## 🎯 성능 최적화 체크리스트

### Lighthouse 목표: 90+ (모든 항목)

- ✅ **Performance**
  - [ ] 이미지 최적화 (next/image)
  - [ ] 폰트 preload
  - [ ] 코드 스플리팅 (자동)
  - [ ] LCP ≤ 2.5s

- ✅ **SEO**
  - [ ] 메타태그 확인
  - [ ] Schema.org 데이터
  - [ ] Sitemap 생성 (추후)
  - [ ] robots.txt

- ✅ **Accessibility**
  - [ ] aria-label 확인
  - [ ] 키보드 탐색 테스트
  - [ ] 명도 대비 4.5:1 이상

- ✅ **Best Practices**
  - [ ] HTTPS
  - [ ] console.log 제거 (프로덕션)
  - [ ] 보안 헤더 설정

---

## 📝 콘텐츠 작성 가이드

### "AI 티 제거" 규칙

#### 1. 문장 길이
- 14~24자 중심
- 장·단문 리듬 섞기
- ❌ "저희는 고객님의 만족을 최우선으로 생각하며..."
- ✅ "끝까지 책임집니다."

#### 2. 톤
- 확언형 + 여백
- 숫자와 서술형 혼용
- ❌ "약 47개 이상의 프로젝트"
- ✅ "47개 프로젝트"

#### 3. 금지 표현
- 과한 미사여구
- 로봇형 병렬 나열
- "혁신적인", "최고의", "선도하는" 등

#### 4. 사례 서술
- 문제 → 선택 → 결과
- 숫자는 1개만
- 구체적 상황 설명

---

## 🔗 API 연동 가이드

### 상담 폼 연동

`src/app/contact/page.tsx`의 TODO 부분 수정:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    // 실제 API 엔드포인트로 교체
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      alert('상담 신청이 접수되었습니다.');
      // 폼 리셋
    }
  } catch (error) {
    alert('오류가 발생했습니다.');
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## 🧪 테스트 체크리스트

### 기능 테스트
- [ ] 헤더 스크롤 효과 (8px 이후 배경 변경)
- [ ] 모바일 드로어 열림/닫힘
- [ ] 활성 링크 언더라인
- [ ] FAQ 아코디언 동작
- [ ] 상담 폼 제출
- [ ] KPI 숫자 애니메이션

### 반응형 테스트
- [ ] 모바일 (375px)
- [ ] 태블릿 (768px)
- [ ] 데스크톱 (1440px)

### 브라우저 테스트
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge

---

## 📦 배포 전 체크리스트

1. **콘텐츠**
   - [ ] 모든 플레이스홀더 텍스트 교체
   - [ ] 이미지 실제 자산으로 교체
   - [ ] KPI/파트너/사례 데이터 실제 값 반영

2. **메타데이터**
   - [ ] 메타 타이틀/설명 확인
   - [ ] OG 이미지 생성
   - [ ] Schema.org 데이터 검증

3. **성능**
   - [ ] Lighthouse 점수 확인
   - [ ] 이미지 최적화
   - [ ] console.log 제거

4. **SEO**
   - [ ] Google Search Console 등록
   - [ ] sitemap.xml 생성
   - [ ] robots.txt 설정

5. **보안**
   - [ ] 환경변수 설정
   - [ ] API 키 보안
   - [ ] CSP 헤더 설정

---

## 🆘 문제 해결

### 빌드 에러
```bash
# 캐시 삭제
rm -rf .next node_modules
pnpm install
pnpm build
```

### 이미지 로딩 실패
- `public/images/` 경로 확인
- 파일명 대소문자 일치 확인
- next.config.js의 images 설정 확인

### 스타일 적용 안 됨
- Tailwind 설정 확인
- globals.css import 확인
- 브라우저 캐시 삭제

---

## 📞 지원

질문이나 문제가 있으면 아래로 연락하세요:
- 이메일: dev@5pro.kr
- 이슈: GitHub Issues

---

**생성 일시**: 2025-10-18
**버전**: 1.0.0
**프레임워크**: Next.js 14.0.4 (App Router)

