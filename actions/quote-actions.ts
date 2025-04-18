"use server"

import { sql } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { quoteSchema, type QuoteFormData } from "@/lib/validations"
import { z } from "zod"

// Get all quotes
export async function getQuotes() {
  try {
    const quotes = await sql`
      SELECT * FROM quotes
      ORDER BY created_at DESC
    `

    return { quotes, error: null }
  } catch (error) {
    console.error("Error fetching quotes:", error)
    return { quotes: [], error: "Failed to fetch quotes. Database connection issue." }
  }
}

// Get featured quotes
export async function getFeaturedQuotes() {
  try {
    const quotes = await sql`
      SELECT * FROM quotes
      WHERE featured = true
      ORDER BY created_at DESC
    `

    return { quotes, error: null }
  } catch (error) {
    console.error("Error fetching featured quotes:", error)
    return { quotes: [], error: "Failed to fetch featured quotes" }
  }
}

// Get quote by ID
export async function getQuoteById(id: number) {
  try {
    const quotes = await sql`
      SELECT * FROM quotes
      WHERE id = ${id}
    `

    if (quotes.length === 0) {
      return { quote: null, error: "Quote not found" }
    }

    return { quote: quotes[0], error: null }
  } catch (error) {
    console.error("Error fetching quote:", error)
    return { quote: null, error: "Failed to fetch quote" }
  }
}

// Create a new quote
export async function createQuote(formData: QuoteFormData) {
  try {
    // Validate form data
    const validatedData = quoteSchema.parse(formData)

    await sql`
      INSERT INTO quotes (
        text, context, year, category, featured
      ) VALUES (
        ${validatedData.text}, 
        ${validatedData.context || null}, 
        ${validatedData.year || null}, 
        ${validatedData.category}, 
        ${validatedData.featured}
      )
    `

    revalidatePath("/admin/dashboard/quotes")
    return { success: true, error: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
      }
    }

    console.error("Error creating quote:", error)
    return { success: false, error: "Failed to create quote" }
  }
}

// Update an existing quote
export async function updateQuote(id: number, formData: QuoteFormData) {
  try {
    // Validate form data
    const validatedData = quoteSchema.parse(formData)

    await sql`
      UPDATE quotes
      SET text = ${validatedData.text},
          context = ${validatedData.context || null},
          year = ${validatedData.year || null},
          category = ${validatedData.category},
          featured = ${validatedData.featured},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `

    revalidatePath("/admin/dashboard/quotes")
    return { success: true, error: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
      }
    }

    console.error("Error updating quote:", error)
    return { success: false, error: "Failed to update quote" }
  }
}

// Delete a quote
export async function deleteQuote(id: number) {
  try {
    await sql`DELETE FROM quotes WHERE id = ${id}`

    revalidatePath("/admin/dashboard/quotes")
    return { success: true, error: null }
  } catch (error) {
    console.error("Error deleting quote:", error)
    return { success: false, error: "Failed to delete quote" }
  }
}

// Toggle featured status
export async function toggleQuoteFeatured(id: number) {
  try {
    await sql`
      UPDATE quotes
      SET featured = NOT featured,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `

    revalidatePath("/admin/dashboard/quotes")
    return { success: true, error: null }
  } catch (error) {
    console.error("Error toggling quote featured status:", error)
    return { success: false, error: "Failed to update quote" }
  }
}
