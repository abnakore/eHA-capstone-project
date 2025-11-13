import React from "react";
import "./medicationItem.css";
import { FaPills } from "react-icons/fa6";
import { TbMedicineSyrup } from "react-icons/tb";
import { BiSolidInjection } from "react-icons/bi";

function MedicationItem({ name, dosage, status, kind }) {
  return (
    <div className="med-item">
      <i className="med-icon">
        {kind === "injection" ? (
          <BiSolidInjection />
        ) : kind === "syrup" ? (
          <TbMedicineSyrup />
        ) : (
          <FaPills />
        )}
      </i>
      <div className="med-details">
        <p className="med-name">{name}</p>
        <p className="med-status">{dosage}</p>
      </div>
    </div>
  );
}

export default MedicationItem;
