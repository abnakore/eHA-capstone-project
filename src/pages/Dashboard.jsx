import React from "react";

import "./dashboard.css";

import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";

import Aside from "../containers/Aside";
import CriticalCard from "../containers/CriticalCard";
import MedicationItem from "../components/MedicationItem";
import AllergyItem from "../components/AllergyItem";
import EmergencyContactItem from "../components/EmergencyContactItem";

import { FaPills } from "react-icons/fa6";
import { FaAllergies } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";

function Dashboard() {
  // get user from context
  const { user, loading } = useUser();
  const navigate = useNavigate();

  // Prevent rendering if user is not loaded yet
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if no user
  if (!loading && !user) {
    // In a real app, you might use something like:
    navigate("/login");
    return null;
  }

  return (
    <div className="dashboard-container">
      <Aside />

      <div className="content">
        <div className="welcome-section">
          <h1>Welcome back, {user?.firstName}!</h1>
          <p>Here's a summary of your health data.</p>
        </div>

        <div class="critical-info">
          <h2 class="section-title">Critical Information</h2>

          <div className="critical-cards">
            <CriticalCard
              icon={<FaPills />}
              title="Current Medications"
              items={[
                <MedicationItem
                  name="Lisinopril"
                  dosage="10mg daily"
                  status="Active"
                  kind="tablet"
                />,
                <MedicationItem
                  name="Metformin"
                  dosage="500mg twice daily"
                  status="Active"
                  kind="injection"
                />,
                <MedicationItem
                  name="Atorvastatin"
                  dosage="20mg at bedtime"
                  status="Active"
                  kind="syrup"
                />,
              ]}
            />
            <CriticalCard
              icon={<FaAllergies />}
              title="Allergies"
              items={[
                <AllergyItem name="Penicillin" level="Severe" />,
                <AllergyItem name="Shellfish" level="Moderate" />,
                <AllergyItem name="Ibuprofen" level="Moderate" />,
              ]}
            />
            <CriticalCard
              icon={<IoMdCall />}
              title="Emergency Contacts"
              items={[
                <EmergencyContactItem name="Jane Doe" number="+1234567890" />,
                <EmergencyContactItem
                  name="Dr. Sarah Miller"
                  number="+0987654321"
                />,
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
