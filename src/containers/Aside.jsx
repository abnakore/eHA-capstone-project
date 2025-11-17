import React from "react";
import "./aside.css";
import NavItem from "../components/NavItem";
import { TbSmartHome } from "react-icons/tb";
import { LuHistory } from "react-icons/lu";
import { FaPills, FaPlus } from "react-icons/fa6";
import { FaFileMedical } from "react-icons/fa6";
import { FaUserMd } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { RiSettingsFill } from "react-icons/ri";
import { useUser } from "../contexts/userContext";

function Aside() {
  // Get use data from context
  const { user } = useUser();
  console.log(user);

  // Navigation links data
  const navLinks = [
    { icon: <TbSmartHome />, text: "Dashboard", to: "/dashboard" },
    { icon: <LuHistory />, text: "Timeline", to: "/timeline" },
    { icon: <FaPlus />, text: "Add Record", to: "/add-record" },
    // { icon: <FaPills />, text: "Medications", to: "/medications" },
    { icon: <FaFileMedical />, text: "Documents", to: "/documents" },
    // { icon: <FaUserMd />, text: "Appointments", to: "/appointments" },
    // { icon: <FaChartLine />, text: "Health Metrics", to: "/health-metrics" },
    // { icon: <RiSettingsFill />, text: "Settings", to: "/settings" },
  ];
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-icon">MH™</div>
        <div className="logo-text">My Health Hub</div>
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
          {/* <p>{user?.role}</p> */}
        </div>
      </div>
    </div>
  );
}

export default Aside;
