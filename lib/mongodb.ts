import mongoose, { Mongoose } from 'mongoose'

/**
 * Cached connection interface stored on the global object to prevent
 * creating multiple connections during hot-reloads in development.
 */
type MongooseCache = {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

declare global {
  // Allow attaching the cache to the global namespace. This is safe because
  // Next.js performs module reloads during development and we want to reuse
  // the same mongoose connection across reloads.
  // eslint-disable-next-line no-var
  var __mongoose_cache: MongooseCache | undefined
}

// Pull the MongoDB connection string from environment variables.
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  // Fail fast with a clear error if the connection string is missing.
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

// Use the global cache if it exists, otherwise initialize a fresh cache.
const cached: MongooseCache = global.__mongoose_cache ?? { conn: null, promise: null }

/**
 * Establish (or reuse) a Mongoose connection.
 *
 * Usage:
 *   import { connectToDatabase } from '@/lib/mongodb'
 *   await connectToDatabase()
 *
 * This function caches the connection promise and the resolved connection on
 * the global object so the same connection is reused across module reloads
 * during development (prevents exceeding connection limits).
 */
export async function connectToDatabase(): Promise<Mongoose> {
  // If a connection already exists, return it.
  if (cached.conn) {
    return cached.conn
  }

  // If a connection is in progress, wait for it.
  if (!cached.promise) {
    // Keep behavior deterministic for query parsing (optional, recommended).
    mongoose.set('strictQuery', true)

  // Create and cache the connection promise. We cast to `string` here
  // because we already throw above if the environment variable is missing,
  // so this assertion is safe and satisfies TypeScript's strict checks.
  cached.promise = mongoose.connect(MONGODB_URI as string).then((m) => m)
  }

  // Await the cached promise and store the resolved connection.
  cached.conn = await cached.promise
  global.__mongoose_cache = cached
  return cached.conn
}

/**
 * Default export of mongoose instance for convenience. Call
 * `await connectToDatabase()` before using models to ensure the connection is
 * ready (especially in serverless or edge environments).
 */
export default mongoose
