import React from "react";
import "./criticalCard.css";

function CriticalCard({ icon, title, items }) {
  return (
    <div className="card critical-card">
      <div className="card-header">
        <i className="icon">{icon}</i>
        <h3 className="card-title">{title}</h3>
      </div>

      <div className="card-content">{items && items.map((item) => item)}</div>
    </div>
  );
}

export default CriticalCard;
