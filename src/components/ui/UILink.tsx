import React from 'react';
import Link from 'next/link';
import { UILinkVariant } from '@/types/enums';
import clsx from 'clsx';

interface IUILinkProps {
  href: string;
  variant: UILinkVariant;
  children: React.ReactNode;
}

const UILink: React.FC<IUILinkProps> = (props) => {
  return (
    <Link
      href={props.href}
      className={clsx(
        'rounded-lg px-8 py-3 font-raleway text-xs font-semibold lg:px-10 lg:py-4 lg:text-base',
        {
          'bg-primary text-white': props.variant === UILinkVariant.primary,
          'bg-white text-grey-33': props.variant === UILinkVariant.secondary,
        }
      )}
    >
      {props.children}
    </Link>
  );
};

export default UILink;
