import React, { useEffect, useState } from "react";
import "./GroupsSection.css";
import { supabase } from "../../Pages/Supabase";
import GroupCard from "./GroupCard";
import { useNavigate } from "react-router-dom";

function getKey(obj, name) {
  if (!obj) return undefined;
  if (obj[name] !== undefined) return obj[name];
  const lower = name.toLowerCase();
  const found = Object.keys(obj).find(
    (k) => k.toLowerCase().replace(/['''`]/g, "'") === lower.replace(/['''`]/g, "'")
  );
  return found ? obj[found] : undefined;
}

export default function GroupsSection({ onJoin }) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGroups() {
      try {
        const { data, error } = await supabase
          .from("community")
          .select("*")
          .gte("id", 1)
          .lte("id", 3);

        if (error) throw error;
        setGroups(data || []);
      } catch (err) {
        console.error("Groups fetch failed:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchGroups();
  }, []);

  if (loading) {
    return (
      <div className="gs-scroll">
        {[1, 2, 3].map((i) => (
          <div key={i} className="gc-card gc-card--skeleton" />
        ))}
      </div>
    );
  }

  return (
    <div className="gs-scroll">
      {groups.map((g) => {
        const isFirst = Number(g.id) === 1;
        return (
          <GroupCard
            key={g.id}
            name={
              getKey(g, "Groups's_name") ||
              getKey(g, "Groups\u2019s_name") ||
              "Group"
            }
            pfp={g.groups_pfp || null}
            bgImage={g.groups_pfp || null}
            postsToday={g.groupsactivitycount ?? 156}
            members={getKey(g, "Groups member count") ?? 2400}
            onClick={isFirst ? () => navigate("/InternalCommunity") : undefined}
            onJoin={(e) => {
              e?.stopPropagation?.();
              onJoin?.(g);
            }}
          />
        );
      })}
    </div>
  );
}