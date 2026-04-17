import React from "react";
import "./Inbox.css";
import ReadBadge from "./ReadBadge";

export default function MessageRow({ avatar, name, time, subject, preview, status, onClick }) {
  return (
    <div className="inbox-msg-row" onClick={onClick}>
      <div className="inbox-msg-avatar-wrap">
        {avatar
          ? <img src={avatar} alt={name} className="inbox-msg-avatar" />
          : <div className="inbox-msg-avatar-placeholder">{name?.charAt(0)}</div>
        }
      </div>
      <div className="inbox-msg-body">
        <div className="inbox-msg-top">
          <span className="inbox-msg-name">{name}</span>
          <span className="inbox-msg-time">{time}</span>
        </div>
        <span className="inbox-msg-subject">{subject}</span>
        <div className="inbox-msg-bottom">
          <p className="inbox-msg-preview">{preview}</p>
          <ReadBadge status={status} />
        </div>
      </div>
    </div>
  );
}