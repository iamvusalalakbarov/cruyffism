import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import CruyffismLogo from "@/components/cruyffism-logo";

export function Footer() {
  return (
    <footer className="w-full border-t py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="max-w-80 space-y-4">
            <CruyffismLogo />

            <p className="text-sm text-muted-foreground">
              Johan Cruyff'un adından və futbola yanaşmasından ilham alınmışdır.
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Cruyffism
            </p>
          </div>

          <div className="grid grid-cols-2 lg:flex items-start gap-x-24">
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

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Sosial şəbəkələr</h3>
              <div className="flex items-center space-x-6">
                <a
                  href="https://www.facebook.com/cruyffism.blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/cruyffism.blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
