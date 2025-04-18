import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Eye, Tag, Quote, AlertTriangle } from "lucide-react"
import { getArticles } from "@/actions/article-actions"
import { getQuotes } from "@/actions/quote-actions"
import { getTags } from "@/actions/tag-actions"
import { formatDate } from "@/lib/utils"

export default async function DashboardPage() {
  // Fetch data from the database
  const { articles, error: articlesError } = await getArticles()
  const { quotes, error: quotesError } = await getQuotes()
  const { tags, error: tagsError } = await getTags()

  // Check if there are any errors
  const hasError = articlesError || quotesError || tagsError

  // Calculate stats
  const totalArticles = articles?.length || 0
  const totalViews = articles?.reduce((sum, article) => sum + Number(article.view_count || 0), 0) || 0
  const totalQuotes = quotes?.length || 0
  const uniqueTags = tags?.length || 0

  if (hasError) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Welcome to Cruyffism Admin</h2>

        <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">Database Connection Error</h3>
          </div>
          <p className="text-red-700 dark:text-red-400 mb-4">
            There was an error connecting to the database. This could be due to:
          </p>
          <ul className="list-disc list-inside text-red-700 dark:text-red-400 space-y-1 ml-4">
            <li>Temporary network issues</li>
            <li>Database server maintenance</li>
            <li>Configuration issues with database credentials</li>
          </ul>
          <p className="mt-4 text-red-700 dark:text-red-400">
            Please try refreshing the page. If the problem persists, contact your administrator.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Welcome to Cruyffism Admin</h2>
      <p className="text-muted-foreground">Here you can manage your blog content and view analytics.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalArticles}</div>
            <p className="text-xs text-muted-foreground">Published articles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Article views</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tags</CardTitle>
            <Tag className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueTags}</div>
            <p className="text-xs text-muted-foreground">Unique tags</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quotes</CardTitle>
            <Quote className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuotes}</div>
            <p className="text-xs text-muted-foreground">Cruyff quotes</p>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-xl font-semibold mt-8 mb-4">Recent Articles</h3>
      <div className="border rounded-lg overflow-hidden bg-white dark:bg-neutral-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="text-left p-3 font-medium">Title</th>
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Views</th>
                <th className="text-left p-3 font-medium">Tags</th>
              </tr>
            </thead>
            <tbody>
              {articles.slice(0, 5).map((article) => (
                <tr key={article.id} className="border-t dark:border-gray-700">
                  <td className="p-3">
                    <span className="line-clamp-1">{article.title}</span>
                  </td>
                  <td className="p-3 whitespace-nowrap">{formatDate(article.date_published)}</td>
                  <td className="p-3">{Number(article.view_count).toLocaleString()}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {article.tags &&
                        article.tags
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((tag: string) => (
                            <span
                              key={tag}
                              className="inline-block rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                            >
                              {tag}
                            </span>
                          ))}
                      {article.tags && article.tags.filter(Boolean).length > 2 && (
                        <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          +{article.tags.filter(Boolean).length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No articles found. Create your first article to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
