import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IUIBlogCardProps {
  blog: any;
}

const UIBlogCard: React.FC<IUIBlogCardProps> = (props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="relative h-[360px] w-full overflow-hidden rounded-2xl">
        <Image
          src={props.blog.image}
          alt={props.blog.title}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <time className="text-xs font-medium text-grey-99">
        {props.blog.date}
      </time>

      <h6 className="w-5/6 text-grey-33 lg:line-clamp-2">{props.blog.title}</h6>

      <p className="line-clamp-3 text-grey-66">{props.blog.content}</p>

      <Link
        href="#"
        className="text-lg font-bold text-primary hover:underline mt-auto"
      >
        Read More...
      </Link>
    </div>
  );
};

export default UIBlogCard;
