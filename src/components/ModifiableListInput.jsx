import React, { useId, useState } from "react";
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

  // State for current input and error message
  const [currentItem, setCurrentItem] = useState("");
  const [error, setError] = useState("");

  // Validation function
  const validateItem = (item) => {
    // Check if item is empty
    if (!item.trim()) {
      return "Item cannot be empty";
    }

    // Check max items
    if (maxItems && items.length >= maxItems) {
      return `Maximum ${maxItems} items allowed`;
    }

    // Check for duplicate items
    if (items.includes(item) && !allowDuplicate) {
      return `Duplicate inputs`;
    }

    if (validation) {
      // Call custom validation
      return validation(item);
    }
    return "";
  };

  // Handle adding a new item
  const handleAddItem = (e) => {
    e.preventDefault();

    // Validate the current item before adding
    const validationError = validateItem(currentItem);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Add the current item to the list
    const newItems = [...items, currentItem.trim()];
    handleItemsChange(newItems);
    setCurrentItem("");
    setError("");
  };

  // Handle removing an item
  const handleRemoveItem = (index) => {
    // Remove the item at the specified index
    const newItems = items.filter((_, i) => i !== index);
    handleItemsChange(newItems);
  };

  // Handle key down event for Enter key
  const handleKeyDown = (e) => {
    // Check if the pressed key is Enter and add the item
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem(e);
      return;
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setCurrentItem(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <div className="modifiable-list-input">
      {label && <label className="form-label">{label}</label>}

      {/* Input field and add button */}
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

      {/* List of added items */}
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
