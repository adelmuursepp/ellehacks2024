import logo from "../assets/Seasonal.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-42 flex fixed ">
      <Link to="/">
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
      </Link>
    </div>
  );
};

export default Navbar;
