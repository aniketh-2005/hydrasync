# 🚀 Your HydraSync is on GitHub!

## ✅ What's Done

Your code is now live on GitHub:
**https://github.com/aniketh-2005/hydrasync**

## 🎯 Next Steps to Deploy

Since HydraSync uses WebSockets for real-time features, we need to deploy:
- **Frontend** → Vercel (for fast global CDN)
- **Backend** → Railway (for full WebSocket support)

### Step 1: Deploy Backend to Railway (2 minutes)

1. Go to: **https://railway.app/new**
2. Sign in with GitHub
3. Click "Deploy from GitHub repo"
4. Select: **aniketh-2005/hydrasync**
5. Configure:
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add environment variable:
   - Name: `SECRET_KEY`
   - Value: Run this command to generate:
     ```bash
     openssl rand -hex 32
     ```
7. Click "Deploy"
8. **Copy your Railway URL** (e.g., `https://hydrasync-production.up.railway.app`)

### Step 2: Deploy Frontend to Vercel (2 minutes)

#### Option A: Via Vercel Dashboard (Easiest)

1. Go to: **https://vercel.com/new**
2. Sign in with GitHub
3. Import: **aniketh-2005/hydrasync**
4. Configure:
   - Framework Preset: **Vite**
   - Root Directory: **frontend**
   - Build Command: **npm run build**
   - Output Directory: **dist**
5. Add Environment Variables:
   - `VITE_API_BASE_URL` = Your Railway URL (e.g., `https://hydrasync-production.up.railway.app`)
   - `VITE_WS_BASE_URL` = Your Railway URL with wss:// (e.g., `wss://hydrasync-production.up.railway.app`)
6. Click "Deploy"

#### Option B: Via CLI (Alternative)

```bash
# Login to Vercel
vercel login

# Deploy frontend
cd frontend
vercel --prod

# Follow prompts and add environment variables when asked
```

## 🎉 You're Done!

Your app will be live at:
- **Frontend**: `https://hydrasync-xxx.vercel.app`
- **Backend**: `https://hydrasync-production.up.railway.app`

## 🧪 Test Your App

1. Visit your Vercel URL
2. Register a new account
3. Log water intake
4. Open another browser tab
5. Register another user
6. Add each other as friends
7. Log water and watch real-time updates! 💧

## 🔄 Future Updates

To update your app:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Both Railway and Vercel will automatically redeploy! 🚀