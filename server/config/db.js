import mongoose from "mongoose";

import dotenv from 'dotenv'
dotenv.config()

const connectionString = process.env.MONGO_URI

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(connectionString)
        console.log("Database Connected")
    } catch (error) {
        console.error(error)
        process.exit()
    }
}

export default connectDB