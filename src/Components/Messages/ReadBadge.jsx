import React from "react";
import "./Inbox.css";

export default function ReadBadge({ status }) {
  return (
    <span className={`inbox-badge inbox-badge--${status === "Read" ? "read" : "unread"}`}>
      {status}
    </span>
  );
}