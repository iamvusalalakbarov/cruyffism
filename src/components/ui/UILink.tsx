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
        'flex w-fit items-center justify-center rounded-lg border px-12 py-4 text-xs font-semibold transition-colors duration-500 ease-in-out lg:px-10 lg:py-4 lg:text-base',
        {
          'border-transparent bg-primary font-raleway text-white hover:border-primary hover:bg-white hover:text-primary':
            props.variant === UILinkVariant.primary,
          'border-primary bg-white text-primary hover:bg-primary hover:text-white':
            props.variant === UILinkVariant.secondary,
          'border-transparent bg-white text-grey-33 hover:bg-grey-33 hover:text-white':
            props.variant === UILinkVariant.tertiary,
        }
      )}
    >
      {props.children}
    </Link>
  );
};

export default UILink;
