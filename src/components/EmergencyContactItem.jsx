import React from "react";
import "./emergencyContactItem.css";
import { IoMdCall } from "react-icons/io";

function EmergencyContactItem({ name, number }) {
  return (
    <div className="contact-item">
      <div className="contact-details">
        <p className="contact-name">{number}</p>
        <p className="contact-status">{name}</p>
      </div>
      <i className="contact-icon">
        <IoMdCall />
      </i>
    </div>
  );
}

export default EmergencyContactItem;
