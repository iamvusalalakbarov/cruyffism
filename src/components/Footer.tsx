import Logo from '@/components/Logo';
import Link from 'next/link';

const menu = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Blogs',
    link: '/blogs',
  },
  {
    title: 'About',
    link: '/about',
  },
  {
    title: 'Contact Us',
    link: '/contact',
  },
];

const Footer = () => {
  return (
    <footer className="space-y-10 bg-white lg:px-24 py-9 lg:py-12">
      <div className="flex flex-col items-center justify-center gap-y-10">
        <Logo />

        <nav className="flex items-center gap-x-8 lg:gap-x-10">
          {menu.map((menuItem, index) => (
            <Link
              key={index}
              href={menuItem.link}
              className="text-nowrap font-raleway text-[#150E06] transition-colors duration-500 ease-in-out hover:text-primary"
            >
              {menuItem.title}
            </Link>
          ))}
        </nav>
      </div>

      <div className="h-px bg-primary"></div>

      <p className="text-xs lg:text-base text-center font-raleway text-[#150E06]">
        Copyright Ideapeel Inc &copy; 2023. All Right Reserved
      </p>
    </footer>
  );
};

export default Footer;
