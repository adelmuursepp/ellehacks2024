import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";

export default function BottomNav() {
  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: "full" }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction value="home" icon={<HomeIcon />} />
      <BottomNavigationAction value="search" icon={<SearchIcon />} />
      <BottomNavigationAction value="scan" icon={<PhotoCameraIcon />} />
      <BottomNavigationAction value="recipes" icon={<MenuBookIcon />} />
      <BottomNavigationAction value="profile" icon={<PersonIcon />} />
    </BottomNavigation>
  );
}
