import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="bg-primary relative py-8 text-white">
      <div className="wrapper">
        <div className="flex items-start justify-between">
          <Logo white />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
