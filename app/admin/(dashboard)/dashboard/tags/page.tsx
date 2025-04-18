"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Check, X } from "lucide-react"
import { ConfirmationDialog } from "@/components/confirmation-dialog"
import { getTags, createTag, updateTag, deleteTag } from "@/actions/tag-actions"
import { useToastContext } from "@/contexts/toast-context"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function TagsPage() {
  const { addToast } = useToastContext()
  const [tags, setTags] = useState<any[]>([])
  const [newTagName, setNewTagName] = useState("")
  const [editingTagId, setEditingTagId] = useState<number | null>(null)
  const [editTagName, setEditTagName] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [tagToDelete, setTagToDelete] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTags() {
      setIsLoading(true)
      const { tags, error } = await getTags()

      if (error) {
        setError(error)
        addToast({
          title: "Error",
          description: error,
          type: "destructive",
        })
      } else {
        setTags(tags)
      }

      setIsLoading(false)
    }

    fetchTags()
  }, [addToast])

  const handleAddTag = async () => {
    if (newTagName.trim()) {
      try {
        const { success, error } = await createTag(newTagName.trim())

        if (success) {
          // Refresh tags
          const { tags: updatedTags } = await getTags()
          setTags(updatedTags)
          setNewTagName("")
          addToast({
            title: "Success",
            description: "Tag created successfully",
            type: "success",
          })
        } else {
          setError(error || "Failed to create tag")
          addToast({
            title: "Error",
            description: error || "Failed to create tag",
            type: "destructive",
          })
        }
      } catch (error) {
        console.error("Error creating tag:", error)
        setError("An unexpected error occurred")
        addToast({
          title: "Error",
          description: "An unexpected error occurred",
          type: "destructive",
        })
      }
    }
  }

  const handleEditClick = (tagId: number, tagName: string) => {
    setEditingTagId(tagId)
    setEditTagName(tagName)
  }

  const handleSaveEdit = async (tagId: number) => {
    if (editTagName.trim()) {
      try {
        const { success, error } = await updateTag(tagId, editTagName.trim())

        if (success) {
          // Refresh tags
          const { tags: updatedTags } = await getTags()
          setTags(updatedTags)
          setEditingTagId(null)
          setEditTagName("")
          addToast({
            title: "Success",
            description: "Tag updated successfully",
            type: "success",
          })
        } else {
          setError(error || "Failed to update tag")
          addToast({
            title: "Error",
            description: error || "Failed to update tag",
            type: "destructive",
          })
        }
      } catch (error) {
        console.error("Error updating tag:", error)
        setError("An unexpected error occurred")
        addToast({
          title: "Error",
          description: "An unexpected error occurred",
          type: "destructive",
        })
      }
    }
  }

  const handleCancelEdit = () => {
    setEditingTagId(null)
    setEditTagName("")
  }

  const handleDeleteClick = (tagId: number) => {
    setTagToDelete(tagId)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (tagToDelete) {
      try {
        const { success, error } = await deleteTag(tagToDelete)

        if (success) {
          // Remove the deleted tag from the state
          setTags(tags.filter((tag) => tag.id !== tagToDelete))
          addToast({
            title: "Success",
            description: "Tag deleted successfully",
            type: "success",
          })
        } else {
          setError(error || "Failed to delete tag")
          addToast({
            title: "Error",
            description: error || "Failed to delete tag",
            type: "destructive",
          })
        }

        setTagToDelete(null)
      } catch (error) {
        console.error("Error deleting tag:", error)
        setError("An unexpected error occurred")
        addToast({
          title: "Error",
          description: "An unexpected error occurred",
          type: "destructive",
        })
      }
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Tags</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Tag</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Enter tag name"
              className="max-w-md"
            />
            <Button
              onClick={handleAddTag}
              className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Tag
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden bg-white dark:bg-neutral-800">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-neutral-700">
                    <th className="text-left p-3 font-medium">Tag Name</th>
                    <th className="text-left p-3 font-medium">Articles</th>
                    <th className="text-right p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tags.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-4 text-center text-gray-500 dark:text-gray-400">
                        No tags found. Add your first tag above.
                      </td>
                    </tr>
                  ) : (
                    tags.map((tag) => (
                      <tr key={tag.id} className="border-t dark:border-gray-700">
                        <td className="p-3">
                          {editingTagId === tag.id ? (
                            <Input
                              value={editTagName}
                              onChange={(e) => setEditTagName(e.target.value)}
                              className="max-w-xs"
                            />
                          ) : (
                            <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                              {tag.name}
                            </span>
                          )}
                        </td>
                        <td className="p-3">{tag.article_count}</td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2">
                            {editingTagId === tag.id ? (
                              <>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleSaveEdit(tag.id)}
                                  className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={handleCancelEdit}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button variant="outline" size="icon" onClick={() => handleEditClick(tag.id, tag.name)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                                  onClick={() => handleDeleteClick(tag.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfirmationDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Tag"
        message="Are you sure you want to delete this tag? This will remove the tag from all associated articles."
      />
    </div>
  )
}
