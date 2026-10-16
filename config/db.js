import mongoose from "mongoose";

let cached = global.mongoose || {conn: null, promise: null};
global.mongoose = cached;

export default async function connectDB(){
    if(cached.conn) return cached.conn;

    const uri = process.env.MONGODB_URI;
    if(!uri || (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://"))){
        return null;
    }

    if(!cached.promise){
        cached.promise = mongoose.connect(uri, {
            serverSelectionTimeoutMS: 2000,
        }).then((mongooseInstance) => mongooseInstance)
        .catch((err) => {
            console.warn("MongoDB connection failed, falling back to local storage:", err.message);
            cached.promise = null;
            return null;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        cached.conn = null;
        cached.promise = null;
    }
    return cached.conn;
}