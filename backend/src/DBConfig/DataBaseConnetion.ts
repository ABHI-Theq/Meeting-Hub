import mongoose from 'mongoose'

export const DBConnect=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string).then(()=>{
            console.log("Connected to MongoDB successfully")
        })
    } catch (error) {
         console.error("Database connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
}