import Image from "next/image";
import Link from "next/link";

const blog = {
  title: "Total Football: The Legacy of Johan Cruyff",
  summary:
    "A deep dive into how Johan Cruyff revolutionized football with his philosophy and tactical innovations.",
  coverImage:
    "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=3149&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  slug: "total-football-cruyff-legacy",
};

const HeroSection = () => {
  return (
    <section className="relative flex h-[500px] w-full items-center justify-center bg-black/40 text-white">
      <Image
        src={blog.coverImage}
        alt={blog.title}
        fill
        className="-z-10 object-cover"
        unoptimized
      />

      <div className="wrapper lg:max-w-1/2 space-y-4 text-center">
        <h1 className="text-4xl font-bold md:text-5xl">
          Total Football: The Legacy of Johan Cruyff
        </h1>
        <p className="text-lg md:text-xl">
          A deep dive into how Johan Cruyff revolutionized football with his philosophy and tactical
          innovations.
        </p>

        <Link
          href={`/articles/${blog.slug}`}
          className="bg-primary hover:bg-primary-8 inline-block rounded-lg px-6 py-3 text-lg font-medium transition-colors duration-500 ease-in-out"
        >
          Read more
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
