import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const FruitRipenessChecker = () => {
    const videoRef = useRef(null);
    const [model, setModel] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [fruitInfo, setFruitInfo] = useState("Fruit Information Here");

    // Load your model
    useEffect(() => {
        const loadModel = async () => {
            try {
                const modelURL = process.env.PUBLIC_URL + '/model/model.json';
                const metadataURL = process.env.PUBLIC_URL + '/model/metadata.json';

                const model = await tf.loadLayersModel(modelURL);
                setModel(model);
                const metadata = await fetch(metadataURL).then(response => response.json());
                setMetadata(metadata);
                console.log('Model and metadata loaded.');
            } catch (error) {
                console.error('Error loading model', error);
            }
        };
        loadModel();
    }, []);

    // Setup webcam
    useEffect(() => {
        const getVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
            } catch (error) {
                console.error('Error setting up video stream:', error);
            }
        };
        getVideo();
    }, []);

    // Predict function
    const predict = async () => {
        if (model && videoRef.current && metadata) {
            try {
                const video = videoRef.current;
                const tfVideo = tf.browser.fromPixels(video);
                const resized = tf.image.resizeBilinear(tfVideo, [224, 224]);
                const normalized = resized.div(255.0).expandDims(0);
                const predictions = await model.predict(normalized);

                // Convert logits to probabilities and class names
                const classes = Array.from(predictions.argMax(-1).dataSync())[0];
                const fruitInfo = metadata.labels[classes];
                console.log(fruitInfo); // Log the class name

                // Update state to change AR text
                setFruitInfo(fruitInfo);

                // Cleanup tensors
                tfVideo.dispose();
                resized.dispose();
                normalized.dispose();
                predictions.dispose();
            } catch (error) {
                console.error('Error during prediction:', error);
            }
        }
    };

    return (
        <div>
            <a-scene embedded arjs='sourceType: webcam;'>
                {/* Define AR markers and entities here */}
                <a-marker preset="hiro">
                    {/* Example of a 3D model as an AR object */}
                    <a-box position='0 0.5 0' material='color: yellow;'></a-box>

                    {/* Text display in AR */}
                    <a-text
                        value={fruitInfo} // Dynamic value from state
                        position="0 0.5 0"
                        color="black"
                        align="center"
                    ></a-text>
                </a-marker>
                <a-entity camera></a-entity>
            </a-scene>
            <video
                ref={videoRef}
                // style={{ display: 'none' }} // Hide the video element as it's not needed to be shown
                autoPlay
                playsInline
                muted
            />
            <button onClick={predict}>Check Ripeness</button>
        </div>
    );
};

export default FruitRipenessChecker;
