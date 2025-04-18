import { LoadingSpinner } from "@/components/loading-spinner"

interface LoadingOverlayProps {
  message?: string
}

export function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <LoadingSpinner size="lg" />
      {message && <p className="mt-4 text-muted-foreground">{message}</p>}
    </div>
  )
}
