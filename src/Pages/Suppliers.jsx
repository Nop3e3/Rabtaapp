import React, { useEffect, useState } from "react";
import "./Style.css";
import Topbar from "../Components/Topbar/Topbar";
import Navbarr from "../Components/Navbar/Navbar";
import { supabase } from "./Supabase";
import Chips from "../Components/Chips/chipcomp";
import SectionTitle from "../Components/Sectitle/Secttitle";
import FilterChip from "../Components/Chips/FilterChip";
import Button from "../Components/Buttons/button";
import Suppliercard from "../Components/Suppliercard/Suppliercard";
import Pagination from "../Components/Pagination/Pagination"




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

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data: supplierData, error: supplierError } = await supabase
          .from("Supplier Detail Page eng")
          .select("*");
        if (supplierError) throw supplierError;

        if (supplierData?.length) {
          console.log("Supplier keys:", Object.keys(supplierData[0]));
        }

        setSuppliers(supplierData || []);
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
        <Chips />

        <div className="Sec">
          <SectionTitle
            title="Suppliers"
            subtitle="Discover elite, verified suppliers in the region to build your next collection."
          />
        </div>

        <div className="Sec">
          <div className="results">128 Results</div>
          <div className="filter">
            <FilterChip label="Verified" />
            <FilterChip label="Denim" />
          </div>
        </div>

        <div className="Sec">
          <Button text="Request a Quote" variant="primary" size="large" />
          <Button text="View all requests" variant="secondary" size="large" />
        </div>

        <div className="Sec">
          {suppliers.map((supplier) => (
            <Suppliercard
              key={supplier.id}
              image={
          
                supplier.suppliers_pfp ||
                null
              }
              name={
                getKey(supplier, "supplier's_name") ||
                getKey(supplier, "supplier\u2019s_name") ||
                ""
              }
              rating={Number(supplier.rating1) || Number(supplier.rating2) || 4.8}
              reviewCount={
                getKey(supplier, "supplier's_review_count") ||
                getKey(supplier, "supplier\u2019s_review_count") ||
                0
              }
              role="Supplier"
              location="Cairo, Egypt"
              memberSince="2021"
              specialization={supplier["Capabilities1"] || ""}
              priceRange="5000-10000 EGP"
              projects={supplier.production_capcity ?? 0}
              tags={[
                supplier["Capabilities1"],
                supplier["Capabilities2"],
              ].filter(Boolean)}
              minOrder={supplier["MOQ"] || ""}
              leadTime={supplier["Lead Time"] || ""}
              available={true}
              onMessage={() => console.log("message", supplier.id)}
              onRequestQuote={() => console.log("quote", supplier.id)}
            />
          ))}
        </div>
<Pagination/>



 <div className="spacedown"></div>
        <Navbarr />
      </div>
    </div>
  );
}

export default Suppliers;