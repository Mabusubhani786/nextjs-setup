// lib/db.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI missing");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = global as typeof globalThis & {
  mongoose?: MongooseCache;
};

let cached: MongooseCache = globalWithMongoose.mongoose || {
  conn: null,
  promise: null,
};

if (process.env.NODE_ENV === "development") {
  globalWithMongoose.mongoose = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;

    const db = cached.conn.connection.db;
    if (db) {
      const collections = await db.collections();
      console.log("Database connected. Collections:");
      collections.forEach((collection) => {
        console.log(`- ${collection.collectionName}`);
      });
    }
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
