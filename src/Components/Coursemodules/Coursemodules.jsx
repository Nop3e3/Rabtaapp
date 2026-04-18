import React, { useEffect, useRef, useState } from "react";
import "./Coursemodules.css";

const MODULES = [
  { id: 1, title: "Module 1: Getting Started",      lessons: 4, duration: "55m", completed: 4, total: 4 },
  { id: 2, title: "Module 2: Market Research",      lessons: 4, duration: "55m", completed: 4, total: 4 },
  { id: 3, title: "Module 3: Business Planning",    lessons: 4, duration: "55m", completed: 4, total: 4 },
  { id: 4, title: "Module 4: Supplier Management",  lessons: 4, duration: "55m", completed: 4, total: 4 },
  { id: 5, title: "Module 5: Business Application", lessons: 4, duration: "55m", completed: 3, total: 4 },
];

export function ModuleItem({ title, lessons, duration, completed, total, animate }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isDone = completed === total;

  return (
    <div className="cm-item">
      <div className="cm-item-left">
        <div className={`cm-badge ${isDone ? "cm-badge--done" : "cm-badge--partial"}`}>
          {completed}/{total}
        </div>
        <div className="cm-item-info">
          <h4 className="cm-item-title">{title}</h4>
          <p className="cm-item-meta">{lessons} lessons · {duration}</p>
        </div>
      </div>

      {!isDone && (
        <div className="cm-progress-wrap">
          <div className="cm-bar-track">
            <div
              className="cm-bar-fill"
              style={{ width: animate ? `${pct}%` : "0%" }}
            />
            <div
              className="cm-bar-thumb"
              style={{ left: animate ? `calc(${pct}% - 28px)` : "0px" }}
            >
              <span>{pct}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CourseModules({ modules = MODULES }) {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cm-card" ref={ref}>
      {modules.map((m) => (
        <ModuleItem key={m.id} {...m} animate={animate} />
      ))}
    </div>
  );
}