import React from "react";
import Link from "next/link";
import { clsx } from "clsx";

interface ILogoProps {
  white?: boolean;
}

const Logo: React.FC<ILogoProps> = (props) => {
  return (
    <Link
      href="/"
      className={clsx("text-xl font-bold", props.white ? "text-white" : "text-primary")}
    >
      Cruyffism
    </Link>
  );
};

export default Logo;
