// app/api/health/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const startTime = Date.now();
    const db = await connectDB();
    const dbInstance = db.connection.db;

    if (!dbInstance) {
      throw new Error("Database connection not established");
    }

    const dbPing = await dbInstance.command({ ping: 1 });
    const latency = Date.now() - startTime;

    const collections = await dbInstance.collections();
    const collectionNames = collections.map((col) => col.collectionName);

    return NextResponse.json({
      status: "healthy",
      database: {
        connected: true,
        ping: dbPing.ok === 1 ? "success" : "failed",
        latency: `${latency}ms`,
        collections: collectionNames,
        count: collections.length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "unhealthy",
        database: {
          connected: false,
          error: error.message,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
