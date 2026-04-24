#!/bin/bash

echo "🚀 Deploying HydraSync to Cloudflare..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Login to Cloudflare (if not already logged in)
echo "🔐 Checking Cloudflare authentication..."
wrangler whoami || wrangler login

# Deploy backend (Workers)
echo "📦 Deploying backend to Cloudflare Workers..."
wrangler deploy

# Get the Worker URL
WORKER_URL=$(wrangler deployments list --name hydrasync-backend --format json | jq -r '.[0].url' 2>/dev/null || echo "https://hydrasync-backend.your-subdomain.workers.dev")

echo "✅ Backend deployed to: $WORKER_URL"

# Update frontend environment variables
echo "🔧 Updating frontend configuration..."
cat > frontend/.env.production << EOF
VITE_API_BASE_URL=$WORKER_URL
VITE_WS_BASE_URL=${WORKER_URL/https:/wss:}
EOF

# Build and deploy frontend
echo "🎨 Building and deploying frontend to Cloudflare Pages..."
cd frontend
npm install
npm run build:cf

# Deploy to Pages
wrangler pages deploy dist --project-name hydrasync-frontend --compatibility-date 2024-01-01

echo ""
echo "🎉 Deployment complete!"
echo "📱 Frontend: https://hydrasync-frontend.pages.dev"
echo "🔧 Backend: $WORKER_URL"
echo ""
echo "📝 Next steps:"
echo "1. Set up your D1 database: wrangler d1 create hydrasync-db"
echo "2. Update wrangler.toml with your database ID"
echo "3. Run database migrations (see CLOUDFLARE_DEPLOYMENT.md)"
echo "4. Set production secrets: wrangler secret put SECRET_KEY"