import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Workout } from './models/Workout.ts'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker'

const seedData = [
  {
    userId: 'user_001',
    exercise: 'Running',
    duration: 30,
    calories: 350,
    date: new Date('2024-06-20')
  },
  {
    userId: 'user_001',
    exercise: 'Swimming',
    duration: 45,
    calories: 420,
    date: new Date('2024-06-21')
  },
  {
    userId: 'user_001',
    exercise: 'Cycling',
    duration: 60,
    calories: 500,
    date: new Date('2024-06-22')
  },
  {
    userId: 'user_002',
    exercise: 'Weight Training',
    duration: 50,
    calories: 380,
    date: new Date('2024-06-20')
  },
  {
    userId: 'user_002',
    exercise: 'Yoga',
    duration: 60,
    calories: 180,
    date: new Date('2024-06-21')
  },
  {
    userId: 'user_002',
    exercise: 'Pilates',
    duration: 40,
    calories: 200,
    date: new Date('2024-06-22')
  },
  {
    userId: 'user_003',
    exercise: 'Running',
    duration: 25,
    calories: 300,
    date: new Date('2024-06-20')
  },
  {
    userId: 'user_003',
    exercise: 'Gym - Cardio',
    duration: 35,
    calories: 400,
    date: new Date('2024-06-21')
  },
  {
    userId: 'user_003',
    exercise: 'Tennis',
    duration: 90,
    calories: 550,
    date: new Date('2024-06-22')
  }
]

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    await Workout.deleteMany({})
    console.log('🗑️  Cleared existing workouts')

    // Insert seed data
    const insertedWorkouts = await Workout.insertMany(seedData)
    console.log(`✅ Inserted ${insertedWorkouts.length} workout records`)

    // Display inserted data
    console.log('\n📊 Seeded Workouts:')
    insertedWorkouts.forEach((workout, index) => {
      console.log(
        `${index + 1}. ${workout.exercise} (${workout.duration}min, ${workout.calories}cal) - User: ${workout.userId}`
      )
    })

    // Close connection
    await mongoose.connection.close()
    console.log('\n✅ Database seeding completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()