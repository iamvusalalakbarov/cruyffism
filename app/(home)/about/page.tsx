import Image from "next/image"

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-orange-50 to-white dark:from-orange-950/20 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-block rounded-lg bg-orange-100 dark:bg-orange-900/30 px-3 py-1 text-sm text-orange-800 dark:text-orange-300">
              About
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Our Story & Mission</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Learn about Cruyffism, our blog dedicated to Johan Cruyff's legacy and the philosophy of Total Football.
            </p>
          </div>
        </div>
      </section>

      {/* About Cruyffism */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter mb-4">About Cruyffism</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Cruyffism is a blog dedicated to exploring and celebrating the tactical genius, philosophical
                  approach, and enduring legacy of Johan Cruyff. Founded in 2020 by a group of football enthusiasts and
                  tactical analysts, our mission is to preserve and promote the principles that revolutionized football.
                </p>
                <p>
                  We believe that Cruyff's influence extends far beyond his playing and coaching career. His ideas about
                  space, positioning, and the role of intelligence in football continue to shape the modern game.
                  Through in-depth articles, tactical analyses, and historical perspectives, we aim to provide a
                  comprehensive resource for anyone interested in understanding the beautiful game at a deeper level.
                </p>
                <p>
                  Our team consists of writers, analysts, and former players who share a passion for the game and a deep
                  appreciation for Cruyff's contributions. We strive to make complex tactical concepts accessible to all
                  football fans while maintaining analytical rigor and historical accuracy.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Cruyffism Blog Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Johan Cruyff */}
      <section className="w-full py-12 md:py-24 bg-orange-100 dark:bg-orange-900/20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] rounded-xl overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Johan Cruyff" fill className="object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">About Johan Cruyff</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Hendrik Johannes Cruijff, known to the world as Johan Cruyff, was born on April 25, 1947, in
                  Amsterdam, Netherlands. He is widely regarded as one of the greatest players in football history and
                  one of the most influential figures in the development of modern football.
                </p>
                <p>
                  As a player, Cruyff was the embodiment of Total Football, a tactical system that revolutionized the
                  game in the 1970s. He led Ajax to three consecutive European Cups from 1971 to 1973 and was the
                  catalyst for the Netherlands' stunning performances in the 1974 World Cup, where they reached the
                  final. His technical ability, vision, and intelligence set him apart, earning him three Ballon d'Or
                  awards.
                </p>
                <p>
                  After his playing career, Cruyff's influence grew even greater as a coach. At Barcelona, he laid the
                  foundations for what would become the club's distinctive style of play, emphasizing possession,
                  positional play, and attacking football. His legacy at Barcelona extends beyond tactics to the
                  establishment of La Masia, the youth academy that has produced some of the world's greatest players.
                </p>
                <p>
                  Cruyff's philosophy transcended football. His famous quotes reflect a unique perspective on the game
                  and life itself. He passed away on March 24, 2016, but his ideas continue to influence football at all
                  levels, from grassroots to the elite game.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
