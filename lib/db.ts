import mongoose from "mongoose"

/**
 * Next.js reloads modules in dev and runs serverless-style invocations in
 * production, so the connection promise is cached on `globalThis` to avoid
 * opening a new pool per request.
 */
type MongooseCache = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

const globalWithMongoose = globalThis as typeof globalThis & {
  __mongooseCache?: MongooseCache
}

const cache: MongooseCache = (globalWithMongoose.__mongooseCache ??= {
  conn: null,
  promise: null,
})

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn

  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Copy .env.example to .env.local.")
  }

  cache.promise ??= mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB ?? "club-website",
    bufferCommands: false,
  })

  cache.conn = await cache.promise
  return cache.conn
}
