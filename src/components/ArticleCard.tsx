import React from "react";
import Image from "next/image";
import Link from "next/link";

interface IArticle {
  slug: string;
  coverImage: string;
  title: string;
  // date: string;
  // tags: string[];
}

interface IArticleCardProps {
  article: IArticle;
}

const date = "12 May 2024";
const tags = ["test", "test2"];

const ArticleCard: React.FC<IArticleCardProps> = ({ article }) => {
  return (
    <Link
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

      <div className="flex flex-col gap-2 p-4">
        <span className="text-sm text-gray-400">{date}</span>

        <h3 className="line-clamp-2 text-lg font-semibold transition group-hover:text-orange-600">
          {article.title}
        </h3>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-primary/5 text-primary rounded-full px-3 py-1 text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ArticleCard;
