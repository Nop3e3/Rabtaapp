import React, { useState, useRef } from "react";
import "./Quoteform.css";
import QfDropdown from "./Qfdropdown";

const CATEGORIES = [
  { id: "fabrics",     label: "Fabrics",     img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400" },
  { id: "garments",    label: "Garments",    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
  { id: "packaging",   label: "Packaging",   img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400" },
  { id: "accessories", label: "Accessories", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" },
  { id: "trims",       label: "Trims",       img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4f8d?w=400" },
];

const MATERIAL_TYPES = ["Cotton", "Polyester", "Linen", "Silk", "Wool", "Denim", "Other"];
const QTY_UNITS      = ["pieces", "meters", "kg", "sets"];

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

export default function QuoteStep1({ onNext, onCancel, data, onChange }) {
  const fileRef = useRef(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!data.category)            e.category    = "Please select a product category";
    if (!data.productName?.trim()) e.productName = "Product name is required";
    if (!data.description?.trim()) e.description = "Description is required";
    if (!data.materialType)        e.materialType = "Please select a material type";
    if (!data.quantity || isNaN(data.quantity) || Number(data.quantity) < 1)
                                   e.quantity    = "Please enter a valid quantity";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate()) onNext(); };

  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);
    const urls  = files.map((f) => URL.createObjectURL(f));
    onChange("images", [...(data.images || []), ...urls].slice(0, 5));
  };

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
          <span className="qf-progress-label">Product Information</span>
          <span className="qf-progress-step">step 1 of 3</span>
        </div>
        <div className="qf-progress-bar-track">
          <div className="qf-progress-bar-fill" style={{ width: "33%" }} />
        </div>
      </div>

      <div className="qf-body">
        <div className="qf-info-banner">
          <div className="qf-info-icon">i</div>
          <p>Send your requirements to multiple verified suppliers. Compare quotes and choose the best offer for your business.</p>
        </div>

        {/* Supplier */}
        <div className="qf-section">
          <h3 className="qf-section-title">
            Select Supplier{" "}
            <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}>(Optional)</span>
          </h3>
          <p className="qf-section-sub">Send to a specific supplier or broadcast to all matching suppliers.</p>
          <RadioCard label="Broadcast to All Suppliers" desc="Get quotes from multiple verified suppliers. (Recommended)" selected={data.supplier === "broadcast"} onClick={() => onChange("supplier", "broadcast")} />
          <RadioCard label="Specific Supplier"          desc="Send request to a supplier you've worked with"            selected={data.supplier === "specific"}   onClick={() => onChange("supplier", "specific")}   />
          <RadioCard label="Select from Favorites"      desc="Choose from your saved suppliers"                         selected={data.supplier === "favorites"}  onClick={() => onChange("supplier", "favorites")}  />
        </div>

        {/* Category */}
        <div className="qf-section">
          <h3 className="qf-section-title">Product Category<span className="qf-required">*</span></h3>
          <p className="qf-section-sub">Send to a specific supplier or broadcast to all matching suppliers</p>
          {errors.category && <span className="qf-error">{errors.category}</span>}
          <div className="qf-cat-grid">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className={`qf-cat-card ${data.category === cat.id ? "qf-cat-card--selected" : ""}`}
                onClick={() => onChange("category", cat.id)}
              >
                <div className="qf-cat-bg" style={{ backgroundImage: `url(${cat.img})` }} />
                <div className="qf-cat-overlay" />
                <span className="qf-cat-label">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Basic Info */}
        <div className="qf-section">
          <h3 className="qf-section-title">Basic Information<span className="qf-required">*</span></h3>
          <div className="qf-field">
            <label className="qf-label">Product Name<span className="qf-required">*</span></label>
            <input
              className={`qf-input ${errors.productName ? "qf-input--error" : ""}`}
              placeholder="e.g., Cotton T-Shirts"
              value={data.productName || ""}
              onChange={(e) => onChange("productName", e.target.value)}
            />
            {errors.productName && <span className="qf-error">{errors.productName}</span>}
          </div>
          <div className="qf-field">
            <label className="qf-label">Description<span className="qf-required">*</span></label>
            <textarea
              className={`qf-input qf-textarea ${errors.description ? "qf-input--error" : ""}`}
              placeholder="Describe your product requirements in detail..."
              maxLength={500}
              rows={4}
              value={data.description || ""}
              onChange={(e) => onChange("description", e.target.value)}
            />
            <span className="qf-char-count">{(data.description || "").length}/500 character</span>
            {errors.description && <span className="qf-error">{errors.description}</span>}
          </div>
        </div>

        {/* Images */}
        <div className="qf-section">
          <h3 className="qf-section-title">Reference Images<span className="qf-required">*</span></h3>
          <p className="qf-section-sub">Add photos or sketches to help suppliers understand your needs</p>
          <div className="qf-upload-box" onClick={() => fileRef.current?.click()}>
            <div className="qf-upload-icon">+</div>
            <span className="qf-upload-label">Add Image</span>
          </div>
          <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handleImageAdd} />
          <span className="qf-upload-hint">Max 5 images, up to 5MB each</span>
          {(data.images || []).length > 0 && (
            <div className="qf-uploaded-images">
              {data.images.map((src, i) => (
                <img key={i} src={src} alt="" className="qf-uploaded-img" />
              ))}
            </div>
          )}
        </div>

        {/* Material */}
        <div className="qf-section">
          <h3 className="qf-section-title">Material Details<span className="qf-required">*</span></h3>
          <div className="qf-field">
            <label className="qf-label">Material Type<span className="qf-required">*</span></label>
            <QfDropdown
              placeholder="e.g., Cotton"
              options={MATERIAL_TYPES}
              value={data.materialType || ""}
              onChange={(val) => onChange("materialType", val)}
              error={!!errors.materialType}
            />
            {errors.materialType && <span className="qf-error">{errors.materialType}</span>}
          </div>
          <div className="qf-field">
            <label className="qf-label">
              Weight and Thickness{" "}
              <span style={{ color: "rgba(255,255,255,0.3)" }}>(optional)</span>
            </label>
            <input
              className="qf-input"
              placeholder="e.g., 180 GSM, Medium weight"
              value={data.weight || ""}
              onChange={(e) => onChange("weight", e.target.value)}
            />
          </div>
        </div>

        {/* Quantity */}
        <div className="qf-section">
          <h3 className="qf-section-title">Quantity & Color<span className="qf-required">*</span></h3>
          <div className="qf-field">
            <label className="qf-label">Quantity<span className="qf-required">*</span></label>
            <div className="qf-qty-row">
              <input
                className={`qf-input qf-qty-input ${errors.quantity ? "qf-input--error" : ""}`}
                placeholder="Min. 50"
                type="number"
                min="1"
                value={data.quantity || ""}
                onChange={(e) => onChange("quantity", e.target.value)}
              />
              <div style={{ flex: 1 }}>
                <QfDropdown
                  placeholder="pieces"
                  options={QTY_UNITS}
                  value={data.quantityUnit || "pieces"}
                  onChange={(val) => onChange("quantityUnit", val)}
                />
              </div>
            </div>
            {errors.quantity && <span className="qf-error">{errors.quantity}</span>}
          </div>
          <CheckboxRow
            label="I'm flexible with quantity (±10%)"
            checked={data.flexibleQty || false}
            onClick={() => onChange("flexibleQty", !data.flexibleQty)}
          />
          <div className="qf-field">
            <label className="qf-label">Color Requirements</label>
            <input
              className="qf-input"
              placeholder="e.g., Navy Blue, White, Grey"
              value={data.colorRequirements || ""}
              onChange={(e) => onChange("colorRequirements", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="qf-bottom-nav">
        <button className="qf-btn-next" onClick={handleNext}>Continue →</button>
      </div>
    </div>
  );
}