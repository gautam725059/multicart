import mongoose from "mongoose"

const mongoDBUrl = process.env.MONGODB_URL

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

const connectDb = async () => {
    if (!mongoDBUrl) {
        throw new Error("MONGODB_URL environment variable is not defined. Add it to .env.local")
    }

    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        cached.promise = (async () => {
            try {
                console.log("🔄 Connecting to MongoDB...")
                const mongoose_connection = await mongoose.connect(mongoDBUrl, {
                    maxPoolSize: 10,
                    serverSelectionTimeoutMS: 5000,
                    socketTimeoutMS: 45000,
                })
                console.log("✅ MongoDB connected successfully")
                return mongoose_connection.connection
            } catch (error) {
                console.error("❌ MongoDB connection failed:", error)
                cached.promise = null
                throw error
            }
        })()
    }

    try {
        const conn = await cached.promise
        cached.conn = conn
        return conn
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error)
        throw error
    }
}

export default connectDb