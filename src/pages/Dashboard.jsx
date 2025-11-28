import React from "react";
import "./dashboard.css";

import { Link, Navigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";

import Aside from "../containers/Aside";
import CriticalCard from "../containers/CriticalCard";
import MedicationItem from "../components/MedicationItem";
import AllergyItem from "../components/AllergyItem";

import { FaPills } from "react-icons/fa6";
import { FaAllergies } from "react-icons/fa";
import { MdSick } from "react-icons/md";
import TimelineItem from "../components/TimelineItem";
import { getHealthRecords, loadData } from "../data/data";
import { useFetch } from "../hooks/useFetch";
import { formatDate } from "../scripts/functions";

function Dashboard() {
  // get user from context
  const { user, loading, loggedInUser } = useUser();

  // Medications data
  const { data: medications } = useFetch(() => getHealthRecords("Medication"));

  const { data: allergies } = useFetch(() =>
    getHealthRecords("Allergy_Report")
  );

  // Current conditions data
  const { data: currentConditions } = useFetch(() =>
    getHealthRecords("Condition")
  );

  // Health events data
  const { data: healthEvents } = useFetch(() => loadData("healthRecords"));

  // !!! Prevent rendering if user is not loaded yet
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if no user
  if (!loading && !loggedInUser) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="dashboard-container page">
      <Aside />

      <div className="content">
        <div className="welcome-section">
          <h1>Welcome back, {user?.firstName}!</h1>
          <p>Here's a summary of your health data.</p>
        </div>

        {/* !!! Add Blood type, bllod group and other info */}

        <div className="critical-info">
          <h2 className="section-title">Critical Information</h2>

          <div className="critical-cards">
            <CriticalCard
              icon={<FaPills />}
              title="Current Medications"
              items={medications?.map((med, index) => (
                <MedicationItem
                  key={index}
                  name={med.name}
                  dosage={med.dosage}
                  status={med.status || "Active"}
                  kind={med.kind}
                />
              ))}
            />
            <CriticalCard
              icon={<FaAllergies />}
              title="Allergies"
              items={allergies?.map((allergy, index) => (
                <AllergyItem
                  key={index}
                  name={allergy.allergenName}
                  level={allergy.severity}
                />
              ))}
            />
            <CriticalCard
              icon={<MdSick />}
              title="Current Conditions"
              items={currentConditions?.map((condition, index) => (
                <AllergyItem
                  key={index}
                  name={condition.name}
                  level={condition.status}
                />
              ))}
            />
          </div>
        </div>

        <div className="timeline-preview">
          <h2 className="section-title">
            Recent Health Events
            <Link to="/timeline">View Full Timeline</Link>
          </h2>

          <div className="card">
            {/* Reverse the array and take at most 5 events */}
            {healthEvents.length > 0 ? (
              healthEvents
                ?.reverse()
                .slice(0, 5)
                .map((event, index) => (
                  <TimelineItem
                    key={index}
                    date={formatDate(event.event_date)}
                    type={event.record_type}
                    title={
                      event.title ||
                      event.name ||
                      event.allergenName ||
                      event.imagingCenter
                    }
                    description={event.note}
                  />
                ))
            ) : (
              <p className="empty-message">No items available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
