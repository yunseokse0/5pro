@echo off
echo 오프로 플랫폼을 실행합니다...
echo.
echo 브라우저에서 http://localhost:8080 으로 접속하세요
echo.
echo 종료하려면 Ctrl+C를 누르세요
echo.

cd /d "%~dp0\out"
npx serve -s . -l 8080
