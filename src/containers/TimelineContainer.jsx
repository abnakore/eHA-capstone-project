import React from "react";
import "./timelineContainer.css";
import TimelineItem from "../components/TimelineItem";
import { formatDate, groupByMonth } from "../scripts/functions";
import { useFetch } from "../hooks/useFetch";
import { loadData } from "../data/data";

function TimelineContainer() {
  const { data: records } = useFetch(() => loadData("healthRecords"));

  const recordsByMonth = groupByMonth(records || []);

  return (
    <div class="timeline-container">
      {/* <!-- Timeline --> */}
      <div class="timeline">
        {recordsByMonth?.length > 0 ? (
          recordsByMonth.map((month, i) => (
            <>
              <div class="timeline-month">{month.month}</div>
              <div class="timeline-items">
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
                  // <div class="timeline-item">
                  //   <div class="timeline-date">
                  //     <div class="timeline-day">10</div>
                  //     <div class="timeline-month-year">Nov 2025</div>
                  //   </div>
                  //   <div class="timeline-content">
                  //     <div class="timeline-type type-lab">Lab Result</div>
                  //     <h3 class="timeline-title">Cholesterol Panel</h3>
                  //     <p class="timeline-description">
                  //       LDL: 95 mg/dL (Within normal range), HDL: 52 mg/dL,
                  //       Triglycerides: 120 mg/dL
                  //     </p>
                  //     <div class="timeline-meta">
                  //       <span>
                  //         <i class="fas fa-hospital"></i> City Medical Lab
                  //       </span>
                  //       <a href="#" class="timeline-attachment">
                  //         <i class="fas fa-paperclip"></i> Lab_Report_Nov10.pdf
                  //       </a>
                  //     </div>
                  //     <div class="timeline-actions">
                  //       <button class="action-btn">View Details</button>
                  //       <button class="action-btn">Download</button>
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
