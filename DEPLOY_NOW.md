# 🚀 Deploy HydraSync NOW - Quick Commands

## Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `hydrasync`
3. Click "Create repository"
4. **Copy the repository URL** (e.g., `https://github.com/YOUR_USERNAME/hydrasync.git`)

## Step 2: Push to GitHub

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/hydrasync.git
git push -u origin main
```

## Step 3: Deploy Backend to Railway

1. Go to: https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select your `hydrasync` repository
4. Add environment variable:
   - `SECRET_KEY` = (generate with command below)
5. Click Deploy

**Generate SECRET_KEY**:
```bash
openssl rand -hex 32
```

**Copy your Railway URL** (e.g., `https://hydrasync-production.up.railway.app`)

## Step 4: Deploy Frontend to Vercel

1. Go to: https://vercel.com/new
2. Import your `hydrasync` repository
3. Configure:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add Environment Variables:
   - `VITE_API_BASE_URL` = `https://your-railway-url.up.railway.app`
   - `VITE_WS_BASE_URL` = `wss://your-railway-url.up.railway.app`
5. Click Deploy

## ✅ Done!

Your app is live at:
- Frontend: `https://hydrasync.vercel.app`
- Backend: `https://your-app.up.railway.app`

## 🧪 Test Your App

1. Visit your Vercel URL
2. Register a new account
3. Log water intake
4. Add friends and test real-time updates!

## 📚 Need More Help?

See detailed guide: `GITHUB_VERCEL_DEPLOY.md`