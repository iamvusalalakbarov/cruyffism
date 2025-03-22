"use client";

import React from "react";
import clsx from "clsx";
import { navLinks } from "@/lib/constants";
import Link from "next/link";

interface IMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<IMobileMenuProps> = (props) => {
  return (
    <div
      className={clsx(
        "fixed top-[65px] right-0 left-0 z-50 h-[calc(100vh-65px)] overflow-hidden bg-white transition-all duration-500 ease-in-out md:hidden",
        props.isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="flex h-1/2 flex-col items-center justify-center gap-y-4">
        {navLinks.map((navLink, i) => (
          <Link key={i} href={navLink.href} className="w-full py-2 text-center">
            {navLink.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
