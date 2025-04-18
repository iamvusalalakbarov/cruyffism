"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { getQuoteById, updateQuote } from "@/actions/quote-actions"
import type { QuoteFormData } from "@/lib/validations"
import { useToastContext } from "@/contexts/toast-context"
import { LoadingSpinner } from "@/components/loading-spinner"

interface EditQuotePageProps {
  params: {
    id: string
  }
}

export default function EditQuotePage({ params }: EditQuotePageProps) {
  const router = useRouter()
  const { addToast } = useToastContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<QuoteFormData>({
    text: "",
    context: "",
    year: "",
    category: "",
    featured: false,
  })

  useEffect(() => {
    async function fetchQuote() {
      setIsLoading(true)
      const { quote, error } = await getQuoteById(Number.parseInt(params.id))

      if (error) {
        setError(error)
        addToast({
          title: "Error",
          description: error,
          type: "destructive",
        })
      } else if (quote) {
        setFormData({
          text: quote.text,
          context: quote.context || "",
          year: quote.year || "",
          category: quote.category,
          featured: quote.featured,
        })
      }

      setIsLoading(false)
    }

    fetchQuote()
  }, [params.id, addToast])

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
      const result = await updateQuote(Number.parseInt(params.id), formData)

      if (result.success) {
        addToast({
          title: "Success",
          description: "Quote updated successfully",
          type: "success",
        })
        router.push("/admin/dashboard/quotes")
        router.refresh()
      } else {
        setError(result.error || "Failed to update quote")
        addToast({
          title: "Error",
          description: result.error || "Failed to update quote",
          type: "destructive",
        })
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error updating quote:", error)
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
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex items-center">
                <LoadingSpinner size="sm" className="mr-2" />
                <span>Saving...</span>
              </div>
            ) : (
              "Update Quote"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
