import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config()

export async function connectDB () {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/bloodbank');
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
