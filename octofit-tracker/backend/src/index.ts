import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import workoutRoutes from './routes/workouts.ts'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker'

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`📨 ${req.method} ${req.path}`)
  next()
})

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err))

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'Backend is running on port 8000',
    timestamp: new Date().toISOString()
  })
})

app.use('/api/workouts', workoutRoutes)

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Error:', err)
  res.status(err.status || 500).json({ 
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  })
})

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' })
})

// Start Server
app.listen(PORT, () => {
  console.log(`🐙 OctoFit Tracker Backend running on port ${PORT}`)
  console.log(`📊 MongoDB connected to ${MONGODB_URI}`)
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`)
})

export default app