import React, { useEffect, useState } from "react";
import "./Style.css";
import Areas from "../Components/Areasofexpertise/Areasofexpertise"
import MentorProfile from "../Components/Mentorprofileheader/Mentorprofileheader";
import Topbar from "../Components/Topbar/Topbar";
import Navbarr from "../Components/Navbar/Navbar";
import { supabase } from "./Supabase";
import Reviews from "../Components/Mentorreviews/Mentorreviews"
import Pricing from "../Components/Sessionspricing/Sessionspricing"
function getKey(obj, name) {
  if (!obj) return undefined;
  if (obj[name] !== undefined) return obj[name];

  const lower = name.toLowerCase();
  const found = Object.keys(obj).find(
    (k) =>
      k.toLowerCase().replace(/['''`]/g, "'") ===
      lower.replace(/['''`]/g, "'")
  );

  return found ? obj[found] : undefined;
}

function MentorInternal() {
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
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="home-loading-star"
              >
                <path
                  d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z"
                  fill="white"
                />
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

        {sessionMentor && (
          <div className="Sec">
            <MentorProfile
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
              rating={
                Number(
                  getKey(sessionMentor, "featured_mentor's Rating number1") ||
                    getKey(
                      sessionMentor,
                      "featured_mentor\u2019s Rating number1"
                    )
                ) || 5
              }
              reviewCount={
                getKey(sessionMentor, "featured_mentor's Rating number1") ||
                getKey(
                  sessionMentor,
                  "featured_mentor\u2019s Rating number1"
                ) ||
                0
              }
              sessions={sessionMentor["Number_ of_clients1"] ?? 0}
              location="Cairo, Egypt"
              memberSince="2021"
              languages="English, Arabic"
              locationDetail="Cairo, Egypt"
              specialties={[
                sessionMentor["Tag1"],
                sessionMentor["Tag2"],
              ].filter(Boolean)}
              sessionsCount="850+"
              menteesCount="300+"
              experience="15+"
            />
          </div>
        )}
        <div className="Sec">
<Areas/></div>
<div className="Sec"><Pricing/></div>
<div className="Sec">
<Reviews/></div>
        <div className="spacedown" />
        <Navbarr />
      </div>
    </div>
  );
}

export default MentorInternal;