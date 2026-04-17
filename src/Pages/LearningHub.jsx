import React, { useEffect, useState } from "react";
import "./Style.css";
import Topbar from "../Components/Topbar/Topbar";
import Navbarr from "../Components/Navbar/Navbar";
import { supabase } from "./Supabase";
import SectionTitle from "../Components/Sectitle/Secttitle";
import Progresscard from "../Components/Progresscard/Progresscard";
import ChecklistCard from "../Components/ChecklistCard/ChecklistCard";
import Progresscoursecard from "../Components/CourseProgressCard/CourseProgressCard";
import CourseCard2 from "../Components/CourseCard2/CourseCard2";
import Viewall from "../Components/Viewall/Viewall";
import Grid from "../Components/CategoryGrid/CategoryGrid"
function LearningHub() {
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

        <div className="Sec">
          <SectionTitle
            title="Learning Hub"
            subtitle="Upgrade your skills to maximize your business goals"
          />
        </div>

        <div className="Sec">
          <div className="welcomebck">Welcome Back Nayerah</div>
          <div className="lesson">
            Your goal is to grow in your role with
            <span className="lessonname"> {course?.["Course Name"] || "Fashion Supply Chain Management"}</span>
          </div>
        </div>

        <div className="Sec">
          <Progresscard />
        </div>

        <div className="Sec">
          <SectionTitle title="Today's goals" />
          <ChecklistCard />
        </div>

        <div className="Sec">
          <SectionTitle title="Continue Learning" />
          <Progresscoursecard
            image={course?.image || null}
            title={course?.["Course Name"] || ""}
            progress={40}
            modulesCompleted={Number(course?.["Module"]?.replace(/\D/g, "")) || 4}
            modulesTotal={10}
            onPlay={() => console.log("play")}
            onGoToCourse={() => console.log("go to course", course?.["Path"])}
          />
        </div>

        {recommendedCourses.length > 0 && (
          <div className="Sec">
           <div className="ttll">
                      <SectionTitle title="Reccomended" />
                      <Viewall text="View all" variant="ghost" />
                    </div>
            {recommendedCourses.map((c) => (
              <CourseCard2
                key={c["Course Name"]}
                image={c.image || null}
                title={c["Course Name"] || ""}
                rating={
                  (c["Rating"] || "").split("").filter((ch) => ch === "★").length || 3
                }
                level={c["Level"] || ""}
                providerLogo={c.provider_logo || null}
                providerName={c["Provider"] || ""}
                modules={c["Module"] || ""}
                duration={c["Duration"] || ""}
                bookedPct={Number(c["Success %"]?.replace("%", "")) || 93}
                onEnroll={() => console.log("enroll", c["Path"])}
              />
            ))}
          </div>
        )}
              <div className="Sec">
           <div className="ttll">
                      <SectionTitle title="Recommended Paths" />
                      <Viewall text="View all" variant="ghost" />
                    </div>
    <Grid/>
          </div>

        <div className="spacedown" />
        <Navbarr />
      </div>
    </div>
  );
}

export default LearningHub;