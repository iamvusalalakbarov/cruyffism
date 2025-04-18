"use client"

import { useState, useEffect } from "react"
import { BookOpen } from "lucide-react"
import { ArticleCard } from "@/components/article-card"
import { Pagination } from "@/components/pagination"
import { getArticles } from "@/actions/article-actions"
import { SkeletonCard } from "@/components/skeleton-card"

export default function ArticlesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [articles, setArticles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const articlesPerPage = 6

  useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true)
      try {
        const { articles, error } = await getArticles()

        if (error) {
          setError(error)
        } else {
          setArticles(articles)
        }
      } catch (err) {
        setError("Failed to fetch articles")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const totalPages = Math.ceil(articles.length / articlesPerPage)

  // Get current articles
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-orange-50 to-white dark:from-orange-950/20 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-block rounded-lg bg-orange-100 dark:bg-orange-900/30 px-3 py-1 text-sm text-orange-800 dark:text-orange-300">
              Explore
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">The Cruyffism Archives</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Dive into our collection of articles exploring Johan Cruyff's philosophy, tactics, and lasting impact on
              the beautiful game.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="h-5 w-5 text-orange-600" />
            <h2 className="text-2xl font-bold">All Articles</h2>
            {!isLoading && <span className="text-muted-foreground ml-2">({articles.length})</span>}
          </div>

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="p-4 text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-md">
              Error: {error}
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {currentArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    image={article.image_url || "/placeholder.svg?height=200&width=400"}
                    title={article.title}
                    description={article.description}
                    date={new Date(article.date_published).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    readTime={article.read_time || "5 min read"}
                    viewCount={Number(article.view_count)}
                    tags={article.tags.filter(Boolean)}
                    href={`/articles/${article.slug}`}
                  />
                ))}
              </div>

              {articles.length > 0 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              )}

              {articles.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No articles found. Check back soon for new content!
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
