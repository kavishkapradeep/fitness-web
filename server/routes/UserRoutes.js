import express from 'express'
import { addWorkout, getUserDashboard, getWorkoutsByDate, UserLogin, UserRegister } from '../controllers/Usercontroller.js'
import verifyToken from '../lib/verifyToken.js'

const userRouter = express.Router()

userRouter.post('/signup',UserRegister)
userRouter.post('/signin',UserLogin)

userRouter.get('/dashboard',verifyToken,getUserDashboard)
userRouter.get('/workout/:date',verifyToken,getWorkoutsByDate)
userRouter.post('/workout',verifyToken,addWorkout)

export default userRouter