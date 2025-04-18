import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section id="newsletter" className="w-full py-12 md:py-24 bg-orange-50 dark:bg-orange-950/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Join the Cruyffism Community</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Get the latest articles, tactical analyses, and Cruyff wisdom delivered to your inbox.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <Input
                className="focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter your email"
                type="email"
              />
              <Button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
