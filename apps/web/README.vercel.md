# Vercel 배포 가이드

## 🚀 빠른 배포 (Mock 데이터)

### 1. Vercel 계정 준비
- https://vercel.com 에서 계정 생성
- GitHub 연동

### 2. 프로젝트 Import
```bash
# GitHub에 프로젝트 푸시
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo>
git push -u origin main
```

### 3. Vercel에서 Import
1. Vercel 대시보드에서 "New Project" 클릭
2. GitHub 저장소 선택
3. Framework Preset: **Next.js** 선택
4. Root Directory: **apps/web** 입력
5. Build Command: `pnpm build`
6. Install Command: `cd ../.. && pnpm install`

### 4. 환경 변수 설정
Vercel 프로젝트 설정에서 다음 환경 변수 추가:

```env
NEXT_PUBLIC_DEMO_MODE=true
NEXTAUTH_SECRET=<generate-random-32-char-string>
NEXTAUTH_URL=https://<your-app>.vercel.app
```

NEXTAUTH_SECRET 생성:
```bash
openssl rand -base64 32
```

### 5. 배포
- "Deploy" 버튼 클릭
- 배포 완료 후 URL 확인

### 6. 테스트
배포된 앱에서 로그인:
- 이메일: `admin@5pro.local` 또는 `demo@5pro.local`
- 비밀번호: 아무거나 (데모 모드에서는 무시됨)

## 📝 데모 모드 특징

데모 모드(`NEXT_PUBLIC_DEMO_MODE=true`)에서는:
- ✅ 실제 데이터베이스 불필요
- ✅ 실제 API 서버 불필요
- ✅ Mock 데이터로 모든 기능 시연
- ✅ 빠른 배포 및 테스트
- ✅ 비용 없음 (Vercel Free tier)

## 🔄 프로덕션 모드로 전환

실제 프로덕션 배포 시:
1. `NEXT_PUBLIC_DEMO_MODE=false` 설정
2. `DATABASE_URL` 추가 (MySQL)
3. `API_URL` 추가 (별도 API 서버)
4. API 서버도 배포 필요

## 📱 Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포
cd apps/web
vercel

# 프로덕션 배포
vercel --prod
```

## 🎨 커스텀 도메인

Vercel 프로젝트 설정 > Domains에서 커스텀 도메인 추가 가능

## 🐛 트러블슈팅

### 빌드 실패
- Root Directory가 `apps/web`인지 확인
- Install Command: `cd ../.. && pnpm install`
- Build Command: `pnpm build`

### 환경 변수 오류
- `NEXTAUTH_SECRET`이 설정되었는지 확인
- `NEXT_PUBLIC_DEMO_MODE=true`인지 확인

### 로그인 실패
- 이메일: `admin@5pro.local` 사용
- 비밀번호: 데모 모드에서는 무시되므로 아무거나 입력

## 📊 성능 최적화

Vercel은 자동으로:
- Edge Network CDN
- 이미지 최적화
- 서버리스 함수
- 자동 캐싱

을 제공합니다.

