import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { createError } from '../error.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';


export const UserRegister = async (req,res,next) => {
    try {
        const {email,password,name,img} = req.body;

        const existingUser = await  User.findOne({email}).exec();

        if (existingUser) {
            return next(createError(409, "User already exists"));           
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword =  bcrypt.hashSync(password, salt);

        const user = new User({
            name,
            email,
            password:hashedPassword,
            img,
        });
        const createdUser = await user.save();
        const token   = jwt.sign({id:createdUser._id},process.env.JWT_SECRET, {expiresIn:'9999 years'});

        return res.status(200).json({token,user})
    } catch (error) {
        next(error)
    }
}


export const UserLogin = async (req,res,next) => {
    try {
        const {email,password} = req.body;

        const existingUser = await  User.findOne({email}).exec();

        if (!existingUser) {
            return next(createError(404, "User doesn't exists"));           
        }
      
        const isPasswordCorrect = await bcrypt.compareSync(password,existingUser.password)
        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong password or username"));           
            
        }

        const token   = jwt.sign({id:existingUser._id},process.env.JWT_SECRET, {expiresIn:'9999 years'});

        return res.status(200).json({token,existingUser})
    } catch (error) {
        next(error)
    }
}

export const getUserDashboard = async (req,res,next) => {
    try {
        const userId = req.user?.id;
        const user = await User.findById(userId)
        if (!user) {
            return next(createError(404, "User not found"));           
        }

        const currentDateFormatted  = new Date()

        const startToday = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate(),
        )
        const endToday = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate() + 1,
        )                                           
        
        //calculate the total calories burned today
        const totalCaloriesBurnt = await Workout.aggregate([
            {$match:{user:user._id, date:{$gte:startToday, $lt:endToday}}},
            {$group:{_id:null, totalCaloriesBurnt:{$sum:'$caloriesBurned'}}}
        ])

    
        //Calculate total no of workouts
        const totalWorkouts = await Workout.countDocuments({
            user:userId,
            date:{$gte:startToday, $lt:endToday}
        })

        
        
        //Calculate average calories burnt per workout
        const avgCaloriesBurntPerWorkout = 
         totalCaloriesBurnt.length>0 ? (totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts).toFixed(2) : 0
    
         
         
         //Fetch category of  workouts
         const categoryCalories = await Workout.aggregate([
            
             { $match: {
                user: new mongoose.Types.ObjectId(userId),
                date: { $gte: startToday, $lt: endToday },
              }},  
              
               { $group: {
                  _id: "$category",
                  totalCaloriesBurnt: { $sum: "$caloriesBurned" },
                }} 
         ])



         //Format category  data for pie chart
         const pieChartData = categoryCalories.map((category,index)=>({
            id:index,
            value:category.totalCaloriesBurnt,
            label:category._id,
         }))

         const weeks  =[];
         const caloriesBurnt = [];

         for (let i = 6; i >= 0; i--) {
            const date = new Date(
                currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
            )
            weeks.push(`${date.getDate()}th`);

            const startDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            )
            const endDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() + 1
            )
        
console.log(userId + " " + startDate + endDate);

         const weekData = await Workout.aggregate([
            { $match: { user:  new mongoose.Types.ObjectId(userId), date: { $gte: startDate, $lt: endDate } } },
             { $group: { _id:{ $dateToString:{format:'%m-%d-%Y',date:'$date'}}, 
             totalCaloriesBurnt: { $sum: "$caloriesBurned" } } },
             {
                $sort :{_id:1}
             }
         ])



         caloriesBurnt.push(weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0)
 }
         return res.status(200).json({
            totalCalories:totalCaloriesBurnt[0].totalCaloriesBurnt,
            totalWorkouts:totalWorkouts,
            avgCaloriesBurntPerWorkout:avgCaloriesBurntPerWorkout,
            totalCaloriesBurnt :{
                weeks:weeks,
                caloriesBurnd:caloriesBurnt,
            },
            pieChartData:pieChartData,
            })

        } catch (error) {
        next(error)
    }
}

export const getWorkoutsByDate = async (req,res,next) => {
    try {
        const userId = req.user?.id;
        const user = await User.findById(userId);
        console.log(req.params.date);
        
      
        // Split the date string in 'DD-MM-YYYY' format
        const [day, month, year] = req.params.date.split('-');
        const date = new Date(year, month - 1, day);  // month is 0-indexed in JS

        console.log("Parsed date:", date);
      
        
        if (!user) {
            return next(createError(404, "User not found"));                
        }
        const startDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        )
           
         const endDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 1
        )
        const todaysWorkouts = await Workout.find({
            user:userId,
            date:{$gte:startDate, $lt:endDate}
        })
        const totalCaloriesBurnt = todaysWorkouts.reduce(
            (total, workout) => total + workout.caloriesBurned, 0
        )

        return res.status(200).json({todaysWorkouts, totalCaloriesBurnt})
    } catch (error) {
        next(error)
    }
}

export const addWorkout = async (req,res,next) => {
    try {
        const userId = req.user?.id;
        const {workoutString} = req.body;

        if (!workoutString) {
            return next(createError(400, "Workout string is required"));
        }
        const eachWorkout = workoutString.split(',').map((workout) => workout.trim())
        const categories = eachWorkout.filter((line)=>line.startsWith('# ')    )
        if (categories.length === 0) {
            return next(createError(400, "Workout string is not valid"));
            
        }
        const parseWorkouts =[];
        let currentcategory =''
        let count =0

        await eachWorkout.forEach((line) => {
            count++
            if (line.startsWith('#')) {
               const parts = line?.split('\n').map((part) => part.trim())
               console.log("parts in"+parts);
                if (parts.length <5) {
                    return next(createError(400, "Workout string is not valid"));
                }
                currentcategory = parts[0].substring(1).trim()
                const workoutDetails = parseWorkoutLine(parts)
                if (workoutDetails === null) {
                    return next(createError(400, "Workout string is not valid"));
                }
                if (workoutDetails) {
                    workoutDetails.category = currentcategory;
                    parseWorkouts.push(workoutDetails);
                }
            }else{
                return next(createError(400, "Workout string is not valid"));
            }

        })

        await parseWorkouts.forEach(async (workout) => {
            workout.caloriesBurned = parseFloat(calculateCaloriesBurnt(workout))
            await Workout.create({...workout, user:userId})
        })
        
        return res.status(200).json({message:'Workout added successfully',
            workouts:parseWorkouts,
        })
    } catch (error) {
        next(error)
    }
}

const parseWorkoutLine = (parts)=>{
    const details  = {};
    console.log(parts);
    if (parts.length >=5) {
        details.workoutName = parts[1].substring(1).trim();
        details.sets = parseInt(parts[2].split('sets')[0].substring(1).trim());
        details.reps = parseInt(parts[2].split('sets')[1].split('reps')[0].substring(1).trim());
        details.weight = parseInt(parts[3].split('kg')[0].substring(1).trim());
        details.duration = parseInt(parts[4].split('min')[0].substring(1).trim());
        console.log(details);
        return details;
    }
}

const  calculateCaloriesBurnt = (workoutDetails) => {
    const durationInMinutes = parseInt(workoutDetails.duration);
    const weightInKg = parseInt(workoutDetails.weight);
    const caloriesBurntPerMinute = 5;
    return (durationInMinutes * weightInKg * caloriesBurntPerMinute) ;
} 