import React, { useState } from "react";
import "./Quoteform.css";
import QfDropdown from "./Qfdropdown";

const GOVERNORATES = ["Cairo", "Giza", "Alexandria", "Luxor", "Aswan", "Port Said", "Suez", "Mansoura", "Tanta"];
const CITIES = {
  Cairo:       ["Nasr City", "Maadi", "Heliopolis", "New Cairo", "6th October", "Zamalek"],
  Giza:        ["Dokki", "Mohandessin", "Haram", "Sheikh Zayed"],
  Alexandria:  ["Sidi Gaber", "Smouha", "Miami", "Gleem", "Montazah"],
  Luxor:       ["Luxor City", "New Luxor"],
  Aswan:       ["Aswan City", "Edfu"],
  "Port Said": ["Port Said City", "El Manakh"],
  Suez:        ["Suez City", "Ain Sokhna"],
  Mansoura:    ["Mansoura City", "Mit Ghamr"],
  Tanta:       ["Tanta City", "Kafr El Sheikh"],
};

const PAYMENT_OPTIONS = [
  { value: "50-50",     label: "50% Advance, 50% on Delivery" },
  { value: "30-70",     label: "30% Advance, 70% on Delivery" },
  { value: "100",       label: "100% on Delivery" },
  { value: "install",   label: "Installments (3 payments)" },
  { value: "negotiate", label: "Negotiable" },
];

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

function RadioCard({ label, desc, selected, onClick }) {
  return (
    <div className={`qf-radio-card ${selected ? "qf-radio-card--selected" : ""}`} onClick={onClick}>
      <div className="qf-radio-dot">
        {selected && <div className="qf-radio-dot-inner" />}
      </div>
      <div>
        <p className="qf-radio-label">{label}</p>
        {desc && <p className="qf-radio-desc">{desc}</p>}
      </div>
    </div>
  );
}

function CheckboxRow({ label, checked, onClick }) {
  return (
    <div className={`qf-checkbox-row ${checked ? "qf-checkbox-row--checked" : ""}`} onClick={onClick}>
      <div className="qf-checkbox-box">
        {checked && (
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        )}
      </div>
      <div className="qf-checkbox-text">
        <span className="qf-checkbox-label">{label}</span>
      </div>
    </div>
  );
}

export default function QuoteStep3({ onSubmit, onPrev, onCancel, data, onChange }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!data.governorate)  e.governorate  = "Please select a governorate";
    if (!data.city)         e.city         = "Please select a city";
    if (!data.timeline)     e.timeline     = "Please select a delivery timeline";
    if (!data.budgetMin || isNaN(data.budgetMin)) e.budget = "Please enter a minimum budget";
    if (!data.budgetMax || isNaN(data.budgetMax)) e.budget = "Please enter a valid budget range";
    if (!data.paymentTerms) e.paymentTerms = "Please select payment terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => { if (validate()) onSubmit(); };

  const cities = (CITIES[data.governorate] || []);

  return (
    <div className="qf-root">
      <div className="qf-topbar">
        <h2 className="qf-topbar-title">New Quote Request</h2>
        <div className="qf-topbar-btns">
          <button className="qf-btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="qf-btn-draft">Save Draft</button>
        </div>
      </div>

      <div className="qf-progress-wrap">
        <div className="qf-progress-info">
          <span className="qf-progress-label">Delivery & Budget</span>
          <span className="qf-progress-step">step 3 of 3</span>
        </div>
        <div className="qf-progress-bar-track">
          <div className="qf-progress-bar-fill" style={{ width: "100%" }} />
        </div>
      </div>

      <div className="qf-body">
        {/* Delivery Location */}
        <div className="qf-section">
          <h3 className="qf-section-title">Delivery Location</h3>

          <div className="qf-field">
            <label className="qf-label">Governorate<span className="qf-required">*</span></label>
            <QfDropdown
              placeholder="Select governorate"
              options={GOVERNORATES}
              value={data.governorate || ""}
              onChange={(val) => { onChange("governorate", val); onChange("city", ""); }}
              error={!!errors.governorate}
            />
            {errors.governorate && <span className="qf-error">{errors.governorate}</span>}
          </div>

          <div className="qf-field">
            <label className="qf-label">City<span className="qf-required">*</span></label>
            <QfDropdown
              placeholder="Select city"
              options={cities}
              value={data.city || ""}
              onChange={(val) => onChange("city", val)}
              error={!!errors.city}
              disabled={!data.governorate}
            />
            {errors.city && <span className="qf-error">{errors.city}</span>}
          </div>

          <div className="qf-field">
            <label className="qf-label">
              District/Area{" "}
              <span style={{ color: "rgba(255,255,255,0.3)" }}>(Optional)</span>
            </label>
            <input
              className="qf-input"
              placeholder="e.g., Zamalek District"
              value={data.district || ""}
              onChange={(e) => onChange("district", e.target.value)}
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="qf-section">
          <h3 className="qf-section-title">Delivery Timeline<span className="qf-required">*</span></h3>
          {errors.timeline && <span className="qf-error">{errors.timeline}</span>}
          <RadioCard label="Standard (30-45 days)" desc="Reliable delivery at standard cost"     selected={data.timeline === "standard"} onClick={() => onChange("timeline", "standard")} />
          <RadioCard label="Express (15-25 days)"  desc="Faster delivery, may cost more"         selected={data.timeline === "express"}  onClick={() => onChange("timeline", "express")}  />
          <RadioCard label="Flexible"              desc="I can work with supplier's timeline"     selected={data.timeline === "flexible"} onClick={() => onChange("timeline", "flexible")} />

          <div className="qf-field">
            <label className="qf-label">
              Required By Date{" "}
              <span style={{ color: "rgba(255,255,255,0.3)" }}>(Optional)</span>
            </label>
            <div className="qf-date-wrap">
              <span className="qf-date-icon"><CalendarIcon /></span>
              <input
                className="qf-input qf-date-input"
                type="date"
                value={data.requiredDate || ""}
                onChange={(e) => onChange("requiredDate", e.target.value)}
                style={{ colorScheme: "dark" }}
              />
            </div>
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>
              Helps suppliers prioritize your order
            </span>
          </div>
        </div>

        {/* Budget */}
        <div className="qf-section">
          <h3 className="qf-section-title">Budget Range<span className="qf-required">*</span></h3>
          <p className="qf-section-sub">Optional, but helps suppliers tailor their quotes</p>
          {errors.budget && <span className="qf-error">{errors.budget}</span>}
          <div className="qf-budget-row">
            <div className="qf-field">
              <input
                className={`qf-input ${errors.budget ? "qf-input--error" : ""}`}
                placeholder="Min e.g. 10000 EGP"
                type="number"
                value={data.budgetMin || ""}
                onChange={(e) => onChange("budgetMin", e.target.value)}
              />
            </div>
            <div className="qf-field">
              <input
                className={`qf-input ${errors.budget ? "qf-input--error" : ""}`}
                placeholder="Max e.g. 30000 EGP"
                type="number"
                value={data.budgetMax || ""}
                onChange={(e) => onChange("budgetMax", e.target.value)}
              />
            </div>
          </div>
          <CheckboxRow
            label="Hide budget from Suppliers/Manufacturers"
            checked={data.hideBudget || false}
            onClick={() => onChange("hideBudget", !data.hideBudget)}
          />
          <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>
            Helps suppliers prioritize your order
          </span>
        </div>

        {/* Payment Terms */}
        <div className="qf-section">
          <h3 className="qf-section-title">Preferred Payment Terms<span className="qf-required">*</span></h3>
          {errors.paymentTerms && <span className="qf-error">{errors.paymentTerms}</span>}
          {PAYMENT_OPTIONS.map((opt) => (
            <RadioCard
              key={opt.value}
              label={opt.label}
              selected={data.paymentTerms === opt.value}
              onClick={() => onChange("paymentTerms", opt.value)}
            />
          ))}
        </div>

        {/* Notes */}
        <div className="qf-section">
          <h3 className="qf-section-title">Additional Notes</h3>
          <textarea
            className="qf-input qf-textarea"
            placeholder="Any other requirements or special instructions..."
            rows={4}
            value={data.notes || ""}
            onChange={(e) => onChange("notes", e.target.value)}
          />
        </div>
      </div>

      <div className="qf-bottom-nav">
        <button className="qf-btn-prev" onClick={onPrev}>← Previous</button>
        <button className="qf-btn-next" onClick={handleSubmit}>Request →</button>
      </div>
    </div>
  );
}