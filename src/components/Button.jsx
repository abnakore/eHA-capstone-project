import React from "react";
import "./button.css";

function Button({ type = "submit", theme = "btn-primary", title = "Login", handleClick }) {
  return (
    <button type={type} className={`btn ${theme}`} onClick={handleClick}>
      {title}
    </button>
  );
}

export default Button;
