# 🚀 Vercel 배포 가이드 (Mock 데이터)

## 즉시 배포 - 3단계

### 1️⃣ GitHub에 푸시
```bash
git init
git add .
git commit -m "Initial commit: 5PRO factory management system"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2️⃣ Vercel Import
1. https://vercel.com 접속 및 로그인
2. "New Project" 클릭
3. GitHub 저장소 Import
4. **중요 설정:**
   - Framework Preset: `Next.js`
   - Root Directory: `apps/web`
   - Build Command: `cd ../.. && pnpm install && cd apps/web && pnpm build`
   - Install Command: `pnpm install`

### 3️⃣ 환경 변수 설정
Vercel 프로젝트 설정에서:

```env
NEXT_PUBLIC_DEMO_MODE=true
NEXTAUTH_SECRET=<아래 명령어로 생성>
NEXTAUTH_URL=https://<your-app>.vercel.app
```

**NEXTAUTH_SECRET 생성:**
```bash
openssl rand -base64 32
```

또는

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4️⃣ Deploy!
- "Deploy" 버튼 클릭
- 3-5분 후 배포 완료
- URL 접속 및 테스트

---

## 📱 로그인 정보 (데모 모드)

배포된 앱에서:
- **이메일**: `admin@5pro.local` 또는 `demo@5pro.local`
- **비밀번호**: 아무거나 (데모 모드에서는 무시됨)

---

## ✨ 데모 모드 특징

✅ **백엔드 불필요** - Mock 데이터로 완전 동작
✅ **데이터베이스 불필요** - 메모리 내 데이터
✅ **즉시 배포 가능** - 3분이면 충분
✅ **무료** - Vercel Free tier로 가능
✅ **완전한 UI** - 모든 페이지 및 기능 동작

---

## 🎯 포함된 Mock 데이터

- ✅ 12개 프로젝트 (상세 정보 포함)
- ✅ 5개 파트너사 (등급별)
- ✅ 견적서 및 버전 이력
- ✅ 3D 시각화 요청
- ✅ 계약서 및 전자서명
- ✅ 리드 및 카탈로그
- ✅ 환경 모니터링 데이터 (30일치)
- ✅ HACCP 단계 추적
- ✅ 감사 로그

---

## 🔧 고급 설정

### Vercel CLI 사용
```bash
# CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포
cd apps/web
vercel

# 프로덕션
vercel --prod
```

### 커스텀 도메인
Vercel Dashboard > Settings > Domains

---

## 🐛 문제 해결

### 빌드 실패
```bash
# Build Command 확인:
cd ../.. && pnpm install && cd apps/web && pnpm build

# Install Command 확인:
pnpm install
```

### 환경 변수 오류
- `NEXT_PUBLIC_DEMO_MODE=true` 확인
- `NEXTAUTH_SECRET` 32자 이상 확인
- `NEXTAUTH_URL`이 배포된 URL과 일치하는지 확인

### 로그인 실패
- 이메일: `admin@5pro.local` 사용
- 데모 모드에서는 비밀번호 무시됨

---

## 🚀 프로덕션 모드 (실제 운영)

프로덕션 배포 시 추가 설정:

```env
NEXT_PUBLIC_DEMO_MODE=false
DATABASE_URL=mysql://user:pass@host:3306/db
API_URL=https://your-api.vercel.app
S3_ENDPOINT=...
S3_BUCKET=...
# ... 기타 환경 변수
```

그리고 API 서버도 별도 배포 필요 (Vercel Serverless Functions 또는 다른 호스팅)

---

## 📊 데모 사이트 예시

배포 후 다음과 같은 페이지들을 확인할 수 있습니다:
- `/admin` - 대시보드 (통계, 차트)
- `/admin/projects` - 프로젝트 목록 및 상세
- `/admin/estimates` - 견적 관리
- `/admin/visual3d` - 3D 시각화
- `/admin/contracts` - 계약 관리
- `/admin/partners` - 파트너 관리
- `/admin/leads` - 리드 관리
- `/admin/catalog` - 카탈로그
- `/admin/settings` - 시스템 설정

모두 **완전히 동작하는 Mock 데이터**로 시연 가능!

---

## 🎉 완료!

이제 Vercel URL을 공유하여 누구나 데모를 볼 수 있습니다.
실제 데이터베이스나 백엔드 없이도 완전한 시스템을 시연할 수 있습니다!

