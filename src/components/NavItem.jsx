import React from "react";
import { Link } from "react-router-dom";
import "./navitem.css";

function NavItem({ icon, text, active, to }) {
  return (
    <Link to={to} className={`nav-item ${active ? "active" : ""}`}>
      <i className={`nav-icon`}>{icon}</i>
      <span className="nav-text">{text}</span>
    </Link>
  );
}

export default NavItem;
