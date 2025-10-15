# ⚡ Quick Start Guide

최소 5분 안에 시작하기

## 1️⃣ 필수 요구사항 확인

```bash
node --version  # v18 이상
pnpm --version  # v8 이상
mysql --version # 8.0 이상
```

## 2️⃣ 데이터베이스 준비

```sql
CREATE DATABASE 5pro_db;
```

## 3️⃣ 한 번에 설치하기

```bash
# .env 파일 수정 (DATABASE_URL 등)
cp .env.example .env

# 전체 설치 및 초기화
pnpm setup
```

## 4️⃣ 실행

```bash
pnpm dev
```

## 5️⃣ 접속

브라우저에서 http://localhost:3000 접속

**로그인:**
- 이메일: admin@5pro.local
- 비밀번호: Admin!234

---

## 주요 명령어

```bash
pnpm dev           # 개발 서버 (Web + API)
pnpm build         # 프로덕션 빌드
pnpm test          # 유닛 테스트
pnpm test:e2e      # E2E 테스트
pnpm db:studio     # 데이터베이스 GUI
```

## 문제 발생 시

1. **포트 충돌**: `.env`에서 API_PORT 변경
2. **DB 연결 실패**: DATABASE_URL 확인
3. **의존성 문제**: `pnpm install --force`
4. **마이그레이션 오류**: `pnpm db:migrate`

자세한 내용은 `SETUP.md` 참조

