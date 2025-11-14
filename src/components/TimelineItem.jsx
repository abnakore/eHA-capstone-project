import React from 'react'
import './timelineItem.css'

function TimelineItem({ date, type, title, description }) {
  return (
    <div className="timeline-item">
      <div className="timeline-date">{date}</div>
      <div className="timeline-content">
        <div className="timeline-title">
          <span className={`timeline-type type-${type}`}>{type}</span>
          {title}
        </div>
        <div className="timeline-description">
          {description}
        </div>
      </div>
    </div>
  );
}

export default TimelineItem