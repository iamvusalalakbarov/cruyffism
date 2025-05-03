import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Eye, Calendar } from "lucide-react";
import { getArticleBySlug, incrementViewCount } from "@/actions/article-actions";
import { RecentArticles } from "@/components/recent-articles";
// import { getArticles } from "@/actions/article-actions"
import { formatDate } from "@/lib/utils"; // Import getArticles

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  // Find the article with the matching slug
  const { article, error } = await getArticleBySlug((await params).slug);

  // If article not found, return 404
  if (!article) {
    notFound();
  }

  // Increment view count
  if (article.id) {
    await incrementViewCount(article.id);
  }

  return (
    <>
      {/* Article Header */}
      <section
        className="w-full py-12 md:py-24 bg-gradient-to-b from-orange-50 to-white dark:from-orange-950/20 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              {article.tags &&
                article.tags.filter(Boolean).map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                  >
                    {tag}
                  </span>
                ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{article.title}</h1>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {formatDate(article.date_published)}
              </span>
              <span className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {article.read_time || "5"} dəq.
              </span>
              <span className="flex items-center">
                <Eye className="mr-1 h-4 w-4" />
                {Number(article.view_count).toLocaleString()} baxış
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="container pt-4 lg:pt-0 px-4 md:px-6 -mt-12 mb-12">
        <div className="relative aspect-video overflow-hidden rounded-xl max-w-4xl mx-auto">
          <Image
            src={
              article.image_url?.replace("200&width=400", "600&width=1200") || "/placeholder.svg?height=600&width=1200"
            }
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="container px-4 md:px-6 py-6 md:py-12">
        <div className="prose prose-orange dark:prose-invert mx-auto max-w-3xl">
          {/*<p className="lead">{article.description}</p>*/}
          <div className="[&_a]:no-underline" dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }} />
          <p className="font-medium text-orange-600 dark:text-orange-400">Vüsal Ələkbərov</p>
        </div>
      </article>

      {/* Recent Articles */}
      <section className="w-full py-12 md:py-24 bg-orange-50 dark:bg-orange-950/10">
        <RecentArticles title="Digər Məqalələr" excludeId={article.id} />
      </section>
    </>
  );
}

// Simple markdown to HTML converter for demonstration purposes
function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>")
    .replace(/^- (.*$)/gm, "<li>$1</li>")
    .replace(/<\/li>\n<li>/g, "</li><li>")
    .replace(/^<li>/gm, "<ul><li>")
    .replace(/<\/li>$/gm, "</li></ul>")
    .replace(/<\/ul>\n<ul>/g, "")
    .replace(/\[([^\]]+)\]\((.*?)\)/g, "<a href=\"$2\" target=\"_blank\">$1</a>");
}

// Generate static params for all articles
// export async function generateStaticParams() {
//   const { articles } = await getArticles()
//
//   return articles.map((article: any) => ({
//     slug: article.slug,
//   }))
// }
