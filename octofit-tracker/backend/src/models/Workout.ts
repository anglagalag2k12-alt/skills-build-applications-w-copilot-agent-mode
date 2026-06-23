import mongoose, { Schema, Document } from 'mongoose'

interface IWorkout extends Document {
  userId: string
  exercise: string
  duration: number
  calories: number
  date: Date
  createdAt: Date
  updatedAt: Date
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      trim: true
    },
    exercise: {
      type: String,
      required: [true, 'Exercise name is required'],
      trim: true,
      minlength: [2, 'Exercise name must be at least 2 characters']
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [1, 'Duration must be at least 1 minute'],
      max: [1440, 'Duration cannot exceed 1440 minutes (24 hours)']
    },
    calories: {
      type: Number,
      required: [true, 'Calories is required'],
      min: [0, 'Calories cannot be negative']
    },
    date: {
      type: Date,
      default: Date.now,
      required: true
    }
  },
  { timestamps: true }
)

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema)