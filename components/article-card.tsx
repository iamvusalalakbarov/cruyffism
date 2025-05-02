import Link from "next/link"
import Image from "next/image"
import { Eye, Clock } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils";

interface ArticleCardProps {
  image: string
  title: string
  description: string
  date: string
  readTime: string
  viewCount: number
  tags: string[]
  href: string
}

export function ArticleCard({ image, title, description, date, readTime, viewCount, tags, href }: ArticleCardProps) {
  return (
    <Link href={href} className="block group h-full">
      <Card className="overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg h-full flex flex-col">
        <CardHeader className="p-0">
          <Image
            src={image || "/placeholder.svg"}
            width={400}
            height={200}
            alt={title}
            className="w-full h-48 object-cover"
          />
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <p className="text-xs text-muted-foreground mb-2">{formatDate(date)}</p>
          <CardTitle className="text-xl mb-2">{title}</CardTitle>
          <p className="text-muted-foreground line-clamp-3 mb-4">{description}</p>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-6 pt-0 gap-3 mt-auto">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <span className="flex items-center text-xs text-muted-foreground">
                <Eye className="h-3.5 w-3.5 mr-1" />
                {viewCount} baxış
              </span>
              <span className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {readTime} dəq.
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
