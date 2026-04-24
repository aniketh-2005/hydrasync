# 🚀 HydraSync Vercel Deployment Guide

## 📋 Prerequisites

1. **GitHub Account**: Sign up at [github.com](https://github.com)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (use GitHub login)
3. **Git installed**: Check with `git --version`

## 🎯 Deployment Strategy

**Frontend**: Vercel (Static hosting)
**Backend**: Vercel Serverless Functions

⚠️ **Important Note**: Vercel serverless functions have limitations with WebSockets. For full real-time features, consider deploying backend to Railway/Render and frontend to Vercel.

## 🚀 Quick Deploy (Recommended)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - HydraSync water tracking app"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/hydrasync.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Frontend to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub
2. **Click "Add New Project"**
3. **Import your GitHub repository**
4. **Configure project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   - `VITE_API_BASE_URL`: `https://your-backend-url.vercel.app/api` (or Railway URL)
   - `VITE_WS_BASE_URL`: `wss://your-backend-url.com` (use Railway for WebSockets)

6. **Click Deploy**

### Step 3: Deploy Backend (Choose One)

#### Option A: Backend on Railway (Recommended for WebSockets)

```bash
# Deploy backend to Railway for full WebSocket support
# 1. Go to railway.app
# 2. New Project → Deploy from GitHub
# 3. Select backend folder
# 4. Add environment variables:
#    - SECRET_KEY=your-secret-key
#    - DATABASE_URL=postgresql://... (Railway provides)
# 5. Deploy!

# Then update frontend environment variable on Vercel:
# VITE_API_BASE_URL=https://your-app.railway.app
# VITE_WS_BASE_URL=wss://your-app.railway.app
```

#### Option B: Backend on Vercel (Limited WebSocket support)

1. **Create another Vercel project** for backend
2. **Configure**:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
3. **Add Environment Variables**:
   - `SECRET_KEY`: Your JWT secret key
   - `DATABASE_URL`: PostgreSQL connection string
4. **Deploy**

## 🔧 Configuration Files Created

- `vercel.json` - Vercel configuration
- `backend/vercel_app.py` - Vercel serverless adapter
- `.gitignore` - Git ignore rules

## 📝 Environment Variables

### Frontend (Vercel)
- `VITE_API_BASE_URL`: Backend API URL
- `VITE_WS_BASE_URL`: WebSocket URL

### Backend (Railway/Vercel)
- `SECRET_KEY`: JWT signing key (generate with `openssl rand -hex 32`)
- `DATABASE_URL`: PostgreSQL connection string

## 🗄️ Database Setup

### Option 1: Vercel Postgres (if using Vercel for backend)

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Add Postgres
vercel postgres create

# Connect to your project
vercel env pull
```

### Option 2: Railway Postgres (Recommended)

Railway automatically provides PostgreSQL when you deploy. Just use the `DATABASE_URL` environment variable.

## 🧪 Testing Your Deployment

1. Visit your Vercel frontend URL
2. Register a new account
3. Log water intake
4. Test friend features

## 🔄 Automatic Deployments

Once connected to GitHub:
- **Push to main branch** → Auto-deploys to production
- **Push to other branches** → Creates preview deployments

## 💡 Pro Tips

1. **Use Railway for backend** to get full WebSocket support
2. **Use Vercel for frontend** for global CDN and fast loading
3. **Enable Vercel Analytics** for monitoring
4. **Set up custom domain** in Vercel settings
5. **Use environment variables** for all secrets

## 🆘 Troubleshooting

### WebSocket Issues
- Vercel serverless functions have limited WebSocket support
- **Solution**: Deploy backend to Railway/Render instead

### CORS Errors
- Add your Vercel frontend URL to backend CORS settings
- Check environment variables are set correctly

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check build logs in Vercel dashboard

## 🎉 Your App is Live!

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.railway.app` (or Vercel)

Share your HydraSync app with friends and start tracking water together! 💧