import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuoteConfirmation.css";

export default function QuoteConfirmation() {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((v) => {
        if (v <= 1) {
          clearInterval(timer);
          navigate("/home");
        }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="qc-root">
      <div className="qc-content">
        {/* Animated check */}
        <div className="qc-icon-wrap">
          <svg className="qc-circle" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4"/>
            <circle
              cx="40" cy="40" r="36"
              fill="none"
              stroke="#9aaa30"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="226"
              strokeDashoffset="226"
              className="qc-circle-fill"
              style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
            />
          </svg>
          <div className="qc-check">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        </div>

        <h1 className="qc-title">Quote Request Sent!</h1>
        <p className="qc-subtitle">
          Your request has been sent to verified suppliers. You'll receive quotes within 24-48 hours.
        </p>

        <div className="qc-details">
          <div className="qc-detail-row">
            <span className="qc-detail-label">Status</span>
            <span className="qc-detail-value qc-status">Pending Review</span>
          </div>
          <div className="qc-detail-row">
            <span className="qc-detail-label">Expected Response</span>
            <span className="qc-detail-value">24 - 48 hours</span>
          </div>
          <div className="qc-detail-row">
            <span className="qc-detail-label">Notifications</span>
            <span className="qc-detail-value">Via inbox & email</span>
          </div>
        </div>

        <div className="qc-tip">
          <span className="qc-tip-icon">💡</span>
          <p>You can track your quote requests in the <strong>Suppliers</strong> section under "My Requests".</p>
        </div>

        <button className="qc-btn-home" onClick={() => navigate("/home")}>
          Go to Home
        </button>

        <button className="qc-btn-suppliers" onClick={() => navigate("/Suppliers")}>
          View My Requests
        </button>

        <p className="qc-auto">Redirecting to home in <span className="qc-count">{count}</span>s</p>
      </div>
    </div>
  );
}