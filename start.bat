@echo off
chcp 65001 > nul
echo ================================================
echo 🚀 오프로 식품공장 설립 플랫폼 시작
echo ================================================
echo.

echo 📦 1. 의존성 설치 중...
call npm install
if %errorlevel% neq 0 (
    echo ❌ 의존성 설치에 실패했습니다.
    pause
    exit /b 1
)

echo.
echo 📁 2. 업로드 디렉토리 생성 중...
if not exist "uploads" mkdir uploads

echo.
echo 🔧 3. Express.js API 서버 시작 중...
start "API Server" cmd /k "npm run server"

echo.
echo ⏳ 4. 잠시 대기 후 Next.js 앱 시작...
timeout /t 3 /nobreak > nul

echo.
echo 📱 5. Next.js 앱 시작 중...
start "Next.js App" cmd /k "npm run dev"

echo.
echo ================================================
echo ✅ 서버가 성공적으로 시작되었습니다!
echo ================================================
echo 📱 Next.js 앱: http://localhost:3000
echo 🔧 API 서버: http://localhost:3001
echo 📁 업로드 디렉토리: uploads/
echo ================================================
echo.
echo 💡 팁: 두 창을 모두 열어두세요.
echo 💡 종료하려면 각 창에서 Ctrl+C를 누르세요.
echo.
pause
