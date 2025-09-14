import React from "react";

export default function Section({ id, title, children }) {
  return (
    <section id={id} className="p-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <div className="text-gray-700">{children}</div>
      </div>
    </section>
  );
}
