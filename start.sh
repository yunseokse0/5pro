#!/bin/bash

echo "================================================"
echo "🚀 오프로 식품공장 설립 플랫폼 시작"
echo "================================================"
echo

echo "📦 1. 의존성 설치 중..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ 의존성 설치에 실패했습니다."
    exit 1
fi

echo
echo "📁 2. 업로드 디렉토리 생성 중..."
mkdir -p uploads

echo
echo "🔧 3. Express.js API 서버 시작 중..."
gnome-terminal --title="API Server" -- bash -c "npm run server; exec bash" 2>/dev/null || \
xterm -title "API Server" -e "npm run server; bash" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd '"$(pwd)"' && npm run server"' 2>/dev/null || \
echo "터미널을 수동으로 열고 'npm run server'를 실행하세요."

echo
echo "⏳ 4. 잠시 대기 후 Next.js 앱 시작..."
sleep 3

echo
echo "📱 5. Next.js 앱 시작 중..."
gnome-terminal --title="Next.js App" -- bash -c "npm run dev; exec bash" 2>/dev/null || \
xterm -title "Next.js App" -e "npm run dev; bash" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd '"$(pwd)"' && npm run dev"' 2>/dev/null || \
echo "터미널을 수동으로 열고 'npm run dev'를 실행하세요."

echo
echo "================================================"
echo "✅ 서버가 성공적으로 시작되었습니다!"
echo "================================================"
echo "📱 Next.js 앱: http://localhost:3000"
echo "🔧 API 서버: http://localhost:3001"
echo "📁 업로드 디렉토리: uploads/"
echo "================================================"
echo
echo "💡 팁: 두 터미널 창을 모두 열어두세요."
echo "💡 종료하려면 각 창에서 Ctrl+C를 누르세요."
echo
