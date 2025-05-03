import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ArticleFormData } from "@/lib/validations";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);

  const azMonths = [
    "Yanvar", "Fevral", "Mart", "Aprel",
    "May", "İyun", "İyul", "Avqust",
    "Sentyabr", "Oktyabr", "Noyabr", "Dekabr",
  ];

  const day = date.getDate();
  const month = azMonths[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export function generateArticleEmailMarkdown(article: ArticleFormData) {
  const imageMarkdown = article.image_url
    ? `![${article.title}](${article.image_url})\n\n`
    : "";

  return `
${imageMarkdown}
### ${article.title}

${article.description}

👉 [Məqaləni oxu](https://cruyffism.vercel.app/article/${article.slug})
  `.trim();
}



