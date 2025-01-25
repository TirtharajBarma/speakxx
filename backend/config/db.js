import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected successfully to mongodb');

    } catch (error) {
        console.error('Mongodb connection error => ', error);
    }
}

export default connectDb