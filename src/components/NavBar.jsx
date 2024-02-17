import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="w-full flex py-0 justify-between items-center navbar">
      <img src={logo} alt="logo" className="w-[350px]" />
    </nav>
  );
};

export default Navbar;
