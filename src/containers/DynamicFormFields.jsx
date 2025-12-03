import React from "react";
import Input from "../components/Input";
import ModifiableListInput from "../components/ModifiableListInput";
import "./dynamicFormFields.css";

const DynamicFormFields = ({
  recordType,
  formData,
  handleInputChange,
  updateFormField,
  errors,
}) => {
  const renderFormFields = () => {
    // Render fields based on record type
    switch (recordType) {
      case "Visit":
        return (
          <div className="form-grid">
            <Input
              title="Doctor"
              type="text"
              name="doctor"
              placeholder={"e.g., Dr. Sarah Smith, MD"}
              required
              value={formData.doctor}
              handleChange={handleInputChange}
              error={errors.doctor}
            />

            <Input
              title="Location"
              type="text"
              name="location"
              placeholder={"e.g., Primary Care Clinic A"}
              required
              value={formData.location}
              handleChange={handleInputChange}
              error={errors.location}
            />
          </div>
        );
      case "Medication":
        return (
          <div className="form-grid">
            <Input
              title="Medication Name"
              type="text"
              name="medicationName"
              placeholder={"e.g., Amoxicillin"}
              required
              value={formData.medicationName}
              handleChange={handleInputChange}
              error={errors.medicationName}
            />

            <Input
              title="Dosage"
              type="text"
              name="dosage"
              placeholder={"e.g., 500 mg"}
              required
              value={formData.dosage}
              handleChange={handleInputChange}
              error={errors.dosage}
            />

            <Input
              title="Frequency"
              type="text"
              name="frequency"
              placeholder={"e.g., Twice a day"}
              required
              value={formData.frequency}
              handleChange={handleInputChange}
              error={errors.frequency}
            />

            <Input
              title="Prescribing Doctor"
              type="text"
              name="prescribingDoctor"
              placeholder={"e.g., Dr. Sarah Smith, MD"}
              required
              value={formData.prescribingDoctor}
              handleChange={handleInputChange}
              error={errors.prescribingDoctor}
            />

            <Input
              title="Prescribed For"
              type="text"
              name="prescribedFor"
              placeholder={"e.g., Ear infection"}
              // required
              value={formData.prescribedFor}
              handleChange={handleInputChange}
              error={errors.prescribedFor}
            />

            <Input
              title="Duration"
              type="text"
              name="duration"
              placeholder={"e.g., 7 days"}
              // required
              value={formData.duration}
              handleChange={handleInputChange}
              error={errors.duration}
            />
          </div>
        );
      case "Lab":
        return (
          <div className="form-grid">
            <Input
              title="Lab Name"
              type="text"
              name="labName"
              placeholder={"e.g., City General Lab"}
              required
              value={formData.labName}
              handleChange={handleInputChange}
              error={errors.labName}
            />
          </div>
        );
      case "Imaging":
        return (
          <div className="form-grid">
            <Input
              title="Imaging Type"
              type="text"
              name="imagingType"
              placeholder={"e.g., X-ray, CT Scan, MRI"}
              required
              value={formData.imagingType}
              handleChange={handleInputChange}
              error={errors.imagingType}
            />

            <Input
              title="Body Part"
              type="text"
              name="bodyPart"
              placeholder={"e.g., Chest, Abdomen, Left Knee"}
              required
              value={formData.bodyPart}
              handleChange={handleInputChange}
              error={errors.bodyPart}
            />

            <Input
              title="Imaging Center"
              type="text"
              name="imagingCenter"
              placeholder={"e.g., Downtown Radiology Clinic"}
              required
              value={formData.imagingCenter}
              handleChange={handleInputChange}
              error={errors.imagingCenter}
            />
          </div>
        );
      case "Allergy_Report":
        return (
          <div className="form-grid">
            <Input
              title="Allergen Name"
              type="text"
              name="allergenName"
              placeholder={"e.g., Penicillin"}
              required
              value={formData.allergenName}
              handleChange={handleInputChange}
              error={errors.allergenName}
            />

            <Input
              title="Allergen Type"
              type="dropdown"
              name="allergenType"
              required
              value={formData.allergenType}
              handleChange={handleInputChange}
              options={[
                { value: "food", label: "Food" },
                { value: "drug", label: "Drug" },
                { value: "environmental", label: "Environmental" },
                { value: "insect", label: "Insect" },
                { value: "other", label: "Other" },
              ]}
              error={""}
            />

            <Input
              title="Severity"
              type="dropdown"
              name="severity"
              required
              value={formData.severity}
              handleChange={handleInputChange}
              options={[
                { value: "mild", label: "Mild" },
                { value: "moderate", label: "Moderate" },
                { value: "severe", label: "Severe" },
                // { value: "life_threatening", label: "Life-threatening" },
                { value: "unknown", label: "Unknown" },
              ]}
              error={""}
            />

            <Input
              title="First Reaction Date"
              type="date"
              name="firstReactionDate"
              placeholder={""}
              required
              value={formData.firstReactionDate}
              handleChange={handleInputChange}
              error={errors.firstReactionDate}
            />

            <Input
              title="Last Reaction Date (leave blank if ongoing)"
              type="date"
              name="lastReactionDate"
              placeholder={""}
              // required
              value={formData.lastReactionDate}
              handleChange={handleInputChange}
              error={errors.lastReactionDate}
            />

            <div className="form-group full-width">
              <ModifiableListInput
                label="Reactions"
                items={formData.reactions}
                handleItemsChange={(newItems) =>
                  updateFormField("reactions", newItems)
                }
                placeholder="e.g., Rash, Hives, Difficulty breathing"
                maxItems={10}
              />
            </div>

            <div className="form-group full-width">
              <ModifiableListInput
                label="Known Triggers"
                items={formData.knownTriggers}
                handleItemsChange={(newItems) =>
                  updateFormField("knownTriggers", newItems)
                }
                placeholder="e.g., Exercise, Stress, Heat"
                maxItems={10}
              />
            </div>

            <div className="form-group full-width">
              <Input
                title="Current Treatments"
                type="textarea"
                name="currentTreatments"
                placeholder={`Describe current treatments, medications, and management strategies...`}
                // required
                value={formData.currentTreatments}
                handleChange={handleInputChange}
                error={""}
              />
            </div>
          </div>
        );
      case "Condition":
        return (
          <div className="form-grid">
            <Input
              title="Condition Name"
              type="text"
              name="conditionName"
              placeholder={"e.g., Type 2 Diabetes"}
              required
              value={formData.conditionName}
              handleChange={handleInputChange}
              error={errors.conditionName}
            />

            <Input
              title="ICD-10 Code"
              type="text"
              name="icd10Code"
              placeholder={"e.g., E11.9"}
              // required
              value={formData.icd10Code}
              handleChange={handleInputChange}
              error={""}
            />

            <Input
              title="Status"
              type="dropdown"
              name="status"
              required
              value={formData.status}
              handleChange={handleInputChange}
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
                // { value: "resolved", label: "Resolved" },
                // { value: "chronic", label: "Chronic" },
                // { value: "recurring", label: "Recurring" },
              ]}
              error={""}
            />

            <Input
              title="Date of Diagnosis"
              type="date"
              name="dateOfDiagnosis"
              placeholder={""}
              // required
              value={formData.dateOfDiagnosis}
              handleChange={handleInputChange}
              error={errors.dateOfDiagnosis}
            />

            <Input
              title="Diagnosed By"
              type="text"
              name="diagnosedBy"
              placeholder={"e.g., Dr. Sarah Smith, MD"}
              required
              value={formData.diagnosedBy}
              handleChange={handleInputChange}
              error={errors.diagnosedBy}
            />

            <Input
              title="Severity"
              type="dropdown"
              name="conditionSeverity"
              required
              value={formData.conditionSeverity}
              handleChange={handleInputChange}
              options={[
                { value: "mild", label: "Mild" },
                { value: "moderate", label: "Moderate" },
                { value: "severe", label: "Severe" },
                { value: "critical", label: "Critical" },
                { value: "unknown", label: "Unknown" },
              ]}
              error={""}
            />

            <div className="form-group full-width">
              <Input
                title="Treatment Plan"
                type="textarea"
                name="treatmentPlan"
                placeholder={"e.g., Metformin 500 mg daily; lifestyle changes"}
                // required
                value={formData.treatmentPlan}
                handleChange={handleInputChange}
                error={""}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!recordType) return null;

  // Render the dynamic form fields
  return <div className="dynamic-section active">{renderFormFields()}</div>;
};

export default DynamicFormFields;
