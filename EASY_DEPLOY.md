# 🚀 Easy Deploy - HydraSync

Your code is on GitHub: **https://github.com/aniketh-2005/hydrasync**

## ⚡ Quick Deploy Options

### Option 1: Render (Easiest - One Click!)

1. **Go to**: https://render.com/deploy
2. **Connect GitHub**: Sign in with GitHub
3. **Deploy**: Click "Deploy to Render" button
4. **Copy Backend URL** (e.g., `https://hydrasync.onrender.com`)

Then deploy frontend to Vercel (see Step 2 below)

### Option 2: Railway (Recommended for WebSockets)

**If Railway says "requirements.txt not found", try this:**

1. Go to: https://railway.app/new
2. Deploy from GitHub repo: **aniketh-2005/hydrasync**
3. **Don't set Root Directory** - leave it empty
4. Railway will auto-detect the configuration from `railway.json`
5. Add environment variable:
   - `SECRET_KEY` = (run: `openssl rand -hex 32`)
6. Deploy!

**Alternative Railway Setup:**
- If auto-detection fails, manually set:
  - Build Command: `cd backend && pip install -r requirements.txt`
  - Start Command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`

### Option 3: Heroku

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login and deploy
heroku login
heroku create hydrasync-backend
git push heroku main
```

## Step 2: Deploy Frontend to Vercel

1. **Go to**: https://vercel.com/new
2. **Import**: aniketh-2005/hydrasync
3. **Configure**:
   - Framework: **Vite**
   - Root Directory: **frontend**
   - Build Command: **npm run build**
   - Output Directory: **dist**
4. **Environment Variables**:
   - `VITE_API_BASE_URL` = Your backend URL (from Step 1)
   - `VITE_WS_BASE_URL` = Your backend URL (change https:// to wss://)
5. **Deploy!**

## 🎉 Done!

Your app will be live at:
- Frontend: `https://hydrasync.vercel.app`
- Backend: Your chosen platform URL

## 🧪 Test It

1. Visit your Vercel URL
2. Register and log in
3. Log water intake
4. Add friends and test real-time updates!

## 🔧 Troubleshooting

### Railway "requirements.txt not found"
- The `railway.json` file should fix this
- If not, try Render or Heroku instead

### Build Errors
- Check the deployment logs
- Verify environment variables are set

### CORS Errors
- Make sure environment variables are correct
- Backend URL should not have trailing slash