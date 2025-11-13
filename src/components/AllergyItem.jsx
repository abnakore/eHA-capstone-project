import React from "react";
import "./allergyItem.css";

function AllergyItem({ name, level }) {
  return (
    <div className={`allergy-item severity-${level.toLowerCase()}`}>
      <div className="allergy-details">
        <p className="allergy-name">{name}</p>
      </div>
      {/* level */}
      <div className={`allergy-level severity-${level.toLowerCase()}`}>
        {level}
      </div>
    </div>
  );
}

export default AllergyItem;
