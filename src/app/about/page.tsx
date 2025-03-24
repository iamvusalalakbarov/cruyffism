import QuoteOfTheDay from "@/components/QuoteOfTheDay";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function AboutPage() {
  return (
    <main className="wrapper">
      <PageHero
        title="About Cruyffism"
        description="Exploring the philosophy of Johan Cruyff and its impact on modern football."
      />

      <section className="space-y-4 py-10 text-gray-700 lg:py-16">
        <p>
          <strong>Cruyffism</strong> is more than just a tactical philosophy—it’s a way of thinking
          about football as a dynamic, intelligent game. Inspired by Johan Cruyff, this blog
          analyzes Total Football, positional play, and the tactical evolution of the sport.
        </p>
        <p>
          Here, you’ll find deep dives into legendary teams, managers, and innovations that shaped
          the game we love today.
        </p>
      </section>

      <QuoteOfTheDay />

      <section className="space-y-4 py-10 text-center lg:py-16">
        <p className="text-gray-700">Want to explore more? Check out our latest articles!</p>
        <Link
          href="/articles"
          className="bg-primary hover:bg-primary-8 inline-block rounded-lg px-6 py-3 text-lg font-medium text-white transition-colors duration-500 ease-in-out"
        >
          Browse articles
        </Link>
      </section>
    </main>
  );
}
