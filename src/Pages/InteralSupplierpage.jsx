import React, { useEffect, useState, useRef } from "react";
import "./Style.css";
import Topbar from "../Components/Topbar/Topbar";
import Navbarr from "../Components/Navbar/Navbar";
import { supabase } from "./Supabase";
import SupplierHeader from "../Components/Supplierheader/Supplierheader";
import About from "../Components/AboutCard/AboutCard";
import Spec from "../Components/SpecCard/SpecCard";
import Trustcard from "../Components/TrustCard/TrustCard";
import ProductionCapcity from "../Components/ProductionCapacity/ProductionCapacity";
import Portfolio from "../Components/PortfolioCard/PortfolioCard";
import ReviewsCard from "../Components/ReviewsCard/ReviewsCard";
import Button from "../Components/Buttons/button";

// ✅ ADD THIS
import { useNavigate } from "react-router-dom";

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

const CAPABILITY_DESCRIPTIONS = {
  "Cotton Manufacturing": "Expert in 100% cotton and cotton blends for fashion wear",
  "Quality Certification": "ISO 9001 certified with strict quality standards",
  "Custom Solutions": "Tailored manufacturing based on client specifications",
  "Insurance Coverage": "Fully insured operations and product liability coverage",
  "Polyester Production": "Advanced polyester weaving for sportswear and casual fashion",
};

const TRUST_DESCRIPTIONS = {
  "Insurance Coverage": "Comprehensive business insurance",
  "Quality Certification": "ISO 9001:2015 Certified",
  "Business License Verified": "Dubai Trade License #123456",
};

function Suppliers() {
  // ✅ ADD THIS
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(true);

  const overviewRef = useRef(null);
  const portfolioRef = useRef(null);
  const reviewsRef = useRef(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const refMap = {
      Overview: overviewRef,
      Portfolio: portfolioRef,
      Reviews: reviewsRef,
    };
    const target = refMap[tab];
    if (target?.current) {
      target.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data, error } = await supabase
          .from("Supplier Detail Page eng")
          .select("*")
          .eq("id", 2)
          .single();

        if (error) throw error;
        setSupplier(data);
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

  const capabilityItems = supplier
    ? [supplier["Capabilities1"], supplier["Capabilities2"], supplier["Capabilities3"]]
        .filter(Boolean)
        .map((cap) => ({ title: cap, description: CAPABILITY_DESCRIPTIONS[cap] || "" }))
    : [];

  const trustItems = supplier
    ? [supplier["Trust_and_verifications1"], supplier["Trust_and_verifications2"], supplier["Trust_and_verifications3"]]
        .filter(Boolean)
        .map((trust) => ({ title: trust, description: TRUST_DESCRIPTIONS[trust] || "" }))
    : [];

  const portfolioImages = supplier
    ? [supplier.portfolio_img1, supplier.portfolio_img2, supplier.portfolio_img3, supplier.portfolio_img4].filter(Boolean)
    : [];

  const reviews = supplier
    ? [
        {
          avatar: supplier.review_pfp1,
          name: getKey(supplier, "reviewer's_name_1") || getKey(supplier, "reviewer\u2019s_name_1") || "",
          rating: Number(supplier.rating1) || 4,
          date: "2 weeks ago",
          text: supplier.review1 || "",
        },
        {
          avatar: supplier.review_pfp2,
          name: getKey(supplier, "reviewer's_name_2") || getKey(supplier, "reviewer\u2019s_name_2") || "",
          rating: Number(supplier.rating2) || 4,
          date: "1 month ago",
          text: supplier.review2 || "",
        },
      ].filter((r) => r.name)
    : [];

  return (
    <div className="body">
      <div className="bodyy">
        <Topbar />

        {supplier && (
          <>
            <SupplierHeader
              image={supplier.suppliers_pfp || null}
              backgroundImage={supplier.suppliers_pfp || null}
              name={getKey(supplier, "supplier's_name") || getKey(supplier, "supplier\u2019s_name") || ""}
              rating={Number(supplier.rating1) || Number(supplier.rating2) || 4.8}
              reviewCount={getKey(supplier, "supplier's_review_count") || getKey(supplier, "supplier\u2019s_review_count") || 0}
              role="Supplier"
              location="Cairo, Egypt"
              memberSince="2021"
              specialization={supplier["Capabilities1"] || ""}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            <div className="Sec" ref={overviewRef}>
              <About text={getKey(supplier, "supplier's_about") || getKey(supplier, "supplier\u2019s_about") || ""} />
            </div>

            <div className="Sec">
              <Spec title="Specializations & Capabilities" items={capabilityItems} />
            </div>

            <div className="Sec">
              <Trustcard items={trustItems} />
            </div>

            <div className="Sec">
              <ProductionCapcity
                leadTime={supplier["Lead Time"] || ""}
                moq={supplier["MOQ"] || ""}
                teamSize={supplier["Team size"] || ""}
                capacity={supplier["Capacity"] || ""}
              />
            </div>

            <div className="Sec" ref={portfolioRef}>
              <Portfolio images={portfolioImages} onViewAll={() => console.log("View all portfolio")} />
            </div>

            <div className="Sec" ref={reviewsRef}>
              <ReviewsCard
                overallRating={Number(supplier.rating1) || Number(supplier.rating2) || 4.8}
                reviewCount={getKey(supplier, "supplier's_review_count") || getKey(supplier, "supplier\u2019s_review_count") || 0}
                reviews={reviews}
                onViewAll={() => console.log("View all reviews")}
              />
            </div>
          </>
        )}

        {/* ✅ FIXED BUTTONS */}
        <div className="Sec">
          <Button
            text="Request a Quote"
            variant="primary"
            size="large"
            onClick={() => navigate("/Form1")}
          />

          <Button
            text="View all requests"
            variant="secondary"
            size="large"
            onClick={() => navigate("/requests")}
          />
        </div>

        <div className="spacedown" />
        <Navbarr />
      </div>
    </div>
  );
}

export default Suppliers;