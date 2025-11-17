import React from "react";
// import VisitFields from "./form-types/VisitFields";
// import MedicationFields from "./form-types/MedicationFields";
// import LabFields from "./form-types/LabFields";
// import ImagingFields from "./form-types/ImagingFields";
// import AllergyFields from "./form-types/AllergyFields";
// import ConditionFields from "./form-types/ConditionFields";
import "./dynamicFormFields.css";
import Input from "../components/Input";

const DynamicFormFields = ({
  recordType,
  formData,
  handleInputChange,
  currentReaction,
  onReactionChange,
  onReactionAdd,
  onReactionRemove,
  currentTrigger,
  onTriggerChange,
  onTriggerAdd,
  onTriggerRemove,
}) => {
  const renderFormFields = () => {
    switch (recordType) {
      case "Visit":
        return (
          // <VisitFields formData={formData} handleInputChange={handleInputChange} />
          <div className="form-grid">
            <Input
              title="Doctor"
              type="text"
              name="doctor"
              placeholder={"e.g., Dr. Sarah Smith, MD"}
              required
              value={formData.doctor}
              handleChange={handleInputChange}
              error={""}
            />

            <Input
              title="Location"
              type="text"
              name="location"
              placeholder={"e.g., Primary Care Clinic A"}
              required
              value={formData.location}
              handleChange={handleInputChange}
              error={""}
            />
          </div>
        );
      case "Medication":
        return (
          // <MedicationFields formData={formData} handleInputChange={handleInputChange} />
          <></>
        );
      case "Lab":
        // return <LabFields formData={formData} handleInputChange={handleInputChange} />;
        <></>;
      case "Imaging":
        return (
          // <ImagingFields formData={formData} handleInputChange={handleInputChange} />
          <></>
        );
      case "Allergy_Report":
        return (
          // <AllergyFields
          //   formData={formData}
          //   handleInputChange={handleInputChange}
          //   currentReaction={currentReaction}
          //   onReactionChange={onReactionChange}
          //   onReactionAdd={onReactionAdd}
          //   onReactionRemove={onReactionRemove}
          //   currentTrigger={currentTrigger}
          //   onTriggerChange={onTriggerChange}
          //   onTriggerAdd={onTriggerAdd}
          //   onTriggerRemove={onTriggerRemove}
          // />
          <></>
        );
      case "Condition":
        return (
          // <ConditionFields formData={formData} handleInputChange={handleInputChange} />
          <></>
        );
      default:
        return null;
    }
  };

  if (!recordType) return null;

  return <div className="dynamic-section active">{renderFormFields()}</div>;
};

export default DynamicFormFields;
