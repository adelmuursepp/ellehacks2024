import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import { Outlet, Link } from "react-router-dom";

export default function BottomNav() {
  const [value, setValue] = React.useState("scan");

  // eslint-disable-next-line
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="fixed bottom-0 w-full z-50 pt-8">
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          "& .Mui-selected, .Mui-selected > svg": {
            color: "#007A78",
          },
        }}
      >
        <Link to="/">
          <BottomNavigationAction value="home" icon={<HomeIcon />} />
        </Link>
        <Link to="/search">
          <BottomNavigationAction value="search" icon={<SearchIcon />} />
        </Link>
        <Link to="/scan">
          <BottomNavigationAction value="scan" icon={<PhotoCameraIcon />} />
        </Link>
        <Link to="/in-season">
          <BottomNavigationAction value="recipes" icon={<MenuBookIcon />} />
        </Link>
        <Link to="/profile">
          <BottomNavigationAction value="profile" icon={<PersonIcon />} />
        </Link>
        <Outlet />
      </BottomNavigation>
    </div>
  );
}
