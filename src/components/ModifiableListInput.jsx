import React, { useId, useState } from "react";
import Button from "./Button";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import "./modifiableListInput.css";

const ModifiableListInput = ({
  label,
  items = [],
  handleItemsChange,
  placeholder = "Add an item...",
  maxItems,
  validation,
  disabled = false,
  allowDuplicate,
}) => {
  // Set Id
  const id = useId();

  const [currentItem, setCurrentItem] = useState("");
  const [error, setError] = useState("");

  const validateItem = (item) => {
    if (!item.trim()) {
      return "Item cannot be empty";
    }
    if (maxItems && items.length >= maxItems) {
      return `Maximum ${maxItems} items allowed`;
    }

    if (items.includes(item) && !allowDuplicate) {
      return `Duplicate inputs`;
    }

    if (validation) {
      return validation(item);
    }
    return "";
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    const validationError = validateItem(currentItem);
    if (validationError) {
      setError(validationError);
      return;
    }

    const newItems = [...items, currentItem.trim()];
    handleItemsChange(newItems);
    setCurrentItem("");
    setError("");
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    handleItemsChange(newItems);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem(e);
      return;
    }
  };

  const handleInputChange = (e) => {
    setCurrentItem(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <div className="modifiable-list-input">
      {label && <label className="form-label">{label}</label>}

      <div className="list-input-container">
        <div className="input-with-button">
          <input
            type="text"
            id={id}
            className={`form-input ${error ? "error" : ""}`}
            placeholder={placeholder}
            value={currentItem}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
          />
          <button
            className="add-button"
            onClick={handleAddItem}
            disabled={disabled}
          >
            <FaPlus />
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {maxItems && (
          <div className="items-counter">
            {items.length} / {maxItems} items
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="items-list">
          {items.map((item, index) => (
            <div key={index} className="list-item">
              <span className="item-text">{item}</span>
              <button
                type="button"
                className="btn-remove"
                onClick={() => handleRemoveItem(index)}
                disabled={disabled}
              >
                <IoClose />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModifiableListInput;
