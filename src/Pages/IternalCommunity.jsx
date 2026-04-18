import React, { useEffect, useState } from "react";
import "./Style.css";
import Groupheader from "../Components/Groupheader/Groupheader";
import Topbar from "../Components/Topbar/Topbar";
import Navbarr from "../Components/Navbar/Navbar";
import { supabase } from "./Supabase";
import Chips from "../Components/Chips/Groupchips"
import Groupabout from "../Components/Groupabout/Groupabout"
import Videpost from "../Components/Groupvideopost/Groupvideopost"
import GroupTxtpost from "../Components/Grouptextpost/Grouptextpost"
function getKey(obj, name) {
  if (!obj) return undefined;
  if (obj[name] !== undefined) return obj[name];
  const lower = name.toLowerCase();
  const found = Object.keys(obj).find(
    (k) => k.toLowerCase().replace(/['''`]/g, "'") === lower.replace(/['''`]/g, "'")
  );
  return found ? obj[found] : undefined;
}

function InternalCommunity() {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGroup() {
      try {
        const { data, error } = await supabase
          .from("community")
          .select("*")
          .eq("id", 1)
          .single();

        if (error) throw error;
        setGroup(data);
      } catch (err) {
        console.error("Group fetch failed:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchGroup();
  }, []);

  if (loading) {
    return (
      <div className="body">
        <div className="home-loading">
          <div className="home-loading-content">
            <div className="home-loading-logo">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="home-loading-star">
                <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" fill="white"/>
              </svg>
            </div>
            <p className="home-loading-text">Rabta</p>
            <div className="home-loading-bar-track">
              <div className="home-loading-bar-fill" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="body">
      <div className="bodyy">
        <Topbar />
<div className="Sec">
        {group && (
          <Groupheader
            image={group.groups_pfp || null}
            bgImage={group.groups_pfp || null}
            name={
              getKey(group, "Groups's_name") ||
              getKey(group, "Groups\u2019s_name") ||
              ""
            }
            type="Public group"
            since="2021"
            postsToday={group.groupsactivitycount ?? 156}
            location="Cairo, Egypt"
            tags={[
              getKey(group, "User's _group_name") ||
              getKey(group, "User\u2019s _group_name") ||
              null,
            ].filter(Boolean)}
          />
        )}
</div>
<Chips/><div className="Sec">
<Groupabout text='Breaking the barriers between creative vision and factory reality. We are a collective of emerging fashion founders dedicated to transparent sourcing, sustainable scaling, and shared industry intelligence' />
      </div>
      
      <div className="Sec">
      <GroupTxtpost
  groupAvatar="https://i.pinimg.com/736x/a9/d9/db/a9d9db7d678459301c73b7cd47eee4e5.jpg"
  groupName="Cotton n Linen experts"
  authorName="Muhammed Rady"
  date="10 Feb 2026"
  text="Looking for advice on scaling production..."
  tags={["Growth", "SupplyChain"]}
  likes={214} shares={214} comments={214}
/>
</div>
<div className="Sec">
<Videpost
  groupAvatar="https://i.pinimg.com/736x/a9/d9/db/a9d9db7d678459301c73b7cd47eee4e5.jpg"
  groupName="Cotton n Linen experts"
  authorName="Muhammed Rady"
  date="10 Feb 2026"
  caption="Take a look at our new arrivals today !"
  thumbnail="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800"
  tags={["Fabric", "Garments"]}
  likes={214} shares={214} comments={214}
  onPlay={() => console.log("play")}
/></div>
        <div className="spacedown" />
        <Navbarr />
      </div>
    </div>
  );
}

export default InternalCommunity;