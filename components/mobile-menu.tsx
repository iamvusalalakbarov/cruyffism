"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="relative z-50 flex items-center justify-center"
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          <span
            className={`absolute h-[1px] w-5 bg-current transform transition duration-300 ease-in-out ${
              isOpen ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-[1px] w-5 bg-current transform transition duration-300 ease-in-out ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-[1px] w-5 bg-current transform transition duration-300 ease-in-out ${
              isOpen ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </div>
      </Button>

      <div
        className={`fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="container flex flex-col items-center justify-center space-y-8 py-8">
          <Link
            href="/articles"
            className="text-lg font-medium hover:text-orange-600 transition-colors"
            onClick={closeMenu}
          >
            Articles
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium hover:text-orange-600 transition-colors"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium hover:text-orange-600 transition-colors"
            onClick={closeMenu}
          >
            Contact
          </Link>
        </nav>
      </div>
    </div>
  )
}
