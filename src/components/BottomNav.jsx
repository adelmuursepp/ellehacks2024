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
  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{
        width: "100%",
        "& .Mui-selected, .Mui-selected > svg": {
          color: "#2E221F",
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
      <Link to="/recipes">
        <BottomNavigationAction value="recipes" icon={<MenuBookIcon />} />
      </Link>
      <Link to="/profile">
        <BottomNavigationAction value="profile" icon={<PersonIcon />} />
      </Link>
      <Outlet />
    </BottomNavigation>
  );
}
