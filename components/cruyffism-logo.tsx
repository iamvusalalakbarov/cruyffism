import Image from "next/image";
import Link from "next/link";

const CruyffismLogo = () => {

  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-xl font-bold text-orange-600 hover:text-orange-700 transition-colors"
    >
      <Image src="/images/cruyffism-logo.png" alt="Cruyffism Logo" width={24} height={24} />
      <span>Cruyffism</span>
    </Link>
  );
};

export default CruyffismLogo;