import React, { useEffect, useState } from "react";
import "./Inbox.css";
import StatCard from "./StatCard";
import MessageRow from "./MessageRow";
import { supabase } from "../../Pages/Supabase";

export default function Inbox({ onMessageClick }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select("*");

        if (error) throw error;
        setMessages(data || []);
      } catch (err) {
        console.error("Inbox fetch failed:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  const total  = messages.length;
  const unread = messages.filter((m) => m.status?.toLowerCase() === "unread").length;
  const read   = messages.filter((m) => m.status?.toLowerCase() === "read").length;

  const stats = [
    { label: "Total Messages", value: total  },
    { label: "Unread",         value: unread },
    { label: "Read",           value: read   },
  ];

  if (loading) {
    return (
      <div className="inbox-root">
        <div className="inbox-stats">
          {[1, 2, 3].map((i) => (
            <div key={i} className="inbox-stat-card inbox-stat-card--skeleton" />
          ))}
        </div>
        <div className="inbox-list">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="inbox-msg-row--skeleton" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="inbox-root">
      <div className="inbox-stats">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="inbox-list">
        {messages.map((msg) => {
          const name = msg["messager's_name1"] || msg["messager\u2019s_name1"] || "";
          const avatar = msg["messager's_pfp1"] || msg["messager\u2019s_pfp1"] || "";

          return (
            <MessageRow
              key={msg.id}
              avatar={avatar}
              name={name}
              time={msg.time || ""}
              subject={msg.message_title || ""}
              preview={msg.message_content || ""}
              status={msg.status || "Read"}
              onClick={() => onMessageClick?.(msg)}
            />
          );
        })}
      </div>
    </div>
  );
}