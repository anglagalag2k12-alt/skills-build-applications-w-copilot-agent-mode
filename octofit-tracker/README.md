# 🐙 OctoFit Tracker

A modern multi-tier fitness tracking application built with GitHub Copilot Agent Mode.

## Architecture

- **Frontend**: React 19 + Vite (Port 5173)
- **Backend**: Node.js + Express + TypeScript (Port 8000)
- **Database**: MongoDB (Port 27017)

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite application
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── api.ts
│   │   └── hooks/
│   │       └── useWorkouts.ts
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── index.html
├── backend/           # Express + TypeScript API
│   ├── src/
│   │   ├── index.ts
│   │   ├── seed.ts
│   │   ├── routes/
│   │   │   └── workouts.ts
│   │   └── models/
│   │       └── Workout.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running on localhost:27017

### MongoDB Setup

```bash
# Start MongoDB with Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Backend Setup

```bash
cd octofit-tracker/backend
npm install
cp .env.example .env
npm run seed  # Populate database with sample data
npm run dev   # Start development server
```

Backend will run on `http://localhost:8000`

### Frontend Setup

```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## Database Seeding

The database comes with sample workout data for 3 users:

```bash
npm run seed
```

This will:
- Connect to MongoDB
- Clear existing workouts
- Insert 9 sample workout records
- Display inserted data in console
- Gracefully close the connection

Sample data includes:
- **User 001**: Running, Swimming, Cycling
- **User 002**: Weight Training, Yoga, Pilates
- **User 003**: Running, Gym Cardio, Tennis

## API Endpoints

### Workouts

- `GET /api/workouts` - Get all workouts (sorted by date, newest first)
- `POST /api/workouts` - Create new workout
  - Body: `{ userId, exercise, duration, calories, date? }`
- `GET /api/workouts/:id` - Get workout by ID
- `PUT /api/workouts/:id` - Update workout
  - Body: `{ userId?, exercise?, duration?, calories?, date? }`
- `DELETE /api/workouts/:id` - Delete workout
- `GET /api/workouts/user/:userId` - Get all workouts for a user

### Health Check

- `GET /api/health` - Server health status

## Features

- ✅ Full TypeScript support on frontend and backend
- ✅ React 19 with Hooks for state management
- ✅ Vite for lightning-fast development and builds
- ✅ Express REST API with CRUD operations
- ✅ MongoDB persistence with Mongoose ODM
- ✅ CORS enabled for frontend-backend communication
- ✅ Hot reload in development mode
- ✅ Type-safe database models with validation
- ✅ Database seeding with sample data
- ✅ Custom React hooks for data management
- ✅ Error handling on both layers

## Development

### Backend
- `npm run dev` - Start with tsx watch (hot reload)
- `npm run build` - Compile TypeScript
- `npm start` - Run compiled backend
- `npm run seed` - Populate database with sample data

### Frontend
- `npm run dev` - Start dev server with hot reload
- `npm run build` - Build for production

## Tech Stack

- **React 19**: Latest React with concurrent features
- **Vite**: Next-generation frontend build tool
- **Express 4**: Minimal web framework
- **TypeScript 5**: Type-safe development
- **Mongoose 8**: MongoDB object modeling
- **CORS**: Cross-origin resource sharing
- **tsx**: TypeScript execution for Node.js

## Workout Data Model

```typescript
interface Workout {
  _id: string
  userId: string           // User identifier
  exercise: string         // Exercise name (min 2 characters)
  duration: number         // Duration in minutes (1-1440)
  calories: number         // Calories burned (≥ 0)
  date: Date              // Workout date (default: now)
  createdAt: Date         // Auto-generated timestamp
  updatedAt: Date         // Auto-generated timestamp
}
```

## Example Requests

### Create a Workout
```bash
curl -X POST http://localhost:8000/api/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_001",
    "exercise": "Running",
    "duration": 30,
    "calories": 350
  }'
```

### Get All Workouts
```bash
curl http://localhost:8000/api/workouts
```

### Get User Workouts
```bash
curl http://localhost:8000/api/workouts/user/user_001
```

### Update a Workout
```bash
curl -X PUT http://localhost:8000/api/workouts/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "exercise": "Gym - Running",
    "duration": 45
  }'
```

### Delete a Workout
```bash
curl -X DELETE http://localhost:8000/api/workouts/{id}
```

## Environment Variables

Create `.env` file in backend directory:

```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
NODE_ENV=development
```

---

Built with ❤️ using GitHub Copilot Agent Mode
