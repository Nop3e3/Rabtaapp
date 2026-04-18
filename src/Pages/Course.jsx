import React, { useEffect, useState } from "react";
import "./Style.css";
import Topbar from "../Components/Topbar/Topbar";
import Navbarr from "../Components/Navbar/Navbar";
import Coursereviews from "../Components/Coursereviews/Coursereviews"
import Wyl from "../Components/Whatyoulearn/Whatyoulearn";
import { supabase } from "./Supabase";
import Coursemodules from "../Components/Coursemodules/Coursemodules"
import Coursehero from "../Components/Coursehero/Coursehero";
import Instructorcard from "../Components/Instructorcard/Instructorcard"
function Course() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data, error } = await supabase
          .from("learning_hub")
          .select("*")
          .range(4, 4)
          .single();

        if (error) throw error;
        console.log("Course keys:", Object.keys(data));
        setCourse(data);
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
                <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" fill="white" />
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
          <Coursehero
            bgImage={course?.image || null}
            title={course?.["Course Name"] || ""}
            description="Learn the essential steps to transform your fashion idea into a successful business with proven strategies and real-world examples."
            level={course?.["Level"] || ""}
            duration={course?.["Duration"] || ""}
            students={12540}
            rating={
              (course?.["Rating"] || "").split("").filter((ch) => ch === "★").length || 4.9
            }
            reviewCount={2847}
          />
        </div> 
        <div className="Sec">
<Instructorcard/></div>
<div className="Sec">
<Wyl/></div>
<div className="Sec">
<Coursemodules/></div>
<div className="Sec">
<Coursereviews/></div>
        <div className="spacedown" />
        <Navbarr />
      </div>
    </div>
  );
}

export default Course;