import React from "react";
import "./Landing.css";

export default function Landing() {
  return (
    <section id="home">
      <div className="content">
        <h1>Face Mask Detection</h1>
        <p>
          Real-time mask detection demo. Upload an image — the model runs on the
          server and returns results instantly.
        </p>
      </div>
    </section>
  );
}
