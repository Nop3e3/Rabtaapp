import React, { useEffect, useRef, useState } from "react";
import "./CourseProgressCard.css";
import Button from "../Buttons/button";

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

function useCountUp(target, duration = 1000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

export default function CourseProgressCard({
  image,
  title,
  progress = 40,
  modulesCompleted = 4,
  modulesTotal = 10,
  onPlay,
  onGoToCourse,
}) {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);
  const count = useCountUp(progress, 1000, animate);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cpc-card" ref={ref}>
      {/* ── Thumbnail ── */}
      <div className="cpc-thumb" onClick={onPlay}>
        {image
          ? <img src={image} alt={title} className="cpc-thumb-img" />
          : <div className="cpc-thumb-placeholder" />
        }
        <div className="cpc-thumb-overlay" />
        <button className="cpc-play-btn">
          <PlayIcon />
        </button>
      </div>

      {/* ── Body ── */}
      <div className="cpc-body">
        <h2 className="cpc-title">{title}</h2>

        <div className="cpc-progress-meta">
          <span className="cpc-progress-label">Your progress</span>
          <span className="cpc-modules-label">
            modules {modulesCompleted} of {modulesTotal}
          </span>
        </div>

        {/* ── Progress bar ── */}
        <div className="cpc-bar-track">
          <div
            className="cpc-bar-fill"
            style={{ width: animate ? `${progress}%` : "0%" }}
          />
          <div
            className="cpc-bar-thumb"
            style={{ left: animate ? `calc(${progress}% - 24px)` : "0px" }}
          >
            <span className="cpc-bar-pct">{count}%</span>
          </div>
        </div>

        {/* ── CTA ── */}
        <Button
          text="Go to course"
          variant="primary"
          size="large"
          onClick={onGoToCourse}
        />
      </div>
    </div>
  );
}