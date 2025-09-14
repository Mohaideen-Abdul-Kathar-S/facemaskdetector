import React from "react";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Section from "./components/Sections";
import Team from "./components/Team";
import Predictor from "./components/Predictor";
import "./App.css";

export default function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Landing />
      <Section id="meetus">
        <Team />
        
      </Section>
      <Predictor />
      
      <footer className="footer" id='footer'>
  <div className="footer-container">
    <p>© 2025 <strong>MaskWatch</strong> • Built with ❤️</p>
    <div className="social-links">
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <i className="fab fa-github"></i>
      </a>
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <i className="fab fa-linkedin"></i>
      </a>
    </div>
  </div>
</footer>

    </div>
  );
}
