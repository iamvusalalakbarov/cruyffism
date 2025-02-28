'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UILink from '@/components/ui/UILink';
import { UILinkVariant } from '@/types/enums';

const menu = [
  {
    title: 'Blog',
    link: '/blog',
  },
  {
    title: 'About',
    link: '/about',
  },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-x-8">
      <ul className="hidden items-center gap-x-8 lg:flex">
        {menu.map((menuItem, index) => (
          <li key={index}>
            <Link
              href={menuItem.link}
              className={`font-raleway font-medium ${pathname.startsWith(menuItem.link) ? 'text-primary' : 'text-grey-33'}`}
            >
              {menuItem.title}
            </Link>
          </li>
        ))}
      </ul>

      <UILink href="/contact" variant={UILinkVariant.primary}>
        Contact Us
      </UILink>
    </nav>
  );
};

export default Nav;
