"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { createQuote } from "@/actions/quote-actions"
import type { QuoteFormData } from "@/lib/validations"
import { useToastContext } from "@/contexts/toast-context"

export default function NewQuotePage() {
  const router = useRouter()
  const { addToast } = useToastContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<QuoteFormData>({
    text: "",
    context: "",
    year: "",
    category: "",
    featured: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, featured: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await createQuote(formData)

      if (result.success) {
        addToast({
          title: "Success",
          description: "Quote created successfully",
          type: "success",
        })
        router.push("/admin/dashboard/quotes")
        router.refresh()
      } else {
        setError(result.error || "Failed to create quote")
        addToast({
          title: "Error",
          description: result.error || "Failed to create quote",
          type: "destructive",
        })
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error creating quote:", error)
      setError("An unexpected error occurred")
      addToast({
        title: "Error",
        description: "An unexpected error occurred",
        type: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-md">{error}</div>
        )}

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text">Quote Text</Label>
                <Textarea
                  id="text"
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  required
                  placeholder="Enter the quote text"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">Context (Optional)</Label>
                <Input
                  id="context"
                  name="context"
                  value={formData.context}
                  onChange={handleChange}
                  placeholder="When or where was this quote said"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year (Optional)</Label>
                  <Input id="year" name="year" value={formData.year} onChange={handleChange} placeholder="e.g. 1974" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Philosophy, Tactics"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch id="featured" checked={formData.featured} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="featured">Featured Quote</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard/quotes")}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">Saving...</span>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              </>
            ) : (
              "Save Quote"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
