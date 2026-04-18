import React, { useEffect, useState } from "react";
import "./Style.css";
import { supabase } from "./Supabase";
import QuoteStep1 from "../Components/Quotes/Quotestep1";
import { useNavigate } from "react-router-dom";
import Topbar from "../Components/Topbar/Topbar";
import Navbarr from "../Components/Navbar/Navbar";
function Form1() {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    supplier: "broadcast",
    category: "",
    productName: "",
    description: "",
    images: [],
    materialType: "",
    weight: "",
    quantity: "",
    quantityUnit: "pieces",
    flexibleQty: false,
    colorRequirements: "",
  });

  const navigate = useNavigate();

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

  return (
      <div className="body">
      <div className="bodyy">
         <Topbar />
    <QuoteStep1
      data={formData}
      onChange={(field, value) => setFormData((prev) => ({ ...prev, [field]: value }))}
      onNext={() => navigate("/Form2")}
      onCancel={() => navigate(-1)}
    />
     <div className="spacedown"></div>  <Navbarr />
    
    </div></div>
  );
}

export default Form1;