import React from "react";
import "./Howitworks.css";

const STEPS = [
  {
    number: 1,
    title: "Browse Mentors",
    description: "Explore experienced mentors in your area of interest",
  },
  {
    number: 2,
    title: "Book a Session",
    description: "Choose a time that works for both of you",
  },
  {
    number: 3,
    title: "Get Guidance",
    description: "Meet via video call and accelerate your growth",
  },
];

export function StepItem({ number, title, description }) {
  return (
    <div className="hiw-step">
      <div className="hiw-step-number">{number}</div>
      <div className="hiw-step-body">
        <h4 className="hiw-step-title">{title}</h4>
        <p className="hiw-step-desc">{description}</p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <div className="hiw-card">
      <h3 className="hiw-title">Specializations & Capabilities</h3>
      <div className="hiw-box">
        {STEPS.map((step, i) => (
          <StepItem
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </div>
  );
}