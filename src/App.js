import React from "react";
import NavBar from "./components/NavBar";
import BottomNav from "./components/BottomNav";
import Home from "./components/Home";
import Search from "./components/Search";
import Scan from "./components/Scan";
import Recipes from "./components/Recipes";
import Profile from "./components/Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/in-season" element={<Recipes />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
