import HeroSection from '@/components/HeroSection';
import Image from 'next/image';
import UILink from '@/components/ui/UILink';
import { UILinkVariant } from '@/types/enums';
import SubscribeSection from '@/components/SubscribeSection';
import UIBlogCard from '@/components/ui/UIBlogCard';

const recentPosts = [
  {
    category: 'DEVELOPMENT',
    date: '16 March 2023',
    title:
      'How to make a Game look more attractive with New VR & AI Technology',
    content:
      'Google has been investing in AI for many years and bringing its benefits to individuals, businesses and communities. Whether it’s publishing state-of-the-art research, building helpful products or developing tools and resources that enable others, we’re committed to making AI accessible to everyone.',
    image:
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3278&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    category: 'Travel',
    date: '13 March 2023',
    title: '8 Rules of Travelling In Sea You Need To Know',
    content:
      'Travelling in sea has many advantages. Some of the advantages of transporting goods by sea include: you can ship large volumes at costs ',
    image:
      'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=2507&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    category: 'DEVELOPMENT',
    date: '11 March 2023',
    title: 'How to build strong portfolio and get a Job in UI/UX',
    content:
      'Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from ',
    image:
      'https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    category: 'Sports',
    date: '13 March 2023',
    title: 'How to Be a Professional Footballer in 2023',
    content:
      'Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment. survival strategies to ensure proactive',
    image:
      'https://images.unsplash.com/photo-1552318965-6e6be7484ada?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* First Post */}
      <section className="wrapper py-[50px] lg:pb-[200px] lg:pt-[130px]">
        <div className="relative lg:h-[576px]">
          <div className="relative hidden h-full w-full overflow-hidden rounded-2xl lg:block">
            <Image
              src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3278&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="recent post cover"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="rounded-xl border border-[#DBDBDB] bg-white p-6 lg:absolute lg:-bottom-[120px] lg:right-0 lg:w-3/4 lg:rounded-2xl lg:border-none lg:p-8">
            <div className="mb-7 space-y-5 lg:mb-16">
              <div className="relative h-[200px] w-full overflow-hidden rounded-md lg:hidden">
                <Image
                  src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3278&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="recent post cover"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <time className="text-xs font-medium text-grey-99">
                16 March 2023
              </time>

              <h4 className="max-w-[784px] text-grey-33">
                How to make a Game look more attractive with New VR & AI
                Technology
              </h4>

              <p className="line-clamp-4 max-w-[784px] text-grey-66 lg:line-clamp-3">
                Google has been investing in AI for many years and bringing its
                benefits to individuals, businesses and communities. Whether
                it’s publishing state-of-the-art research, building helpful
                products or developing tools and resources that enable others,
                we’re committed to making AI accessible to everyone.
              </p>
            </div>

            <UILink href="/blogs/1" variant={UILinkVariant.secondary}>
              Read More
            </UILink>
          </div>
        </div>
      </section>

      {/* Our Recent Post */}
      <section className="wrapper py-[50px]">
        <div className="mb-10 flex items-center justify-between lg:mb-20">
          <h3 className="flex-1 text-grey-33">Our Recent Post</h3>

          <UILink href="/blogs" variant={UILinkVariant.primary}>
            View All
          </UILink>
        </div>

        <div className="lg:space-y-14">
          <div className="hidden h-[456px] items-start justify-between gap-x-14 lg:flex">
            <div className="relative h-full w-1/2 overflow-hidden rounded-2xl">
              <Image
                src={recentPosts[0].image}
                alt={recentPosts[0].title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div className="flex h-full flex-1 flex-col justify-between pb-8 pt-4">
              <div>
                <div className="mb-7 flex items-center gap-x-1.5 lg:gap-x-2">
                  <time className="text-xs font-medium text-grey-99">
                    {recentPosts[0].date}
                  </time>
                </div>

                <h4 className="mb-4 text-grey-33">{recentPosts[0].title}</h4>

                <p className="line-clamp-4 text-grey-66 lg:line-clamp-5">
                  {recentPosts[0].content}
                </p>
              </div>

              <UILink href="#" variant={UILinkVariant.secondary}>
                Read More
              </UILink>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.slice(1).map((post, index) => (
              <UIBlogCard key={index} blog={post} />
            ))}
          </div>
        </div>
      </section>

      <SubscribeSection />
    </>
  );
}
