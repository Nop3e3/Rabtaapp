import React, { useEffect, useState } from "react";
import "./Style.css";
import Topbar from "../Components/Topbar/Topbar";
import Navbarr from "../Components/Navbar/Navbar";
import { supabase } from "./Supabase";
import Coursehero from "../Components/Coursehero/Coursehero"
import SectionTitle from "../Components/Sectitle/Secttitle";
import Progresscard from "../Components/Progresscard/Progresscard";
import ChecklistCard from "../Components/ChecklistCard/ChecklistCard";
import Progresscoursecard from "../Components/CourseProgressCard/CourseProgressCard";
import CourseCard2 from "../Components/CourseCard2/CourseCard2";
import Viewall from "../Components/Viewall/Viewall";
import Grid from "../Components/CategoryGrid/CategoryGrid"
function Course() {
  const [course, setCourse] = useState(null);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Fetch row 5 (index 4) for the progress card
        const { data: courseData, error: courseError } = await supabase
          .from("learning_hub")
          .select("*")
          .range(4, 4)
          .single();

        if (courseError) throw courseError;
        setCourse(courseData);

        // Fetch rows 4 and 6 (index 3 and 5) for CourseCard2
        const { data: recommended, error: recError } = await supabase
          .from("learning_hub")
          .select("*")
          .in("Course Name", [
            (await supabase.from("learning_hub").select("\"Course Name\"").range(3, 3).single()).data?.["Course Name"],
            (await supabase.from("learning_hub").select("\"Course Name\"").range(5, 5).single()).data?.["Course Name"],
          ]);

        if (recError) throw recError;
        setRecommendedCourses(recommended || []);

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
<Coursehero/>

        <div className="spacedown" />
        <Navbarr />
      </div>
    </div>
  );
}

export default Course;