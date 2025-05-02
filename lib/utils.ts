import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to format dates for display
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


