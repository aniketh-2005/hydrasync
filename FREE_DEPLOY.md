# 🆓 100% Free Deployment (No Card Required!)

Your code is on GitHub: **https://github.com/aniketh-2005/hydrasync**

## ⚡ Best Free Options (No Payment Info Needed)

### Option 1: Vercel (Frontend) + PythonAnywhere (Backend) ✅ RECOMMENDED

#### Step 1: Deploy Backend to PythonAnywhere (FREE - No Card!)

1. **Sign up**: https://www.pythonanywhere.com/registration/register/beginner/
2. **Open Bash Console**: Dashboard → "Bash" console
3. **Clone your repo**:
   ```bash
   git clone https://github.com/aniketh-2005/hydrasync.git
   cd hydrasync/backend
   pip install --user -r requirements.txt
   ```
4. **Create Web App**:
   - Go to "Web" tab
   - Click "Add a new web app"
   - Choose "Manual configuration"
   - Python version: 3.10
5. **Configure WSGI**:
   - Click on WSGI configuration file
   - Replace content with:
   ```python
   import sys
   path = '/home/YOUR_USERNAME/hydrasync/backend'
   if path not in sys.path:
       sys.path.append(path)
   
   from main import app as application
   ```
6. **Set Environment Variables**:
   - In Web tab, scroll to "Environment variables"
   - Add: `SECRET_KEY` = (any random string)
7. **Reload** your web app
8. **Your backend URL**: `https://YOUR_USERNAME.pythonanywhere.com`

#### Step 2: Deploy Frontend to Vercel (FREE - No Card!)

1. **Go to**: https://vercel.com/signup (Sign up with GitHub)
2. **Import**: aniketh-2005/hydrasync
3. **Configure**:
   - Framework: **Vite**
   - Root Directory: **frontend**
   - Build Command: **npm run build**
   - Output Directory: **dist**
4. **Environment Variables**:
   - `VITE_API_BASE_URL` = `https://YOUR_USERNAME.pythonanywhere.com`
   - `VITE_WS_BASE_URL` = `wss://YOUR_USERNAME.pythonanywhere.com`
5. **Deploy!**

---

### Option 2: Netlify (Frontend) + Glitch (Backend) ✅ ALSO FREE

#### Step 1: Deploy Backend to Glitch (FREE - No Card!)

1. **Go to**: https://glitch.com/
2. **Sign in** with GitHub
3. **Import from GitHub**: Click "New Project" → "Import from GitHub"
4. **Enter**: `https://github.com/aniketh-2005/hydrasync`
5. **Configure**:
   - In `.glitch-assets`, Glitch will auto-detect Python
   - Add `.env` file with: `SECRET_KEY=your-secret-key`
6. **Your backend URL**: `https://your-project.glitch.me`

#### Step 2: Deploy Frontend to Netlify (FREE - No Card!)

1. **Go to**: https://app.netlify.com/start
2. **Connect GitHub**: aniketh-2005/hydrasync
3. **Configure**:
   - Base directory: **frontend**
   - Build command: **npm run build**
   - Publish directory: **frontend/dist**
4. **Environment Variables**:
   - `VITE_API_BASE_URL` = Your Glitch URL
   - `VITE_WS_BASE_URL` = Your Glitch URL (wss://)
5. **Deploy!**

---

### Option 3: Vercel for Both (Frontend + Backend) ✅ EASIEST

Vercel is 100% free and doesn't ask for card details!

#### Deploy Everything to Vercel:

1. **Go to**: https://vercel.com/new
2. **Import**: aniketh-2005/hydrasync
3. **For Frontend**:
   - Root Directory: **frontend**
   - Framework: **Vite**
   - Build Command: **npm run build**
   - Output Directory: **dist**
4. **Deploy!**

**Note**: For backend, you'll need to deploy separately or use Vercel Serverless Functions (limited WebSocket support).

---

### Option 4: GitHub Pages (Frontend) + Deta Space (Backend)

#### Step 1: Deploy Backend to Deta Space (FREE - No Card!)

1. **Sign up**: https://deta.space/
2. **Install Deta CLI**:
   ```bash
   curl -fsSL https://get.deta.dev/space-cli.sh | sh
   ```
3. **Login**: `space login`
4. **Deploy**:
   ```bash
   cd backend
   space new
   space push
   ```

#### Step 2: Deploy Frontend to GitHub Pages (FREE!)

1. **Update** `frontend/package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
2. **Install gh-pages**:
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```
3. **Deploy**:
   ```bash
   npm run deploy
   ```
4. **Enable GitHub Pages**: Repo Settings → Pages → Source: gh-pages branch

---

## 🎯 My Recommendation

**Use Vercel for Frontend** (100% free, no card needed)
- Sign up: https://vercel.com/signup
- Import your repo
- Deploy in 2 minutes

**For Backend, choose one**:
1. **PythonAnywhere** - Most reliable for Python/FastAPI
2. **Glitch** - Easiest setup
3. **Deta Space** - Modern and fast

All are 100% FREE with NO CARD REQUIRED! 🎉

---

## 🧪 After Deployment

1. Visit your frontend URL
2. Register a new account
3. Test water logging
4. Add friends and test real-time features!

---

## 📝 Notes

- **PythonAnywhere**: Best for FastAPI, but limited WebSocket support on free tier
- **Glitch**: Good for quick deployment, auto-sleeps after inactivity
- **Vercel**: Best for frontend, excellent performance
- **Netlify**: Alternative to Vercel, also excellent

Choose the combination that works best for you! All are completely free! 🚀