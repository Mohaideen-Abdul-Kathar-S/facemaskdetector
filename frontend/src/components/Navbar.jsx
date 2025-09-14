import React, { useState } from "react";
import "./Navbar.css"; // import css

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="brand">MaskWatch</div>
      
      {/* Hamburger (visible only on mobile) */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div>

      <div className={`links ${open ? "active" : ""}`}>
        <a href="#home" onClick={() => setOpen(false)}>Home</a>
        <a href="#meetus" onClick={() => setOpen(false)}>Meet us</a>
        <a href="#predictor" onClick={() => setOpen(false)}>Try It</a>
        <a href="#footer" onClick={() => setOpen(false)}>Contact</a>
      </div>
    </nav>
  );
}
