import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import Webcam from "react-webcam";
import './RipenessCheck.css';
import ShowRecipe from './ShowRecipe';

const FruitRipenessChecker = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [model, setModel] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [modelLoaded, setModelLoaded] = useState(false);
    const [fruitInfo, setFruitInfo] = useState([{ className: 'Ripe Banana', probability: 0.6334966421127319 }]);
    const [top1Fruit, setTop1Fruit] = useState('');
    const [top2Fruit, setTop2Fruit] = useState('');
    const [top1FruitProbability, setTop1FruitProbabilty] = useState(0);
    const [top2FruitProbability, setTop2FruitProbabilty] = useState(0);

    useEffect(() => {
        const loadModel = async () => {
            try {
                const modelURL = process.env.PUBLIC_URL + '/model/model.json';
                const metadataURL = process.env.PUBLIC_URL + '/model/metadata.json';

                const model = await tf.loadLayersModel(modelURL);
                setModel(model);
                const metadata = await fetch(metadataURL).then(response => response.json());
                setMetadata(metadata);
                setModelLoaded(true);
                console.log('Model loaded.');
            } catch (error) {
                console.error('Error loading model', error);
            }
        };

        loadModel();
    }, []);

    // useEffect(() => { runModel() }, []);
    useEffect(() => {
        if (modelLoaded) {
            // Wait for a bit after the model is loaded before running runModel
            const timer = setTimeout(() => {
                runModel();
            }, 1000); // Adjust the delay here as needed, 1000 milliseconds = 1 second

            // Cleanup function to clear the timeout if the component unmounts
            return () => clearTimeout(timer);
        }
    }, [modelLoaded]);

    const runModel = async () => {
        const detectAndScheduleNextFrame = async () => {
            if (model) { // Ensure model is loaded
                await detect();
                setTimeout(detectAndScheduleNextFrame, 1000); // Schedule next after completion
            } else {
                console.log("Model", model);
                console.log("Model not loaded yet. Waiting...");
                setTimeout(detectAndScheduleNextFrame, 1000); // Retry after some time
            }
        };
        detectAndScheduleNextFrame(); // Start the loop
    }



    const detect = async () => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4)

            try {

                const video = webcamRef.current.video;
                const videoWidth = webcamRef.current.video.videoWidth;
                const videoHeight = webcamRef.current.video.videoHeight;

                // Set video width
                webcamRef.current.video.width = videoWidth;
                webcamRef.current.video.height = videoHeight;
                // Set canvas height and width
                // canvasRef.current.width = videoWidth;
                // canvasRef.current.height = videoHeight;

                const tfVideo = tf.browser.fromPixels(video);
                const resized = tf.image.resizeBilinear(tfVideo, [224, 224]);
                const normalized = resized.div(255.0).expandDims(0);
                const predictions = await model.predict(normalized);

                // // Convert logits to probabilities and class names
                // const classes = Array.from(predictions.argMax(-1).dataSync())[0];
                // const fruitInfo = metadata.labels[classes];
                // console.log(fruitInfo); // Log the class name

                // // Update state to change AR text

                // console.log(predictions);

                const topK = 3; // for example, to get top 3 predictions
                const { values, indices } = tf.topk(predictions, topK);
                const classesIndices = Array.from(indices.dataSync());
                const probabilities = Array.from(values.dataSync());

                // Assuming metadata.labels is an array mapping indices to class names
                const classes = classesIndices.map(index => metadata.labels[index]);
                const classProbabilities = classes.map((className, i) => ({
                    className,
                    probability: probabilities[i]
                }));

                console.log(classProbabilities);

                if (classProbabilities != null && classProbabilities.length > 0) {
                    console.log("set new fruits");
                    setTop1Fruit(classProbabilities[0].className);
                    setTop2Fruit(classProbabilities[1].className);
                    setTop1FruitProbabilty(classProbabilities[0].probability);
                    setTop2FruitProbabilty(classProbabilities[1].probability);

                    setFruitInfo(classProbabilities);
                }

                const numDetections = predictions.shape[1]; // Assuming the number of detections is at index 1
                const predictionArray = await predictions.array(); // Convert the tensor to a JavaScript array

                console.log(predictionArray);
                // Process the array to extract bounding boxes
                const boxes = [];
                for (let i = 0; i < numDetections; i++) {
                    const [y_min, x_min, y_max, x_max, score, classId] = predictionArray[i];
                    console.log(predictionArray[i]);
                    if (score > 0.00000001) { // Define a threshold for detection confidence
                        const bbox = {
                            yMin: y_min,
                            xMin: x_min,
                            yMax: y_max,
                            xMax: x_max
                        };
                        const className = metadata.labels[classId]; // Map class ID to label
                        boxes.push({ bbox, className, score });
                    }
                }

                console.log(boxes);

                // Cleanup tensors
                tfVideo.dispose();
                resized.dispose();
                normalized.dispose();
                predictions.dispose();

            } catch (e) {
                console.log("Error with predictions");
                console.log(e);
            }
    }

    const videoConstraints = {
        facingMode: 'environment', // This requests the back camera
    };

    return (
        <div>
            <Webcam
                ref={webcamRef}
                muted={true}
                style={{
                    position: "flex",
                    // marginLeft: "auto",
                    // marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: '100%',
                    height: 380,
                }}
                videoConstraints={videoConstraints}
            />

            {/* <canvas
                ref={canvasRef}
                style={{
                    position: "flex",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 8,
                    width: 640,
                    height: 480,
                }}
            /> */}
            <div className="dashboard">
                <div className="flex-between margin-bottom">
                    <h2>Fruit Ripeness Predictions</h2>
                </div>
                <div className="margin-bottom">
                    <p className="flex-between text-gray-800">
                        <span className="flex-item">
                            <span className="margin-left">{top1Fruit}</span>
                        </span>
                        <span className="font-bold">{(Math.round(top1FruitProbability * 10000) / 100).toFixed(2)}%</span>
                    </p>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${(Math.round(top1FruitProbability * 100))}%` }}></div>
                    </div>
                </div>
                <div className="margin-bottom">
                    <p className="flex-between text-gray-800">
                        <span className="flex-item">
                            <span className="margin-left">{top2Fruit}</span>
                        </span>
                        <span className="font-bold">{(Math.round(top2FruitProbability * 10000) / 100).toFixed(2)}%</span>
                    </p>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${(Math.round(top2FruitProbability * 100))}%` }}></div>
                    </div>
                </div>
            </div>
            <ShowRecipe product={top1Fruit} />
        </div>
    );
};

export default FruitRipenessChecker;
