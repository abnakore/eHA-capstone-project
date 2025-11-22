import React from "react";
import "./button.css";

function Button({
  type,
  theme = "btn-primary",
  title,
  handleClick,
  disabled,
  LeftIcon,
  RightIcon,
}) {
  return (
    <button
      type={type}
      className={`btn ${theme}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {LeftIcon && LeftIcon}
      {title}
      {RightIcon && RightIcon}
    </button>
  );
}

export default Button;
