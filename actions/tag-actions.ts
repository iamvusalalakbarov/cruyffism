"use server"

import { sql } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { tagSchema } from "@/lib/validations"
import { z } from "zod"

// Get all tags
export async function getTags() {
  try {
    const tags = await sql`
      SELECT t.*, COUNT(at.article_id) as article_count
      FROM tags t
      LEFT JOIN article_tags at ON t.id = at.tag_id
      GROUP BY t.id
      ORDER BY t.name
    `

    return { tags, error: null }
  } catch (error) {
    console.error("Error fetching tags:", error)
    return { tags: [], error: "Failed to fetch tags. Database connection issue." }
  }
}

// Create a new tag
export async function createTag(name: string) {
  try {
    // Validate tag name
    const { name: validatedName } = tagSchema.parse({ name })

    await sql`
      INSERT INTO tags (name)
      VALUES (${validatedName})
      ON CONFLICT (name) DO NOTHING
    `

    revalidatePath("/admin/dashboard/tags")
    return { success: true, error: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
      }
    }

    console.error("Error creating tag:", error)
    return { success: false, error: "Failed to create tag" }
  }
}

// Update an existing tag
export async function updateTag(id: number, name: string) {
  try {
    // Validate tag name
    const { name: validatedName } = tagSchema.parse({ name })

    await sql`
      UPDATE tags
      SET name = ${validatedName}
      WHERE id = ${id}
    `

    revalidatePath("/admin/dashboard/tags")
    return { success: true, error: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
      }
    }

    console.error("Error updating tag:", error)
    return { success: false, error: "Failed to update tag" }
  }
}

// Delete a tag
export async function deleteTag(id: number) {
  try {
    // Start a transaction
    await sql`BEGIN`

    // Delete tag associations
    await sql`DELETE FROM article_tags WHERE tag_id = ${id}`

    // Delete the tag
    await sql`DELETE FROM tags WHERE id = ${id}`

    // Commit the transaction
    await sql`COMMIT`

    revalidatePath("/admin/dashboard/tags")
    return { success: true, error: null }
  } catch (error) {
    // Rollback in case of error
    await sql`ROLLBACK`
    console.error("Error deleting tag:", error)
    return { success: false, error: "Failed to delete tag" }
  }
}
