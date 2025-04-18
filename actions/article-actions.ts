"use server"

import { sql } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { articleSchema, type ArticleFormData } from "@/lib/validations"
import { z } from "zod"

// Get all articles
export async function getArticles() {
  try {
    const articles = await sql`
      SELECT a.*, 
             ARRAY_AGG(t.name) as tags
      FROM articles a
      LEFT JOIN article_tags at ON a.id = at.article_id
      LEFT JOIN tags t ON at.tag_id = t.id
      GROUP BY a.id
      ORDER BY a.date_published DESC
    `

    return { articles, error: null }
  } catch (error) {
    console.error("Error fetching articles:", error)
    return { articles: [], error: "Failed to fetch articles. Database connection issue." }
  }
}

// Get article by slug
export async function getArticleBySlug(slug: string) {
  try {
    const articles = await sql`
      SELECT a.*, 
             ARRAY_AGG(t.name) as tags
      FROM articles a
      LEFT JOIN article_tags at ON a.id = at.article_id
      LEFT JOIN tags t ON at.tag_id = t.id
      WHERE a.slug = ${slug}
      GROUP BY a.id
    `

    if (articles.length === 0) {
      return { article: null, error: "Article not found" }
    }

    return { article: articles[0], error: null }
  } catch (error) {
    console.error("Error fetching article:", error)
    return { article: null, error: "Failed to fetch article" }
  }
}

// Get article by ID
export async function getArticleById(id: number) {
  try {
    const articles = await sql`
      SELECT a.*, 
             ARRAY_AGG(t.name) as tags
      FROM articles a
      LEFT JOIN article_tags at ON a.id = at.article_id
      LEFT JOIN tags t ON at.tag_id = t.id
      WHERE a.id = ${id}
      GROUP BY a.id
    `

    if (articles.length === 0) {
      return { article: null, error: "Article not found" }
    }

    return { article: articles[0], error: null }
  } catch (error) {
    console.error("Error fetching article:", error)
    return { article: null, error: "Failed to fetch article" }
  }
}

// Create a new article
export async function createArticle(formData: ArticleFormData) {
  try {
    // Validate form data
    const validatedData = articleSchema.parse(formData)

    // Start a transaction
    await sql`BEGIN`

    // Insert the article
    const result = await sql`
      INSERT INTO articles (
        title, slug, description, content, image_url, read_time
      ) VALUES (
        ${validatedData.title}, 
        ${validatedData.slug}, 
        ${validatedData.description}, 
        ${validatedData.content}, 
        ${validatedData.image_url || null}, 
        ${validatedData.read_time || null}
      ) RETURNING id
    `

    const articleId = result[0].id

    // Handle tags
    if (validatedData.tags && validatedData.tags.length > 0) {
      for (const tagName of validatedData.tags) {
        // Insert tag if it doesn't exist
        const tagResult = await sql`
          INSERT INTO tags (name)
          VALUES (${tagName})
          ON CONFLICT (name) DO UPDATE SET name = ${tagName}
          RETURNING id
        `

        const tagId = tagResult[0].id

        // Create article-tag relationship
        await sql`
          INSERT INTO article_tags (article_id, tag_id)
          VALUES (${articleId}, ${tagId})
          ON CONFLICT DO NOTHING
        `
      }
    }

    // Commit the transaction
    await sql`COMMIT`

    revalidatePath("/admin/dashboard/articles")
    return { success: true, error: null }
  } catch (error) {
    // Rollback in case of error
    await sql`ROLLBACK`

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
      }
    }

    console.error("Error creating article:", error)
    return { success: false, error: "Failed to create article" }
  }
}

// Update an existing article
export async function updateArticle(id: number, formData: ArticleFormData) {
  try {
    // Validate form data
    const validatedData = articleSchema.parse(formData)

    // Start a transaction
    await sql`BEGIN`

    // Update the article
    await sql`
      UPDATE articles
      SET title = ${validatedData.title},
          slug = ${validatedData.slug},
          description = ${validatedData.description},
          content = ${validatedData.content},
          image_url = ${validatedData.image_url || null},
          read_time = ${validatedData.read_time || null},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `

    // Remove existing article-tag relationships
    await sql`DELETE FROM article_tags WHERE article_id = ${id}`

    // Handle tags
    if (validatedData.tags && validatedData.tags.length > 0) {
      for (const tagName of validatedData.tags) {
        // Insert tag if it doesn't exist
        const tagResult = await sql`
          INSERT INTO tags (name)
          VALUES (${tagName})
          ON CONFLICT (name) DO UPDATE SET name = ${tagName}
          RETURNING id
        `

        const tagId = tagResult[0].id

        // Create article-tag relationship
        await sql`
          INSERT INTO article_tags (article_id, tag_id)
          VALUES (${id}, ${tagId})
          ON CONFLICT DO NOTHING
        `
      }
    }

    // Commit the transaction
    await sql`COMMIT`

    revalidatePath("/admin/dashboard/articles")
    return { success: true, error: null }
  } catch (error) {
    // Rollback in case of error
    await sql`ROLLBACK`

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
      }
    }

    console.error("Error updating article:", error)
    return { success: false, error: "Failed to update article" }
  }
}

// Delete an article
export async function deleteArticle(id: number) {
  try {
    // The article_tags entries will be automatically deleted due to ON DELETE CASCADE
    await sql`DELETE FROM articles WHERE id = ${id}`

    revalidatePath("/admin/dashboard/articles")
    return { success: true, error: null }
  } catch (error) {
    console.error("Error deleting article:", error)
    return { success: false, error: "Failed to delete article" }
  }
}

// Increment view count
export async function incrementViewCount(id: number) {
  try {
    await sql`
      UPDATE articles
      SET view_count = view_count + 1
      WHERE id = ${id}
    `
    return { success: true }
  } catch (error) {
    console.error("Error incrementing view count:", error)
    return { success: false }
  }
}
