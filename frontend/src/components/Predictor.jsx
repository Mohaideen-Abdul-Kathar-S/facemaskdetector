import React, { useState, useRef } from "react";
import "./Predictor.css";

export default function Predictor() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usingCamera, setUsingCamera] = useState(false);
  const [stream, setStream] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    stopCamera();
  };

  // Drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setResult(null);
    stopCamera();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Start camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setUsingCamera(true);
      setFile(null);
      setResult(null);
    } catch (err) {
      alert("Camera not accessible");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setUsingCamera(false);
  };

  // Capture image from camera
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      const imageFile = new File([blob], "camera_capture.jpg", { type: "image/jpeg" });
      setFile(imageFile);
      setResult(null);
    }, "image/jpeg", 0.95);
    stopCamera();
  };

  // Submit for prediction
  const submit = async (e) => {
    e.preventDefault();

    if (usingCamera) {
      // Capture from camera before predicting
      capturePhoto();
    }

    if (!file) return alert("Please choose or capture an image first!");
    
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/predict", { method: "POST", body: formData });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Prediction failed");
    }
    setLoading(false);
  };

  // Clear image
  const clearImage = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <section id="predictor" className="predictor-section">
      <div className="predictor-container">
        <h2>Try the Face Mask Detection Model</h2>
        <p>Select an image, drag & drop, or use your camera!</p>

        {/* Dropzone or Camera */}
        {!usingCamera ? (
          <div
            className="dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
          >
            {file ? (
              <img src={URL.createObjectURL(file)} alt="Preview" className="preview-image" />
            ) : (
              <p>Drag & Drop image here or click to select</p>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              capture="environment"
            />
          </div>
        ) : (
          <div className="camera-container">
            <video ref={videoRef} autoPlay className="camera-video"></video>
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          {/* Camera Toggle */}
          <button
            className="camera-toggle"
            onClick={() => (usingCamera ? stopCamera() : startCamera())}
          >
            {usingCamera ? "Stop Camera" : "Use Camera"}
          </button>

          {/* Predict */}
          <button
            className="predict-button"
            onClick={submit}
            disabled={loading || (!file && !usingCamera)}
          >
            {loading ? "Checking..." : usingCamera ? "Capture & Predict" : "Predict"}
          </button>

          {/* Clear Image */}
          {file && (
            <button className="clear-button" onClick={clearImage}>
              Clear
            </button>
          )}
        </div>

        {/* Result Display */}
        {result && (
          <div className="result-card">
            <h3>Result:</h3>
            <p className={`result-label ${result.label === "With Mask" ? "mask" : "no-mask"}`}>
              {result.label}
            </p>
            <p>Confidence: {(result.probability * 100).toFixed(2)}%</p>
          </div>
        )}
      </div>
    </section>
  );
}
