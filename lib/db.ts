import { neon } from "@neondatabase/serverless"

// Create a SQL client with the database URL from environment variables
// This approach allows both template literals and string+params formats
const neonClient = neon(process.env.DATABASE_URL!)

// Export the SQL function that can be used directly
export const sql = neonClient

// Helper function to format dates for display
export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
