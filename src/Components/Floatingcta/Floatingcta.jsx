import React, { useState } from "react";
import "./Floatingcta.css";

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const ToIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const SubjectIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="15" y2="12"/>
    <line x1="3" y1="18" x2="18" y2="18"/>
  </svg>
);

export default function FloatingCTA({ onSend }) {
  const [open, setOpen]       = useState(false);
  const [to, setTo]           = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setTo(""); setSubject(""); setMessage("");
      setSent(false);
    }, 350);
  };

  const handleSend = async () => {
    if (!to.trim() || !message.trim()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    onSend?.({ to, subject, message });
    setSending(false);
    setSent(true);
    setTimeout(handleClose, 1200);
  };

  const canSend = to.trim() && message.trim() && !sending && !sent;

  return (
    <>
      {open && <div className="fcta-backdrop" onClick={handleClose} />}

      {/* ── Popup sheet ── */}
      <div className={`fcta-sheet ${open ? "fcta-sheet--open" : ""}`}>
        <div className="fcta-sheet-handle" />

        <div className="fcta-sheet-header">
          <h3 className="fcta-sheet-title">New Message</h3>
          <button className="fcta-x-btn" onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="fcta-sheet-body">
          <div className="fcta-field">
            <span className="fcta-field-label"><ToIcon /> To</span>
            <input
              className="fcta-input"
              type="text"
              placeholder="Recipient name or email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <div className="fcta-field">
            <span className="fcta-field-label"><SubjectIcon /> Subject</span>
            <input
              className="fcta-input"
              type="text"
              placeholder="e.g. Project Inquiry"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="fcta-textarea-wrap">
            <textarea
              className="fcta-textarea"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />
          </div>

          <button
            className={`fcta-send-btn ${sent ? "fcta-send-btn--sent" : ""}`}
            onClick={handleSend}
            disabled={!canSend}
          >
            {sent ? (
              "✓  Sent!"
            ) : sending ? (
              <span className="fcta-dots">
                <span /><span /><span />
              </span>
            ) : (
              <><SendIcon /><span>Send Message</span></>
            )}
          </button>
        </div>
      </div>

      {/* ── FAB ── */}
      <button
        className={`fcta-fab ${open ? "fcta-fab--active" : ""}`}
        onClick={() => (open ? handleClose() : setOpen(true))}
        aria-label="Compose message"
      >
        <span className={`fcta-fab-plus ${open ? "fcta-fab-plus--rotated" : ""}`}>
          <PlusIcon />
        </span>
      </button>
    </>
  );
}