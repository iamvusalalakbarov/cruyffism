import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-x-3">
      <div className="relative size-8">
        <Image src="/images/logo.svg" alt="logo" fill />
      </div>
      <span className="font-raleway text-3xl font-extrabold text-grey-33">
        Zarrin
      </span>
    </Link>
  );
};

export default Logo;
