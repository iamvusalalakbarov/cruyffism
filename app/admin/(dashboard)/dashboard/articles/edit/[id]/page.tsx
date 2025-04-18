"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { TextEditor } from "@/components/text-editor"
import { X } from "lucide-react"
import { getArticleById, updateArticle } from "@/actions/article-actions"
import type { ArticleFormData } from "@/lib/validations"
import { useToastContext } from "@/contexts/toast-context"
import { LoadingSpinner } from "@/components/loading-spinner"

interface EditArticlePageProps {
  params: {
    id: string
  }
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const router = useRouter()
  const { addToast } = useToastContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    slug: "",
    description: "",
    content: "",
    image_url: "",
    read_time: "",
    tags: [] as string[],
    newTag: "",
  })

  useEffect(() => {
    async function fetchArticle() {
      setIsLoading(true)
      const { article, error } = await getArticleById(Number.parseInt(params.id))

      if (error) {
        setError(error)
        addToast({
          title: "Error",
          description: error,
          type: "destructive",
        })
      } else if (article) {
        setFormData({
          title: article.title,
          slug: article.slug,
          description: article.description,
          content: article.content,
          image_url: article.image_url || "",
          read_time: article.read_time || "",
          tags: article.tags.filter(Boolean) || [],
          newTag: "",
        })
      }

      setIsLoading(false)
    }

    fetchArticle()
  }, [params.id, addToast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }))
  }

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.newTag?.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.newTag!.trim()],
        newTag: "",
      }))
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Remove newTag from the data we send to the server
      const { newTag, ...dataToSubmit } = formData
      const result = await updateArticle(Number.parseInt(params.id), dataToSubmit)

      if (result.success) {
        addToast({
          title: "Success",
          description: "Article updated successfully",
          type: "success",
        })
        router.push("/admin/dashboard/articles")
        router.refresh()
      } else {
        setError(result.error || "Failed to update article")
        addToast({
          title: "Error",
          description: result.error || "Failed to update article",
          type: "destructive",
        })
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error updating article:", error)
      setError("An unexpected error occurred")
      addToast({
        title: "Error",
        description: "An unexpected error occurred",
        type: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-md">Error: {error}</div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter article title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  placeholder="Enter URL slug"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Enter article description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Featured Image URL</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="read_time">Read Time</Label>
                <Input
                  id="read_time"
                  name="read_time"
                  value={formData.read_time}
                  onChange={handleChange}
                  placeholder="e.g. 5 min read"
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <Input
                    name="newTag"
                    value={formData.newTag || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, newTag: e.target.value }))}
                    placeholder="Add a tag"
                    className="rounded-r-none"
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    className="rounded-l-none bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <TextEditor
            value={formData.content}
            onChange={handleContentChange}
            placeholder="Write your article content here..."
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard/articles")}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <LoadingSpinner size="sm" className="mr-2" />
                <span>Saving...</span>
              </div>
            ) : (
              "Update Article"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
