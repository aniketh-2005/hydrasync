# HydraSync Development Guide

## 🛠️ Development Setup

### Prerequisites
- Python 3.8+ with pip
- Node.js 16+ with npm
- Git

### Quick Start
```bash
# Clone and setup
git clone <repository-url>
cd hydrasync

# Option 1: Use startup scripts
./start.sh          # Linux/macOS
start.bat           # Windows

# Option 2: Manual setup
# Terminal 1 - Backend
cd backend
python -m venv venv
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
python -m pytest  # If you add tests later
```

### API Testing
```bash
# Test the setup
python test_setup.py

# Manual API testing
curl http://localhost:8000/
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"test123","daily_goal":2000}'
```

### WebSocket Testing
Open multiple browser tabs to test real-time features:
1. Register different users in each tab
2. Add each other as friends
3. Log water in one tab, watch updates in others

## 📁 Code Structure

### Backend Architecture
```
backend/
├── main.py              # FastAPI app & WebSocket endpoint
├── database.py          # SQLAlchemy setup
├── models.py            # Database models
├── schemas.py           # Pydantic validation schemas
├── auth.py              # JWT authentication logic
├── websocket_manager.py # WebSocket connection management
└── routes/              # API route handlers
    ├── user.py          # Auth endpoints
    ├── water.py         # Water logging
    └── friends.py       # Friends management
```

### Frontend Architecture
```
frontend/src/
├── App.jsx              # Main app with routing
├── contexts/            # React contexts
│   └── AuthContext.jsx  # Authentication state
├── pages/               # Page components
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   └── Friends.jsx
├── components/          # Reusable components
│   ├── Layout.jsx
│   ├── ProgressBar.jsx
│   ├── WaterLogButton.jsx
│   └── FriendCard.jsx
└── services/            # External service integrations
    ├── api.js           # HTTP API client
    └── socket.js        # WebSocket client
```

## 🔄 Data Flow

### Water Logging Flow
1. User clicks water log button
2. Frontend calls `/water/log` API
3. Backend saves to database
4. Backend calculates new daily total
5. Backend finds user's friends
6. Backend sends WebSocket updates to friends
7. Friends' frontends receive updates
8. UI updates in real-time

### Authentication Flow
1. User submits login/register form
2. Backend validates and creates JWT token
3. Frontend stores token in localStorage
4. Frontend connects to WebSocket with token
5. All API requests include Authorization header

## 🎨 UI Components

### Design System
- **Colors**: Primary (blue), Success (green), Warning (yellow), Danger (red)
- **Components**: Cards, buttons, progress bars, form inputs
- **Layout**: Responsive grid, mobile-first design
- **Icons**: Lucide React icons

### Responsive Breakpoints
- Mobile: < 768px (bottom navigation)
- Desktop: ≥ 768px (sidebar navigation)

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
DATABASE_URL=sqlite:///./hydrasync.db
SECRET_KEY=your-secret-key-here
HOST=0.0.0.0
PORT=8000
```

**Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_BASE_URL=ws://localhost:8000
```

## 🚀 Deployment

### Docker Development
```bash
docker-compose up --build
```

### Production Considerations
1. **Database**: Switch to PostgreSQL
2. **Security**: Use strong SECRET_KEY, enable HTTPS
3. **CORS**: Configure proper origins
4. **WebSockets**: Use WSS (secure WebSockets)
5. **Reverse Proxy**: Use nginx for static files
6. **Environment**: Use production environment variables

## 🐛 Common Issues

### Backend Issues
- **Port 8000 in use**: Change port in uvicorn command
- **Database locked**: Delete `hydrasync.db` and restart
- **Import errors**: Check Python path and virtual environment

### Frontend Issues
- **Port 5173 in use**: Vite will auto-increment port
- **API connection failed**: Check backend is running on port 8000
- **WebSocket connection failed**: Verify token and backend WebSocket endpoint

### WebSocket Issues
- **Not receiving updates**: Check browser console for WebSocket errors
- **Connection drops**: Implement reconnection logic (already included)
- **Token expired**: Frontend will redirect to login automatically

## 📈 Performance Tips

### Backend
- Use database indexes for queries
- Implement connection pooling for production
- Add request rate limiting
- Use async/await properly

### Frontend
- Implement virtual scrolling for large friend lists
- Use React.memo for expensive components
- Debounce API calls
- Optimize bundle size with code splitting

## 🔒 Security Best Practices

### Backend Security
- Validate all inputs with Pydantic
- Use parameterized queries (SQLAlchemy ORM)
- Hash passwords with bcrypt
- Implement rate limiting
- Use HTTPS in production

### Frontend Security
- Store tokens securely
- Validate user inputs
- Sanitize displayed data
- Use HTTPS for all requests
- Implement CSP headers

## 🧩 Extension Ideas

### Features to Add
- **Streak tracking**: Count consecutive days
- **Leaderboards**: Weekly/monthly rankings
- **Smart reminders**: Push notifications
- **Water types**: Track different beverages
- **Goals**: Custom daily/weekly goals
- **Analytics**: Charts and insights
- **Groups**: Team challenges
- **Gamification**: Badges and achievements

### Technical Improvements
- **Offline support**: PWA with service workers
- **Mobile app**: React Native version
- **Real-time chat**: Friend messaging
- **File uploads**: Profile pictures
- **Email notifications**: Daily summaries
- **API versioning**: v1, v2 endpoints
- **Caching**: Redis for session storage
- **Monitoring**: Health checks and metrics