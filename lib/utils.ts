import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to format dates for display
export function formatDate(date: Date): string {
  const formatted = new Date(date).toLocaleDateString("az-AZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Capitalize the first letter of the month name
  return formatted.replace(
    /(\d{1,2}) (\p{Ll}+)( \d{4})/u,
    (_, day, month, year) => `${day} ${month[0].toUpperCase()}${month.slice(1)}${year}`,
  );
}
