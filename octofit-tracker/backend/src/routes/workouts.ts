import express, { Request, Response, Router } from 'express'
import { Workout } from '../models/Workout.ts'

const router = Router()

// Get all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().sort({ date: -1 })
    res.status(200).json(workouts)
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching workouts', error: error.message })
  }
})

// Create new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, exercise, duration, calories, date } = req.body

    // Validation
    if (!userId || !exercise || !duration || !calories) {
      return res.status(400).json({ message: 'Missing required fields: userId, exercise, duration, calories' })
    }

    const workout = new Workout({
      userId,
      exercise,
      duration,
      calories,
      date: date || new Date()
    })

    await workout.save()
    res.status(201).json(workout)
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating workout', error: error.message })
  }
})

// Get workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id)
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' })
    }
    res.status(200).json(workout)
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching workout', error: error.message })
  }
})

// Update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { userId, exercise, duration, calories, date } = req.body

    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      { userId, exercise, duration, calories, date },
      { new: true, runValidators: true }
    )

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' })
    }

    res.status(200).json(workout)
  } catch (error: any) {
    res.status(400).json({ message: 'Error updating workout', error: error.message })
  }
})

// Delete workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id)
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' })
    }
    res.status(200).json({ message: 'Workout deleted successfully', workout })
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting workout', error: error.message })
  }
})

// Get workouts by user ID
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId }).sort({ date: -1 })
    res.status(200).json(workouts)
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching user workouts', error: error.message })
  }
})

export default router