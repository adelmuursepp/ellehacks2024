// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities"; // Assuming this utility is compatible with your model's output
import RipenessChecker from './components/RipenessChecker';

const App = () => {
  return (
    <div className="App">
      <RipenessChecker />
    </div>
  );
}

export default App;

