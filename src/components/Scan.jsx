import React from "react";
import Strawberry from "../assets/strawberry.jpeg";
import FruitRipenessChecker from "./RipenessCheck";

const Scan = () => {
  return (
    <div>
      <div>
        <h2>scan camera</h2>
        <FruitRipenessChecker />

        <h3>name of fruit</h3>
      </div>
    </div>
  );
};

export default Scan;
