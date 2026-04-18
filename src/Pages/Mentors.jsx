import React, { useEffect, useState } from "react";
import "./Style.css";
import Topbar from "../Components/Topbar/Topbar";
import Navbarr from "../Components/Navbar/Navbar";
import { supabase } from "./Supabase";
import SectionTitle from "../Components/Sectitle/Secttitle";
import Viewall from "../Components/Viewall/Viewall";
import Mentorcard from "../Components/MentorCard/Mentorcard";
import Mentorsesh from "../Components/Mentorsessioncard/Mentorsessioncard";
import Browserexpertise from "../Components/Browseexpertise/Browseexpertise";
import HIW from "../Components/Howitworks/Howitworks";
import MentorChips from "../Components/Chips/c"
function getKey(obj, name) {
  if (!obj) return undefined;
  if (obj[name] !== undefined) return obj[name];
  const lower = name.toLowerCase();
  const found = Object.keys(obj).find(
    (k) => k.toLowerCase().replace(/['''`]/g, "'") === lower.replace(/['''`]/g, "'")
  );
  return found ? obj[found] : undefined;
}

function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [sessionMentor, setSessionMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase
          .from("find a mentor")
          .select("*")
          .eq("id", 1)
          .single();

        if (sessionError) throw sessionError;

        if (sessionData) {
          console.log("Session mentor keys:", Object.keys(sessionData));
        }

        setSessionMentor(sessionData);

        const { data: mentorData, error: mentorError } = await supabase
          .from("find a mentor")
          .select("*")
          .gte("id", 1)
          .lte("id", 3);

        if (mentorError) throw mentorError;
        setMentors(mentorData || []);

      } catch (err) {
        console.error("Fetch failed:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
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
<MentorChips/></div>
        {sessionMentor && (
          <div className="Sec">
                <div className="ttll">
              <SectionTitle title="Upcoming Sessions" />
              <Viewall text="View all" variant="ghost" />
            </div>
            <Mentorsesh
              avatar={
                getKey(sessionMentor, "mentor's_pfp") ||
                getKey(sessionMentor, "mentor\u2019s_pfp") ||
                null
              }
              name={
                getKey(sessionMentor, "Mentors_name") ||
                getKey(sessionMentor, "Featured_mentors1") ||
                ""
              }
              title={
                getKey(sessionMentor, "Mentor's_specialization") ||
                getKey(sessionMentor, "Mentor\u2019s_specialization") ||
                getKey(sessionMentor, "Mentor's_specialization1") ||
                ""
              }
              reviewCount={
                getKey(sessionMentor, "featured_mentor's Rating number1") ||
                getKey(sessionMentor, "featured_mentor\u2019s Rating number1") ||
                0
              }
              rating={
                Number(
                  getKey(sessionMentor, "featured_mentor's Rating number1") ||
                  getKey(sessionMentor, "featured_mentor\u2019s Rating number1")
                ) || 5
              }
              sessions={sessionMentor["Number_ of_clients1"] ?? 0}
              topicText={
                sessionMentor["Upcoming_session_topic"] ||
                "Fashion Business strategy and marketing plan for brand awareness Campaign set-up with influencers"
              }
              sessionDate="Tomorrow, Feb 9 at 10:00 AM"
              sessionType="Video Call"
              sessionDuration="60 minutes"
              onReschedule={() => console.log("reschedule")}
            />
          </div>
        )}

        {mentors.length > 0 && (
          <div className="Sec">
            <div className="ttll">
              <SectionTitle title="Featured Mentors" />
              <Viewall text="View all" variant="ghost" />
            </div>
            <div className="posts-list">
              {mentors.map((mentor) => (
                <Mentorcard
                  key={mentor.id}
                  name={
                    getKey(mentor, "Featured_mentors1") ||
                    getKey(mentor, "Mentors_name") ||
                    ""
                  }
                  avatar={
                    getKey(mentor, "mentor's_pfp") ||
                    getKey(mentor, "mentor\u2019s_pfp") ||
                    ""
                  }
                  title={
                    getKey(mentor, "Mentor's_specialization1") ||
                    getKey(mentor, "Mentor\u2019s_specialization1") ||
                    getKey(mentor, "Mentor's_specialization") ||
                    ""
                  }
                  reviewCount={
                    getKey(mentor, "featured_mentor's Rating number1") ||
                    getKey(mentor, "featured_mentor\u2019s Rating number1") ||
                    0
                  }
                  rating={
                    Number(
                      getKey(mentor, "featured_mentor's Rating number1") ||
                      getKey(mentor, "featured_mentor\u2019s Rating number1")
                    ) || 5
                  }
                  sessions={mentor["Number_ of_clients1"] ?? 0}
                  specialties={[
                    mentor["Tag1"],
                    mentor["Tag2"],
                  ].filter(Boolean)}
                  responseTime="2 hours"
                  experience=""
                />
              ))}
            </div>
          </div>
        )}

        <div className="Sec">
          <Browserexpertise />
          <HIW />
        </div>

        <div className="spacedown" />
        <Navbarr />
      </div>
    </div>
  );
}

export default Mentors;