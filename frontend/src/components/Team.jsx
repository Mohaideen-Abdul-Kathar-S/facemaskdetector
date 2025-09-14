import React from "react";
import "./Team.css"; // import the CSS file

export default function Team() {
const members = [
  { name: "Mahasri S", role: "Full Stack Developer", img: "/assets/maha.jpg" },
  { name: "Mohaideen Abdul Kathar A", role: "Full Stack Developer", img: "/assets/kathar.jpg" },
  { name: "Ponkanimozhi S", role: "Full Stack Developer", img: "/assets/kani.jpg" },
];

  return (
    <section id="team" className="team-section">
      <div className="team-container">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {members.map((m) => (
            <div key={m.name} className="team-card">
              <div className="team-photo">
                <img src={m.img} alt={m.name} />
              </div>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </div>
          ))}
        </div>
      </div>
       <section id="meetus" className="meetus-section">
  <div className="meetus-container">
    <h2>Project Overview: Face Mask Detection</h2>

    {/* About Project */}
    <p>
      This project demonstrates a <strong>Face Mask Detection</strong> system built to automatically detect whether
      people are wearing masks in images. With the rise of global health concerns, monitoring mask compliance in
      public areas manually can be slow, error-prone, and inefficient. This project provides a web-based solution
      where users can upload images, and the model instantly predicts if a person is wearing a mask.
    </p>

    {/* Problem Statement */}
    <h3>Problem Statement</h3>
    <p>
      Ensuring mask compliance manually is difficult, especially in crowded spaces like offices, schools, hospitals,
      and public transport. Security personnel may miss violations, monitoring is time-consuming, and confrontations
      may arise. There is a clear need for a fast, reliable, and automated solution that can monitor mask usage
      in real-time.
    </p>

    {/* Solution */}
    <h3>Solution</h3>
    <p>
      We developed a <strong>lightweight Convolutional Neural Network (CNN)</strong> model using TensorFlow, capable 
      of detecting masks from images accurately and quickly. The model is integrated into a web interface built
      with React and Flask, allowing anyone to upload an image and instantly get predictions. This solution is
      scalable, efficient, and user-friendly.
    </p>

    {/* Dataset */}
    <h3>Dataset</h3>
    <p>
      The model is trained on the <strong>Kaggle Face Mask Detection Dataset</strong>, which contains thousands
      of images of people wearing masks and without masks. The dataset was preprocessed and augmented to
      improve model accuracy and generalization for real-world scenarios.
    </p>

    {/* Tech Stack */}
    <h3>Technology Stack</h3>
    <ul>
      <li><strong>Frontend:</strong> React, CSS3 (for a responsive and interactive UI)</li>
      <li><strong>Backend:</strong> Flask with Python 3.8+, serving the trained TensorFlow model</li>
      <li><strong>Database:</strong> MongoDB Atlas (optional logging of predictions and user activity)</li>
      <li><strong>Model:</strong> TensorFlow CNN trained on the Kaggle dataset</li>
    </ul>

    {/* Tools Used */}
    <h3>Tools Used</h3>
    <ul>
      <li><strong>VS Code:</strong> Primary development IDE for frontend and backend</li>
      <li><strong>Google Colab:</strong> Training and experimenting with the model</li>
      <li><strong>Postman / Thandar API Testing:</strong> For testing backend APIs</li>
      <li><strong>Git & GitHub:</strong> Version control and project repository</li>
    </ul>

    {/* Additional Notes */}
    <h3>Key Highlights</h3>
    <p>
      - Real-time predictions with minimal delay<br/>
      - Beginner-friendly interface; anyone can upload an image and see results<br/>
      - Fully responsive web application, works on desktop, tablet, and mobile<br/>
      - Combines AI and web development concepts, demonstrating an end-to-end solution<br/>
      - Showcases practical application of deep learning in public health monitoring
    </p>

    <p>
      This comprehensive project not only demonstrates technical skills in <strong>AI, Python, React, and Flask</strong>,
      but also highlights how machine learning can be integrated into real-world applications for social impact.
    </p>
  </div>
</section>

    </section>
  );
}
