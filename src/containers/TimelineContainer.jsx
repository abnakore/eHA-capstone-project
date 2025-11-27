import React from "react";
import "./timelineContainer.css";
import TimelineItem from "../components/TimelineItem";
import { formatDate } from "../data/data";

function TimelineContainer() {
  const records = [
    {
      record_id: "rec-1763855991124",
      event_date: "2025-07-22",
      record_type: "Visit",
      notes: "...",
      documents: [
        {
          file_name: "Miko SIWESS REPORT.pdf",
          storage_path:
            "/mock/user-001/doc-1763855991124-Miko SIWESS REPORT.pdf",
        },
      ],
      title: "Monthly Physical Checkup",
      doctor: "Dr. Asma'u Nakore",
      location: "Aminu Kano Teaching Hospital Kano",
    },
    {
      record_id: "rec-1763856156389",
      event_date: "2025-09-23",
      record_type: "Medication",
      notes: "Tomorrow in the future",
      name: "Paracetamol",
      dosage: "500mg",
      frequency: "Two daily",
      prescribingDoctor: "Dr. Aisha Nakore",
      prescribedFor: "Head ache",
      duration: "3 days",
    },
    {
      record_id: "rec-1763856224164",
      event_date: "2025-11-23",
      record_type: "Lab",
      notes: "Output Normal",
      documents: [
        {
          file_name: "Miko SIWESS REPORT.pdf",
          storage_path:
            "/mock/user-001/doc-1763856224164-Miko SIWESS REPORT.pdf",
        },
        {
          file_name: "web-application-architecture.png",
          storage_path:
            "/mock/user-001/doc-1763856224164-web-application-architecture.png",
        },
      ],
      title: "BP Test",
      labName: "Klinchex Clinic",
    },
    {
      record_id: "rec-1763856267607",
      event_date: "2025-12-23",
      record_type: "Imaging",
      notes: "No fracture",
      documents: [
        {
          file_name: "IMG-20251120-WA0031.jpg",
          storage_path:
            "/mock/user-001/doc-1763856267607-IMG-20251120-WA0031.jpg",
        },
      ],
      type: "X-ray",
      bodyPart: "Leg",
      imagingCenter: "Klinchex",
    },
    {
      record_id: "rec-1763856365260",
      event_date: "2025-10-23",
      record_type: "Allergy_Report",
      notes: "",
      allergenName: "Penicilin",
      allergenType: "environmental",
      reactions: ["Rash", "Cold"],
      severity: "moderate",
      firstReactionDate: "2025-11-04",
      lastReactionDate: "",
      knownTriggers: ["Cold water"],
      currentTreatments: "Nothing",
    },
    {
      record_id: "rec-1763856498052",
      event_date: "2025-07-23",
      record_type: "Allergy_Report",
      notes: "",
      allergenName: "Athma",
      allergenType: "other",
      reactions: ["Catterh", "Eye redness", "ear itches"],
      severity: "mild",
      firstReactionDate: "2009-11-16",
      lastReactionDate: "",
      knownTriggers: ["Cold", "Dust", "Heavy odur"],
      currentTreatments: "Null",
    },
    {
      record_id: "rec-1763856533143",
      event_date: "2025-11-23",
      record_type: "Allergy_Report",
      notes: "",
      allergenName: "Ibuprofen",
      allergenType: "other",
      reactions: [],
      severity: "life_threatening",
      firstReactionDate: "2025-11-23",
      lastReactionDate: "",
      knownTriggers: [],
      currentTreatments: "",
    },
    {
      record_id: "rec-1763856600379",
      event_date: "2025-12-23",
      record_type: "Condition",
      notes: "",
      name: "Type 2 Diabetis",
      icd10Code: "",
      status: "resolved",
      dateOfDiagnosis: "2025-11-23",
      diagnosedBy: "Dr. No one",
      treatmentPlan: "",
      severity: "unknown",
    },
    {
      record_id: "rec-1763856656164",
      event_date: "2025-10-23",
      record_type: "Condition",
      notes: "",
      name: "Overthinkin",
      icd10Code: "",
      status: "chronic",
      dateOfDiagnosis: "2023-01-02",
      diagnosedBy: "Dr. Me",
      treatmentPlan: "Nothing",
      severity: "critical",
    },
    {
      record_id: "rec-1763856721240",
      event_date: "2025-08-23",
      record_type: "Condition",
      notes: "",
      name: "ADHD",
      icd10Code: "",
      status: "recurring",
      dateOfDiagnosis: "2024-07-10",
      diagnosedBy: "Dr. Durumbu (Allah ya ji kan shi)",
      treatmentPlan: "",
      severity: "severe",
    },
    {
      record_id: "rec-1763856794113",
      event_date: "2025-09-23",
      record_type: "Medication",
      notes: "",
      name: "Loratadine",
      dosage: "200 mg",
      frequency: "1 per day",
      prescribingDoctor: "Dr. no name",
      prescribedFor: "Nose running",
      duration: "2 days",
    },
    {
      record_id: "rec-1763856902515",
      event_date: "2025-07-23",
      record_type: "Medication",
      notes: "",
      documents: [
        {
          file_name: "Miko SIWESS REPORT-3.pdf",
          storage_path:
            "/mock/user-001/doc-1763856902515-Miko SIWESS REPORT-3.pdf",
        },
      ],
      name: "Vitamin C",
      dosage: "700 mg",
      frequency: "Anytime I like",
      prescribingDoctor: "Dr. Myself",
      prescribedFor: "Lack of energy",
      duration: "1000 days",
    },
  ];

  const recordsByMonth = groupByMonth(records);

  return (
    <div class="timeline-container">
      {/* <!-- Timeline --> */}
      <div class="timeline">
        {recordsByMonth.map((month, i) => (
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
        ))}
      </div>
    </div>
  );
}

export default TimelineContainer;
