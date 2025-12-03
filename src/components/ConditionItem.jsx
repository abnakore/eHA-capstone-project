import React from "react";
import { IoMdCall } from "react-icons/io";
import "./conditionItem.css";

function ConditionItem({ name, status }) {
  return (
    <div className="contact-item">
      <div className="contact-details">
        <p className="contact-name">{status}</p>
        <p className="contact-status">{name}</p>
      </div>
      <i className="contact-icon">
        <IoMdCall />
      </i>
    </div>
  );
}

export default ConditionItem;
