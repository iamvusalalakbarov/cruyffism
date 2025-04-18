import { neon } from "@neondatabase/serverless"

// Create a SQL client with the database URL from environment variables
// This approach allows both template literals and string+params formats
const neonClient = neon(process.env.DATABASE_URL!)

// Export the SQL function that can be used directly
export const sql = neonClient
