import logo from "../assets/Seasonal.png";

const Navbar = () => {
  return (
    <div className="w-full h-32 flex fixed ">
      <img
        src={logo}
        alt="logo"
        style={{
          height: "40px",
          marginLeft: "20px",
          marginTop: "20px",
          paddingBottom: "15px",
        }}
      />
    </div>
  );
};

export default Navbar;
