"use client";

import { useState } from "react";
import { Burger } from "@mantine/core";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { navLinks } from "@/lib/constants";
import MobileMenu from "@/components/MobileMenu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header
        className={clsx(
          "sticky top-0 right-0 left-0 z-50 w-full backdrop-blur-md transition-all",
          isOpen ? "bg-white" : "bg-white/75",
        )}
      >
        <div className="wrapper">
          <div className="flex items-center justify-between py-4">
            <Logo />

            <div className="hidden items-center gap-x-4 md:flex">
              {navLinks.slice(1).map((navLink, i) => (
                <Link
                  key={i}
                  href={navLink.href}
                  className={clsx(
                    "hover:text-primary text-gray-700 transition-colors duration-500 ease-in-out",
                    pathname.startsWith(navLink.href) ? "text-primary" : "",
                  )}
                >
                  {navLink.label}
                </Link>
              ))}
            </div>

            <Burger
              opened={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden"
            />
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;
