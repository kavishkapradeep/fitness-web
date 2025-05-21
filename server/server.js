import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import userRouter from './routes/UserRoutes.js'

const app = express()
app.use(cors())
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to the server!'})
})
app.use('/api/user',userRouter)


//connect mongoDb
const connectDB = ()=>{
    mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGODB_URL).then((res)=>console.log("MongoDB connected successfully")).
catch((err)=>console.log(err))
}


const startServer = async () => {
    try {
        connectDB()
        app.listen(8000,()=> console.log("Server running at port 8000")
        )
    } catch (error) {
        console.log(error);
        
    }
}

startServer()
