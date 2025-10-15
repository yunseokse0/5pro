# 설치 및 설정 가이드

## 사전 요구사항

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- MySQL 8.0+

## 상세 설치 단계

### 1. MySQL 데이터베이스 생성

```sql
CREATE DATABASE 5pro_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER '5pro_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON 5pro_db.* TO '5pro_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. 환경 변수 설정

루트 디렉토리에 `.env` 파일 생성:

```env
# Database
DATABASE_URL="mysql://5pro_user:your_password@localhost:3306/5pro_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-32-character-secret-key-here"

# API
API_URL="http://localhost:4000"
API_PORT=4000

# S3 (선택사항)
S3_ENDPOINT="https://s3.amazonaws.com"
S3_BUCKET="5pro-uploads"
S3_ACCESS_KEY_ID="your-access-key"
S3_SECRET_ACCESS_KEY="your-secret-key"
S3_REGION="us-east-1"

# CORS
CORS_ORIGIN="http://localhost:3000"
```

### 3. NEXTAUTH_SECRET 생성

```bash
# OpenSSL 사용
openssl rand -base64 32

# 또는 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4. 프로젝트 설치

```bash
# pnpm 설치 (없는 경우)
npm install -g pnpm

# 전체 설정 (권장)
pnpm setup

# 또는 수동으로
pnpm install
pnpm db:migrate
pnpm db:seed
```

### 5. 개발 서버 실행

```bash
# 터미널 1: API 서버
pnpm --filter @5pro/api dev

# 터미널 2: Web 서버
pnpm --filter @5pro/web dev

# 또는 동시 실행
pnpm dev
```

## 포트 구성

- **Web (Next.js)**: 3000
- **API (Express)**: 4000
- **Prisma Studio**: 5555 (실행 시)

## 트러블슈팅

### 데이터베이스 연결 오류

```bash
# MySQL 실행 확인
sudo systemctl status mysql

# 포트 확인
netstat -an | grep 3306
```

### Prisma 마이그레이션 오류

```bash
# 마이그레이션 리셋
pnpm --filter @5pro/db prisma migrate reset

# 다시 마이그레이션
pnpm db:migrate
```

### 포트 충돌

```bash
# 사용 중인 포트 확인
lsof -i :3000
lsof -i :4000

# 프로세스 종료
kill -9 <PID>
```

### pnpm 캐시 문제

```bash
pnpm store prune
pnpm install --force
```

## 프로덕션 배포

### 1. 빌드

```bash
pnpm build
```

### 2. API 서버 실행

```bash
cd apps/api
pnpm start
```

### 3. Web 서버 실행

```bash
cd apps/web
pnpm start
```

### 4. 환경 변수 (프로덕션)

프로덕션 환경에서는 다음 변수를 반드시 변경:

- `NEXTAUTH_SECRET`: 강력한 랜덤 키
- `DATABASE_URL`: 프로덕션 DB 주소
- `CORS_ORIGIN`: 실제 도메인
- `S3_*`: 실제 S3 설정

## Docker (선택사항)

```dockerfile
# Dockerfile 예시는 별도로 제공 가능
```

## 모니터링

```bash
# 데이터베이스 상태 확인
pnpm db:studio

# API 헬스체크
curl http://localhost:4000/health

# 로그 확인
pm2 logs (PM2 사용 시)
```
