@echo off
setlocal enabledelayedexpansion

echo 🚀 Setting up ERONII - Formex Construction Website...
echo ==================================================

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected: 
node --version

:: Check if npm is available
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not available. Please ensure npm is installed.
    pause
    exit /b 1
)

echo ✅ npm detected:
npm --version

:: Install dependencies
echo 📦 Installing dependencies...
npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies. Please check your internet connection and try again.
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

:: Check if .env.local exists
if not exist ".env.local" (
    echo ⚠️  .env.local file not found
    
    if exist ".env.example" (
        echo 📋 Copying .env.example to .env.local...
        copy ".env.example" ".env.local" >nul
        echo ✅ Environment file created from template
    ) else (
        echo 📝 Creating .env.local file with default configuration...
        (
            echo # Local Development Environment
            echo NEXT_PUBLIC_BASE_URL=http://localhost:3000
            echo NEXT_PUBLIC_WIX_CLIENT_ID=cbf77863-cedf-4588-b7a8-fc430cf6a816
            echo NEXT_PUBLIC_WIX_SITE_ID=4b296c48-4a6b-4db1-9813-d74e37a5e3ea
            echo WIX_API_KEY=IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcImQ2ZGEwZGZmLWExYzEtNDc2My1iNzJmLTNmMDYxMTUxMmQzNlwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImIyMTg2NmRiLWU4NjItNDM5NC04MDI2LWZmNzA3YzI3YjIxZVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIzMGYwM2NlZC1jZjc4LTQ1ZjYtOTMxMS0yZjQxYmMzNGE3M2ZcIn19IiwiaWF0IjoxNzYxMTUwNzA4fQ.dktz1mD2SoaNwmzGkhjieqPDzjaNaOwSxzr7QeJ3Cr4sqts5NKs9QkkBoS5RXEMlRMUDzvgePIKTH0LKBXVDzqXvyS5KT6U21_J1baJoxl5A8VM6oiz7AKxzkjWP2vokoJX156USQfE8KVMSLplU6sTtxYgeJMoisH87y9iAf7NmNMSG3odUrPwoRB-LcYd2n44TBIVT_noKQJ_TYAyzH1PzJ-q9Aw3s4DmSgchb0tbodkWCWAVTmhUSOVxASF1GWhwOR4reJvTQNyQsQfzmjH1n87jCa7oVDE5qvFlmlHIFT7sBinxzn4kE6aRvbR5-dssLMgj0pIg_lvOC3rfAEg
        ) > .env.local
        echo ✅ Environment file created with default values
    )
) else (
    echo ✅ .env.local file already exists
)

:: Verify critical environment variables
echo 🔍 Verifying environment configuration...
findstr "NEXT_PUBLIC_WIX_SITE_ID" .env.local >nul 2>&1
if errorlevel 1 (
    echo ⚠️  NEXT_PUBLIC_WIX_SITE_ID not found in .env.local
) else (
    findstr "WIX_API_KEY" .env.local >nul 2>&1
    if errorlevel 1 (
        echo ⚠️  WIX_API_KEY not found in .env.local
    ) else (
        echo ✅ Required environment variables are present
    )
)

:: Check TypeScript configuration
if exist "tsconfig.json" (
    echo ✅ TypeScript configuration found
) else (
    echo ⚠️  TypeScript configuration not found
)

:: Test build
echo 🏗️  Testing build configuration...
npm run build >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Build test failed. Run 'npm run build' for details
) else (
    echo ✅ Build test successful
)

echo.
echo 🎉 Setup complete! Here's what to do next:
echo ==================================================
echo 1. Review .env.local file and ensure all values are correct
echo 2. Start the development server:
echo    npm run dev
echo.
echo 3. Open http://localhost:3000 in your browser
echo.
echo 📚 For detailed documentation, see:
echo    - README.md (project overview)
echo    - SETUP.md (detailed setup guide)
echo.
echo 🆘 If you encounter issues:
echo    - Check the troubleshooting section in SETUP.md
echo    - Ensure all environment variables are correctly set
echo    - Contact the project maintainer
echo.
echo Happy coding! 🚀
echo.
pause