# 🚀 Simple HydraSync Deployment Guide

Since HydraSync uses WebSockets for real-time features, here are the **easiest deployment options** that fully support WebSockets:

## 🎯 Recommended: Frontend on Cloudflare Pages + Backend on Railway

This combination gives you the best of both worlds: fast global CDN for frontend and full WebSocket support for backend.

### Step 1: Deploy Backend to Railway

1. **Sign up** at [railway.app](https://railway.app)
2. **Connect GitHub** and select your repository
3. **Configure build**:
   - Root directory: `backend`
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Add environment variables**:
   - `SECRET_KEY`: Your JWT secret key
   - `DATABASE_URL`: `sqlite:///./hydrasync.db` (or PostgreSQL URL)
5. **Deploy** - Railway will give you a URL like `https://your-app.railway.app`

### Step 2: Deploy Frontend to Cloudflare Pages

1. **Update frontend environment**:
   ```bash
   # Create frontend/.env.production
   echo "VITE_API_BASE_URL=https://your-app.railway.app" > frontend/.env.production
   echo "VITE_WS_BASE_URL=wss://your-app.railway.app" >> frontend/.env.production
   ```

2. **Deploy to Cloudflare Pages**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
   - Connect your GitHub repository
   - Build settings:
     - Build command: `cd frontend && npm install && npm run build`
     - Build output: `frontend/dist`
   - Add environment variable: `VITE_API_BASE_URL` and `VITE_WS_BASE_URL`
   - Deploy!

## 🔄 Alternative: All-in-One Deployment

### Option A: Render (Easiest)

1. **Sign up** at [render.com](https://render.com)
2. **Create Web Service** from GitHub
3. **Configure**:
   - Build command: `cd backend && pip install -r requirements.txt`
   - Start command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Add environment variables**:
   - `SECRET_KEY`: Your secret key
5. **Deploy** - Render handles everything!

### Option B: Fly.io

1. **Install flyctl**: `curl -L https://fly.io/install.sh | sh`
2. **Login**: `fly auth login`
3. **Create app**: `fly launch` (in backend directory)
4. **Deploy**: `fly deploy`

## ⚡ Quick Deploy Commands

### For Railway + Cloudflare Pages:

```bash
# 1. Update backend for production
echo 'DATABASE_URL=postgresql://user:pass@host:port/db' > backend/.env
echo 'SECRET_KEY=your-super-secret-key-here' >> backend/.env

# 2. Update frontend config (replace with your Railway URL)
echo 'VITE_API_BASE_URL=https://your-app.railway.app' > frontend/.env.production
echo 'VITE_WS_BASE_URL=wss://your-app.railway.app' >> frontend/.env.production

# 3. Build frontend
cd frontend && npm install && npm run build

# 4. Deploy frontend to Cloudflare Pages via dashboard
# 5. Deploy backend to Railway via dashboard
```

### For Render (All-in-One):

```bash
# Just push to GitHub and connect to Render - that's it!
git add .
git commit -m "Ready for deployment"
git push origin main
```

## 🔧 Production Environment Variables

**Backend**:
- `SECRET_KEY`: Strong random string for JWT signing
- `DATABASE_URL`: PostgreSQL connection string (recommended for production)
- `CORS_ORIGINS`: Your frontend URL for CORS

**Frontend**:
- `VITE_API_BASE_URL`: Your backend URL (https://your-backend.com)
- `VITE_WS_BASE_URL`: Your WebSocket URL (wss://your-backend.com)

## 🗄️ Database Options

### Development: SQLite (included)
- Already configured
- Perfect for testing

### Production: PostgreSQL
- **Railway**: Provides PostgreSQL addon
- **Render**: Provides PostgreSQL addon
- **Supabase**: Free PostgreSQL with dashboard

## 🧪 Test Your Deployment

1. **Visit your frontend URL**
2. **Register a new account**
3. **Log some water intake**
4. **Open another browser tab, register another user**
5. **Add each other as friends**
6. **Test real-time updates** by logging water in one tab

## 💡 Pro Tips

1. **Use PostgreSQL in production** for better performance
2. **Set strong SECRET_KEY** (use `openssl rand -hex 32`)
3. **Enable HTTPS** (most platforms do this automatically)
4. **Monitor your app** with platform-provided analytics
5. **Set up custom domains** for professional URLs

## 🆘 Need Help?

If you encounter issues:

1. **Check logs** in your deployment platform
2. **Verify environment variables** are set correctly
3. **Test API endpoints** directly (visit `/docs` on your backend URL)
4. **Check CORS settings** if you get cross-origin errors

Your HydraSync app will be live and fully functional with real-time WebSocket updates! 🎉