import express from 'express'
import { getUserDashboard, UserLogin, UserRegister } from '../controllers/Usercontroller.js'
import verifyToken from '../lib/verifyToken.js'

const userRouter = express.Router()

userRouter.post('/signup',UserRegister)
userRouter.post('/signin',UserLogin)

userRouter.get('/dashboard',verifyToken,getUserDashboard)

export default userRouter