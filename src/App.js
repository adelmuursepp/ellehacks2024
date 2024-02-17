// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities"; // Assuming this utility is compatible with your model's output

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function to load and run the Teachable Machine model
  const runModel = async () => {
    // Load the model from the Teachable Machine URL
    const modelURL = process.env.PUBLIC_URL + '/model/model.json';
    const metadataURL = process.env.PUBLIC_URL + '/model/metadata.json';
    const model = await tf.loadLayersModel(modelURL);
    const metadata = await fetch(metadataURL).then((response) => response.json());

    console.log("Model and metadata loaded.");

    // Loop and detect objects
    setInterval(() => {
      detect(model, metadata);
    }, 1000);
  };

  const detect = async (model, metadata) => {
    // Check if webcam data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width and height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Prepare the webcam image for the model
      const img = tf.browser.fromPixels(video)
        .resizeNearestNeighbor([224, 224]) // Change to match model input
        .expandDims(0)
        .toFloat()
        .div(tf.scalar(127)).sub(tf.scalar(1)); // Normalize the image

      // Make prediction
      // const prediction = await model.predict(img).data();
      // const topPrediction = prediction.indexOf(Math.max(...prediction));
      // console.log(topPrediction);
      // const topPredInfo = prediction[topPrediction];
      // const [x, y, itemWidth, itemHeight] = topPredInfo['bbox'];

      // // Draw result
      // const ctx = canvasRef.current.getContext("2d");
      // drawRect([{
      //   class: metadata.labels[topPrediction], // Assuming your metadata labels match up with model output
      //   score: Math.max(...prediction).toFixed(2), // Assuming you want to show the confidence score
      //   bbox: [x, y, itemWidth, itemHeight] // Placeholder, adjust according to your model output
      // }], ctx);

      const predictions = await model.predict(img); // This should be an array of prediction objects
      // Assuming predictionsTensor is your Tensor from the model
      const predictionsTensor = await model.predict(img);

      // Convert the Tensor to an array of predictions
      const predictionsArray = await predictionsTensor.array();
      predictionsTensor.dispose(); // Dispose the tensor to free memory

      // Assuming you have a canvasRef to your <canvas> element
      const ctx = canvasRef.current.getContext("2d");

      // Function to draw a single rectangle given a bounding box
      const drawRect = (x, y, width, height, context) => {
        context.beginPath();
        context.rect(x, y, width, height);
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.stroke();
      };

      console.log(predictionsArray);

      // Loop through each prediction and draw the bounding box
      predictionsArray.forEach(prediction => {
        // Here we need to extract the bounding box information
        // The structure of prediction depends on how your model outputs the bbox
        // This is a placeholder: you'll need to adjust the indices based on your model's output
        const [x, y, width, height, score] = prediction;

        // Draw the bounding box
        drawRect(x, y, width, height, ctx);

        // Optionally, draw the score
        ctx.fillStyle = 'red';
        ctx.fillText(`Score: ${score.toFixed(2)}`, x, y);
      });

      // Note: The actual indices for x, y, width, height, and score depend on your model's output.
      // Adjust the destructuring assignment as per your model's output structure.



      // // Find the prediction with the highest score
      // const topPrediction = predictions.reduce((prev, current) => (prev.score > current.score) ? prev : current);

      // console.log(topPrediction);

      // // Assuming topPrediction includes bbox information
      // const [x, y, itemWidth, itemHeight] = topPrediction.bbox;

      // // Draw result
      // const ctx = canvasRef.current.getContext("2d");
      // drawRect([{
      //   class: metadata.labels[topPrediction.class], // Adjust this based on your model's output structure
      //   score: topPrediction.score.toFixed(2), // Convert score to string with 2 decimal places
      //   bbox: [x, y, itemWidth, itemHeight]
      // }], ctx);
    }
  };

  useEffect(() => { runModel(); }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;

