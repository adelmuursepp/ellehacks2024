import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // Inline styles for elements
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh", // Full viewport height
    backgroundColor: "#f5f5dc", // Beige background
    color: "#333", // Text color
    padding: "20px",
    textAlign: "center",
    marginBottom: "10px",
  };

  const welcomeStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const instructionStyle = {
    fontSize: "18px",
    marginBottom: "30px",
  };

  const buttonStyle = {
    fontSize: "20px",
    padding: "10px 20px",
    backgroundColor: "#4CAF50", // A pleasant green
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={welcomeStyle}>Welcome to Seasonal</div>
      <div style={instructionStyle}>
        Pick what's in season, 4 seasons a year
      </div>
      <Link to="/scan">
        <button style={buttonStyle}>Pick Produce</button>
      </Link>
    </div>
  );
};

export default Home;
