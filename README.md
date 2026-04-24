# HydraSync - Real-Time Social Water Tracking

A complete social water tracking application with real-time updates via WebSockets.

## 🌟 Features
- **User Authentication**: Secure registration and login with JWT
- **Water Logging**: Quick buttons (100ml, 250ml, 500ml) + custom amounts
- **Real-Time Updates**: WebSocket-powered live friend activity
- **Social Features**: Add friends and track their hydration progress
- **Progress Tracking**: Visual progress bars and daily goal tracking
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack
- **Backend**: FastAPI, SQLAlchemy, WebSockets, JWT Authentication
- **Frontend**: React (Vite), TailwindCSS, Axios, Lucide Icons
- **Database**: SQLite (PostgreSQL-ready structure)
- **Real-Time**: WebSocket connections for live updates

## 🚀 Quick Start

### Option 1: Manual Setup

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend will run on http://localhost:8000

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on http://localhost:5173

### Option 2: Docker Compose
```bash
docker-compose up --build
```

## 📁 Project Structure
```
HydraSync/
├── backend/
│   ├── main.py              # FastAPI app entry point
│   ├── database.py          # Database configuration
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── auth.py              # JWT authentication
│   ├── websocket_manager.py # WebSocket connection manager
│   ├── routes/
│   │   ├── user.py          # Auth endpoints
│   │   ├── water.py         # Water logging endpoints
│   │   └── friends.py       # Friends management
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main app component
│   │   ├── contexts/        # React contexts
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   └── services/        # API and WebSocket services
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Water Tracking
- `POST /water/log` - Log water intake
- `GET /water/my-progress` - Get daily progress

### Friends
- `POST /friends/add` - Add friend by email
- `GET /friends/list` - Get friends list
- `GET /friends/status` - Get friends' hydration status

### WebSocket
- `WS /ws/{token}` - Real-time updates connection

## 🎯 How It Works

1. **User Registration**: Users create accounts with name, email, password, and daily goal
2. **Water Logging**: Users log water intake using preset buttons or custom amounts
3. **Real-Time Updates**: When a user logs water, all their friends receive instant WebSocket updates
4. **Social Dashboard**: Friends can see each other's progress with color-coded status indicators:
   - 🔴 Red: Low intake (< 50% of goal)
   - 🟡 Yellow: Halfway (50-99% of goal)
   - 🟢 Green: Goal reached (100%+ of goal)

## 🧪 Testing the Real-Time Features

1. Register two users in different browser tabs/windows
2. Add each other as friends using email addresses
3. Log water in one account and watch the other account update instantly
4. Check the friends page to see real-time hydration status

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- CORS protection
- Input validation with Pydantic
- SQL injection protection with SQLAlchemy ORM

## 🌐 Environment Configuration

### Backend (.env)
```env
DATABASE_URL=sqlite:///./hydrasync.db
SECRET_KEY=your-secret-key-here
HOST=0.0.0.0
PORT=8000
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_BASE_URL=ws://localhost:8000
```

## 📱 Mobile Support

The application is fully responsive and includes:
- Mobile-optimized layouts
- Touch-friendly buttons
- Bottom navigation for mobile devices
- Responsive grid layouts

## 🚀 Production Deployment

The application is Docker-ready and can be deployed to any container platform:

1. Update environment variables for production
2. Use PostgreSQL for production database
3. Configure proper CORS origins
4. Set up SSL/TLS for WebSocket connections
5. Use a reverse proxy (nginx) for production

## 🎨 UI/UX Features

- Clean, modern design with TailwindCSS
- Color-coded progress indicators
- Real-time notifications
- Loading states and error handling
- Responsive design for all screen sizes
- Intuitive navigation

## 🔄 Real-Time Architecture

The WebSocket system works as follows:
1. Users connect to WebSocket endpoint with JWT token
2. Connection manager stores active user connections
3. When water is logged, system finds user's friends
4. Updates are broadcast only to connected friends
5. Frontend receives updates and refreshes UI instantly

This creates a truly social experience where friends can motivate each other in real-time!