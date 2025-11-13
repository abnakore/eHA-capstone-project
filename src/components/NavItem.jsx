import React from "react";
import "./navitem.css";
import { Link } from "react-router-dom";

function NavItem({ icon, text, active, to }) {
  return (
    <Link to={to} className={`nav-item ${active ? "active" : ""}`}>
      <i className={`nav-icon`}>{icon}</i>
      <span className="nav-text">{text}</span>
    </Link>
  );
}

export default NavItem;
