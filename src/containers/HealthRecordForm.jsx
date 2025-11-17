import React, { useState } from "react";
// import RecordTypeSelector from "./RecordTypeSelector";
// import BasicInfoSection from "./BasicInfoSection";
// import DynamicFormSection from "./DynamicFormSection";
// import FileUploadSection from "./FileUploadSection";
import RecordTypeCard from "../components/RecordTypeCard";

import { FaUserMd, FaAllergies } from "react-icons/fa";
import { FaPills, FaXRay, FaStethoscope } from "react-icons/fa6";
import { PiFlaskFill } from "react-icons/pi";

import Input from "../components/Input";
import DynamicFormFields from "./DynamicFormFields";
import "./healthRecordForm.css";

const HealthRecordForm = ({}) => {
  // Record types
  const recordTypes = [
    { type: "Visit", icon: <FaUserMd />, label: "Visit" },
    { type: "Medication", icon: <FaPills />, label: "Medication" },
    { type: "Lab", icon: <PiFlaskFill />, label: "Lab" },
    { type: "Imaging", icon: <FaXRay />, label: "Imaging" },
    { type: "Allergy_Report", icon: <FaAllergies />, label: "Allergy" },
    { type: "Condition", icon: <FaStethoscope />, label: "Condition" },
  ];

  const [formData, setFormData] = useState({
    record_type: "Visit", // !!!
    event_date: new Date().toISOString().split("T")[0],
    title: "",
    notes: "",
    // Visit fields
    doctor: "",
    location: "",
    // Medication fields
    name: "",
    dosage: "",
    frequency: "",
    prescribingDoctor: "",
    prescribedFor: "",
    duration: "",
    // Lab fields
    lab_name: "",
    // Imaging fields
    type: "",
    bodyPart: "",
    imaging_center: "",
    // Allergy fields
    allergenName: "",
    allergenType: "",
    reactions: [],
    severity: "",
    firstReactionDate: "",
    lastReactionDate: "",
    knownTriggers: [],
    currentTreatments: "",
    // Condition fields
    conditionName: "",
    icd10Code: "",
    status: "",
    dateOfDiagnosis: "",
    diagnosedBy: "",
    treatmentPlan: "",
    conditionSeverity: "",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  // !!! use useReducer
  const [currentReaction, setCurrentReaction] = useState("");
  const [currentTrigger, setCurrentTrigger] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRecordTypeSelect = (recordType) => {
    setFormData((prev) => ({
      ...prev,
      record_type: recordType,
    }));
  };

  const handleFileSelect = (files) => {
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleFileRemove = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReactionAdd = () => {
    if (currentReaction.trim()) {
      setFormData((prev) => ({
        ...prev,
        reactions: [...prev.reactions, currentReaction.trim()],
      }));
      setCurrentReaction("");
    }
  };

  const handleReactionRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      reactions: prev.reactions.filter((_, i) => i !== index),
    }));
  };

  const handleTriggerAdd = () => {
    if (currentTrigger.trim()) {
      setFormData((prev) => ({
        ...prev,
        knownTriggers: [...prev.knownTriggers, currentTrigger.trim()],
      }));
      setCurrentTrigger("");
    }
  };

  const handleTriggerRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      knownTriggers: prev.knownTriggers.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.record_type) {
      alert("Please select a record type.");
      return;
    }

    if (!formData.event_date) {
      alert("Please enter an event date.");
      return;
    }

    try {
      // Prepare the data for saving
      const recordData = {
        record_id: `rec-${Date.now()}`,
        event_date: formData.event_date,
        record_type: formData.record_type,
        notes: formData.notes,
        ...(selectedFiles.length > 0 && {
          documents: selectedFiles.map((file) => ({
            file_name: file.name,
            storage_path: `/mock/user-001/doc-${Date.now()}-${file.name}`,
          })),
        }),
      };

      // Add type-specific fields
      switch (formData.record_type) {
        case "Visit":
          recordData.title = formData.title;
          recordData.doctor = formData.doctor;
          recordData.location = formData.location;
          break;
        case "Medication":
          recordData.name = formData.name;
          recordData.dosage = formData.dosage;
          recordData.frequency = formData.frequency;
          recordData.prescribingDoctor = formData.prescribingDoctor;
          recordData.prescribedFor = formData.prescribedFor;
          recordData.duration = formData.duration;
          break;
        case "Lab":
          recordData.title = formData.title;
          recordData.lab_name = formData.lab_name;
          break;
        case "Imaging":
          recordData.type = formData.type;
          recordData.bodyPart = formData.bodyPart;
          recordData.imaging_center = formData.imaging_center;
          break;
        case "Allergy_Report":
          recordData.allergenName = formData.allergenName;
          recordData.allergenType = formData.allergenType;
          recordData.reactions = formData.reactions;
          recordData.severity = formData.severity;
          recordData.firstReactionDate = formData.firstReactionDate;
          recordData.lastReactionDate = formData.lastReactionDate;
          recordData.knownTriggers = formData.knownTriggers;
          recordData.currentTreatments = formData.currentTreatments;
          break;
        case "Condition":
          recordData.conditionName = formData.conditionName;
          recordData.icd10Code = formData.icd10Code;
          recordData.status = formData.status;
          recordData.dateOfDiagnosis = formData.dateOfDiagnosis;
          recordData.diagnosedBy = formData.diagnosedBy;
          recordData.treatmentPlan = formData.treatmentPlan;
          recordData.severity = formData.conditionSeverity;
          break;
        default:
          break;
      }

      // Call the saveData function
      await saveData(recordData);

      // Reset form
      setFormData({
        record_type: "",
        event_date: new Date().toISOString().split("T")[0],
        title: "",
        notes: "",
        doctor: "",
        location: "",
        name: "",
        dosage: "",
        frequency: "",
        prescribingDoctor: "",
        prescribedFor: "",
        duration: "",
        lab_name: "",
        type: "",
        bodyPart: "",
        imaging_center: "",
        allergenName: "",
        allergenType: "",
        reactions: [],
        severity: "",
        firstReactionDate: "",
        lastReactionDate: "",
        knownTriggers: [],
        currentTreatments: "",
        conditionName: "",
        icd10Code: "",
        status: "",
        dateOfDiagnosis: "",
        diagnosedBy: "",
        treatmentPlan: "",
        conditionSeverity: "",
      });
      setSelectedFiles([]);
      setCurrentReaction("");
      setCurrentTrigger("");

      alert("Health record saved successfully!");
    } catch (error) {
      console.error("Error saving record:", error);
      alert("Error saving health record. Please try again.");
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the form? All entered data will be lost."
      )
    ) {
      setFormData({
        record_type: "",
        event_date: new Date().toISOString().split("T")[0],
        title: "",
        notes: "",
        doctor: "",
        location: "",
        name: "",
        dosage: "",
        frequency: "",
        prescribingDoctor: "",
        prescribedFor: "",
        duration: "",
        lab_name: "",
        type: "",
        bodyPart: "",
        imaging_center: "",
        allergenName: "",
        allergenType: "",
        reactions: [],
        severity: "",
        firstReactionDate: "",
        lastReactionDate: "",
        knownTriggers: [],
        currentTreatments: "",
        conditionName: "",
        icd10Code: "",
        status: "",
        dateOfDiagnosis: "",
        diagnosedBy: "",
        treatmentPlan: "",
        conditionSeverity: "",
      });
      setSelectedFiles([]);
      setCurrentReaction("");
      setCurrentTrigger("");
    }
  };

  return (
    <div className="form-content">
      <div className="form-container">
        <div className="form-header">
          <h2>Create New Health Record</h2>
          <p>
            Fill out the form below to add a new health record to your timeline.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Record type selector */}
          <div className="form-section">
            <h3 className="section-title">
              <i className="fas fa-tag"></i>
              Record Type
            </h3>

            <div className="record-type-selector">
              {recordTypes.map((recordType) => (
                <RecordTypeCard
                  icon={recordType.icon}
                  label={recordType.label}
                  active={formData.record_type === recordType.type}
                  handleClick={() => handleRecordTypeSelect(recordType.type)}
                />
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div className="form-section">
            <h3 className="section-title">
              <i className="fas fa-info-circle"></i>
              Basic Information
            </h3>

            <div className="form-grid">
              <Input
                title="Event Date"
                type="date"
                name="event_date"
                placeholder={""}
                required
                value={formData.event_date}
                handleChange={handleInputChange}
                error={""}
              />

              {/* Show the title input if needed */}
              {["Visit", "Lab"].includes(formData.record_type) && (
                <Input
                  title="Title"
                  type="text"
                  name="title"
                  placeholder={
                    formData.record_type === "Visit"
                      ? "e.g., Annual Physical Checkup"
                      : "e.g., Blood Test Results"
                  }
                  required
                  value={formData.title}
                  handleChange={handleInputChange}
                  error={""}
                />
              )}

              <div className="form-group full-width">
                <Input
                  title="Notes"
                  type="textarea"
                  name="notes"
                  placeholder={
                    "Add any relevant notes about this health record..."
                  }
                  value={formData.notes}
                  handleChange={handleInputChange}
                  error={""}
                />
              </div>
            </div>
          </div>

          {/* Dynamic Form Section */}

          <div className="form-section">
            <h3 className="section-title">
              <i className="icon">
                {
                  recordTypes.find((type) => type.type === formData.record_type)
                    .icon
                }
              </i>
              {
                recordTypes.find((type) => type.type === formData.record_type)
                  .label
              }{" "}
              Details
            </h3>

            <DynamicFormFields
              recordType={formData.record_type}
              formData={formData}
              handleInputChange={handleInputChange}
              currentReaction={currentReaction}
              onReactionChange={setCurrentReaction}
              onReactionAdd={handleReactionAdd}
              onReactionRemove={handleReactionRemove}
              currentTrigger={currentTrigger}
              onTriggerChange={setCurrentTrigger}
              onTriggerAdd={handleTriggerAdd}
              onTriggerRemove={handleTriggerRemove}
            />
          </div>

          {/* <FileUploadSection
            selectedFiles={selectedFiles}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
          />{" "}
          */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleReset}
            >
              <i className="fas fa-redo"></i>
              Reset Form
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-save"></i>
              Save Health Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthRecordForm;
