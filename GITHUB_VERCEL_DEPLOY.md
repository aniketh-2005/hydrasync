# 🚀 Complete GitHub + Vercel Deployment Guide

## ✅ Step 1: Create GitHub Repository

1. **Go to GitHub**: Visit [github.com/new](https://github.com/new)
2. **Create repository**:
   - Repository name: `hydrasync` (or your preferred name)
   - Description: "Real-time social water tracking app"
   - Visibility: Public or Private
   - **DO NOT** initialize with README, .gitignore, or license
3. **Click "Create repository"**

## 📤 Step 2: Push Code to GitHub

Run these commands in your terminal:

```bash
# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/hydrasync.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Example**:
```bash
git remote add origin https://github.com/johndoe/hydrasync.git
git branch -M main
git push -u origin main
```

## 🎯 Step 3: Deploy Backend to Railway (Recommended)

**Why Railway?** Full WebSocket support for real-time features.

1. **Go to [railway.app](https://railway.app)**
2. **Sign in with GitHub**
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your `hydrasync` repository**
6. **Configure**:
   - Click "Add variables"
   - Add: `SECRET_KEY` = `your-super-secret-key-here`
   - (Generate with: `openssl rand -hex 32`)
7. **Settings**:
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
8. **Click "Deploy"**
9. **Copy your Railway URL** (e.g., `https://hydrasync-production.up.railway.app`)

## 🌐 Step 4: Deploy Frontend to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in with GitHub**
3. **Click "Add New Project"**
4. **Import your `hydrasync` repository**
5. **Configure Build Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. **Add Environment Variables**:
   Click "Environment Variables" and add:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://your-app.up.railway.app` (your Railway URL)
   
   - **Name**: `VITE_WS_BASE_URL`
   - **Value**: `wss://your-app.up.railway.app` (same URL but wss://)

7. **Click "Deploy"**

## ✅ Step 5: Verify Deployment

1. **Visit your Vercel URL** (e.g., `https://hydrasync.vercel.app`)
2. **Register a new account**
3. **Log some water intake**
4. **Test real-time features**:
   - Open another browser tab
   - Register another user
   - Add each other as friends
   - Log water and watch real-time updates!

## 🔧 Environment Variables Summary

### Backend (Railway)
```
SECRET_KEY=your-super-secret-key-here
PORT=8000 (auto-set by Railway)
```

### Frontend (Vercel)
```
VITE_API_BASE_URL=https://your-app.up.railway.app
VITE_WS_BASE_URL=wss://your-app.up.railway.app
```

## 🔄 Automatic Deployments

Once connected:
- **Push to GitHub** → Automatically deploys to both Railway and Vercel
- **Pull Requests** → Creates preview deployments

## 🎨 Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### For Railway (Backend):
1. Go to your project settings
2. Click "Domains"
3. Add custom domain or use Railway subdomain

## 🧪 Testing Commands

```bash
# Test backend API
curl https://your-app.up.railway.app/

# Test registration
curl -X POST https://your-app.up.railway.app/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123","daily_goal":2000}'

# Test login
curl -X POST https://your-app.up.railway.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

## 🆘 Troubleshooting

### Issue: "Repository not found"
- Make sure repository is public or Vercel/Railway has access
- Check GitHub integration in platform settings

### Issue: "Build failed"
- Check build logs in Vercel/Railway dashboard
- Verify all dependencies are in package.json/requirements.txt

### Issue: "CORS errors"
- Verify environment variables are set correctly
- Check backend CORS settings include your Vercel URL

### Issue: "WebSocket connection failed"
- Make sure you're using Railway for backend (not Vercel)
- Verify VITE_WS_BASE_URL uses `wss://` protocol

## 📊 Monitoring

### Vercel:
- Analytics: Built-in analytics dashboard
- Logs: Real-time function logs
- Performance: Web Vitals monitoring

### Railway:
- Metrics: CPU, Memory, Network usage
- Logs: Real-time application logs
- Deployments: Deployment history

## 🎉 You're Live!

Your HydraSync app is now deployed and accessible worldwide!

- **Frontend**: `https://hydrasync.vercel.app`
- **Backend**: `https://hydrasync-production.up.railway.app`

Share your app URL with friends and start tracking water together! 💧✨

## 📝 Quick Reference

```bash
# Update and redeploy
git add .
git commit -m "Update features"
git push origin main
# Auto-deploys to both platforms!

# View logs
vercel logs  # Frontend logs
# Railway logs in dashboard

# Rollback deployment
# Use Vercel/Railway dashboard to rollback to previous deployment
```