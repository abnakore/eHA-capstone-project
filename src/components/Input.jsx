import React, { useState } from "react";
import "./input.css";
import { LuEye, LuEyeClosed } from "react-icons/lu";

function Input({
  title,
  type,
  name,
  placeholder,
  required,
  value,
  handleChange,
  error,
  options,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`form-group ${error ? "has-error" : ""}`}>
      <label htmlFor={name}>{title}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={handleChange}
          rows={5}
        />
      ) : type === "dropdown" ? (
        <select
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={handleChange}
        />
      )}

      {type === "password" ? (
        <i
          className="right-icon"
          onClick={(e) => {
            // e.stopPropagation();
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <LuEyeClosed /> : <LuEye />}
        </i>
      ) : null}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

export default Input;
