import React, { useState } from "react";
import "./Quoteform.css";
import QfDropdown from "./Qfdropdown";

const SIZE_OPTIONS   = ["Small", "Medium", "Large", "XL", "XXL"];
const SIZE_QTY_OPTS  = ["100 pieces", "200 pieces", "500 pieces", "1000 pieces"];
const CERTIFICATIONS = ["OEKO-TEX Certified", "GOTS Organic", "Fair Trade", "ISO Certified"];
const CUSTOMIZATIONS = ["Custom Labels", "Custom Packaging", "Custom Tags", "Embroidery/Printing"];
const SIZE_RANGES    = ["XS - XL", "S - XXL", "One Size", "Custom"];

function CheckboxRow({ label, desc, checked, onClick }) {
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
        {desc && <span className="qf-checkbox-desc">{desc}</span>}
      </div>
    </div>
  );
}

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

function QualityCard({ label, desc, selected, onClick }) {
  return (
    <div className={`qf-quality-card ${selected ? "qf-quality-card--selected" : ""}`} onClick={onClick}>
      <p className="qf-quality-label">{label}</p>
      <p className="qf-quality-desc">{desc}</p>
    </div>
  );
}

export default function QuoteStep2({ onNext, onPrev, onCancel, data, onChange }) {
  const [errors, setErrors]         = useState({});
  const [customSizes, setCustomSizes] = useState([]);
  const [customNeeds, setCustomNeeds] = useState([]);

  const toggleArr = (field, value) => {
    const arr = data[field] || [];
    onChange(field, arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const toggleSize = (size) => {
    const arr = data.sizes || [];
    onChange("sizes", arr.includes(size) ? arr.filter((s) => s !== size) : [...arr, size]);
  };

  const validate = () => {
    const e = {};
    if (!data.sizes?.length)           e.sizes           = "Please select at least one size";
    if (!data.quality)                 e.quality         = "Please select a quality standard";
    if (!data.additionalSpecs?.trim()) e.additionalSpecs = "Please provide additional specifications";
    if (!data.customizations?.length)  e.customizations  = "Please select at least one customization need";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate()) onNext(); };

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
          <span className="qf-progress-label">Specifications</span>
          <span className="qf-progress-step">step 2 of 3</span>
        </div>
        <div className="qf-progress-bar-track">
          <div className="qf-progress-bar-fill" style={{ width: "66%" }} />
        </div>
      </div>

      <div className="qf-body">
        <div className="qf-info-banner">
          <div className="qf-info-icon">i</div>
          <p>More details help suppliers provide accurate quotes. Skip any section if not applicable.</p>
        </div>

        {/* Size */}
        <div className="qf-section">
          <h3 className="qf-section-title">Size / Dimensions<span className="qf-required">*</span></h3>
          {errors.sizes && <span className="qf-error">{errors.sizes}</span>}

          <QfDropdown
            placeholder="Select a size range"
            options={SIZE_RANGES}
            value={data.sizeRange || ""}
            onChange={(val) => onChange("sizeRange", val)}
          />

          {SIZE_OPTIONS.map((size) => (
            <div key={size} className="qf-size-row">
              <div
                className={`qf-checkbox-box ${(data.sizes || []).includes(size) ? "qf-checkbox-row--checked" : ""}`}
                style={{ cursor: "pointer", flexShrink: 0 }}
                onClick={() => toggleSize(size)}
              >
                {(data.sizes || []).includes(size) && (
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </div>
              <span className="qf-size-label">{size}</span>
              <div style={{ width: "130px" }}>
                <QfDropdown
                  placeholder="100 pieces"
                  options={SIZE_QTY_OPTS}
                  value={(data.sizeQty || {})[size] || "100 pieces"}
                  onChange={(val) => onChange("sizeQty", { ...(data.sizeQty || {}), [size]: val })}
                />
              </div>
            </div>
          ))}

          {customSizes.map((cs, i) => (
            <input key={i} className="qf-input" placeholder="Custom size" value={cs}
              onChange={(e) => setCustomSizes((prev) => prev.map((v, j) => j === i ? e.target.value : v))} />
          ))}
          <button className="qf-add-custom" onClick={() => setCustomSizes((p) => [...p, ""])}>
            + Add a custom Size
          </button>
        </div>

        {/* Quality */}
        <div className="qf-section">
          <h3 className="qf-section-title">Select your Quality Standards<span className="qf-required">*</span></h3>
          {errors.quality && <span className="qf-error">{errors.quality}</span>}
          <QualityCard label="Standard Quality" desc="Good for everyday use"            selected={data.quality === "standard"} onClick={() => onChange("quality", "standard")} />
          <QualityCard label="Premium Quality"  desc="High-end materials and finishing" selected={data.quality === "premium"}  onClick={() => onChange("quality", "premium")}  />
          <QualityCard label="Luxury Quality"   desc="Top-tier materials, certified"    selected={data.quality === "luxury"}   onClick={() => onChange("quality", "luxury")}   />
        </div>

        {/* Certifications */}
        <div className="qf-section">
          <h3 className="qf-section-title">
            Select Required Certifications{" "}
            <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}>(Optional)</span>
          </h3>
          {CERTIFICATIONS.map((cert) => (
            <RadioCard
              key={cert}
              label={cert}
              selected={(data.certifications || []).includes(cert)}
              onClick={() => toggleArr("certifications", cert)}
            />
          ))}
        </div>

        {/* Additional Specs */}
        <div className="qf-section">
          <h3 className="qf-section-title">Additional Specifications<span className="qf-required">*</span></h3>
          <p className="qf-section-sub">Any other technical requirements</p>
          <div className="qf-field">
            <textarea
              className={`qf-input qf-textarea ${errors.additionalSpecs ? "qf-input--error" : ""}`}
              placeholder="e.g., specific GSM, thread count, finishing details..."
              maxLength={500}
              rows={4}
              value={data.additionalSpecs || ""}
              onChange={(e) => onChange("additionalSpecs", e.target.value)}
            />
            <span className="qf-char-count">{(data.additionalSpecs || "").length}/500 character</span>
            {errors.additionalSpecs && <span className="qf-error">{errors.additionalSpecs}</span>}
          </div>
          <CheckboxRow
            label="Request Sample First"
            desc="Ask suppliers to send samples before bulk order"
            checked={data.requestSample || false}
            onClick={() => onChange("requestSample", !data.requestSample)}
          />
        </div>

        {/* Customization */}
        <div className="qf-section">
          <h3 className="qf-section-title">Customization Needs<span className="qf-required">*</span></h3>
          {errors.customizations && <span className="qf-error">{errors.customizations}</span>}
          {CUSTOMIZATIONS.map((c) => (
            <CheckboxRow
              key={c}
              label={c}
              checked={(data.customizations || []).includes(c)}
              onClick={() => toggleArr("customizations", c)}
            />
          ))}
          {customNeeds.map((cn, i) => (
            <input key={i} className="qf-input" placeholder="Custom need" value={cn}
              onChange={(e) => setCustomNeeds((prev) => prev.map((v, j) => j === i ? e.target.value : v))} />
          ))}
          <button className="qf-add-custom" onClick={() => setCustomNeeds((p) => [...p, ""])}>
            + Add a custom need
          </button>
        </div>
      </div>

      <div className="qf-bottom-nav">
        <button className="qf-btn-prev" onClick={onPrev}>← Previous</button>
        <button className="qf-btn-next" onClick={handleNext}>Continue →</button>
      </div>
    </div>
  );
}