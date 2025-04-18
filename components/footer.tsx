import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-xl font-bold text-orange-600 hover:text-orange-700 transition-colors">
                Cruyffism
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Dedicated to the philosophy and legacy of Johan Cruyff and Total Football.
            </p>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Cruyffism</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-orange-600">
                Home
              </Link>
              <Link href="/articles" className="text-sm text-muted-foreground hover:text-orange-600">
                Articles
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-orange-600">
                About
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-orange-600">
                Contact
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Categories</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#" className="text-sm text-muted-foreground hover:text-orange-600">
                Total Football
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-orange-600">
                Tactical Analysis
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-orange-600">
                Football History
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-orange-600">
                Player Profiles
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#" className="text-sm text-muted-foreground hover:text-orange-600">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-orange-600">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-orange-600">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
