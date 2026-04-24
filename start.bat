@echo off
echo 🚀 Starting HydraSync Application...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is required but not installed.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is required but not installed.
    pause
    exit /b 1
)

echo 📦 Setting up backend...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment and install dependencies
call venv\Scripts\activate.bat
pip install -r requirements.txt

echo 🔧 Starting FastAPI server...
start "HydraSync Backend" cmd /k "uvicorn main:app --reload --host 0.0.0.0 --port 8000"

cd ..

echo 🎨 Setting up frontend...
cd frontend

REM Install Node.js dependencies if needed
if not exist "node_modules" (
    echo Installing npm dependencies...
    npm install
)

echo 🌐 Starting React development server...
start "HydraSync Frontend" cmd /k "npm run dev"

cd ..

echo.
echo ✅ HydraSync is starting up!
echo 📡 Backend API: http://localhost:8000
echo 🌐 Frontend App: http://localhost:5173
echo 📚 API Docs: http://localhost:8000/docs
echo.
echo Press any key to exit...
pause >nul