#!/bin/bash

# ERONII Setup Script
# This script helps new collaborators set up the project quickly

echo "🚀 Setting up ERONII - Formex Construction Website..."
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not available. Please ensure npm is installed."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies. Please check your internet connection and try again."
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local file not found"
    
    if [ -f ".env.example" ]; then
        echo "📋 Copying .env.example to .env.local..."
        cp .env.example .env.local
        echo "✅ Environment file created from template"
    else
        echo "📝 Creating .env.local file with default configuration..."
        cat > .env.local << EOF
# Local Development Environment
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_WIX_CLIENT_ID=cbf77863-cedf-4588-b7a8-fc430cf6a816
NEXT_PUBLIC_WIX_SITE_ID=4b296c48-4a6b-4db1-9813-d74e37a5e3ea
WIX_API_KEY=IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcImQ2ZGEwZGZmLWExYzEtNDc2My1iNzJmLTNmMDYxMTUxMmQzNlwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImIyMTg2NmRiLWU4NjItNDM5NC04MDI2LWZmNzA3YzI3YjIxZVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIzMGYwM2NlZC1jZjc4LTQ1ZjYtOTMxMS0yZjQxYmMzNGE3M2ZcIn19IiwiaWF0IjoxNzYxMTUwNzA4fQ.dktz1mD2SoaNwmzGkhjieqPDzjaNaOwSxzr7QeJ3Cr4sqts5NKs9QkkBoS5RXEMlRMUDzvgePIKTH0LKBXVDzqXvyS5KT6U21_J1baJoxl5A8VM6oiz7AKxzkjWP2vokoJX156USQfE8KVMSLplU6sTtxYgeJMoisH87y9iAf7NmNMSG3odUrPwoRB-LcYd2n44TBIVT_noKQJ_TYAyzH1PzJ-q9Aw3s4DmSgchb0tbodkWCWAVTmhUSOVxASF1GWhwOR4reJvTQNyQsQfzmjH1n87jCa7oVDE5qvFlmlHIFT7sBinxzn4kE6aRvbR5-dssLMgj0pIg_lvOC3rfAEg
EOF
        echo "✅ Environment file created with default values"
    fi
else
    echo "✅ .env.local file already exists"
fi

# Verify critical environment variables
echo "🔍 Verifying environment configuration..."
if grep -q "NEXT_PUBLIC_WIX_SITE_ID" .env.local && grep -q "WIX_API_KEY" .env.local; then
    echo "✅ Required environment variables are present"
else
    echo "⚠️  Some required environment variables may be missing. Please check .env.local"
fi

# Check TypeScript configuration
if [ -f "tsconfig.json" ]; then
    echo "✅ TypeScript configuration found"
else
    echo "⚠️  TypeScript configuration not found"
fi

# Check if build works
echo "🏗️  Testing build configuration..."
npm run build > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Build test successful"
else
    echo "⚠️  Build test failed. Run 'npm run build' for details"
fi

echo ""
echo "🎉 Setup complete! Here's what to do next:"
echo "=================================================="
echo "1. Review .env.local file and ensure all values are correct"
echo "2. Start the development server:"
echo "   npm run dev"
echo ""
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📚 For detailed documentation, see:"
echo "   - README.md (project overview)"
echo "   - SETUP.md (detailed setup guide)"
echo ""
echo "🆘 If you encounter issues:"
echo "   - Check the troubleshooting section in SETUP.md"
echo "   - Ensure all environment variables are correctly set"
echo "   - Contact the project maintainer"
echo ""
echo "Happy coding! 🚀"