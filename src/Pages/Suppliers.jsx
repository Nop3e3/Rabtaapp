import React, { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Style.css";
import Topbar from "../Components/Topbar/Topbar";
import Navbarr from "../Components/Navbar/Navbar";
import { supabase } from "./Supabase";
import SectionTitle from "../Components/Sectitle/Secttitle";
import Button from "../Components/Buttons/button";
import Suppliercard from "../Components/Suppliercard/Suppliercard";
import Pagination from "../Components/Pagination/Pagination";

function getKey(obj, name) {
  if (!obj) return undefined;
  if (obj[name] !== undefined) return obj[name];
  const lower = name.toLowerCase();
  const found = Object.keys(obj).find(
    (k) => k.toLowerCase().replace(/['''`]/g, "'") === lower.replace(/['''`]/g, "'")
  );
  return found ? obj[found] : undefined;
}

const SORT_OPTIONS = [
  { label: "Top Rated", value: "rating" },
  { label: "Most Projects", value: "projects" },
  { label: "Name A–Z", value: "name_asc" },
  { label: "Name Z–A", value: "name_desc" },
];

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Each category tracked separately, applied instantly on tap
  const [activeCaps, setActiveCaps] = useState([]);
  const [activeLeadTimes, setActiveLeadTimes] = useState([]);
  const [activeMoqs, setActiveMoqs] = useState([]);
  const [activeVerifs, setActiveVerifs] = useState([]);

  const [sortBy, setSortBy] = useState("rating");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const sortRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data: supplierData, error: supplierError } = await supabase
          .from("Supplier Detail Page eng")
          .select("*");
        if (supplierError) throw supplierError;
        setSuppliers(supplierData || []);
      } catch (err) {
        console.error("Fetch failed:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Derive unique options per category from real data
  const options = useMemo(() => {
    const caps = new Set();
    const leads = new Set();
    const moqs = new Set();
    const verifs = new Set();
    suppliers.forEach((s) => {
      if (s["Capabilities1"]) caps.add(s["Capabilities1"]);
      if (s["Capabilities2"]) caps.add(s["Capabilities2"]);
      if (s["Capabilities3"]) caps.add(s["Capabilities3"]);
      if (s["Lead Time"]) leads.add(s["Lead Time"]);
      if (s["MOQ"]) moqs.add(s["MOQ"]);
      if (s["Trust_and_verifications1"]) verifs.add(s["Trust_and_verifications1"]);
      if (s["Trust_and_verifications2"]) verifs.add(s["Trust_and_verifications2"]);
      if (s["Trust_and_verifications3"]) verifs.add(s["Trust_and_verifications3"]);
    });
    return {
      caps: Array.from(caps).filter(Boolean),
      leads: Array.from(leads).filter(Boolean),
      moqs: Array.from(moqs).filter(Boolean),
      verifs: Array.from(verifs).filter(Boolean),
    };
  }, [suppliers]);

  const toggle = (setter) => (val) =>
    setter((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );

  const removeChip = (category, val) => {
    const map = {
      cap: setActiveCaps,
      lead: setActiveLeadTimes,
      moq: setActiveMoqs,
      verif: setActiveVerifs,
    };
    map[category]((prev) => prev.filter((v) => v !== val));
  };

  const clearAll = () => {
    setSearchQuery("");
    setActiveCaps([]);
    setActiveLeadTimes([]);
    setActiveMoqs([]);
    setActiveVerifs([]);
    setSortBy("rating");
  };

  const totalActive =
    activeCaps.length + activeLeadTimes.length + activeMoqs.length + activeVerifs.length;

  const appliedChips = [
    ...activeCaps.map((v) => ({ cat: "cap", label: v })),
    ...activeLeadTimes.map((v) => ({ cat: "lead", label: v })),
    ...activeMoqs.map((v) => ({ cat: "moq", label: v })),
    ...activeVerifs.map((v) => ({ cat: "verif", label: v })),
  ];

  const filtered = useMemo(() => {
    let result = [...suppliers];

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((s) => {
        const name = (getKey(s, "supplier's_name") || getKey(s, "supplier\u2019s_name") || "").toLowerCase();
        const cap1 = (s["Capabilities1"] || "").toLowerCase();
        const cap2 = (s["Capabilities2"] || "").toLowerCase();
        const cap3 = (s["Capabilities3"] || "").toLowerCase();
        return name.includes(q) || cap1.includes(q) || cap2.includes(q) || cap3.includes(q);
      });
    }

    if (activeCaps.length > 0)
      result = result.filter((s) =>
        activeCaps.some((c) => s["Capabilities1"] === c || s["Capabilities2"] === c || s["Capabilities3"] === c)
      );

    if (activeLeadTimes.length > 0)
      result = result.filter((s) => activeLeadTimes.includes(s["Lead Time"]));

    if (activeMoqs.length > 0)
      result = result.filter((s) => activeMoqs.includes(s["MOQ"]));

    if (activeVerifs.length > 0)
      result = result.filter((s) =>
        activeVerifs.some(
          (v) =>
            s["Trust_and_verifications1"] === v ||
            s["Trust_and_verifications2"] === v ||
            s["Trust_and_verifications3"] === v
        )
      );

    result.sort((a, b) => {
      if (sortBy === "rating") return (Number(b.rating1) || Number(b.rating2) || 0) - (Number(a.rating1) || Number(a.rating2) || 0);
      if (sortBy === "projects") return (b.production_capcity ?? 0) - (a.production_capcity ?? 0);
      const nameA = (getKey(a, "supplier's_name") || getKey(a, "supplier\u2019s_name") || "").toLowerCase();
      const nameB = (getKey(b, "supplier's_name") || getKey(b, "supplier\u2019s_name") || "").toLowerCase();
      if (sortBy === "name_asc") return nameA.localeCompare(nameB);
      if (sortBy === "name_desc") return nameB.localeCompare(nameA);
      return 0;
    });

    return result;
  }, [suppliers, searchQuery, activeCaps, activeLeadTimes, activeMoqs, activeVerifs, sortBy]);

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
      <style>{`
        .sup-search-bar {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px; padding: 12px 16px;
          width: 100%; box-sizing: border-box; transition: border-color 0.2s;
        }
        .sup-search-bar:focus-within { border-color: rgba(255,255,255,0.35); }
        .sup-search-icon { width: 18px; height: 18px; color: rgba(255,255,255,0.4); flex-shrink: 0; }
        .sup-search-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: "Lexend Exa", sans-serif; font-size: 14px; color: #fff;
        }
        .sup-search-input::placeholder { color: rgba(255,255,255,0.3); }
        .sup-search-clear {
          background: none; border: none; cursor: pointer;
          display: flex; align-items: center; padding: 0; color: rgba(255,255,255,0.4);
        }
        .sup-search-clear:hover { color: #fff; }
        .sup-search-clear svg { width: 16px; height: 16px; }

        .sup-results-row {
          display: flex; align-items: center;
          justify-content: space-between; width: 100%;
        }
        .sup-controls { display: flex; align-items: center; gap: 8px; }

        .sup-filter-btn {
          display: flex; align-items: center; gap: 6px;
          font-family: "Lexend Exa", sans-serif; font-size: 12px;
          color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12); border-radius: 10px;
          padding: 7px 12px; cursor: pointer; white-space: nowrap;
          position: relative; transition: all 0.15s;
        }
        .sup-filter-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .sup-filter-btn.active { background: #fff; border-color: #fff; color: #000; }
        .sup-filter-btn svg { width: 15px; height: 15px; flex-shrink: 0; }
        .sup-filter-badge {
          position: absolute; top: -5px; right: -5px;
          background: #c8ff00; color: #000;
          font-family: "Lexend Exa", sans-serif; font-size: 9px; font-weight: 700;
          width: 16px; height: 16px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        .sup-sort-wrap { position: relative; }
        .sup-sort-btn {
          display: flex; align-items: center; gap: 6px;
          font-family: "Lexend Exa", sans-serif; font-size: 12px;
          color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12); border-radius: 10px;
          padding: 7px 12px; cursor: pointer; white-space: nowrap; transition: all 0.15s;
        }
        .sup-sort-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .sup-sort-btn.active { background: #fff; border-color: #fff; color: #000; }
        .sup-sort-btn svg { width: 15px; height: 15px; flex-shrink: 0; }
        .sup-sort-caret { transition: transform 0.2s; }
        .sup-sort-caret.open { transform: rotate(180deg); }
        .sup-sort-dropdown {
          position: absolute; top: calc(100% + 6px); right: 0;
          background: #1a1a1a; border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px; padding: 6px; min-width: 160px; z-index: 300;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        }
        .sup-sort-option {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; font-family: "Lexend Exa", sans-serif; font-size: 12px;
          color: rgba(255,255,255,0.6); background: none; border: none;
          border-radius: 8px; padding: 9px 12px; cursor: pointer; text-align: left;
          transition: all 0.15s;
        }
        .sup-sort-option:hover { background: rgba(255,255,255,0.07); color: #fff; }
        .sup-sort-option.active { color: #fff; }
        .sup-sort-option svg { width: 14px; height: 14px; }

        .sup-applied-row {
          display: flex; flex-wrap: wrap; gap: 8px; width: 100%; align-items: center;
        }
        .sup-applied-chip {
          display: flex; align-items: center; gap: 6px;
          font-family: "Lexend Exa", sans-serif; font-size: 12px;
          padding: 6px 10px 6px 14px; border-radius: 999px;
          background: rgba(200,255,0,0.1); border: 1px solid rgba(200,255,0,0.35);
          color: #c8ff00;
        }
        .sup-applied-chip-remove {
          background: none; border: none; cursor: pointer;
          display: flex; align-items: center; padding: 0;
          color: rgba(200,255,0,0.6); transition: color 0.15s;
        }
        .sup-applied-chip-remove:hover { color: #c8ff00; }
        .sup-applied-chip-remove svg { width: 13px; height: 13px; }
        .sup-clear-all-btn {
          font-family: "Lexend Exa", sans-serif; font-size: 12px;
          color: rgba(255,255,255,0.35); background: none; border: none;
          cursor: pointer; text-decoration: underline; text-underline-offset: 3px;
          padding: 0; white-space: nowrap;
        }
        .sup-clear-all-btn:hover { color: rgba(255,255,255,0.7); }

        .sup-filter-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.5);
          z-index: 400; opacity: 0; pointer-events: none; transition: opacity 0.25s;
        }
        .sup-filter-overlay.open { opacity: 1; pointer-events: all; }

        .sup-filter-panel {
          position: fixed; bottom: 0; left: 0; right: 0;
          background: #111; border-top: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px 20px 0 0; padding: 24px 20px 40px;
          z-index: 500; transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
          max-height: 80vh; overflow-y: auto;
        }
        .sup-filter-panel.open { transform: translateY(0); }
        .sup-filter-handle {
          width: 36px; height: 4px; background: rgba(255,255,255,0.2);
          border-radius: 2px; margin: 0 auto 24px;
        }
        .sup-filter-panel-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 24px;
        }
        .sup-filter-panel-title {
          font-family: "Lexend Exa", sans-serif;
          font-size: 16px; font-weight: 600; color: #fff; margin: 0;
        }
        .sup-filter-panel-clear {
          font-family: "Lexend Exa", sans-serif; font-size: 12px;
          color: rgba(255,255,255,0.4); background: none; border: none;
          cursor: pointer; text-decoration: underline; text-underline-offset: 3px;
        }
        .sup-filter-panel-clear:hover { color: rgba(255,255,255,0.8); }

        .sup-filter-category { margin-bottom: 28px; }
        .sup-filter-category-label {
          font-family: "Lexend Exa", sans-serif; font-size: 11px;
          color: rgba(255,255,255,0.35); letter-spacing: 0.08em;
          text-transform: uppercase; margin: 0 0 12px;
        }
        .sup-filter-divider {
          height: 1px; background: rgba(255,255,255,0.07); margin: 0 0 24px;
        }
        .sup-filter-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .sup-cap-chip {
          font-family: "Lexend Exa", sans-serif; font-size: 12px;
          padding: 8px 16px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.18);
          background: transparent; color: rgba(255,255,255,0.6);
          cursor: pointer; transition: all 0.18s;
        }
        .sup-cap-chip:hover { border-color: rgba(255,255,255,0.4); color: #fff; }
        .sup-cap-chip.active { background: #fff; border-color: #fff; color: #000; }

        .sup-empty {
          display: flex; flex-direction: column; align-items: center;
          gap: 14px; padding: 48px 24px; width: 100%; text-align: center;
        }
        .sup-empty svg { width: 48px; height: 48px; color: rgba(255,255,255,0.2); }
        .sup-empty p {
          font-family: "Lexend Exa", sans-serif; font-size: 14px;
          color: rgba(255,255,255,0.4); margin: 0;
        }
        .sup-empty button {
          font-family: "Lexend Exa", sans-serif; font-size: 12px;
          color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.14); border-radius: 999px;
          padding: 8px 20px; cursor: pointer;
        }
        .sup-empty button:hover { background: rgba(255,255,255,0.12); color: #fff; }
      `}</style>

      <div className="bodyy">
        <Topbar />

        <div className="Sec">
          <SectionTitle
            title="Suppliers"
            subtitle="Discover elite, verified suppliers in the region to build your next collection."
          />
        </div>

        {/* SEARCH */}
        <div className="Sec">
          <div className="sup-search-bar">
            <svg className="sup-search-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              className="sup-search-input"
              type="text"
              placeholder="Search suppliers, capabilities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="sup-search-clear" onClick={() => setSearchQuery("")}>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* RESULTS + FILTER + SORT */}
        <div className="Sec">
          <div className="sup-results-row">
            <div className="results">
              {filtered.length} Result{filtered.length !== 1 ? "s" : ""}
            </div>
            <div className="sup-controls">
              <button
                className={`sup-filter-btn${totalActive > 0 ? " active" : ""}`}
                onClick={() => setFilterOpen(true)}
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Filter
                {totalActive > 0 && (
                  <span className="sup-filter-badge">{totalActive}</span>
                )}
              </button>

              <div className="sup-sort-wrap" ref={sortRef}>
                <button
                  className={`sup-sort-btn${sortBy !== "rating" ? " active" : ""}`}
                  onClick={() => setSortOpen((o) => !o)}
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M3 8l4-4m0 0l4 4M7 4v16M21 16l-4 4m0 0l-4-4m4 4V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                  <svg className={`sup-sort-caret${sortOpen ? " open" : ""}`} viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {sortOpen && (
                  <div className="sup-sort-dropdown">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        className={`sup-sort-option${sortBy === opt.value ? " active" : ""}`}
                        onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                      >
                        {opt.label}
                        {sortBy === opt.value && (
                          <svg viewBox="0 0 24 24" fill="none">
                            <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* APPLIED CHIPS */}
        {appliedChips.length > 0 && (
          <div className="Sec">
            <div className="sup-applied-row">
              {appliedChips.map(({ cat, label }) => (
                <div key={`${cat}-${label}`} className="sup-applied-chip">
                  {label}
                  <button className="sup-applied-chip-remove" onClick={() => removeChip(cat, label)}>
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}
              <button className="sup-clear-all-btn" onClick={clearAll}>Clear all</button>
            </div>
          </div>
        )}

        <div className="Sec">
          <Button text="Request a Quote" variant="primary" size="large" onClick={() => navigate("/Form1")} />
          <Button text="View all requests" variant="secondary" size="large" />
        </div>

        {/* CARDS */}
        <div className="Sec">
          {filtered.length === 0 ? (
            <div className="sup-empty">
              <svg viewBox="0 0 64 64" fill="none">
                <circle cx="30" cy="30" r="18" stroke="currentColor" strokeWidth="2" />
                <path d="M43 43L56 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p>No suppliers match your search.</p>
              <button onClick={clearAll}>Reset filters</button>
            </div>
          ) : (
            filtered.map((supplier) => (
              <Suppliercard
                key={supplier.id}
                onClick={() =>
                  supplier.id === 2
                    ? navigate("/InternalSupplier")
                    : navigate(`/supplier/${supplier.id}`)
                }
                image={supplier.suppliers_pfp || null}
                name={getKey(supplier, "supplier's_name") || getKey(supplier, "supplier\u2019s_name") || ""}
                rating={Number(supplier.rating1) || Number(supplier.rating2) || 4.8}
                reviewCount={getKey(supplier, "supplier's_review_count") || getKey(supplier, "supplier\u2019s_review_count") || 0}
                role="Supplier"
                location="Cairo, Egypt"
                memberSince="2021"
                specialization={supplier["Capabilities1"] || ""}
                priceRange="5000-10000 EGP"
                projects={supplier.production_capcity ?? 0}
                tags={[supplier["Capabilities1"], supplier["Capabilities2"], supplier["Capabilities3"]].filter(Boolean)}
                minOrder={supplier["MOQ"] || ""}
                leadTime={supplier["Lead Time"] || ""}
                available={true}
                onMessage={(e) => { e.stopPropagation(); }}
                onRequestQuote={(e) => { e.stopPropagation(); }}
              />
            ))
          )}
        </div>

        <Pagination />
        <div className="spacedown" />
        <Navbarr />
      </div>

      <div
        className={`sup-filter-overlay${filterOpen ? " open" : ""}`}
        onClick={() => setFilterOpen(false)}
      />

      <div className={`sup-filter-panel${filterOpen ? " open" : ""}`}>
        <div className="sup-filter-handle" />

        <div className="sup-filter-panel-header">
          <p className="sup-filter-panel-title">Filter Suppliers</p>
          {totalActive > 0 && (
            <button className="sup-filter-panel-clear" onClick={clearAll}>
              Clear all
            </button>
          )}
        </div>

        {/* CAPABILITIES */}
        {options.caps.length > 0 && (
          <div className="sup-filter-category">
            <p className="sup-filter-category-label">Capabilities</p>
            <div className="sup-filter-chips">
              {options.caps.map((val) => (
                <button
                  key={val}
                  className={`sup-cap-chip${activeCaps.includes(val) ? " active" : ""}`}
                  onClick={() => toggle(setActiveCaps)(val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        )}

        {options.caps.length > 0 && <div className="sup-filter-divider" />}

        {/* LEAD TIME */}
        {options.leads.length > 0 && (
          <div className="sup-filter-category">
            <p className="sup-filter-category-label">Lead Time</p>
            <div className="sup-filter-chips">
              {options.leads.map((val) => (
                <button
                  key={val}
                  className={`sup-cap-chip${activeLeadTimes.includes(val) ? " active" : ""}`}
                  onClick={() => toggle(setActiveLeadTimes)(val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        )}

        {options.leads.length > 0 && <div className="sup-filter-divider" />}

        {/* MOQ */}
        {options.moqs.length > 0 && (
          <div className="sup-filter-category">
            <p className="sup-filter-category-label">Min. Order Quantity</p>
            <div className="sup-filter-chips">
              {options.moqs.map((val) => (
                <button
                  key={val}
                  className={`sup-cap-chip${activeMoqs.includes(val) ? " active" : ""}`}
                  onClick={() => toggle(setActiveMoqs)(val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        )}

        {options.moqs.length > 0 && <div className="sup-filter-divider" />}

        {/* TRUST & VERIFICATIONS */}
        {options.verifs.length > 0 && (
          <div className="sup-filter-category">
            <p className="sup-filter-category-label">Trust & Verifications</p>
            <div className="sup-filter-chips">
              {options.verifs.map((val) => (
                <button
                  key={val}
                  className={`sup-cap-chip${activeVerifs.includes(val) ? " active" : ""}`}
                  onClick={() => toggle(setActiveVerifs)(val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Suppliers;