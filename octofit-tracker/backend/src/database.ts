import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker'

/**
 * Connect to MongoDB database
 * @returns Promise that resolves when connected
 */
export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')
    console.log(`📊 Database URI: ${MONGODB_URI}`)
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    throw error
  }
}

/**
 * Disconnect from MongoDB database
 * @returns Promise that resolves when disconnected
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    await mongoose.disconnect()
    console.log('✅ Disconnected from MongoDB')
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error)
    throw error
  }
}

/**
 * Get MongoDB connection status
 * @returns Connection state (0=disconnected, 1=connected, 2=connecting, 3=disconnecting)
 */
export function getConnectionStatus(): number {
  return mongoose.connection.readyState
}

/**
 * Get connection status as string
 * @returns Human-readable connection status
 */
export function getConnectionStatusString(): string {
  const states: { [key: number]: string } = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  }
  return states[getConnectionStatus()] || 'unknown'
}

/**
 * Connection event handlers
 */
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB')
})

export default {
  connectDatabase,
  disconnectDatabase,
  getConnectionStatus,
  getConnectionStatusString
}