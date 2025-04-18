"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Star, StarOff } from "lucide-react"
import { ConfirmationDialog } from "@/components/confirmation-dialog"
import { Badge } from "@/components/ui/badge"
import { getQuotes, deleteQuote, toggleQuoteFeatured } from "@/actions/quote-actions"
import { useToastContext } from "@/contexts/toast-context"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function QuotesPage() {
  const { addToast } = useToastContext()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [quoteToDelete, setQuoteToDelete] = useState<number | null>(null)
  const [quotes, setQuotes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchQuotes() {
      setIsLoading(true)
      const { quotes, error } = await getQuotes()

      if (error) {
        setError(error)
        addToast({
          title: "Error",
          description: error,
          type: "destructive",
        })
      } else {
        setQuotes(quotes)
      }

      setIsLoading(false)
    }

    fetchQuotes()
  }, [addToast])

  const handleDeleteClick = (quoteId: number) => {
    setQuoteToDelete(quoteId)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (quoteToDelete) {
      const { success, error } = await deleteQuote(quoteToDelete)

      if (success) {
        // Remove the deleted quote from the state
        setQuotes(quotes.filter((quote) => quote.id !== quoteToDelete))
        addToast({
          title: "Success",
          description: "Quote deleted successfully",
          type: "success",
        })
      } else {
        setError(error || "Failed to delete quote")
        addToast({
          title: "Error",
          description: error || "Failed to delete quote",
          type: "destructive",
        })
      }

      setQuoteToDelete(null)
    }
  }

  const handleToggleFeatured = async (quoteId: number) => {
    const { success, error } = await toggleQuoteFeatured(quoteId)

    if (success) {
      // Update the quote in the state
      setQuotes(quotes.map((quote) => (quote.id === quoteId ? { ...quote, featured: !quote.featured } : quote)))
      addToast({
        title: "Success",
        description: "Quote featured status updated",
        type: "success",
      })
    } else {
      setError(error || "Failed to update quote")
      addToast({
        title: "Error",
        description: error || "Failed to update quote",
        type: "destructive",
      })
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
        <h2 className="text-3xl font-bold tracking-tight">Quotes</h2>
        <Link href="/admin/dashboard/quotes/new">
          <Button className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700">
            <Plus className="mr-2 h-4 w-4" />
            New Quote
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white dark:bg-neutral-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-neutral-700">
                <th className="text-left p-3 font-medium">Quote</th>
                <th className="text-left p-3 font-medium">Category</th>
                <th className="text-left p-3 font-medium">Year</th>
                <th className="text-left p-3 font-medium">Featured</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No quotes found. Create your first quote to get started.
                  </td>
                </tr>
              ) : (
                quotes.map((quote) => (
                  <tr key={quote.id} className="border-t dark:border-gray-700">
                    <td className="p-3">
                      <div className="line-clamp-2 max-w-md">{quote.text}</div>
                      {quote.context && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{quote.context}</div>
                      )}
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="bg-orange-50 dark:bg-orange-900/20">
                        {quote.category}
                      </Badge>
                    </td>
                    <td className="p-3">{quote.year || "—"}</td>
                    <td className="p-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleFeatured(quote.id)}
                        className={quote.featured ? "text-yellow-500" : "text-gray-400"}
                      >
                        {quote.featured ? (
                          <Star className="h-4 w-4 fill-yellow-500" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                      </Button>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/dashboard/quotes/edit/${quote.id}`}>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                          onClick={() => handleDeleteClick(quote.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Quote"
        message="Are you sure you want to delete this quote? This action cannot be undone."
      />
    </div>
  )
}
