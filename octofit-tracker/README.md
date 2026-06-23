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
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── backend/           # Express + TypeScript API
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running on localhost:27017

### Frontend Setup

```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### Backend Setup

```bash
cd octofit-tracker/backend
npm install
cp .env.example .env
npm run dev
```

Backend will run on `http://localhost:8000`

### MongoDB Connection

MongoDB should be running on `mongodb://localhost:27017`

```bash
# Example with Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## API Endpoints

- `GET /api/health` - Health check endpoint

## Development

- Frontend: `npm run dev` (with hot reload)
- Backend: `npm run dev` (with tsx watch)
- Build Frontend: `npm run build`
- Build Backend: `npm run build`

## Tech Stack

- **React 19**: Latest React with concurrent features
- **Vite**: Next-generation frontend build tool
- **Express**: Minimal web framework
- **TypeScript**: Type-safe development
- **Mongoose**: MongoDB object modeling
- **CORS**: Cross-origin resource sharing enabled
