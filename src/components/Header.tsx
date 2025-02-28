import Logo from '@/components/Logo';
import Nav from '@/components/Nav';

const Header = () => {
  return (
    <header className="bg-white py-5">
      <div className="wrapper">
        <div className="flex items-center justify-between">
          <Logo />
          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;
