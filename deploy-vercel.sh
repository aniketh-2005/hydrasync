#!/bin/bash

echo "🚀 Deploying HydraSync to Vercel..."

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - HydraSync water tracking app"
fi

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "🔐 Please follow these steps:"
echo ""
echo "1️⃣  Push to GitHub:"
echo "   - Create a new repository at https://github.com/new"
echo "   - Run these commands:"
echo "     git remote add origin https://github.com/YOUR_USERNAME/hydrasync.git"
echo "     git branch -M main"
echo "     git push -u origin main"
echo ""
echo "2️⃣  Deploy Frontend to Vercel:"
echo "   - Go to https://vercel.com/new"
echo "   - Import your GitHub repository"
echo "   - Root Directory: frontend"
echo "   - Framework: Vite"
echo "   - Build Command: npm run build"
echo "   - Output Directory: dist"
echo ""
echo "3️⃣  Deploy Backend to Railway (Recommended):"
echo "   - Go to https://railway.app/new"
echo "   - Deploy from GitHub"
echo "   - Select backend folder"
echo "   - Add environment variables:"
echo "     SECRET_KEY=your-secret-key"
echo ""
echo "4️⃣  Update Frontend Environment Variables on Vercel:"
echo "   - VITE_API_BASE_URL=https://your-backend.railway.app"
echo "   - VITE_WS_BASE_URL=wss://your-backend.railway.app"
echo ""
echo "📚 For detailed instructions, see VERCEL_DEPLOYMENT.md"
echo ""

read -p "Press Enter to open GitHub to create a new repository..."
open "https://github.com/new" 2>/dev/null || xdg-open "https://github.com/new" 2>/dev/null || echo "Please visit: https://github.com/new"

echo ""
echo "✅ Setup guide displayed!"
echo "Follow the steps above to complete deployment."