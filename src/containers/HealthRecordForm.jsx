import React, { useState } from "react";
// import RecordTypeSelector from "./RecordTypeSelector";
// import BasicInfoSection from "./BasicInfoSection";
// import DynamicFormSection from "./DynamicFormSection";
// import FileUploadSection from "./FileUploadSection";
import RecordTypeCard from "../components/RecordTypeCard";

import { FaUserMd, FaAllergies, FaRedo, FaSave } from "react-icons/fa";
import {
  FaPills,
  FaXRay,
  FaStethoscope,
  FaTag,
  FaCircleInfo,
} from "react-icons/fa6";
import { PiFlaskFill } from "react-icons/pi";

import Input from "../components/Input";
import DynamicFormFields from "./DynamicFormFields";
import "./healthRecordForm.css";
import FileUpload from "../components/FileUpload";
import { saveData, loadData } from "../data/data";
import Button from "../components/Button";

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

  // Form Data
  const [formData, setFormData] = useState({
    record_type: "Visit", // !!!
    event_date: new Date().toISOString().split("T")[0],
    title: "",
    notes: "",
    // Visit fields
    doctor: "",
    location: "",
    // Medication fields
    medicationName: "",
    dosage: "",
    frequency: "",
    prescribingDoctor: "",
    prescribedFor: "",
    duration: "",
    // Lab fields
    labName: "",
    // Imaging fields
    imagingType: "",
    bodyPart: "",
    imagingCenter: "",
    // Allergy fields
    allergenName: "",
    allergenType: "food",
    reactions: [],
    severity: "mild",
    firstReactionDate: "",
    lastReactionDate: "",
    knownTriggers: [],
    currentTreatments: "",
    // Condition fields
    conditionName: "",
    icd10Code: "",
    status: "active",
    dateOfDiagnosis: "",
    diagnosedBy: "",
    treatmentPlan: "",
    conditionSeverity: "mild",
  });

  // List of files uploaded by the user
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Errors
  const [errors, setErrors] = useState({});

  // !!! use useReducer
  const [currentReaction, setCurrentReaction] = useState("");
  const [currentTrigger, setCurrentTrigger] = useState("");

  // Default handle input change. Takes the event and update the formData
  const handleInputChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handles input change. Takes the key and value and update the formData
  const updateFormField = (name, value) => {
    setErrors({});
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle the record type
  const handleRecordTypeSelect = (recordType) => {
    setFormData((prev) => ({
      ...prev,
      record_type: recordType,
    }));
  };

  // Add a file to the files list
  const handleFileSelect = (file) => {
    setSelectedFiles((prev) => [...prev, file]);
  };

  // Remove the file from the list by it's index
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

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Common validations for all record types
    if (!formData.record_type) {
      newErrors.record_type = "Please select a record type.";
      return;
    }

    // Validate event date
    if (!formData.event_date) {
      newErrors.event_date = "Event date is required";
    } else if (new Date(formData.event_date) > new Date()) {
      newErrors.event_date = "Event date cannot be in the future";
    }

    // Validate title
    if (["Visit", "Lab"].includes(formData.record_type)) {
      if (!formData.title.trim()) {
        newErrors.title = "Title is required";
      }
    }

    // Type-specific validations
    switch (formData.record_type) {
      case "Visit":
        if (!formData.doctor.trim()) {
          newErrors.doctor = "Visit doctor is required";
        }
        if (!formData.location.trim()) {
          newErrors.location = "Visit location is required";
        }
        break;
      case "Medication":
        if (!formData.medicationName.trim())
          newErrors.medicationName = "Medication name is required";
        if (!formData.dosage.trim())
          newErrors.dosage = "Medication dosage is required";
        if (!formData.frequency.trim())
          newErrors.frequency = "Medication frequency is required";
        if (!formData.prescribingDoctor.trim())
          newErrors.prescribingDoctor =
            "Medication prescribing doctor is required";
        // if (!formData.prescribedFor.trim())
        //   newErrors.prescribedFor = "Medication prescribed for is required";
        // if (!formData.duration.trim())
        //   newErrors.duration = "Medication duration is required";

        break;
      case "Lab":
        if (!formData.labName.trim())
          newErrors.labName = "Lab name is required";
        break;
      case "Imaging":
        if (!formData.imagingType.trim())
          newErrors.imagingType = "Imaging type is required";
        if (!formData.bodyPart.trim())
          newErrors.bodyPart = "Imaging body part is required";
        if (!formData.imagingCenter.trim())
          newErrors.imagingCenter = "Imaging center is required";
        break;
      case "Allergy_Report":
        if (!formData.allergenName.trim())
          newErrors.allergenName = "Allergen name is required";

        if (!formData.firstReactionDate) {
          newErrors.firstReactionDate =
            "First reaction date is required. (If you could'nt remember, give an approximate)";
        } else if (new Date(formData.firstReactionDate) > new Date()) {
          newErrors.firstReactionDate =
            "First reaction date cannot be in the future";
        }

        if (formData.firstReactionDate && formData.lastReactionDate) {
          if (
            new Date(formData.firstReactionDate) >
            new Date(formData.lastReactionDate)
          ) {
            newErrors.lastReactionDate =
              "Last reaction date cannot be before first reaction date";
          }
        }
        break;
      case "Condition":
        if (!formData.conditionName.trim())
          newErrors.conditionName = "Condition name is required";
        if (!formData.diagnosedBy.trim())
          newErrors.diagnosedBy = "Condition diagnosed by is required";
        if (
          formData.dateOfDiagnosis &&
          new Date(formData.dateOfDiagnosis) > new Date()
        )
          newErrors.dateOfDiagnosis =
            "Date of diagnosis cannot be in the future";

        break;
      default:
        // No specific validation for unknown types
        break;
    }

    return newErrors;
  };

  // Handle submit and save data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      // Prepare the data for saving
      const recordData = {
        record_id: `rec-${Date.now()}`,
        event_date: formData.event_date,
        record_type: formData.record_type,
        notes: formData.notes.trim(),
        // Add the files if uploaded
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
          recordData.title = formData.title.trim();
          recordData.doctor = formData.doctor.trim();
          recordData.location = formData.location.trim();
          break;
        case "Medication":
          recordData.name = formData.medicationName.trim();
          recordData.dosage = formData.dosage.trim();
          recordData.frequency = formData.frequency.trim();
          recordData.prescribingDoctor = formData.prescribingDoctor.trim();
          recordData.prescribedFor = formData.prescribedFor.trim();
          recordData.duration = formData.duration.trim();
          break;
        case "Lab":
          recordData.title = formData.title.trim();
          recordData.labName = formData.labName.trim();
          break;
        case "Imaging":
          recordData.type = formData.imagingType.trim();
          recordData.bodyPart = formData.bodyPart.trim();
          recordData.imagingCenter = formData.imagingCenter.trim();
          break;
        case "Allergy_Report":
          recordData.allergenName = formData.allergenName.trim();
          recordData.allergenType = formData.allergenType.trim();
          recordData.reactions = formData.reactions;
          recordData.severity = formData.severity;
          recordData.firstReactionDate = formData.firstReactionDate;
          recordData.lastReactionDate = formData.lastReactionDate;
          recordData.knownTriggers = formData.knownTriggers;
          recordData.currentTreatments = formData.currentTreatments.trim();
          break;
        case "Condition":
          recordData.name = formData.conditionName.trim();
          recordData.icd10Code = formData.icd10Code.trim();
          recordData.status = formData.status;
          recordData.dateOfDiagnosis = formData.dateOfDiagnosis;
          recordData.diagnosedBy = formData.diagnosedBy.trim();
          recordData.treatmentPlan = formData.treatmentPlan;
          recordData.severity = formData.conditionSeverity;
          break;
        default:
          break;
      }

      // Get the existing records in the local storage
      const existingRecords = (await loadData("healthRecords")) || [];
      // Append the newRecord to the existing records in local storage
      existingRecords.push(recordData);
      // Call the saveData function
      console.log(recordData, existingRecords);
      await saveData("healthRecords", existingRecords);

      // Reset form
      setFormData({
        record_type: formData.record_type || "Visit",
        event_date: new Date().toISOString().split("T")[0],
        title: "",
        notes: "",
        // Visit fields
        doctor: "",
        location: "",
        // Medication fields
        medicationName: "",
        dosage: "",
        frequency: "",
        prescribingDoctor: "",
        prescribedFor: "",
        duration: "",
        // Lab fields
        labName: "",
        // Imaging fields
        imagingType: "",
        bodyPart: "",
        imagingCenter: "",
        // Allergy fields
        allergenName: "",
        allergenType: "food",
        reactions: [],
        severity: "mild",
        firstReactionDate: "",
        lastReactionDate: "",
        knownTriggers: [],
        currentTreatments: "",
        // Condition fields
        conditionName: "",
        icd10Code: "",
        status: "active",
        dateOfDiagnosis: "",
        diagnosedBy: "",
        treatmentPlan: "",
        conditionSeverity: "mild",
      });

      setSelectedFiles([]);
      setCurrentReaction("");
      setCurrentTrigger("");

      console.log("Health record saved successfully!");
    } catch (error) {
      console.error("Error saving record:", error);
      setErrors((prev) => ({
        ...prev,
        form: "Error saving health record. Please try again.",
      }));
    }
  };

  // Handle form reset
  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the form? All entered data will be lost."
      )
    ) {
      setFormData({
        record_type: formData.record_type || "Visit",
        event_date: new Date().toISOString().split("T")[0],
        title: "",
        notes: "",
        // Visit fields
        doctor: "",
        location: "",
        // Medication fields
        medicationName: "",
        dosage: "",
        frequency: "",
        prescribingDoctor: "",
        prescribedFor: "",
        duration: "",
        // Lab fields
        labName: "",
        // Imaging fields
        imagingType: "",
        bodyPart: "",
        imagingCenter: "",
        // Allergy fields
        allergenName: "",
        allergenType: "food",
        reactions: [],
        severity: "mild",
        firstReactionDate: "",
        lastReactionDate: "",
        knownTriggers: [],
        currentTreatments: "",
        // Condition fields
        conditionName: "",
        icd10Code: "",
        status: "active",
        dateOfDiagnosis: "",
        diagnosedBy: "",
        treatmentPlan: "",
        conditionSeverity: "mild",
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
              <i>
                <FaTag />
              </i>
              Record Type
            </h3>
            {errors.record_type && (
              <div className="error-message">{errors.record_type}</div>
            )}
            <div className="record-type-selector">
              {recordTypes.map((recordType) => (
                <RecordTypeCard
                  key={recordType.type}
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
              <i>
                <FaCircleInfo />
              </i>
              Basic Information
            </h3>
            {errors.form && <div className="error-message">{errors.form}</div>}
            <div className="form-grid">
              <Input
                title="Event Date"
                type="date"
                name="event_date"
                placeholder={""}
                required
                value={formData.event_date}
                handleChange={handleInputChange}
                error={errors.event_date}
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
                  error={errors.title}
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
              updateFormField={updateFormField}
              errors={errors}
              // Remove below props
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

          <FileUpload
            selectedFiles={selectedFiles}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
          />

          <div className="form-actions">
            <Button
              title={"Reset Form"}
              theme="btn-secondary"
              handleClick={handleReset}
              LeftIcon={<FaRedo />}
            />
            <Button
              title={"Save Health Record"}
              theme="btn-primary"
              type={"submit"}
              LeftIcon={<FaSave />}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthRecordForm;
