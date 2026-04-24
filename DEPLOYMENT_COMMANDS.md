# 🚀 HydraSync Deployment Commands

## 🎯 Recommended: Railway + Cloudflare Pages

### Quick Deploy (5 minutes):

```bash
# 1. Prepare for deployment
git add .
git commit -m "Ready for production deployment"
git push origin main

# 2. Deploy backend to Railway
# - Go to railway.app
# - Connect GitHub repo
# - Select backend folder as root
# - Add environment variables:
#   SECRET_KEY=your-super-secret-key-here
#   DATABASE_URL=postgresql://... (Railway will provide)

# 3. Update frontend with Railway URL
echo "VITE_API_BASE_URL=https://your-app.railway.app" > frontend/.env.production
echo "VITE_WS_BASE_URL=wss://your-app.railway.app" >> frontend/.env.production

# 4. Deploy frontend to Cloudflare Pages
# - Go to dash.cloudflare.com → Pages
# - Connect GitHub repo
# - Build command: cd frontend && npm install && npm run build
# - Build output: frontend/dist
# - Add environment variables from .env.production
```

## 🔄 Alternative: Cloudflare Workers (Advanced)

```bash
# Install Wrangler CLI
npm install -g wrangler
wrangler login

# Create D1 database
wrangler d1 create hydrasync-db

# Update wrangler.toml with database ID
# Deploy backend
wrangler deploy

# Deploy frontend
cd frontend
npm run build
wrangler pages deploy dist --project-name hydrasync-frontend
```

## 🐳 Docker Deployment

```bash
# Build and run locally
docker-compose up --build

# Deploy to any Docker platform (Railway, Render, etc.)
git push origin main
# Then connect your Docker platform to the repo
```

## ⚡ One-Click Deployments

### Railway (Recommended for WebSockets):
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

### Render:
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## 🧪 Test Your Deployment

```bash
# Test backend API
curl https://your-backend-url.com/

# Test registration
curl -X POST https://your-backend-url.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"test123"}'
```

## 🔧 Environment Variables Needed

**Backend**:
- `SECRET_KEY`: Random string for JWT (required)
- `DATABASE_URL`: Database connection (optional, defaults to SQLite)
- `PORT`: Server port (auto-set by most platforms)

**Frontend**:
- `VITE_API_BASE_URL`: Your backend URL
- `VITE_WS_BASE_URL`: Your WebSocket URL (same as API but wss://)

## 🎉 You're Done!

Your HydraSync app will be live with:
- ✅ User registration and authentication
- ✅ Real-time water logging
- ✅ Friend system with live updates
- ✅ WebSocket-powered real-time sync
- ✅ Responsive design for mobile and desktop

Visit your frontend URL and start tracking water with friends! 💧