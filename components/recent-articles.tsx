import Link from "next/link"
import { ArrowRight, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArticleCard } from "@/components/article-card"
import { getArticles } from "@/actions/article-actions"
import { formatDate } from "@/lib/utils";

interface RecentArticlesProps {
  title?: string
  excludeId?: string
  count?: number
}

export async function RecentArticles({ title = "Son Məqalələr", excludeId, count = 3 }: RecentArticlesProps) {
  // Get articles from the database
  const { articles, error } = await getArticles()

  // Handle error case
  if (error) {
    return (
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter">{title}</h2>
            <Link href="/articles">
              <Button variant="outline">
                Bütün Məqalələrə Bax
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="p-6 bg-orange-50 dark:bg-orange-950/20 rounded-lg text-center">
            <AlertTriangle className="h-12 w-12 text-orange-600 dark:text-orange-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Couldn't Load Articles</h3>
            <p className="text-muted-foreground">
              We're having trouble loading the latest articles. Please try again later.
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Get articles, excluding the one with the specified ID if provided
  const filteredArticles = excludeId ? articles.filter((article) => article.id !== excludeId) : articles

  // Get the specified number of articles
  const displayArticles = filteredArticles.slice(0, count)

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter">{title}</h2>
          <Link href="/articles">
            <Button variant="outline">
              Bütün Məqalələrə Bax
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayArticles.map((article) => (
            <ArticleCard
              key={article.id}
              image={article.image_url || "/placeholder.svg?height=200&width=400"}
              title={article.title}
              description={article.description}
              date={formatDate(new Date(article.date_published))}
              readTime={article.read_time || "5 min read"}
              viewCount={Number(article.view_count)}
              tags={article.tags.filter(Boolean)}
              href={`/articles/${article.slug}`}
            />
          ))}
          {displayArticles.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No articles found. Check back soon for new content!
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
