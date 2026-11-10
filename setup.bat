@echo off
REM Installation & Run Script for DUN'S GARASI 26 Website (Windows)

echo.
echo 🚀 DUN'S GARASI 26 ^& BODYREPAIR — Setup ^& Run
echo =============================================
echo.

REM Step 1: Install dependencies
echo 📦 Installing dependencies...
call npm install

if errorlevel 1 (
  echo ❌ npm install failed. Check Node.js ^& npm installation.
  pause
  exit /b 1
)

echo ✅ Dependencies installed successfully!
echo.

REM Step 2: Run development server
echo 🎨 Starting Frontend ^(Vite^) on http://localhost:3000
echo 📡 Press Ctrl+C to stop
echo.

call npm run dev
pause
