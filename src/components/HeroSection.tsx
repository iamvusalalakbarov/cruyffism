import UILink from '@/components/ui/UILink';
import { UILinkVariant } from '@/types/enums';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="flex items-center bg-primary py-10 lg:h-[calc(100vh_-_96px)] lg:py-0">
      <div className="wrapper flex flex-col gap-x-[46px] gap-y-14 lg:flex-row lg:items-start lg:justify-between">
        <div className="lg:mt-2.5 lg:flex-1">
          <div className="mb-1.5 font-raleway text-xs font-bold text-white lg:mb-9 lg:text-base">
            Featured Post
          </div>

          <h1 className="mb-5 max-w-[580px] text-white lg:mb-7">
            How AI will Change the Future
          </h1>

          <p className="mb-6 max-w-[416px] font-raleway text-xs text-white lg:mb-16 lg:text-base">
            The future of AI will see home robots having enhanced intelligence,
            increased capabilities, and becoming more personal and possibly
            cute. For example, home robots will overcome navigation, direction
          </p>

          <UILink href="/blogs/1" variant={UILinkVariant.tertiary}>
            Read more
          </UILink>
        </div>

        <div className="relative h-[330px] w-full overflow-hidden rounded-2xl lg:h-[436px] lg:w-[413px] xl:h-[576px] xl:w-[608px]">
          <Image
            src="https://images.unsplash.com/photo-1678491449021-762a7b999862?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="hero blog cover"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
