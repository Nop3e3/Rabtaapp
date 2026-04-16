import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Pages/Supabase";
import "./Coursesec.css";
import CourseCard from "./Coursecard";

export default function LearningHub({ onViewAll }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCourses() {
      const { data, error } = await supabase
        .from("learning_hub")
        .select("*")
        .limit(4);

      if (error) {
        console.error("Error fetching courses:", error.message);
      } else {
        setCourses(data);
      }
      setLoading(false);
    }
    fetchCourses();
  }, []);

  const handleEnroll = (course) => {
    if (course?.Path) navigate(course.Path);
  };

  return (
    <section className="lh-section">
     

      <div className="lh-scroll-track" ref={scrollRef}>
        {loading
          ? [1, 2, 3, 4].map((i) => (
              <div key={i} className="cc-card cc-card--skeleton" />
            ))
          : courses.map((course, i) => (
              <div
                key={course["Course Name"]}
                className="lh-card-wrapper"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <CourseCard course={course} onEnroll={handleEnroll} />
              </div>
            ))
        }
      </div>
    </section>
  );
}