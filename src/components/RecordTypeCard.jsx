import React from "react";
import "./recordTypeCard.css";

function RecordTypeCard({ icon, label, active, handleClick }) {
  return (
    <div
      className={`record-type-option ${active ? "selected" : ""}`}
      onClick={handleClick}
    >
      <div className="record-type-icon">
        <i className="icon">{icon}</i>
      </div>
      <div className="record-type-label">{label}</div>
    </div>
  );
}

export default RecordTypeCard;
