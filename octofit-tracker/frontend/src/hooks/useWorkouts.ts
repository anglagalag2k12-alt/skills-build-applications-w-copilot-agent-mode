import { useState, useEffect, useCallback } from 'react'
import { apiCall, WORKOUTS_API } from './api.ts'

export interface Workout {
  _id: string
  userId: string
  exercise: string
  duration: number
  calories: number
  date: string
  createdAt: string
  updatedAt: string
}

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWorkouts = useCallback(async () => {
    try {
      setLoading(true)
      const data = await apiCall<Workout[]>(WORKOUTS_API.LIST())
      setWorkouts(data)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching workouts:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createWorkout = useCallback(async (workout: Omit<Workout, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newWorkout = await apiCall<Workout>(WORKOUTS_API.CREATE(), {
        method: 'POST',
        body: JSON.stringify(workout)
      })
      setWorkouts([newWorkout, ...workouts])
      return newWorkout
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }, [workouts])

  const updateWorkout = useCallback(async (id: string, workout: Partial<Workout>) => {
    try {
      const updated = await apiCall<Workout>(WORKOUTS_API.UPDATE(id), {
        method: 'PUT',
        body: JSON.stringify(workout)
      })
      setWorkouts(workouts.map(w => w._id === id ? updated : w))
      return updated
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }, [workouts])

  const deleteWorkout = useCallback(async (id: string) => {
    try {
      await apiCall(WORKOUTS_API.DELETE(id), {
        method: 'DELETE'
      })
      setWorkouts(workouts.filter(w => w._id !== id))
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }, [workouts])

  useEffect(() => {
    fetchWorkouts()
  }, [fetchWorkouts])

  return {
    workouts,
    loading,
    error,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    fetchWorkouts
  }
}
