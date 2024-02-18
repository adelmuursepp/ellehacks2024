// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities"; // Assuming this utility is compatible with your model's output
import RipenessChecker from './components/RipenessChecker';
import GPTCall from "./components/GPTCall";

import OpenAI from "openai";

const openai = new OpenAI();

const App = () => {


  useEffect(() => {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });

    completion();
  }, []);

  console.log(completion.choices[0]);
  return (
    <div className="App">
      <GPTCall />
      {/* <RipenessChecker /> */}
    </div>
  );
}

export default App;

