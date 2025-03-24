import PageHero from "@/components/PageHero";
import ArticleCard from "@/components/ArticleCard";
import { Pagination } from '@mantine/core';

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

export default function ArticlesPage() {
  return (
    <main className="wrapper">
      <PageHero title="Articles" />

      <section className="py-10 lg:py-16 space-y-10 lg:space-y-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>

        <div className="flex justify-center items-center">
          <Pagination total={10} />
        </div>
      </section>
    </main>
  );
}
