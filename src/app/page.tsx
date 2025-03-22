import HeroSection from "@/components/HeroSection";
import QuoteOfTheDay from "@/components/QuoteOfTheDay";
import Link from "next/link";
import Image from "next/image";

const articles = [
  {
    title: "The Art of Pressing in Modern Football",
    summary: "An analysis of how pressing has evolved as a tactical weapon.",
    coverImage:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=3149&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "art-of-pressing",
  },
  {
    title: "Why Total Football Still Matters Today",
    summary: "Exploring the principles of Total Football in the modern game.",
    coverImage:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=3149&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "total-football-today",
  },
  {
    title: "Breaking Down Guardiola's Positional Play",
    summary: "A deep dive into how Guardiola’s tactics shape his teams.",
    coverImage:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=3149&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "guardiola-positional-play",
  },
  {
    title: "The Art of Pressing in Modern Football",
    summary: "An analysis of how pressing has evolved as a tactical weapon.",
    coverImage:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=3149&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "art-of-pressing",
  },
  {
    title: "Why Total Football Still Matters Today",
    summary: "Exploring the principles of Total Football in the modern game.",
    coverImage:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=3149&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "total-football-today",
  },
  {
    title: "Breaking Down Guardiola's Positional Play",
    summary: "A deep dive into how Guardiola’s tactics shape his teams.",
    coverImage:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=3149&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "guardiola-positional-play",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuoteOfTheDay />

      <section className="wrapper py-10 lg:py-20">
        <div className="mb-4 flex items-center justify-between lg:mb-8">
          <h2 className="text-primary text-2xl font-bold lg:text-3xl">Recent Articles</h2>

          <Link
            href="/articles"
            className="bg-primary hover:bg-primary-8 hidden rounded-lg px-5 py-2.5 font-medium text-white transition-colors duration-500 ease-in-out lg:inline-block"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {articles.map((article, index) => (
            <Link
              key={index}
              href={`/articles/${article.slug}`}
              className="group block overflow-hidden rounded-lg bg-white shadow"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
              </div>

              <div className="flex flex-col justify-between p-4">
                <h3 className="line-clamp-2 text-xl font-semibold transition group-hover:text-orange-600">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-gray-600">{article.summary}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center lg:hidden">
          <Link
            href="/articles"
            className="bg-primary hover:bg-primary-8 inline-block rounded-lg px-5 py-2.5 font-medium text-white transition-colors duration-500 ease-in-out"
          >
            View all
          </Link>
        </div>
      </section>
    </>
  );
}
