import mongoose, { type Mongoose } from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

interface MongooseConn {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

let cached: MongooseConn = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  }
}

async function dbConnect() {
  // Check if MongoDB URI is defined
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local or in your Vercel project settings",
    )
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      connectTimeoutMS: 8000, // 8 seconds timeout - below Vercel's 10s limit
      socketTimeoutMS: 8000,
      serverSelectionTimeoutMS: 8000,
    }

    console.log("Connecting to MongoDB...")
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB connected successfully")
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error("MongoDB connection error:", e)
    throw e
  }

  return cached.conn
}

export default dbConnect

