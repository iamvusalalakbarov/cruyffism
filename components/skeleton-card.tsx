import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function SkeletonCard() {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
        <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
        <div className="space-y-2 mt-4">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-6 pt-0 gap-3 mt-auto">
        <div className="flex flex-wrap gap-2">
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
