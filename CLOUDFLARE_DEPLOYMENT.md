# 🚀 HydraSync Cloudflare Deployment Guide

This guide will help you deploy HydraSync to Cloudflare using Pages (frontend) and Workers (backend).

## 📋 Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI**: Install Cloudflare's CLI tool
3. **Git Repository**: Push your code to GitHub/GitLab
4. **Node.js & npm**: For building the frontend

## 🛠️ Setup Instructions

### Step 1: Install Wrangler CLI

```bash
npm install -g wrangler
wrangler login
```

### Step 2: Create Cloudflare D1 Database

```bash
# Create the database
wrangler d1 create hydrasync-db

# Note the database ID from the output and update wrangler.toml
```

### Step 3: Update Configuration

1. **Update `wrangler.toml`** with your database ID:
```toml
[[env.production.d1_databases]]
binding = "DB"
database_name = "hydrasync-db"
database_id = "YOUR_DATABASE_ID_HERE"  # Replace with actual ID
```

2. **Set production secrets**:
```bash
wrangler secret put SECRET_KEY
# Enter a strong secret key when prompted
```

### Step 4: Deploy Backend (Cloudflare Workers)

```bash
# Deploy the backend
wrangler deploy

# Note the Worker URL (e.g., https://hydrasync-backend.your-subdomain.workers.dev)
```

### Step 5: Update Frontend Configuration

1. **Update `frontend/.env.production`** with your Worker URL:
```env
VITE_API_BASE_URL=https://hydrasync-backend.your-subdomain.workers.dev
VITE_WS_BASE_URL=wss://hydrasync-backend.your-subdomain.workers.dev
```

### Step 6: Deploy Frontend (Cloudflare Pages)

#### Option A: Via Cloudflare Dashboard (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project**
3. Connect your Git repository
4. Configure build settings:
   - **Framework preset**: Vite
   - **Build command**: `cd frontend && npm install && npm run build`
   - **Build output directory**: `frontend/dist`
   - **Root directory**: `/` (leave empty)
5. Add environment variables:
   - `VITE_API_BASE_URL`: Your Worker URL
   - `VITE_WS_BASE_URL`: Your Worker WebSocket URL
6. Deploy!

#### Option B: Via Wrangler CLI

```bash
# Build the frontend
cd frontend
npm install
npm run build

# Deploy to Pages
wrangler pages deploy dist --project-name hydrasync-frontend
```

## 🗄️ Database Setup

### Initialize Database Tables

Since we're using D1, you'll need to run SQL commands to create tables:

```bash
# Create the tables in D1
wrangler d1 execute hydrasync-db --command "
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    daily_goal INTEGER DEFAULT 2000
);

CREATE TABLE water_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE friends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    friend_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (friend_id) REFERENCES users (id)
);
"
```

## 🔧 Configuration Details

### Environment Variables

**Backend (Workers)**:
- `SECRET_KEY`: JWT signing key (set via `wrangler secret put`)
- `CORS_ORIGINS`: Frontend URL for CORS (set in wrangler.toml)

**Frontend (Pages)**:
- `VITE_API_BASE_URL`: Backend Worker URL
- `VITE_WS_BASE_URL`: WebSocket URL (same as API but with wss://)

### Custom Domain (Optional)

1. **For Pages**: Add custom domain in Pages settings
2. **For Workers**: Add custom domain in Workers settings
3. **Update environment variables** with your custom domains

## 🚨 Important Notes

### WebSocket Limitations

⚠️ **Cloudflare Workers have WebSocket limitations**:
- WebSockets work but have different behavior than traditional servers
- Consider using Cloudflare Durable Objects for persistent connections
- For MVP, you might need to implement polling instead of WebSockets

### Alternative Backend Deployment

If you encounter WebSocket issues with Workers, consider these alternatives:

1. **Railway**: `railway deploy` (supports WebSockets fully)
2. **Render**: Connect GitHub repo (supports WebSockets)
3. **Fly.io**: `fly deploy` (full WebSocket support)

Then update your frontend environment variables to point to the alternative backend.

## 🧪 Testing Deployment

1. **Frontend**: Visit your Pages URL
2. **Backend**: Test API endpoints at your Worker URL
3. **Database**: Verify tables were created with `wrangler d1 execute hydrasync-db --command "SELECT name FROM sqlite_master WHERE type='table';"`

## 🔄 Updates & CI/CD

### Automatic Deployments

- **Pages**: Auto-deploys on git push (if connected to repo)
- **Workers**: Set up GitHub Actions for auto-deployment

### Manual Updates

```bash
# Update backend
wrangler deploy

# Update frontend
cd frontend && npm run build
wrangler pages deploy dist --project-name hydrasync-frontend
```

## 💡 Pro Tips

1. **Use Cloudflare Analytics** to monitor your app
2. **Enable Cloudflare Cache** for better performance
3. **Set up custom domains** for professional URLs
4. **Use Cloudflare Images** if you add profile pictures later
5. **Monitor with Cloudflare Logs** for debugging

## 🆘 Troubleshooting

### Common Issues

1. **CORS errors**: Check CORS_ORIGINS in wrangler.toml
2. **Database errors**: Verify D1 database ID and tables
3. **Build failures**: Check Node.js version and dependencies
4. **WebSocket issues**: Consider polling fallback or alternative backend

### Getting Help

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)

Your HydraSync app will be live at:
- **Frontend**: `https://hydrasync-frontend.pages.dev`
- **Backend**: `https://hydrasync-backend.your-subdomain.workers.dev`