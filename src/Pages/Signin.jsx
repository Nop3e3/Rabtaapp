import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Style.css";

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="body">
    <div className="signin-root">
      <div className="signin-container">

        <div className="signin-header">
          <h1 className="signin-title">Welcome Back</h1>
          <p className="signin-subtitle">Log in</p>
        </div>

        <div className="signin-form">
          {/* Email */}
          <div className="signin-field">
            <label className="signin-label">Email address</label>
            <div className="signin-input-wrap">
              <input
                className="signin-input"
                type="email"
                placeholder="helloworld@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {isEmailValid && (
                <span className="signin-check">
                  <CheckIcon />
                </span>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="signin-field">
            <label className="signin-label">Password</label>
            <div className="signin-input-wrap">
              <input
                className="signin-input"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="signin-eye"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div className="signin-forgot-row">
            <a href="#" className="signin-forgot">Forgot password?</a>
          </div>

          {/* Login btn */}
          <button className="signin-btn">Log in</button>

          {/* Divider */}
          <div className="signin-divider">
            <span className="signin-divider-line" />
            <span className="signin-divider-text">Or Login with</span>
            <span className="signin-divider-line" />
          </div>

          {/* Social buttons */}
          <div className="signin-social">
            <button className="signin-social-btn">
              <FacebookIcon />
            </button>
            <button className="signin-social-btn">
              <GoogleIcon />
            </button>
            <button className="signin-social-btn">
              <AppleIcon />
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="signin-footer-text">
          Don't have an account?{" "}
          <Link to="/" className="signin-signup-link">Sign up</Link>
        </p>

      </div>
    </div></div>
  );
}