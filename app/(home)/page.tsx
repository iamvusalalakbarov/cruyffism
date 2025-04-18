import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Quote, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RecentArticles } from "@/components/recent-articles"
import { getFeaturedQuotes } from "@/actions/quote-actions"

export default async function Home() {
  // Get a random featured quote
  const { quotes, error: quotesError } = await getFeaturedQuotes()
  const randomQuote = quotes && quotes.length > 0 ? quotes[Math.floor(Math.random() * quotes.length)] : null

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-0 lg:min-h-[calc(100vh-4rem)] bg-gradient-to-b from-orange-50 to-white dark:from-orange-950/20 dark:to-background flex items-center">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block rounded-lg bg-orange-100 dark:bg-orange-900/30 px-3 py-1 text-sm text-orange-800 dark:text-orange-300">
                Önə çıxarılmış məqalə
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Total Football: The Revolution That Changed the Game Forever
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                How Johan Cruyff and Rinus Michels transformed football tactics and philosophy in the 1970s, creating a
                legacy that influences the modern game.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/articles/total-football-tactical-revolution">
                  <Button className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700">
                    Məqaləni oxu
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="Johan Cruyff in action"
                className="aspect-video overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quote of the Day */}
      <section className="w-full py-12 md:py-16 bg-orange-100 dark:bg-orange-950/20 text-foreground">
        <div className="container px-4 md:px-6">
          {quotesError ? (
            <div className="flex flex-col items-center text-center space-y-4">
              <AlertTriangle className="h-12 w-12 text-orange-600 dark:text-orange-500" />
              <p className="text-lg text-muted-foreground">
                We couldn't load the quote of the day. Please try again later.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center space-y-4">
              <Quote className="h-12 w-12 text-orange-600 dark:text-orange-500" />
              <blockquote className="text-2xl md:text-3xl font-medium italic max-w-3xl">
                {randomQuote
                  ? randomQuote.text
                  : "Quality without results is pointless. Results without quality is boring."}
              </blockquote>
              <cite className="text-lg text-orange-600 dark:text-orange-500">— Johan Cruyff</cite>
            </div>
          )}
        </div>
      </section>

      {/* Recent Articles */}
      <RecentArticles />
    </>
  )
}
