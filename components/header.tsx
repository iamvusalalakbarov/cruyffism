import Link from "next/link"
import { ScrollButton } from "@/components/scroll-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileMenu } from "@/components/mobile-menu"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold text-orange-600 hover:text-orange-700 transition-colors">
            Cruyffism
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/articles" className="text-sm font-medium hover:text-orange-600 transition-colors">
            Məqalələr
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-orange-600 transition-colors">
            Haqqımızda
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-orange-600 transition-colors">
            Əlaqə
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ScrollButton targetId="newsletter" variant="outline">
            Abunə ol
          </ScrollButton>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
