import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="max-w-80 space-y-4">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-xl font-bold text-orange-600 hover:text-orange-700 transition-colors">
                Cruyffism
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Johan Cruyff'un adından və futbola yanaşmasından ilham alınmışdır.
            </p>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Cruyffism</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Keçidlər</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-orange-600">
                Əsas səhifə
              </Link>
              <Link href="/articles" className="text-sm text-muted-foreground hover:text-orange-600">
                Məqalələr
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-orange-600">
                Haqqımızda
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-orange-600">
                Əlaqə
              </Link>
            </nav>
          </div>

          {/*<div className="space-y-4">*/}
          {/*  <h3 className="text-sm font-medium">Categories</h3>*/}
          {/*  <nav className="flex flex-col space-y-2">*/}
          {/*    <Link href="#" className="text-sm text-muted-foreground hover:text-orange-600">*/}
          {/*      Total Football*/}
          {/*    </Link>*/}
          {/*    <Link href="#" className="text-sm text-muted-foreground hover:text-orange-600">*/}
          {/*      Tactical Analysis*/}
          {/*    </Link>*/}
          {/*    <Link href="#" className="text-sm text-muted-foreground hover:text-orange-600">*/}
          {/*      Football History*/}
          {/*    </Link>*/}
          {/*    <Link href="#" className="text-sm text-muted-foreground hover:text-orange-600">*/}
          {/*      Player Profiles*/}
          {/*    </Link>*/}
          {/*  </nav>*/}
          {/*</div>*/}

          {/*<div className="space-y-4">*/}
          {/*  <h3 className="text-sm font-medium">Legal</h3>*/}
          {/*  <nav className="flex flex-col space-y-2">*/}
          {/*    <Link href="#" className="text-sm text-muted-foreground hover:text-orange-600">*/}
          {/*      Terms of Service*/}
          {/*    </Link>*/}
          {/*    <Link href="#" className="text-sm text-muted-foreground hover:text-orange-600">*/}
          {/*      Privacy Policy*/}
          {/*    </Link>*/}
          {/*    <Link href="#" className="text-sm text-muted-foreground hover:text-orange-600">*/}
          {/*      Cookie Policy*/}
          {/*    </Link>*/}
          {/*  </nav>*/}
          {/*</div>*/}
        </div>
      </div>
    </footer>
  )
}
