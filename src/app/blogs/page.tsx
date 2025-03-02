import SubscribeSection from '@/components/SubscribeSection';
import UIBlogCard from '@/components/ui/UIBlogCard';

const allBlogs = [
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

export default function Blogs() {
  return (
    <>
      <section className="wrapper pt-20">
        <div className="mx-auto max-w-[756px] space-y-6 text-center">
          <span className="font-raleway font-bold text-grey-66">OUR BLOGS</span>

          <h3 className="text-grey-33">Find our all blogs from here</h3>

          <p className="text-grey-66">
            our blogs are written from very research research and well known
            writers writers so that we can provide you the best blogs and
            articles articles for you to read them all along
          </p>
        </div>
      </section>

      <section className="wrapper py-20">
        <div className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {allBlogs.map((blog, index) => (
            <UIBlogCard key={index} blog={blog} />
          ))}
        </div>
      </section>

      <SubscribeSection />
    </>
  );
}
