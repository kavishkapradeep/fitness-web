import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
        user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
        category:{type:String, required:true},
        workoutName:{type:String, required:true},
        sets:{type:Number},
        reps:{type:String},
        weight:{type:Number},
        duration:{type:Number},
        caloriesBurned:{type:Number},
        date:{type:Date, default:Date.now},
},{timestamps:true})

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;