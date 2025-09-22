# 🚀 오프로 로컬 환경 설정 가이드

## 📋 필수 요구사항

### 1. Node.js 설치
- **Node.js 18.0.0 이상** 필요
- **npm 8.0.0 이상** 필요

#### Windows 설치 방법:
1. [Node.js 공식 웹사이트](https://nodejs.org/) 방문
2. LTS 버전 다운로드 (권장: 18.x 또는 20.x)
3. 설치 프로그램 실행 후 기본 설정으로 설치
4. 설치 완료 후 명령 프롬프트에서 확인:
   ```bash
   node --version
   npm --version
   ```

#### macOS 설치 방법:
```bash
# Homebrew 사용
brew install node

# 또는 공식 웹사이트에서 다운로드
```

#### Linux 설치 방법:
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

## 🚀 빠른 시작

### Windows 사용자:
```bash
# 1. 프로젝트 폴더로 이동
cd C:\project\5pro\5pro

# 2. 자동 실행 스크립트 실행
start.bat
```

### macOS/Linux 사용자:
```bash
# 1. 프로젝트 폴더로 이동
cd /path/to/5pro

# 2. 실행 권한 부여
chmod +x start.sh

# 3. 자동 실행 스크립트 실행
./start.sh
```

### 수동 실행:
```bash
# 1. 의존성 설치
npm install

# 2. API 서버 실행 (터미널 1)
npm run server

# 3. Next.js 앱 실행 (터미널 2)
npm run dev
```

## 🌐 접속 정보

- **Next.js 앱**: http://localhost:3000
- **API 서버**: http://localhost:3001
- **정적 HTML**: http://localhost:8080 (out 폴더 사용 시)

## 🔧 문제 해결

### Node.js가 설치되지 않은 경우:
- 위의 "Node.js 설치" 섹션을 참고하여 설치하세요.

### 포트가 이미 사용 중인 경우:
```bash
# 포트 사용 중인 프로세스 확인
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# 프로세스 종료 (Windows)
taskkill /PID <프로세스ID> /F
```

### 의존성 설치 실패:
```bash
# 캐시 정리 후 재설치
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 파일 업로드 오류:
- `uploads` 폴더가 생성되었는지 확인
- 파일 크기가 10MB 이하인지 확인
- 지원되는 파일 형식인지 확인 (jpg, png, pdf, doc, docx, txt)

## 📞 지원

문제가 지속되면 다음을 확인해주세요:
1. Node.js 버전이 18.0.0 이상인지
2. 인터넷 연결 상태
3. 방화벽 설정
4. 바이러스 백신 프로그램 차단 여부
