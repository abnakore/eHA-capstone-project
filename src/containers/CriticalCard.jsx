import React, { useState } from "react";
import { RiEdit2Fill, RiCloseFill } from "react-icons/ri";
import { FaMinus, FaPlus } from "react-icons/fa6";
import "./criticalCard.css";

function CriticalCard({ icon, title, items }) {
  // is editting
  // const [isEdditing, setIsEdditing] = useState(false);

  return (
    <div className="card critical-card">
      <div className="card-header">
        <div className="title-section">
          <i className="icon">{icon}</i>
          <h3 className="card-title">{title}</h3>
        </div>

        {/* <div className="head-icons">
          {isEdditing && (
            <i className="icon edit-icon">
              <FaPlus />
            </i>
          )}
          <i
            className="icon edit-icon"
            onClick={() => setIsEdditing(!isEdditing)}
          >
            {isEdditing ? <RiCloseFill /> : <RiEdit2Fill />}
          </i>
        </div> */}
      </div>

      <div className="card-content">
        {items && items.length > 0 ? (
          items.map((item, i) => (
            <div key={i} className="item-wrapper">
              {item}
              {/* {isEdditing && (
                <i className="minus-icon" onClick={() => handleRemove()}>
                  <FaMinus />
                </i>
              )} */}
            </div>
          ))
        ) : (
          <p className="empty-message">No items available</p>
        )}
      </div>
    </div>
  );
}

export default CriticalCard;
