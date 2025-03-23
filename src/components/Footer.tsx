import Logo from "@/components/Logo";
import { navLinks } from "@/lib/constants";
import Link from "next/link";
// import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      {/* Double Line Styling */}
      <div className="flex flex-col gap-y-1">
        <div className="h-1 bg-black"></div>
        <div className="h-1 bg-black"></div>
      </div>

      <div className="wrapper py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Logo white />

          <nav className="flex gap-x-6">
            {navLinks.map((navLink, i) => (
              <Link key={i} href={navLink.href} className="group relative text-sm">
                {navLink.label}
                <span className="absolute right-0 bottom-0 left-0 h-[0.8px] w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} Cruyffism. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
