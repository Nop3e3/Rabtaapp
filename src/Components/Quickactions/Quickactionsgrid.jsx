import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Pages/Supabase";
import "./Quickactioncard.css";
import QuickActionCard from "./Quickactioncard";

export default function QuickActionsGrid() {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuickActions() {
      const { data, error } = await supabase
        .from("home screen eng")
        .select("id, quick_actions_title, quick_actions_captionn, quick_actions_image, Path")
        .not("quick_actions_title", "is", null);

      if (error) {
        console.error("Error fetching quick actions:", error.message);
      } else {
        setActions(data);
      }

      setLoading(false);
    }

    fetchQuickActions();
  }, []);

  if (loading) {
    return (
      <section className="qa-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="qa-card qa-card--skeleton" />
        ))}
      </section>
    );
  }

  return (
    <section className="qa-grid">
      {actions.map((item) => (
        <QuickActionCard
          key={item.id}
          image={item.quick_actions_image}
          title={item.quick_actions_title}
          description={item.quick_actions_captionn}
          onClick={() => item.Path && navigate(item.Path)}
        />
      ))}
    </section>
  );
}