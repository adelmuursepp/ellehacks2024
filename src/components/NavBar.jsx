import logo from "../assets/Seasonal.png";

const Navbar = () => {
  return (
    <div className="w-full h-24 flex fixed ">
      <img
        src={logo}
        alt="logo"
        style={{
          height: "40px",
          marginLeft: "10px",
          marginTop: "10px",
          paddingBottom: "10px",
        }}
      />
    </div>
  );
};

export default Navbar;
