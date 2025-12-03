import React from "react";
import TimelineItem from "../components/TimelineItem";
import { formatDate, groupByMonth } from "../scripts/functions";
import { useFetch } from "../hooks/useFetch";
import { loadData } from "../data/data";
import "./timelineContainer.css";

function TimelineContainer() {
  // Fetch health records data
  const { data: records } = useFetch(() => loadData("healthRecords"));

  // Group records by month
  const recordsByMonth = groupByMonth(records || []);

  return (
    <div className="timeline-container">
      {/* <!-- Timeline --> */}
      <div className="timeline">
        {/* Render timeline months and items */}
        {recordsByMonth?.length > 0 ? (
          recordsByMonth.map((month, i) => (
            <>
              <div className="timeline-month">{month.month}</div>
              <div className="timeline-items">
                {month.records.map((record) => (
                  <TimelineItem
                    key={record.record_id}
                    date={formatDate(record.event_date)}
                    type={record.record_type}
                    title={
                      record.title ||
                      record.name ||
                      record.allergenName ||
                      record.imagingCenter
                    }
                    description={record.note}
                  />
                  // <div className="timeline-item">
                  //   <div className="timeline-date">
                  //     <div className="timeline-day">10</div>
                  //     <div className="timeline-month-year">Nov 2025</div>
                  //   </div>
                  //   <div className="timeline-content">
                  //     <div className="timeline-type type-lab">Lab Result</div>
                  //     <h3 className="timeline-title">Cholesterol Panel</h3>
                  //     <p className="timeline-description">
                  //       LDL: 95 mg/dL (Within normal range), HDL: 52 mg/dL,
                  //       Triglycerides: 120 mg/dL
                  //     </p>
                  //     <div className="timeline-meta">
                  //       <span>
                  //         <i className="fas fa-hospital"></i> City Medical Lab
                  //       </span>
                  //       <a href="#" className="timeline-attachment">
                  //         <i className="fas fa-paperclip"></i> Lab_Report_Nov10.pdf
                  //       </a>
                  //     </div>
                  //     <div className="timeline-actions">
                  //       <button className="action-btn">View Details</button>
                  //       <button className="action-btn">Download</button>
                  //     </div>
                  //   </div>
                  // </div>
                ))}
              </div>
            </>
          ))
        ) : (
          <p className="empty-message">No items available</p>
        )}
      </div>
    </div>
  );
}

export default TimelineContainer;
