import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TbSmartHome } from "react-icons/tb";
import { LuHistory } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { RiMenuFold3Line, RiSettingsFill } from "react-icons/ri";
import { RiMenuUnfold3Line } from "react-icons/ri";

import { useUser } from "../contexts/userContext";
import { logOut } from "../data/data";
import NavItem from "../components/NavItem";

import "./aside.css";

function Aside() {
  // use navigate for redirection
  const navigate = useNavigate();
  // Get use data from context
  const { user } = useUser();

  const [open, setOpen] = useState(false);

  // Navigation links data
  const navLinks = [
    { icon: <TbSmartHome />, text: "Dashboard", to: "/dashboard" },
    { icon: <LuHistory />, text: "Timeline", to: "/timeline" },
    { icon: <FaPlus />, text: "Add Record", to: "/add-record" },
  ];

  return (
    <div className={`sidebar ${open ? "opened" : "closed"}`}>
      <div className="logo">
        <div className="logo-icon">HL</div>
        <div className="logo-text">HealthLog</div>
        <i className="open-sidebar" onClick={() => setOpen(!open)}>
          {open ? <RiMenuFold3Line /> : <RiMenuUnfold3Line />}
        </i>
      </div>

      <div className="nav-links">
        {navLinks.map((link, index) => (
          <NavItem
            key={index}
            icon={link.icon}
            text={link.text}
            to={link.to}
            active={window.location.pathname === link.to}
          />
        ))}
      </div>

      <div className="user-profile">
        <div className="user-avatar">
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </div>
        <div className="user-info">
          <h4>
            {user?.firstName} {user?.lastName}
          </h4>
        </div>
        <i
          className="logout-icon"
          title="Log out"
          onClick={() => {
            logOut();
            navigate("/login", { replace: true });
          }}
        >
          <IoLogOutOutline />
        </i>
      </div>
    </div>
  );
}

export default Aside;
